import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiEye } from "react-icons/fi";

// ─── helpers ──────────────────────────────────────────────────────
const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyTimeline = () => ({ time: "", title: "", description: "" });
const emptySpeaker  = () => ({ name: "", title: "", bio: "", photo: "", speakingTime: "" });
const emptyTier     = () => ({ tierName: "", order: 0, sponsors: [emptySponsor()] });
const emptySponsor  = () => ({ name: "", logo: "", website: "" });

const DESIGNS = [
  { key: "elegant",    label: "Elegant",     preview: "linear-gradient(135deg,#0f172a,#1e293b)",         accent: "#38bdf8" },
  { key: "vibrant",    label: "Vibrant",     preview: "linear-gradient(135deg,#7c3aed,#db2777,#ea580c)", accent: "#fbbf24" },
  { key: "minimal",    label: "Minimal",     preview: "linear-gradient(135deg,#f8fafc,#e2e8f0)",         accent: "#0d9488" },
  { key: "corporate",  label: "Corporate",   preview: "linear-gradient(135deg,#1e3a5f,#2d5a8e)",         accent: "#60a5fa" },
  { key: "midnight",   label: "Midnight",    preview: "linear-gradient(135deg,#0a0a0a,#1a1a1a)",         accent: "#f59e0b" },
  { key: "emerald",    label: "Emerald",     preview: "linear-gradient(135deg,#022c22,#064e3b)",         accent: "#34d399" },
  { key: "sunset",     label: "Sunset",      preview: "linear-gradient(135deg,#1c0a00,#7c2d12,#9a3412)", accent: "#fb923c" },
  { key: "ocean",      label: "Ocean",       preview: "linear-gradient(135deg,#0c1445,#0a2472,#1a1a7e)", accent: "#22d3ee" },
  { key: "purpleRain", label: "Purple Rain", preview: "linear-gradient(135deg,#2e1065,#4c1d95,#5b21b6)", accent: "#c084fc" },
  { key: "carbon",     label: "Carbon",      preview: "linear-gradient(135deg,#171717,#262626)",         accent: "#f43f5e" },
  { key: "roseGold",   label: "Rose Gold",   preview: "linear-gradient(135deg,#1c0a14,#3b0d2a,#4a1040)", accent: "#fb7185" },
  { key: "arctic",     label: "Arctic",      preview: "linear-gradient(135deg,#e0f2fe,#bae6fd)",         accent: "#0284c7" },
  { key: "forest",     label: "Forest",      preview: "linear-gradient(135deg,#0a1f0a,#14320e)",         accent: "#86efac" },
  { key: "retro",      label: "Retro",       preview: "linear-gradient(135deg,#2d1b00,#4a2e00)",         accent: "#fbbf24" },
  { key: "neon",       label: "Neon",        preview: "linear-gradient(135deg,#000,#0a0a0a)",            accent: "#39ff14" },
  { key: "cream",      label: "Cream",       preview: "linear-gradient(135deg,#fefce8,#fef9c3)",         accent: "#92400e" },
  { key: "custom",     label: "Custom CSS",  preview: "linear-gradient(135deg,#1a1a2a,#2a2a3e)",         accent: "#a855f7" },
];

// ─── Section wrapper ───────────────────────────────────────────────
function Section({ title, children, open: openProp, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#0f172a" }}
      >
        {title}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && <div style={{ padding: "20px 20px 24px", background: "#fff" }}>{children}</div>}
    </div>
  );
}

