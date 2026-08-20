import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";

type Locale = "en" | "es";

const content: Record<Locale, {
  navLabel: string;
  title: string;
  lastUpdated: string;
  metaDescription: string;
  disclaimerTitle: string;
  affiliateTitle: string;
  affiliateBody: string[];
  privacyTitle: string;
  infoCollectTitle: string;
  howUseTitle: string;
  howUseBody: string;
  cookiesTitle: string;
  cookiesBody: string;
  thirdPartyTitle: string;
  thirdPartyIntro: string;
  rightsTitle: string;
  rightsBody1: string;
  rightsBody2Prefix: string;
  termsTitle: string;
  termsBody: string[];
  contactQuestion: string;
  footerText: string;
  home: string;
  about: string;
  tools: string;
}> = {
  en: {
    navLabel: "Legal & Privacy",
    title: "Legal & Privacy Policy",
    lastUpdated: "Last updated: June 2026",
    metaDescription: "ScoreMotive's legal terms, privacy policy, and affiliate disclosure — how we handle your data and how our free financial tools work.",
    disclaimerTitle: "Educational Disclaimer",
    affiliateTitle: "Affiliate Disclosure",
    affiliateBody: [
      "ScoreMotive participates in affiliate marketing programs. This means we may receive compensation when you click on links to financial products or services featured on this website and complete a qualifying action.",
      "This compensation may influence which products we feature and how they are presented, but it does not affect our editorial integrity. We only recommend products and services we believe may be genuinely useful to our users.",
      "Affiliate relationships we may have include, but are not limited to, credit card issuers, credit monitoring services, personal finance apps, and financial education platforms.",
      "All affiliate links are identified where possible. The presence of an affiliate link does not imply endorsement of the linked product or service.",
    ],
    privacyTitle: "Privacy Policy",
    infoCollectTitle: "Information We Collect",
    howUseTitle: "How We Use Your Information",
    howUseBody: "We use your email address to send newsletters and educational content you have opted into. We do not sell your personal information to third parties.",
    cookiesTitle: "Cookies & Tracking",
    cookiesBody: "We may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.",
    thirdPartyTitle: "Third-Party Services",
    thirdPartyIntro: "Our website uses the following third-party services that may collect data:",
    rightsTitle: "Your Rights",
    rightsBody1: "You have the right to access, correct, or delete your personal information at any time. To unsubscribe from our newsletter, use the unsubscribe link in any email we send you.",
    rightsBody2Prefix: "For privacy-related requests, contact us at",
    termsTitle: "Terms of Use",
    termsBody: [
      "By using ScoreMotive, you agree to use the tools and content solely for personal, educational purposes. You agree not to reproduce, distribute, or commercially exploit any content from this website without written permission.",
      'ScoreMotive is provided "as is" without warranties of any kind. We are not liable for any financial decisions made based on information from this website.',
    ],
    contactQuestion: "Questions about our legal policies?",
    footerText: "© 2026 ScoreMotive · Educational use only",
    home: "Home",
    about: "About",
    tools: "Tools",
  },
  es: {
    navLabel: "Legal y Privacidad",
    title: "Legal y Política de Privacidad",
    lastUpdated: "Última actualización: Junio 2026",
    metaDescription: "Términos legales, política de privacidad y divulgación de afiliados de ScoreMotive — cómo manejamos tus datos y cómo funcionan nuestras herramientas financieras gratuitas.",
    disclaimerTitle: "Descargo de Responsabilidad Educativa",
    affiliateTitle: "Divulgación de Afiliados",
    affiliateBody: [
      "ScoreMotive participa en programas de marketing de afiliados. Esto significa que podemos recibir compensación cuando haces clic en enlaces a productos o servicios financieros presentados en este sitio web y completas una acción calificada.",
      "Esta compensación puede influir en qué productos presentamos y cómo se muestran, pero no afecta nuestra integridad editorial. Solo recomendamos productos y servicios que creemos pueden ser genuinamente útiles para nuestros usuarios.",
      "Las relaciones de afiliados que podemos tener incluyen, entre otras, emisores de tarjetas de crédito, servicios de monitoreo de crédito, aplicaciones de finanzas personales y plataformas de educación financiera.",
      "Todos los enlaces de afiliados están identificados donde sea posible. La presencia de un enlace de afiliado no implica respaldo del producto o servicio vinculado.",
    ],
    privacyTitle: "Política de Privacidad",
    infoCollectTitle: "Información que Recopilamos",
    howUseTitle: "Cómo Usamos tu Información",
    howUseBody: "Usamos tu email para enviar newsletters y contenido educativo al que te has suscrito. No vendemos tu información personal a terceros.",
    cookiesTitle: "Cookies y Seguimiento",
    cookiesBody: "Podemos usar cookies y tecnologías similares para mejorar tu experiencia de navegación y analizar el tráfico del sitio. Puedes controlar la configuración de cookies a través de las preferencias de tu navegador.",
    thirdPartyTitle: "Servicios de Terceros",
    thirdPartyIntro: "Nuestro sitio utiliza los siguientes servicios de terceros:",
    rightsTitle: "Tus Derechos",
    rightsBody1: "Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Para cancelar la suscripción al newsletter, usa el enlace de cancelación en cualquier email que te enviemos.",
    rightsBody2Prefix: "Para solicitudes relacionadas con privacidad, contáctanos en",
    termsTitle: "Términos de Uso",
    termsBody: [
      "Al usar ScoreMotive, aceptas usar las herramientas y el contenido únicamente para fines personales y educativos. Aceptas no reproducir, distribuir ni explotar comercialmente ningún contenido de este sitio sin permiso escrito.",
      'ScoreMotive se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables de ninguna decisión financiera tomada basándose en información de este sitio.',
    ],
    contactQuestion: "¿Preguntas sobre nuestras políticas legales?",
    footerText: "© 2026 ScoreMotive · Solo uso educativo",
    home: "Inicio",
    about: "Nosotros",
    tools: "Herramientas",
  },
};

