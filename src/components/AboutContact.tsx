"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * About & Contact
 * - Split: left narrative, right booking/casting form
 * - Form fields with crimson glow, minimalist premium UI
 *
 * MEDIA: none required.
 */
export default function AboutContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const isValid = useMemo(() => {
    const emailOk = /.+@.+\..+/.test(form.email.trim());
    return form.name.trim().length >= 2 && emailOk && form.project.trim().length >= 2;
  }, [form.email, form.name, form.project]);

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 id="about-heading" className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              About & Discipline
            </h2>
            <div className="mt-3 max-w-3xl space-y-3 text-[#d4d4d8]/70">
              <p>
                <strong className="font-semibold text-[#d4d4d8]">Puskar Bhatta</strong>
                is a prominent Nepali actor known for intense antagonist roles,
                sharp dialogue delivery, and raw action sequences.
              </p>
              <p>
                With a filmography spanning over 80 Nepali feature films and
                regional productions including Bhojpuri cinema, he continues to
                captivate audiences. Though he now resides in Canada, he
                frequently returns to Nepal to contribute to the growth and
                legacy of the Nepali film industry.
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/15 px-4 py-2 shadow-[0_0_30px_rgba(220,38,38,0.12)]">
              <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_14px_rgba(220,38,38,0.65)]" />
              <span className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]">
                Available for casting
              </span>
            </div>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left story */}
          <article className="relative overflow-hidden rounded-[22px] border border-[rgba(220,38,38,0.18)] bg-black/15 p-7 sm:p-8">
            <div className="absolute inset-0 opacity-70 pointer-events-none [background:radial-gradient(600px_circle_at_15%_0%,rgba(220,38,38,0.25),transparent_55%),radial-gradient(700px_circle_at_90%_65%,rgba(220,38,38,0.12),transparent_60%)]" />
            <div className="relative">
              <p className="text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px]">
                THE REAL ARC
              </p>
