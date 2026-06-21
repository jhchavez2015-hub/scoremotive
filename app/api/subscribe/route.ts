import { NextRequest, NextResponse } from "next/server";

// IDs de las automations "Add by API" creadas en Beehiiv, una por idioma.
const AUTOMATION_IDS: Record<string, string> = {
  es: "aut_08080a62-bb2c-440a-b232-d2b7ea0c9923",
  en: "aut_705deea3-a933-43ac-856f-9446548e281c",
};

export async function POST(req: NextRequest) {
  try {
    const { email, lang } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Fallback seguro: si "lang" llega vacío/inesperado, no truena, cae a 'es'
    const safeLang: "es" | "en" = lang === "en" ? "en" : "es";
    const automationId = AUTOMATION_IDS[safeLang];

    const res = await fetch(
      "https://api.beehiiv.com/v2/publications/pub_c2ddb362-9a7f-4b0d-833a-7c61f4e5da94/subscriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          // El correo de bienvenida específico por idioma ahora lo manda
          // la automation correspondiente, así que apagamos el welcome
          // email genérico para no mandar dos correos de bienvenida.
          send_welcome_email: false,
          automation_ids: [automationId],
          custom_fields: [
            { name: "Language", value: safeLang === "es" ? "Español" : "English" },
          ],
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Beehiiv error:", error);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}