// ─── Input helpers ─────────────────────────────────────────────────
const Field = ({ label, required, children, hint }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
      {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
    </label>
    {children}
    {hint && <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{hint}</p>}
  </div>
);

const inp = {
  width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0",
  borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a",
  background: "#fff", boxSizing: "border-box",
};

const Input = (props) => <input style={inp} {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea style={{ ...inp, resize: "vertical", minHeight: rows * 28 }} {...props} />;

// ─── Main editor ───────────────────────────────────────────────────
export default function EventEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    about: "",
    date: "",
    endDate: "",
    location: "",
    registrationLink: "",
    targetAudience: "",
    coverImage: "",
    design: "elegant",
    customCSS: "",
    isPublished: false,
    timeline: [],
    speakers: [],
    sponsorTiers: [],
  });

  // Load existing event
  useEffect(() => {
    if (!isEdit) return;
    axios.get(`/api/v1/events/${id}`, { withCredentials: true })
      .then(r => {
        const d = r.data;
        setForm({
          ...d,
          date: d.date ? new Date(d.date).toISOString().slice(0, 16) : "",
          endDate: d.endDate ? new Date(d.endDate).toISOString().slice(0, 16) : "",
        });
      })
      .catch(() => setError("Failed to load event"));
  }, [id]);

  const set = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(p => ({ ...p, [key]: val }));
    if (key === "title" && !isEdit) {
      setForm(p => ({ ...p, [key]: val, slug: slugify(val) }));
    }
  };

  // ── Timeline helpers
  const addTimeline = () => setForm(p => ({ ...p, timeline: [...p.timeline, emptyTimeline()] }));
  const rmTimeline  = (i) => setForm(p => ({ ...p, timeline: p.timeline.filter((_, j) => j !== i) }));
  const setTL = (i, key) => (e) => setForm(p => {
    const tl = [...p.timeline]; tl[i] = { ...tl[i], [key]: e.target.value }; return { ...p, timeline: tl };
  });

  // ── Speaker helpers
  const addSpeaker = () => setForm(p => ({ ...p, speakers: [...p.speakers, emptySpeaker()] }));
  const rmSpeaker  = (i) => setForm(p => ({ ...p, speakers: p.speakers.filter((_, j) => j !== i) }));
  const setSP = (i, key) => (e) => setForm(p => {
    const sp = [...p.speakers]; sp[i] = { ...sp[i], [key]: e.target.value }; return { ...p, speakers: sp };
  });

  // ── Tier helpers
  const addTier    = () => setForm(p => ({ ...p, sponsorTiers: [...p.sponsorTiers, emptyTier()] }));
  const rmTier     = (i) => setForm(p => ({ ...p, sponsorTiers: p.sponsorTiers.filter((_, j) => j !== i) }));
  const setTier = (i, key) => (e) => setForm(p => {
    const ts = [...p.sponsorTiers]; ts[i] = { ...ts[i], [key]: e.target.value }; return { ...p, sponsorTiers: ts };
  });
  const addSponsor = (ti) => setForm(p => {
    const ts = [...p.sponsorTiers]; ts[ti] = { ...ts[ti], sponsors: [...ts[ti].sponsors, emptySponsor()] }; return { ...p, sponsorTiers: ts };
  });
  const rmSponsor  = (ti, si) => setForm(p => {
    const ts = [...p.sponsorTiers]; ts[ti] = { ...ts[ti], sponsors: ts[ti].sponsors.filter((_, j) => j !== si) }; return { ...p, sponsorTiers: ts };
  });
  const setSponsor = (ti, si, key) => (e) => setForm(p => {
    const ts = [...p.sponsorTiers]; const sponsors = [...ts[ti].sponsors]; sponsors[si] = { ...sponsors[si], [key]: e.target.value }; ts[ti] = { ...ts[ti], sponsors }; return { ...p, sponsorTiers: ts };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (isEdit) {
        await axios.put(`/api/v1/events/${id}`, form, { withCredentials: true });
      } else {
        await axios.post("/api/v1/events", form, { withCredentials: true });
      }
      navigate("/dashboard/events");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            {isEdit ? "Edit Event" : "Create Event"}
          </h1>
          {isEdit && form.isPublished && (
            <a href={`/events/${form.slug}`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "#3b82f6", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, textDecoration: "none" }}>
              <FiEye size={13} /> View public page
            </a>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            <input type="checkbox" checked={form.isPublished} onChange={set("isPublished")} style={{ width: 16, height: 16 }} />
            Published
          </label>
          <button type="button" onClick={() => navigate("/dashboard/events")}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", fontSize: 14, cursor: "pointer" }}>
            Cancel
          </button>
          <button type="submit" disabled={saving}
            style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: "#0f172a", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", color: "#991b1b", marginBottom: 20, fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* ── Basic Info ── */}
      <Section title="Basic Information" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Event Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="Annual Finance Conference 2026" required />
          </Field>
          <Field label="Slug (URL)" required hint="Used in the public URL: /events/your-slug">
            <Input value={form.slug} onChange={set("slug")} placeholder="annual-finance-conference-2026" required />
          </Field>
        </div>
        <Field label="Short Description" required>
          <Textarea value={form.description} onChange={set("description")} rows={2} placeholder="A brief description shown in the hero section" required />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Field label="Start Date & Time" required>
            <Input type="datetime-local" value={form.date} onChange={set("date")} required />
          </Field>
          <Field label="End Date & Time">
            <Input type="datetime-local" value={form.endDate} onChange={set("endDate")} />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={set("location")} placeholder="Main Hall, Building A" />
          </Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Registration Link">
            <Input value={form.registrationLink} onChange={set("registrationLink")} placeholder="https://forms.gle/..." type="url" />
          </Field>
          <Field label="Cover Image URL">
            <Input value={form.coverImage} onChange={set("coverImage")} placeholder="https://..." type="url" />
          </Field>
        </div>
      </Section>

      {/* ── About ── */}
      <Section title="About the Event">
        <Field label="About Section" hint="Expanded details shown below the hero">
          <Textarea value={form.about} onChange={set("about")} rows={5} placeholder="Describe the event in detail..." />
        </Field>
        <Field label="Target Audience" hint="Who should attend this event?">
          <Textarea value={form.targetAudience} onChange={set("targetAudience")} rows={3} placeholder="Finance students, professionals, faculty..." />
        </Field>
      </Section>

      {/* ── Design ── */}
      <Section title="Appearance">
        <Field label="Choose a Design Theme">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 10 }}>
            {DESIGNS.map(d => (
              <button
                type="button" key={d.key}
                onClick={() => setForm(p => ({ ...p, design: d.key }))}
                style={{
                  borderRadius: 12, overflow: "hidden",
                  border: form.design === d.key ? `2px solid ${d.accent}` : "2px solid #e2e8f0",
                  cursor: "pointer", background: "none", padding: 0,
                  boxShadow: form.design === d.key ? `0 0 0 3px ${d.accent}25` : "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
              >
                <div style={{ height: 52, background: d.preview, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 12, borderRadius: "50%", background: d.accent, boxShadow: `0 0 6px ${d.accent}80` }} />
                </div>
                <div style={{ padding: "6px 4px", background: "#fff", fontSize: 11, fontWeight: 600, color: form.design === d.key ? d.accent : "#475569", textAlign: "center", lineHeight: 1.2 }}>
                  {d.label}
                </div>
              </button>
            ))}
          </div>
        </Field>

        {form.design === "custom" && (
          <Field label="Custom CSS"
            hint="Injected after theme variables. You can override ANY CSS property using class names (ep-hero, ep-section, ep-card, ep-navbar, ep-footer, ep-countdown-box, ep-speaker-card, ep-sponsor-card, ep-timeline-item, ep-register-btn...) or use CSS variables like var(--ep-accent), var(--ep-text), var(--ep-font), var(--ep-radius), var(--ep-section-pad)."
          >
            <textarea
              value={form.customCSS}
              onChange={set("customCSS")}
              rows={14}
              placeholder={`/* Change any element using class names or CSS variables */\n\n#event-page {\n  --ep-accent: #ff6b35;\n  --ep-font: 'Georgia', serif;\n  --ep-radius: 8px;\n}\n\n.ep-hero {\n  background: url('https://...') center/cover !important;\n}\n\n.ep-navbar {\n  background: rgba(0,0,0,0.9) !important;\n}\n\n.ep-speaker-card {\n  border-radius: 4px !important;\n}\n\n.ep-register-btn {\n  background: linear-gradient(90deg, #ff6b35, #f7c59f) !important;\n  border-radius: 4px !important;\n}\n\n.ep-countdown-box {\n  backdrop-filter: blur(8px) !important;\n}`}
              style={{ ...inp, fontFamily: "'Courier New', monospace", fontSize: 12, resize: "vertical", minHeight: 260, lineHeight: 1.6 }}
            />
          </Field>
        )}
      </Section>

      {/* ── Timeline ── */}
      <Section title={`Event Timeline (${form.timeline.length} items)`}>
        {form.timeline.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 2fr auto", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            <Input value={item.time} onChange={setTL(i, "time")} placeholder="09:00 AM" />
            <Input value={item.title} onChange={setTL(i, "title")} placeholder="Opening Ceremony" />
            <Input value={item.description} onChange={setTL(i, "description")} placeholder="Optional description" />
            <button type="button" onClick={() => rmTimeline(i)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addTimeline} style={addBtn}>
          <FiPlus size={14} /> Add Timeline Item
        </button>
      </Section>

      {/* ── Speakers ── */}
      <Section title={`Speakers (${form.speakers.length})`}>
        {form.speakers.map((sp, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px", marginBottom: 12, position: "relative" }}>
            <button type="button" onClick={() => rmSpeaker(i)} style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: 6, border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiTrash2 size={12} />
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Name" required><Input value={sp.name} onChange={setSP(i, "name")} placeholder="Dr. Ahmad Al-Rashid" /></Field>
              <Field label="Title / Role"><Input value={sp.title} onChange={setSP(i, "title")} placeholder="Professor of Finance" /></Field>
              <Field label="Speaking Time"><Input value={sp.speakingTime} onChange={setSP(i, "speakingTime")} placeholder="10:00 AM - 10:45 AM" /></Field>
              <Field label="Photo URL"><Input value={sp.photo} onChange={setSP(i, "photo")} placeholder="https://..." type="url" /></Field>
            </div>
            <Field label="Bio"><Textarea value={sp.bio} onChange={setSP(i, "bio")} rows={2} placeholder="Short biography..." /></Field>
          </div>
        ))}
        <button type="button" onClick={addSpeaker} style={addBtn}>
          <FiPlus size={14} /> Add Speaker
        </button>
      </Section>

      {/* ── Sponsors ── */}
      <Section title={`Sponsors & Partners (${form.sponsorTiers.length} tier${form.sponsorTiers.length !== 1 ? "s" : ""})`}>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
          Create tiers (e.g. Platinum, Gold, Silver, Bronze, Friends) and add sponsors to each. Tiers are sorted by order number (0 = first).
        </p>

        {form.sponsorTiers.map((tier, ti) => (
          <div key={ti} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 16, background: "#fafafa" }}>
            {/* Tier header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 80px auto", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
              <Field label="Tier Name">
                <Input value={tier.tierName} onChange={setTier(ti, "tierName")} placeholder="Gold Sponsors" />
              </Field>
              <Field label="Order" hint="Lower = higher">
                <Input value={tier.order} onChange={e => setForm(p => { const ts = [...p.sponsorTiers]; ts[ti] = { ...ts[ti], order: Number(e.target.value) }; return { ...p, sponsorTiers: ts }; })} type="number" min={0} />
              </Field>
              <div style={{ paddingTop: 24 }}>
                <button type="button" onClick={() => rmTier(ti)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            {/* Sponsors in this tier */}
            <div style={{ marginLeft: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Sponsors</div>
              {tier.sponsors.map((sp, si) => (
                <div key={si} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
                  <Input value={sp.name} onChange={setSponsor(ti, si, "name")} placeholder="Sponsor name" />
                  <Input value={sp.logo} onChange={setSponsor(ti, si, "logo")} placeholder="Logo URL" type="url" />
                  <Input value={sp.website} onChange={setSponsor(ti, si, "website")} placeholder="Website URL" type="url" />
                  <button type="button" onClick={() => rmSponsor(ti, si)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiTrash2 size={12} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addSponsor(ti)} style={{ ...addBtn, fontSize: 12, padding: "5px 12px" }}>
                <FiPlus size={12} /> Add Sponsor
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addTier} style={addBtn}>
          <FiPlus size={14} /> Add Sponsor Tier
        </button>
      </Section>

      {/* Bottom save */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
        <button type="button" onClick={() => navigate("/dashboard/events")}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", fontSize: 14, cursor: "pointer" }}>
          Cancel
        </button>
        <button type="submit" disabled={saving}
          style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "#0f172a", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Event"}
        </button>
      </div>
    </form>
  );
}

const addBtn = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "7px 14px", borderRadius: 8, border: "1.5px dashed #cbd5e1",
  background: "#f8fafc", color: "#475569", cursor: "pointer", fontSize: 13,
  fontWeight: 500, transition: "border-color 0.2s",
};