const thirdPartyServices = [
  { name: "Beehiiv", descEn: "email marketing and newsletter delivery", descEs: "marketing por email y envío de newsletters" },
  { name: "Vercel", descEn: "website hosting and analytics", descEs: "alojamiento del sitio web y análisis" },
  { name: "Cloudflare", descEn: "DNS and security services", descEs: "servicios de DNS y seguridad" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";

  return {
    title: t.title,
    description: t.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/legal`,
      languages: {
        en: `${baseUrl}/en/legal`,
        es: `${baseUrl}/es/legal`,
        "x-default": `${baseUrl}/en/legal`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.metaDescription,
      url: `${baseUrl}/${locale}/legal`,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.metaDescription,
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      <SectionHeader
        maxWidth="4xl"
        backHref={`/${locale}`}
        label={t.navLabel}
        otherLocaleHref={`/${otherLocale}/legal`}
        isEs={isEs}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Title */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[3px] text-[#4f7cff] font-medium">Legal</span>
          <h1 className="text-4xl font-black tracking-[-1px] mt-2 mb-4">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-sm">{t.lastUpdated}</p>
        </div>

        <div className="space-y-12">

          {/* Disclaimer */}
          <section className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.15)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f59e0b] mb-4">
              ⚠️ {t.disclaimerTitle}
            </h2>
            <div className="space-y-4 text-sm text-[#8892a4] leading-relaxed">
              {isEs ? (
                <>
                  <p>ScoreMotive es una herramienta educativa e informativa diseñada para ayudar a los usuarios a comprender conceptos financieros básicos como la puntuación de crédito FICO y las estrategias de manejo de deudas.</p>
                  <p><strong className="text-[#f0f2f7]">La información proporcionada por esta aplicación NO constituye asesoría financiera, legal ni fiscal profesional.</strong> Todos los cálculos son aproximaciones basadas en modelos simplificados y pueden no reflejar con exactitud tu situación crediticia real.</p>
                  <p>Los resultados del puntaje FICO generados por ScoreMotive son estimaciones educativas únicamente. Tu puntaje real puede variar significativamente dependiendo de múltiples factores evaluados directamente por las agencias de crédito (Experian, Equifax, TransUnion).</p>
                  <p>Antes de tomar decisiones financieras importantes, consulta siempre con un Planificador Financiero Certificado (CFP), un consejero de crédito acreditado u otro profesional financiero calificado.</p>
                </>
              ) : (
                <>
                  <p>ScoreMotive is an educational and informational tool designed to help users understand basic financial concepts such as FICO credit scoring and debt management strategies.</p>
                  <p><strong className="text-[#f0f2f7]">The information provided by this application does NOT constitute professional financial, legal, or tax advice.</strong> All calculations are approximations based on simplified models and may not accurately reflect your real credit situation.</p>
                  <p>FICO score results generated by ScoreMotive are educational estimates only. Your actual credit score may vary significantly depending on multiple factors evaluated directly by credit bureaus (Experian, Equifax, TransUnion).</p>
                  <p>Before making any important financial decisions, always consult with a Certified Financial Planner (CFP), an accredited credit counselor, or another qualified financial professional.</p>
                </>
              )}
            </div>
          </section>

          {/* Affiliate Disclosure */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {t.affiliateTitle}
            </h2>
            <div className="space-y-4 text-sm text-[#8892a4] leading-relaxed">
              {t.affiliateBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {t.privacyTitle}
            </h2>
            <div className="space-y-6">

              <div>
                <h3 className="text-sm font-bold text-[#4f7cff] mb-2 uppercase tracking-wide">
                  {t.infoCollectTitle}
                </h3>
                <div className="space-y-3 text-sm text-[#8892a4] leading-relaxed">
                  {isEs ? (
                    <>
                      <p><strong className="text-[#f0f2f7]">Correos electrónicos:</strong> Cuando te suscribes a nuestro newsletter o lista de espera, recopilamos tu dirección de email. Esta información se almacena de forma segura a través de Beehiiv.</p>
                      <p><strong className="text-[#f0f2f7]">Datos de uso:</strong> Podemos recopilar datos analíticos anónimos sobre cómo los visitantes usan nuestro sitio. Estos datos son agregados y no identifican usuarios individuales.</p>
                      <p><strong className="text-[#f0f2f7]">Datos financieros:</strong> Cualquier dato financiero que ingreses en nuestras herramientas se procesa localmente en tu navegador y NO se almacena en nuestros servidores ni se transmite a terceros.</p>
                    </>
                  ) : (
                    <>
                      <p><strong className="text-[#f0f2f7]">Email addresses:</strong> When you subscribe to our newsletter or waitlist, we collect your email address stored securely through Beehiiv.</p>
                      <p><strong className="text-[#f0f2f7]">Usage data:</strong> We may collect anonymous analytics data about how visitors use our website. This data is aggregated and does not identify individual users.</p>
                      <p><strong className="text-[#f0f2f7]">Financial inputs:</strong> Any financial data you enter into our tools is processed locally in your browser and is NOT stored on our servers or transmitted to third parties.</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#4f7cff] mb-2 uppercase tracking-wide">
                  {t.howUseTitle}
                </h3>
                <div className="space-y-2 text-sm text-[#8892a4] leading-relaxed">
                  <p>{t.howUseBody}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#4f7cff] mb-2 uppercase tracking-wide">
                  {t.cookiesTitle}
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed">
                  {t.cookiesBody}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#4f7cff] mb-2 uppercase tracking-wide">
                  {t.thirdPartyTitle}
                </h3>
                <div className="space-y-2 text-sm text-[#8892a4] leading-relaxed">
                  <p>{t.thirdPartyIntro}</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {thirdPartyServices.map((svc) => (
                      <li key={svc.name}>{svc.name} — {isEs ? svc.descEs : svc.descEn}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#4f7cff] mb-2 uppercase tracking-wide">
                  {t.rightsTitle}
                </h3>
                <div className="space-y-2 text-sm text-[#8892a4] leading-relaxed">
                  <p>{t.rightsBody1}</p>
                  <p>{t.rightsBody2Prefix} <a href="mailto:legal@scoremotive.com" className="text-[#4f7cff] hover:underline">legal@scoremotive.com</a></p>
                </div>
              </div>

            </div>
          </section>

          {/* Terms of Use */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {t.termsTitle}
            </h2>
            <div className="space-y-4 text-sm text-[#8892a4] leading-relaxed">
              {t.termsBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Contact */}
          <section className="text-center py-8">
            <p className="text-sm text-[#8892a4] mb-4">
              {t.contactQuestion}
            </p>
            <a href="mailto:legal@scoremotive.com" className="inline-flex items-center gap-2 bg-[rgba(79,124,255,0.1)] border border-[rgba(79,124,255,0.2)] text-[#7ba7ff] px-6 py-3 rounded-xl text-sm font-medium hover:bg-[rgba(79,124,255,0.15)] transition-all">
              legal@scoremotive.com
            </a>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">{t.footerText}</span>
          <div className="flex gap-6">
            <a href={`/${locale}`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.home}</a>
            <a href={`/${locale}/about`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.about}</a>
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.tools}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
