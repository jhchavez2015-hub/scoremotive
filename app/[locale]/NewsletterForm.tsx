"use client";
import { useState } from "react";

export default function NewsletterForm({
  lang,
  placeholder,
  joinBtn,
  errorMsg,
  successMsg,
}: {
  lang: "en" | "es";
  placeholder: string;
  joinBtn: string;
  errorMsg: string;
  successMsg: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto mb-6 bg-[rgba(6,214,160,0.08)] border border-[rgba(6,214,160,0.2)] rounded-xl px-6 py-4 text-sm text-[#06d6a0]">
        {successMsg}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6 px-4 sm:px-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.12] rounded-xl px-4 py-3.5 text-sm text-[#f0f2f7] placeholder-[#8892a4] outline-none focus:border-[#4f7cff] focus:bg-[rgba(79,124,255,0.05)] transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white font-medium text-sm px-6 py-3.5 rounded-xl whitespace-nowrap hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0 transition-all disabled:opacity-60 w-full sm:w-auto"
        >
          {status === "loading" ? "..." : joinBtn}
        </button>
      </form>
      {status === "error" && <p className="text-xs text-[#f43f5e] mb-4">{errorMsg}</p>}
    </>
  );
}
