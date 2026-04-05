import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

// Inline schema to avoid import issues
const SpeakerSchema = new mongoose.Schema({ name: String, title: String, bio: String, photo: String, speakingTime: String });
const TimelineSchema = new mongoose.Schema({ time: String, title: String, description: String });
const SponsorSchema  = new mongoose.Schema({ name: String, logo: String, website: String });
const TierSchema     = new mongoose.Schema({ tierName: String, order: Number, sponsors: [SponsorSchema] });

const EventSchema = new mongoose.Schema({
  title: String, slug: String, description: String, about: String,
  date: Date, endDate: Date, location: String, registrationLink: String,
  timeline: [TimelineSchema], speakers: [SpeakerSchema], targetAudience: String,
  sponsorTiers: [TierSchema], design: String, customCSS: String,
  isPublished: Boolean, coverImage: String,
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

// ── Clean old seeds ──────────────────────────────────────────────
await Event.deleteMany({ slug: { $in: ["financial-horizons-summit-2026", "crypto-and-defi-workshop-2026"] } });

// ══════════════════════════════════════════════════════════════════
//  EVENT 1 — Published, Vibrant
// ══════════════════════════════════════════════════════════════════
await Event.create({
  title: "Financial Horizons Summit 2026",
  slug: "financial-horizons-summit-2026",
  description:
    "Join us for the biggest finance event of the year — a full-day summit bringing together students, professionals, and industry leaders to explore the future of finance, investment, and economic innovation.",
  about:
    "The Financial Horizons Summit is our flagship annual event, designed to bridge the gap between academic knowledge and real-world financial practice.\n\nThis year's theme is \"Navigating the New Economy\" — exploring how emerging technologies, shifting global markets, and Vision 2030 initiatives are reshaping the financial landscape.\n\nAttendees will gain hands-on insights from keynote speeches, interactive panel discussions, networking sessions, and live case studies delivered by some of the most respected voices in Saudi finance.",
  date: new Date("2026-05-15T09:00:00"),
  endDate: new Date("2026-05-15T17:00:00"),
  location: "Main Auditorium, College of Business Administration, IAU",
  registrationLink: "https://forms.gle/example",
  targetAudience:
    "This summit is designed for:\n• Finance and banking students at all academic levels\n• Faculty members and academic researchers\n• Young professionals in the financial sector\n• Entrepreneurs seeking investment knowledge\n• Anyone passionate about the future of finance in Saudi Arabia",

  timeline: [
    { time: "08:30 AM", title: "Registration & Welcome Coffee",     description: "Attendee check-in, networking, and refreshments in the lobby." },
    { time: "09:00 AM", title: "Opening Ceremony",                  description: "Welcome address by the Dean of the College of Business Administration." },
    { time: "09:30 AM", title: "Keynote: The Future of Saudi Finance", description: "An inspiring keynote on Vision 2030 and the transformation of the Saudi financial sector." },
    { time: "10:30 AM", title: "Panel: Investment in Emerging Markets", description: "Three industry experts debate strategies for navigating volatile markets." },
    { time: "12:00 PM", title: "Networking Lunch Break",            description: "Catered lunch and open networking with speakers and sponsors." },
    { time: "01:30 PM", title: "Workshop: Financial Modelling 101", description: "Hands-on Excel workshop — build a DCF model from scratch." },
    { time: "03:00 PM", title: "Startup Pitch Competition",         description: "Six student teams pitch their fintech startup ideas to a panel of investors." },
    { time: "04:30 PM", title: "Awards & Closing Remarks",          description: "Prize distribution, certificates, and closing address by the event chair." },
  ],

  speakers: [
    {
      name: "Dr. Nora Al-Suwaidan",
      title: "Head of Finance Department, IAU",
      bio: "Dr. Nora has over 15 years of experience in academic finance and has published more than 30 research papers on Islamic banking and capital markets.",
      speakingTime: "09:30 AM – 10:20 AM",
    },
    {
      name: "Khalid Al-Mansouri",
      title: "CEO, Riyad Capital",
      bio: "A seasoned investment banker with 20+ years in equity markets. Khalid leads one of Saudi Arabia's most active asset management firms.",
      speakingTime: "10:30 AM – 11:15 AM",
    },
    {
      name: "Sara Al-Otaibi",
      title: "FinTech Entrepreneur & Angel Investor",
      bio: "Founder of two successful fintech startups, Sara is a Forbes 30 Under 30 honoree and a passionate advocate for financial inclusion.",
      speakingTime: "11:20 AM – 12:00 PM",
    },
    {
      name: "Mohammed Al-Harbi",
      title: "Senior Analyst, Saudi Exchange (Tadawul)",
      bio: "Mohammed specialises in market microstructure and algorithmic trading. He leads the market surveillance team at Tadawul.",
      speakingTime: "01:30 PM – 02:30 PM",
    },
  ],

  sponsorTiers: [
    {
      tierName: "Platinum",
      order: 0,
      sponsors: [
        { name: "Saudi National Bank", logo: "", website: "https://www.snb.com.sa" },
        { name: "Riyad Bank",          logo: "", website: "https://www.riyadbank.com" },
      ],
    },
    {
      tierName: "Gold",
      order: 1,
      sponsors: [
        { name: "Deloitte KSA",    logo: "", website: "https://www2.deloitte.com/sa" },
        { name: "KPMG Saudi Arabia", logo: "", website: "https://home.kpmg/sa" },
        { name: "PwC Middle East",  logo: "", website: "https://www.pwc.com/me" },
      ],
    },
    {
      tierName: "Silver",
      order: 2,
      sponsors: [
        { name: "Jadwa Investment", logo: "", website: "" },
        { name: "Al Rajhi Capital",  logo: "", website: "" },
        { name: "Falcom Financial",  logo: "", website: "" },
        { name: "GIB Capital",       logo: "", website: "" },
      ],
    },
    {
      tierName: "Media Partners",
      order: 3,
      sponsors: [
        { name: "Arab News",    logo: "", website: "https://www.arabnews.com" },
        { name: "Argaam",        logo: "", website: "https://www.argaam.com" },
      ],
    },
  ],

  design: "vibrant",
  customCSS: "",
  isPublished: true,
  coverImage: "",
});

console.log("✅  Event 1 created: Financial Horizons Summit 2026 (Vibrant, Published)");

// ══════════════════════════════════════════════════════════════════
//  EVENT 2 — Draft, Custom CSS
// ══════════════════════════════════════════════════════════════════
await Event.create({
  title: "Crypto & DeFi Workshop 2026",
  slug: "crypto-and-defi-workshop-2026",
  description:
    "An intensive half-day workshop diving deep into cryptocurrency markets, DeFi protocols, and blockchain-based financial instruments — taught by practitioners, not theorists.",
  about:
    "This workshop is not your average introductory lecture. We skip the basics and go straight to how professional traders, DeFi yield farmers, and on-chain analysts actually work.\n\nYou will walk away knowing how to read on-chain data, understand liquidity pools, evaluate risk in decentralised protocols, and build a simple DeFi portfolio strategy.\n\nSeats are strictly limited to 40 participants to ensure a hands-on, high-quality experience.",
  date: new Date("2026-06-20T14:00:00"),
  endDate: new Date("2026-06-20T18:00:00"),
  location: "Innovation Lab, Building D, IAU",
  registrationLink: "",
  targetAudience:
    "Best suited for participants who already have a basic understanding of blockchain technology and want to take their knowledge to a practical, professional level.\n\n• Finance students (3rd year and above)\n• Tech-savvy professionals curious about Web3 finance\n• Anyone who has used a crypto exchange before",

  timeline: [
    { time: "02:00 PM", title: "Arrival & Setup",                  description: "Get your laptop ready. MetaMask wallet required — install beforehand." },
    { time: "02:15 PM", title: "The State of Crypto Markets 2026", description: "Live market overview — where is Bitcoin, ETH, and the altcoin cycle right now?" },
    { time: "03:00 PM", title: "DeFi Deep Dive",                   description: "How Uniswap, Aave, and Compound actually work under the hood." },
    { time: "03:45 PM", title: "Hands-on: Your First DeFi Trade",  description: "Connect wallet, swap tokens, provide liquidity — live on a testnet." },
    { time: "04:30 PM", title: "Risk Management in DeFi",          description: "Rug pulls, smart contract exploits, impermanent loss — and how to protect yourself." },
    { time: "05:15 PM", title: "Q&A + Portfolio Strategy Session", description: "Open discussion and personalised guidance from the workshop facilitators." },
  ],

  speakers: [
    {
      name: "Faisal Al-Ghamdi",
      title: "Blockchain Developer & DeFi Trader",
      bio: "Faisal has been building on Ethereum since 2018. He runs a popular Arabic-language DeFi newsletter with 12,000 subscribers.",
      speakingTime: "02:15 PM – 04:30 PM",
    },
    {
      name: "Lena Karimi",
      title: "On-Chain Analyst, Chainalysis",
      bio: "Lena specialises in on-chain forensics and crypto market intelligence. She has traced over $200M in illicit crypto flows for law enforcement agencies.",
      speakingTime: "04:30 PM – 05:30 PM",
    },
  ],

  sponsorTiers: [
    {
      tierName: "Title Sponsor",
      order: 0,
      sponsors: [
        { name: "Rain Financial", logo: "", website: "https://rain.com" },
      ],
    },
    {
      tierName: "Community Partners",
      order: 1,
      sponsors: [
        { name: "CryptoArabia",   logo: "", website: "" },
        { name: "Web3 KSA",       logo: "", website: "" },
        { name: "Blockchain Club IAU", logo: "", website: "" },
      ],
    },
  ],

  design: "custom",
  customCSS: `
/* ── Crypto & DeFi Workshop — Custom Dark Neon Theme ── */

#event-page {
  background: #050510 !important;
  font-family: 'Inter', sans-serif;
}

/* Neon glow on accent elements */
#event-page a[href*="register"] {
  background: linear-gradient(90deg, #00fff0, #9b59ff) !important;
  color: #050510 !important;
  box-shadow: 0 0 24px #00fff060 !important;
  font-weight: 800 !important;
}

/* Section headings underline glow */
#event-page h2 + div {
  background: linear-gradient(90deg, #00fff0, #9b59ff) !important;
  box-shadow: 0 0 12px #00fff080;
  height: 3px !important;
}

/* Timeline dot pulse animation */
#event-page [style*="border-radius: \"50%\""] {
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 #00fff040; }
  50%       { box-shadow: 0 0 0 8px #00fff000; }
}

/* Speaker card hover glow */
#event-page section div[style*="cardBg"] {
  transition: box-shadow 0.3s;
}
#event-page section div[style*="cardBg"]:hover {
  box-shadow: 0 0 20px #9b59ff40 !important;
}

/* Countdown timer neon numbers */
#event-page [style*="tabular-nums"] {
  text-shadow: 0 0 14px currentColor;
}

/* Sponsor cards border glow */
#event-page [style*="cardBorder"]:hover {
  border-color: #00fff0 !important;
  box-shadow: 0 0 16px #00fff030 !important;
}
`,
  isPublished: false,
  coverImage: "",
});

console.log("✅  Event 2 created: Crypto & DeFi Workshop 2026 (Custom CSS, Draft)");

await mongoose.disconnect();
console.log("\n🎉  Done! Both events are in the database.");