<h4 className="mt-4 text-[26px] leading-[1.05] font-black uppercase tracking-wider text-[#d4d4d8]">
                From discipline to dominance.
              </h4>

              <div className="mt-5 space-y-4 text-[#d4d4d8]/80">
                <p className="leading-relaxed text-[14px]">
                  Precision isn&apos;t an accessory&mdash;it&apos;s a weapon. Training his
                  presence, timing, and silence until the screen can&apos;t ignore him.
                </p>
                <p className="leading-relaxed text-[14px]">
                  The villain on-screen thrives on contrast: calm outside,
                  combustion inside.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {["Acting craft", "Physical discipline", "Voice control", "Character focus"].map((t) => (
                    <div
                      key={t}
                      className="rounded-[16px] border border-[rgba(220,38,38,0.16)] bg-black/20 p-4 shadow-[0_0_30px_rgba(220,38,38,0.10)]"
                    >
                      <p className="text-[#d4d4d8] font-black uppercase tracking-widest text-[12px]">
                        {t}
                      </p>
                      <p className="mt-2 text-[13px] text-[#d4d4d8]/70 leading-relaxed">
                        Built for the big screen.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 inline-flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[rgba(220,38,38,0.28)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.22)]" />
                <div>
                  <p className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]/80">
                    Cinematic signature
                  </p>
                  <p className="text-[14px] text-[#d4d4d8]/70 leading-relaxed">
                    Crimson energy + controlled intensity.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Right form */}
          <aside id="contact" className="relative overflow-hidden rounded-[22px] border border-[rgba(220,38,38,0.18)] bg-black/10 p-7 sm:p-8">
            <div className="absolute inset-0 opacity-80 pointer-events-none [background:radial-gradient(700px_circle_at_0%_0%,rgba(220,38,38,0.22),transparent_55%),radial-gradient(700px_circle_at_100%_70%,rgba(220,38,38,0.12),transparent_60%)]" />
            <div className="relative">
              <p className="text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px]">
                BOOKING / CASTING
              </p>
              <h4 className="mt-4 text-[22px] leading-[1.1] font-black uppercase tracking-wider text-[#d4d4d8]">
                Send a casting request
              </h4>

              <form
                className="mt-6 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!isValid || status === "sending") return;
                  setStatus("sending");
                  setErrorMsg("");
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(form),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setStatus("sent");
                      setForm({ name: "", email: "", project: "", message: "" });
                      setTimeout(() => setStatus("idle"), 3000);
                    } else {
                      setErrorMsg(data.error || "Something went wrong.");
                      setStatus("idle");
                    }
                  } catch {
                    setErrorMsg("Network error. Please try again.");
                    setStatus("idle");
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]/80">
                      Name
                    </span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="mt-2 w-full rounded-[14px] border border-[rgba(220,38,38,0.18)] bg-black/20 px-4 py-3 text-[#d4d4d8] outline-none shadow-[0_0_0_rgba(220,38,38,0.0)] focus:shadow-[0_0_30px_rgba(220,38,38,0.25)] focus:border-[rgba(220,38,38,0.42)]"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]/80">
                      Email
                    </span>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="mt-2 w-full rounded-[14px] border border-[rgba(220,38,38,0.18)] bg-black/20 px-4 py-3 text-[#d4d4d8] outline-none shadow-[0_0_0_rgba(220,38,38,0.0)] focus:shadow-[0_0_30px_rgba(220,38,38,0.25)] focus:border-[rgba(220,38,38,0.42)]"
                      placeholder="name@email.com"
                      type="email"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]/80">
                    Project / Role
                  </span>
                  <input
                    value={form.project}
                    onChange={(e) => setForm((p) => ({ ...p, project: e.target.value }))}
                    className="mt-2 w-full rounded-[14px] border border-[rgba(220,38,38,0.18)] bg-black/20 px-4 py-3 text-[#d4d4d8] outline-none shadow-[0_0_0_rgba(220,38,38,0.0)] focus:shadow-[0_0_30px_rgba(220,38,38,0.25)] focus:border-[rgba(220,38,38,0.42)]"
                    placeholder="Film / Series / Brand"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-[12px] uppercase tracking-widest font-black text-[#d4d4d8]/80">
                    Message (optional)
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="mt-2 min-h-[120px] w-full resize-none rounded-[14px] border border-[rgba(220,38,38,0.18)] bg-black/20 px-4 py-3 text-[#d4d4d8] outline-none shadow-[0_0_0_rgba(220,38,38,0.0)] focus:shadow-[0_0_30px_rgba(220,38,38,0.25)] focus:border-[rgba(220,38,38,0.42)]"
                    placeholder="Tell us about the casting, dates, and vibe..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={!isValid || status === "sending"}
                  className="w-full rounded-full bg-[#dc2626] px-6 py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Request Sent" : "Request Booking"}
                </button>

                {errorMsg && (
                  <p className="text-[#dc2626] text-[12px] leading-relaxed">
                    {errorMsg}
                  </p>
                )}
                {status === "sent" && (
                  <p className="text-[#22c55e] text-[12px] leading-relaxed">
                    ✓ Request sent! We&apos;ll get back to you soon.
                  </p>
                )}
              </form>

              {/* Direct Contact Info */}
              <div className="mt-8 border-t border-[rgba(220,38,38,0.15)] pt-8">
                <p className="text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px]">
                  DIRECT CONTACT
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:bhattapuskar@gmail.com"
                    className="flex items-center gap-3 rounded-[14px] border border-[rgba(220,38,38,0.16)] bg-black/20 px-4 py-3 hover:bg-black/30 hover:border-[rgba(220,38,38,0.32)] transition-all duration-300 group"
                  >
                    <span className="text-[18px]">✉️</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">Email</p>
                      <p className="text-[13px] font-bold text-[#d4d4d8] group-hover:text-[#dc2626] transition-colors">bhattapuskar@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/15195218816"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-[14px] border border-[rgba(220,38,38,0.16)] bg-black/20 px-4 py-3 hover:bg-black/30 hover:border-[rgba(220,38,38,0.32)] transition-all duration-300 group"
                  >
                    <span className="text-[18px]">💬</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">WhatsApp</p>
                      <p className="text-[13px] font-bold text-[#d4d4d8] group-hover:text-[#dc2626] transition-colors">+1 (519) 521-8816</p>
                    </div>
                  </a>

                  <a
                    href="tel:+9779704072077"
                    className="flex items-center gap-3 rounded-[14px] border border-[rgba(220,38,38,0.16)] bg-black/20 px-4 py-3 hover:bg-black/30 hover:border-[rgba(220,38,38,0.32)] transition-all duration-300 group"
                  >
                    <span className="text-[18px]">📞</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">Mobile</p>
                      <p className="text-[13px] font-bold text-[#d4d4d8] group-hover:text-[#dc2626] transition-colors">9704072077</p>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/puskar.bhatta.148469"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-[14px] border border-[rgba(220,38,38,0.16)] bg-black/20 px-4 py-3 hover:bg-black/30 hover:border-[rgba(220,38,38,0.32)] transition-all duration-300 group"
                  >
                    <span className="text-[18px]">📘</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">Facebook</p>
                      <p className="text-[13px] font-bold text-[#d4d4d8] group-hover:text-[#dc2626] transition-colors truncate">Puskar Bhatta</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* View More */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery/filmography"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-6 py-3 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300"
          >
            View More — Explore the Filmography →
          </Link>
        </div>
      </div>
    </section>
  );
}
