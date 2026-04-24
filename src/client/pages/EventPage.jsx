import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiClock, FiMapPin, FiCalendar, FiUsers, FiChevronRight, FiMenu, FiX } from "react-icons/fi";

// ─── 16 Built-in Themes ───────────────────────────────────────────
export const THEMES = {
  elegant: {
    hero: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0f2027 100%)",
    accent: "#38bdf8", accentSoft: "rgba(56,189,248,0.12)",
    text: "#f8fafc", subtext: "#94a3b8",
    cardBg: "#1e293b", cardBorder: "#334155",
    sectionBg: "#0f172a", altBg: "#111827",
    timerCard: "#1e293b", timerBorder: "#334155",
    navBg: "rgba(15,23,42,0.96)", navText: "#f8fafc", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Elegant",
  },
  vibrant: {
    hero: "linear-gradient(135deg,#7c3aed 0%,#db2777 60%,#ea580c 100%)",
    accent: "#fbbf24", accentSoft: "rgba(251,191,36,0.15)",
    text: "#fff", subtext: "rgba(255,255,255,0.72)",
    cardBg: "#1f1f2e", cardBorder: "#3f3f5e",
    sectionBg: "#12121e", altBg: "#1a1a2e",
    timerCard: "#2d2b4e", timerBorder: "#4c4884",
    navBg: "rgba(18,18,30,0.96)", navText: "#fff", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Vibrant",
  },
  minimal: {
    hero: "linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)",
    accent: "#0d9488", accentSoft: "rgba(13,148,136,0.1)",
    text: "#0f172a", subtext: "#475569",
    cardBg: "#fff", cardBorder: "#e2e8f0",
    sectionBg: "#f8fafc", altBg: "#fff",
    timerCard: "#f1f5f9", timerBorder: "#e2e8f0",
    navBg: "rgba(248,250,252,0.97)", navText: "#0f172a", navBorder: "#e2e8f0",
    font: "'Inter',sans-serif",
    label: "Minimal",
  },
  corporate: {
    hero: "linear-gradient(135deg,#1e3a5f 0%,#2d5a8e 100%)",
    accent: "#60a5fa", accentSoft: "rgba(96,165,250,0.12)",
    text: "#e0f0ff", subtext: "#93b8d8",
    cardBg: "#1a3050", cardBorder: "#2d5080",
    sectionBg: "#0f2040", altBg: "#162840",
    timerCard: "#1a3050", timerBorder: "#2d5080",
    navBg: "rgba(15,32,64,0.97)", navText: "#e0f0ff", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Corporate",
  },
  midnight: {
    hero: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 50%,#0d0d0d 100%)",
    accent: "#f59e0b", accentSoft: "rgba(245,158,11,0.12)",
    text: "#fafaf9", subtext: "#a8a29e",
    cardBg: "#1c1917", cardBorder: "#2c2825",
    sectionBg: "#0a0a0a", altBg: "#111110",
    timerCard: "#1c1917", timerBorder: "#2c2825",
    navBg: "rgba(10,10,10,0.97)", navText: "#fafaf9", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Midnight",
  },
  emerald: {
    hero: "linear-gradient(135deg,#022c22 0%,#064e3b 60%,#065f46 100%)",
    accent: "#34d399", accentSoft: "rgba(52,211,153,0.12)",
    text: "#ecfdf5", subtext: "#6ee7b7",
    cardBg: "#064e3b", cardBorder: "#065f46",
    sectionBg: "#022c22", altBg: "#031f17",
    timerCard: "#064e3b", timerBorder: "#065f46",
    navBg: "rgba(2,44,34,0.97)", navText: "#ecfdf5", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Emerald",
  },
  sunset: {
    hero: "linear-gradient(135deg,#1c0a00 0%,#7c2d12 40%,#9a3412 100%)",
    accent: "#fb923c", accentSoft: "rgba(251,146,60,0.15)",
    text: "#fff7ed", subtext: "#fed7aa",
    cardBg: "#1c1006", cardBorder: "#3d1c08",
    sectionBg: "#0f0700", altBg: "#180c04",
    timerCard: "#2a1209", timerBorder: "#4c2012",
    navBg: "rgba(15,7,0,0.97)", navText: "#fff7ed", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Sunset",
  },
  ocean: {
    hero: "linear-gradient(135deg,#0c1445 0%,#0a2472 50%,#1a1a7e 100%)",
    accent: "#22d3ee", accentSoft: "rgba(34,211,238,0.12)",
    text: "#e0f2fe", subtext: "#7dd3fc",
    cardBg: "#0c1e4a", cardBorder: "#1a3070",
    sectionBg: "#070e2a", altBg: "#0a1430",
    timerCard: "#0c1e4a", timerBorder: "#1a3070",
    navBg: "rgba(7,14,42,0.97)", navText: "#e0f2fe", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Ocean",
  },
  purpleRain: {
    hero: "linear-gradient(135deg,#2e1065 0%,#4c1d95 50%,#5b21b6 100%)",
    accent: "#c084fc", accentSoft: "rgba(192,132,252,0.12)",
    text: "#faf5ff", subtext: "#d8b4fe",
    cardBg: "#2e1065", cardBorder: "#4c1d95",
    sectionBg: "#1e0a40", altBg: "#250d50",
    timerCard: "#2e1065", timerBorder: "#4c1d95",
    navBg: "rgba(30,10,64,0.97)", navText: "#faf5ff", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Purple Rain",
  },
  carbon: {
    hero: "linear-gradient(135deg,#171717 0%,#262626 50%,#1f1f1f 100%)",
    accent: "#f43f5e", accentSoft: "rgba(244,63,94,0.12)",
    text: "#f5f5f5", subtext: "#a3a3a3",
    cardBg: "#1f1f1f", cardBorder: "#333",
    sectionBg: "#0a0a0a", altBg: "#121212",
    timerCard: "#1f1f1f", timerBorder: "#333",
    navBg: "rgba(10,10,10,0.97)", navText: "#f5f5f5", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Carbon",
  },
  roseGold: {
    hero: "linear-gradient(135deg,#1c0a14 0%,#3b0d2a 50%,#4a1040 100%)",
    accent: "#fb7185", accentSoft: "rgba(251,113,133,0.12)",
    text: "#fff1f2", subtext: "#fecdd3",
    cardBg: "#1e0d18", cardBorder: "#3d1a30",
    sectionBg: "#10060c", altBg: "#180a12",
    timerCard: "#1e0d18", timerBorder: "#3d1a30",
    navBg: "rgba(16,6,12,0.97)", navText: "#fff1f2", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Rose Gold",
  },
  arctic: {
    hero: "linear-gradient(135deg,#e0f2fe 0%,#bae6fd 50%,#e0f7fa 100%)",
    accent: "#0284c7", accentSoft: "rgba(2,132,199,0.1)",
    text: "#0c4a6e", subtext: "#0369a1",
    cardBg: "#fff", cardBorder: "#bae6fd",
    sectionBg: "#f0f9ff", altBg: "#e0f2fe",
    timerCard: "#f0f9ff", timerBorder: "#bae6fd",
    navBg: "rgba(240,249,255,0.97)", navText: "#0c4a6e", navBorder: "#bae6fd",
    font: "'Inter',sans-serif",
    label: "Arctic",
  },
  forest: {
    hero: "linear-gradient(135deg,#0a1f0a 0%,#14320e 50%,#1a4011 100%)",
    accent: "#86efac", accentSoft: "rgba(134,239,172,0.12)",
    text: "#f0fdf4", subtext: "#bbf7d0",
    cardBg: "#14320e", cardBorder: "#1e4a15",
    sectionBg: "#071405", altBg: "#0a1c08",
    timerCard: "#14320e", timerBorder: "#1e4a15",
    navBg: "rgba(7,20,5,0.97)", navText: "#f0fdf4", navBorder: "rgba(255,255,255,0.06)",
    font: "'Inter',sans-serif",
    label: "Forest",
  },
  retro: {
    hero: "linear-gradient(135deg,#2d1b00 0%,#4a2e00 50%,#3d2500 100%)",
    accent: "#fbbf24", accentSoft: "rgba(251,191,36,0.15)",
    text: "#fef3c7", subtext: "#fde68a",
    cardBg: "#2a1a00", cardBorder: "#4a3000",
    sectionBg: "#1a1000", altBg: "#221600",
    timerCard: "#2a1a00", timerBorder: "#4a3000",
    navBg: "rgba(26,16,0,0.97)", navText: "#fef3c7", navBorder: "rgba(255,255,255,0.06)",
    font: "'Courier New',monospace",
    label: "Retro",
  },
  neon: {
    hero: "linear-gradient(135deg,#000 0%,#0a0a0a 100%)",
    accent: "#39ff14", accentSoft: "rgba(57,255,20,0.1)",
    text: "#f0fff0", subtext: "#a0f0a0",
    cardBg: "#0a0a0a", cardBorder: "#1a3a1a",
    sectionBg: "#000", altBg: "#050505",
    timerCard: "#0a0a0a", timerBorder: "#1a3a1a",
    navBg: "rgba(0,0,0,0.98)", navText: "#f0fff0", navBorder: "rgba(57,255,20,0.15)",
    font: "'Inter',sans-serif",
    label: "Neon",
  },
  cream: {
    hero: "linear-gradient(135deg,#fefce8 0%,#fef9c3 50%,#fef3c7 100%)",
    accent: "#92400e", accentSoft: "rgba(146,64,14,0.08)",
    text: "#292524", subtext: "#78716c",
    cardBg: "#fffbeb", cardBorder: "#fde68a",
    sectionBg: "#fefce8", altBg: "#fffbeb",
    timerCard: "#fef9c3", timerBorder: "#fde68a",
    navBg: "rgba(254,252,232,0.97)", navText: "#292524", navBorder: "#fde68a",
    font: "'Georgia',serif",
    label: "Cream",
  },
  custom: {
    // Fallback values for custom — overridden by injected CSS vars
    hero: "linear-gradient(135deg,#050510 0%,#0a0a1a 100%)",
    accent: "#a855f7", accentSoft: "rgba(168,85,247,0.12)",
    text: "#f8fafc", subtext: "#94a3b8",
    cardBg: "#0d0d1a", cardBorder: "#1a1a30",
    sectionBg: "#050510", altBg: "#080818",
    timerCard: "#0d0d1a", timerBorder: "#1a1a30",
    navBg: "rgba(5,5,16,0.98)", navText: "#f8fafc", navBorder: "rgba(168,85,247,0.15)",
    font: "'Inter',sans-serif",
    label: "Custom CSS",
  },
};

// ─── Countdown ────────────────────────────────────────────────────
function useCountdown(target) {
  const calc = () => {
    const d = new Date(target) - new Date();
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    return { days: Math.floor(d / 86400000), hours: Math.floor((d % 86400000) / 3600000), minutes: Math.floor((d % 3600000) / 60000), seconds: Math.floor((d % 60000) / 1000), over: false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, [target]);
  return time;
}

// ─── Navbar ───────────────────────────────────────────────────────
function EventNavbar({ event, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleRegister = () => {
    if (event.registrationLink) {
      window.open(event.registrationLink, "_blank", "noopener,noreferrer");
    }
  };

  const sections = [
    event.about       && { id: "about",     label: "About"    },
    event.timeline?.length  && { id: "timeline",  label: "Timeline" },
    event.speakers?.length  && { id: "speakers",  label: "Speakers" },
    event.targetAudience    && { id: "audience",  label: "Audience" },
    event.sponsorTiers?.length && { id: "sponsors", label: "Sponsors" },
  ].filter(Boolean);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <nav className="ep-navbar" style={{
      position: "sticky", top: 0, zIndex: 100,
      background: t.navBg,
      borderBottom: `1px solid ${t.navBorder}`,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      transition: "box-shadow 0.2s",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
      fontFamily: t.font,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        {/* Logo + Title */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <img src="/logos/1.webp" alt="FS" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: t.navText, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {event.title}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="ep-nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: t.subtext, transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.background = t.accentSoft; }}
              onMouseLeave={e => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.background = "none"; }}
            >{s.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Register CTA */}
          {event.registrationLink && (
            <button onClick={handleRegister} className="ep-nav-register" style={{ background: t.accent, color: t.sectionBg || "#0f172a", border: "none", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Register →
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(v => !v)} className="ep-nav-hamburger" style={{ background: "none", border: "none", cursor: "pointer", color: t.navText, padding: 4 }}>
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{ borderTop: `1px solid ${t.navBorder}`, background: t.navBg, padding: "8px 24px 16px" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 14, fontWeight: 500, color: t.navText, borderBottom: `1px solid ${t.navBorder}` }}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Nav responsive CSS */}
      <style>{`
        @media (min-width: 640px) { .ep-nav-hamburger { display: none !important; } }
        @media (max-width: 639px) { .ep-nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
}

// ─── Main page ────────────────────────────────────────────────────
export default function EventPage() {
  const { slug } = useParams();
  const [event,   setEvent]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const styleRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/v1/events/slug/${slug}`)
      .then(r => setEvent(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Inject theme vars + custom CSS
  useEffect(() => {
    if (!event) return;
    const t = THEMES[event.design] ?? THEMES.elegant;

    const vars = `
      #event-page {
        --ep-accent:      ${t.accent};
        --ep-accent-soft: ${t.accentSoft};
        --ep-text:        ${t.text};
        --ep-subtext:     ${t.subtext};
        --ep-card-bg:     ${t.cardBg};
        --ep-card-border: ${t.cardBorder};
        --ep-section-bg:  ${t.sectionBg};
        --ep-alt-bg:      ${t.altBg};
        --ep-hero-bg:     ${t.hero};
        --ep-font:        ${t.font};
        --ep-nav-bg:      ${t.navBg};
        --ep-nav-text:    ${t.navText};
        --ep-timer-card:  ${t.timerCard};
        --ep-timer-border:${t.timerBorder};
        --ep-radius:      16px;
        --ep-section-pad: 72px 24px;
        --ep-heading-weight: 800;
      }
    `;

    const el = document.createElement("style");
    el.textContent = vars + (event.customCSS || "");
    document.head.appendChild(el);
    styleRef.current = el;
    return () => el.remove();
  }, [event]);

  const countdown = useCountdown(event?.date);
  const t = event ? (THEMES[event.design] ?? THEMES.elegant) : THEMES.elegant;

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#94a3b8", fontSize: 18 }}>Loading event...</div>
    </div>
  );

  if (error || !event) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ color: "#f87171", fontSize: 22, fontWeight: 700 }}>Event not found</div>
      <Link to="/" style={{ color: "#38bdf8", fontSize: 14 }}>← Back to home</Link>
    </div>
  );

  const eventDate  = new Date(event.date);
  const sortedTiers = [...(event.sponsorTiers || [])].sort((a, b) => a.order - b.order);

  return (
    <div id="event-page" className="ep-root" style={{ background: t.sectionBg, color: t.text, fontFamily: t.font, minHeight: "100vh" }}>

      {/* ── Navbar ── */}
      <EventNavbar event={event} t={t} />

      {/* ══════ HERO ══════ */}
      <section className="ep-hero" style={{ background: t.hero, padding: "80px 24px 100px", position: "relative", overflow: "hidden" }} id="hero">
        <div className="ep-hero-blob ep-hero-blob-1" style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: `${t.accent}10`, pointerEvents: "none" }} />
        <div className="ep-hero-blob ep-hero-blob-2" style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: `${t.accent}08`, pointerEvents: "none" }} />

        <div className="ep-container" style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="ep-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontSize: 13, color: t.subtext }}>
            <Link to="/" style={{ color: t.subtext, textDecoration: "none" }}>Home</Link>
            <FiChevronRight size={13} />
            <span style={{ color: t.accent }}>Event</span>
          </div>

          {event.coverImage && (
            <img className="ep-cover" src={event.coverImage} alt={event.title} style={{ width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 16, marginBottom: 32, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }} />
          )}

          <h1 className="ep-hero-title" style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px", color: t.text }}>
            {event.title}
          </h1>
          <p className="ep-hero-desc" style={{ fontSize: 18, color: t.subtext, lineHeight: 1.7, maxWidth: 680, marginBottom: 32 }}>
            {event.description}
          </p>

          <div className="ep-meta" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
            <MetaChip icon={<FiCalendar />} text={eventDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} t={t} />
            <MetaChip icon={<FiClock />} text={eventDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} t={t} />
            {event.location && <MetaChip icon={<FiMapPin />} text={event.location} t={t} />}
          </div>

          {!countdown.over ? (
            <div className="ep-countdown">
              <p className="ep-countdown-label" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: t.subtext, marginBottom: 14 }}>Event starts in</p>
              <div className="ep-countdown-boxes" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]].map(([k, l]) => (
                  <CountBox key={k} value={countdown[k]} label={l} t={t} />
                ))}
              </div>
            </div>
          ) : (
            <div className="ep-concluded" style={{ display: "inline-block", background: t.accentSoft, border: `1px solid ${t.accent}40`, borderRadius: 8, padding: "8px 20px", color: t.accent, fontWeight: 600 }}>
              This event has concluded
            </div>
          )}

          {!countdown.over && event.registrationLink && (
            <div className="ep-cta" style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="ep-register-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.accent, color: ["minimal","arctic","cream"].includes(event.design) ? "#fff" : "#0f172a", padding: "14px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: `0 4px 20px ${t.accent}50`, transition: "transform 0.15s, box-shadow 0.15s", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${t.accent}60`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 20px ${t.accent}50`; }}
              >
                Register for This Event →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      {event.about && (
        <section id="about" className="ep-section ep-section-about" style={{ background: t.altBg, padding: "72px 24px" }}>
          <div className="ep-container" style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionLabel text="About the Event" t={t} />
            <p className="ep-about-text" style={{ fontSize: 17, color: t.subtext, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{event.about}</p>
          </div>
        </section>
      )}

      {/* ══════ TIMELINE ══════ */}
      {event.timeline?.length > 0 && (
        <section id="timeline" className="ep-section ep-section-timeline" style={{ background: t.sectionBg, padding: "72px 24px" }}>
          <div className="ep-container" style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionLabel text="Event Timeline" t={t} />
            <div className="ep-timeline" style={{ position: "relative", paddingLeft: 36 }}>
              <div className="ep-timeline-line" style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: `${t.accent}30` }} />
              {event.timeline.map((item, i) => (
                <div key={i} className="ep-timeline-item" style={{ display: "flex", gap: 20, position: "relative", paddingBottom: 32 }}>
                  <div className="ep-timeline-dot" style={{ position: "absolute", left: -36, top: 4, width: 22, height: 22, borderRadius: "50%", background: t.sectionBg, border: `2px solid ${t.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent }} />
                  </div>
                  <div>
                    <div className="ep-timeline-time" style={{ fontSize: 12, fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.time}</div>
                    <div className="ep-timeline-title" style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 }}>{item.title}</div>
                    {item.description && <div className="ep-timeline-desc" style={{ fontSize: 14, color: t.subtext, lineHeight: 1.65 }}>{item.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ SPEAKERS ══════ */}
      {event.speakers?.length > 0 && (
        <section id="speakers" className="ep-section ep-section-speakers" style={{ background: t.altBg, padding: "72px 24px" }}>
          <div className="ep-container" style={{ maxWidth: 960, margin: "0 auto" }}>
            <SectionLabel text="Speakers" t={t} />
            <div className="ep-speakers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
              {event.speakers.map((sp, i) => (
                <div key={i} className="ep-speaker-card" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, transition: "transform 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = t.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = t.cardBorder; }}
                >
                  {sp.photo ? (
                    <img src={sp.photo} alt={sp.name} className="ep-speaker-photo" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `2px solid ${t.accent}` }} />
                  ) : (
                    <div className="ep-speaker-avatar" style={{ width: 80, height: 80, borderRadius: "50%", background: t.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: t.accent, fontWeight: 700, border: `2px solid ${t.accent}30` }}>
                      {sp.name[0]}
                    </div>
                  )}
                  <div>
                    <div className="ep-speaker-name" style={{ fontWeight: 700, fontSize: 16, color: t.text }}>{sp.name}</div>
                    {sp.title && <div className="ep-speaker-title" style={{ fontSize: 13, color: t.accent, marginTop: 2 }}>{sp.title}</div>}
                    {sp.bio && <div className="ep-speaker-bio" style={{ fontSize: 13, color: t.subtext, marginTop: 8, lineHeight: 1.6 }}>{sp.bio}</div>}
                  </div>
                  {sp.speakingTime && (
                    <div className="ep-speaker-time" style={{ background: t.accentSoft, border: `1px solid ${t.accent}30`, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: t.accent, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                      <FiClock size={11} />{sp.speakingTime}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ AUDIENCE ══════ */}
      {event.targetAudience && (
        <section id="audience" className="ep-section ep-section-audience" style={{ background: t.sectionBg, padding: "72px 24px" }}>
          <div className="ep-container" style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionLabel text="Our Target Audience" t={t} />
            <div className="ep-audience-card" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: "28px 32px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: t.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiUsers size={20} color={t.accent} />
              </div>
              <p className="ep-audience-text" style={{ fontSize: 16, color: t.subtext, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>{event.targetAudience}</p>
            </div>
          </div>
        </section>
      )}

      {/* ══════ SPONSORS ══════ */}
      {sortedTiers.length > 0 && (
        <section id="sponsors" className="ep-section ep-section-sponsors" style={{ background: t.altBg, padding: "72px 24px" }}>
          <div className="ep-container" style={{ maxWidth: 960, margin: "0 auto" }}>
            <SectionLabel text="Sponsors & Partners" t={t} />
            <div className="ep-tiers" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {sortedTiers.map((tier, ti) => tier.sponsors?.length > 0 && (
                <div key={ti} className={`ep-tier ep-tier-${ti}`}>
                  <div className="ep-tier-label" style={{ textAlign: "center", marginBottom: 24 }}>
                    <span style={{ background: t.accentSoft, border: `1px solid ${t.accent}30`, borderRadius: 20, padding: "5px 18px", fontSize: 13, fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {tier.tierName}
                    </span>
                  </div>
                  <div className="ep-sponsors-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
                    {tier.sponsors.map((sp, si) => (
                      <a key={si} href={sp.website || "#"} target="_blank" rel="noopener noreferrer" className="ep-sponsor-card" style={{ textDecoration: "none" }}>
                        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "18px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, minWidth: 140, transition: "transform 0.15s, border-color 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = t.accent; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = t.cardBorder; }}
                        >
                          {sp.logo ? (
                            <img src={sp.logo} alt={sp.name} style={{ height: 48, maxWidth: 120, objectFit: "contain" }} />
                          ) : (
                            <div style={{ width: 48, height: 48, borderRadius: 10, background: t.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: t.accent, fontWeight: 700 }}>
                              {sp.name[0]}
                            </div>
                          )}
                          <span className="ep-sponsor-name" style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{sp.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ FOOTER ══════ */}
      <footer className="ep-footer" style={{ background: "#0f172a", borderTop: `1px solid ${t.cardBorder}`, padding: "48px 24px 32px" }}>
        <div className="ep-container" style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="ep-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40 }}>
            <div className="ep-footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <img src="/logos/1.webp" alt="Finance Scouts" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "contain" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#f8fafc" }}>Finance Scouts</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>College of Business Administration</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>Empowering students with financial knowledge and practical skills.</p>
            </div>
            <div className="ep-footer-links">
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f8fafc", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>Quick Links</div>
              {[["Home","/"],["About Us","/about"],["Workshops","/workshops"],["Join Us","/join"]].map(([label,path]) => (
                <Link key={path} to={path} style={{ display: "block", color: "#64748b", textDecoration: "none", fontSize: 14, marginBottom: 10 }}
                  onMouseEnter={e => e.currentTarget.style.color = t.accent}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                >{label}</Link>
              ))}
            </div>
            <div className="ep-footer-contact">
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f8fafc", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>Contact Us</div>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <FiMapPin size={13} />College of Business Administration, IAU
              </div>
              <a href="mailto:CBA.FST@iau.edu.sa" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <FiCalendar size={13} />CBA.FST@iau.edu.sa
              </a>
            </div>
          </div>
          <div className="ep-footer-bottom" style={{ borderTop: "1px solid #1e293b", paddingTop: 24, textAlign: "center", fontSize: 13, color: "#475569" }}>
            © {new Date().getFullYear()} Finance Scouts — All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────
function CountBox({ value, label, t }) {
  return (
    <div className="ep-countdown-box" style={{ background: t.timerCard, border: `1px solid ${t.timerBorder}`, borderRadius: 16, padding: "18px 22px", textAlign: "center", minWidth: 80 }}>
      <div className="ep-countdown-value" style={{ fontSize: 38, fontWeight: 800, color: t.accent, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="ep-countdown-unit" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: t.subtext, marginTop: 6 }}>{label}</div>
    </div>
  );
}

function SectionLabel({ text, t }) {
  return (
    <div className="ep-section-header" style={{ marginBottom: 36 }}>
      <h2 className="ep-section-title" style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: "var(--ep-heading-weight,800)", color: t.text, margin: "0 0 10px" }}>{text}</h2>
      <div className="ep-section-line" style={{ width: 48, height: 4, borderRadius: 2, background: t.accent }} />
    </div>
  );
}

function MetaChip({ icon, text, t }) {
  return (
    <div className="ep-meta-chip" style={{ display: "flex", alignItems: "center", gap: 8, background: t.accentSoft, border: `1px solid ${t.accent}30`, borderRadius: 20, padding: "6px 14px", fontSize: 14, color: t.text }}>
      <span style={{ color: t.accent }}>{icon}</span>{text}
    </div>
  );
}
