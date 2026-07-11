import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Portfolio", "Skills", "Process", "Testimonials", "Contact"];

const SERVICES = [
  { icon: "✦", title: "Website Development", desc: "Custom, high-performance websites built with React, Vue, WordPress & more — designed to convert visitors into clients.", tags: ["React", "WordPress", "Full Stack"] },
  { icon: "◈", title: "Social Media Marketing", desc: "Data-driven strategies that grow your audience, build trust, and bring consistent leads to your business.", tags: ["Strategy", "Analytics", "Growth"] },
  { icon: "◉", title: "Content Creation", desc: "Compelling copy, visuals, and storytelling that make your brand unforgettable across every platform.", tags: ["Copywriting", "Visuals", "Blog"] },
  { icon: "⬡", title: "Content Management", desc: "Full CMS setup, training, and ongoing management so your website stays fresh and powerful.", tags: ["CMS", "WordPress", "Maintenance"] },
  { icon: "▷", title: "Video Editing & Reels", desc: "Scroll-stopping reels, brand videos, and learning content that build authority and spark engagement.", tags: ["Reels", "Editing", "YouTube"] },
  { icon: "◎", title: "SEO & Branding", desc: "From keyword strategy to brand identity — get found, look premium, and stay top of mind.", tags: ["SEO", "Google Analytics", "Branding"] },
  { icon: "◻", title: "Learning Management Videos", desc: "Professional course content and LMS videos that educate your audience and scale your knowledge business.", tags: ["eLearning", "LMS", "Training"] },
];

const PORTFOLIO = [
  { cat: "Web", title: "Bloom Boutique", sub: "E-Commerce & Brand Identity", color: "#f3d5d5", accent: "#c07676" },
  { cat: "Social", title: "Thrive Coaching", sub: "Social Media Strategy & Design", color: "#ddd5f0", accent: "#8b76c0" },
  { cat: "Video", title: "Luxe Skincare", sub: "Product Reels & Video Campaign", color: "#d5e8d5", accent: "#6ca06c" },
  { cat: "Web", title: "StartupLaunch Co.", sub: "Full Stack Web App", color: "#f0e5d5", accent: "#c09060" },
  { cat: "SEO", title: "Local Bakehouse", sub: "Local SEO & Content Strategy", color: "#d5edf0", accent: "#60a0a8" },
  { cat: "Branding", title: "Aria Wellness", sub: "Brand Identity & Design System", color: "#f0d5e8", accent: "#b068a0" },
];

const SKILLS = [
  { name: "React & Vue.js", pct: 92 }, { name: "HTML5 & CSS3", pct: 97 },
  { name: "JavaScript", pct: 90 }, { name: "WordPress", pct: 95 },
  { name: "SEO & Analytics", pct: 88 }, { name: "Canva & Design", pct: 93 },
  { name: "Video Editing", pct: 85 }, { name: "Social Media Marketing", pct: 91 },
  { name: "Content Strategy", pct: 89 }, { name: "Node.js / ASP.NET", pct: 82 },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Founder, Bloom Boutique", quote: "Neha transformed our online presence completely. Our website now genuinely reflects our brand, and bookings have increased by 180% since the redesign.", avatar: "PS" },
  { name: "Ananya Mehta", role: "Business Coach & Speaker", quote: "She doesn't just build websites — she builds experiences. Every detail was intentional, every pixel perfect. My clients keep complimenting my site.", avatar: "AM" },
  { name: "Rohan Kapoor", role: "CEO, StartupLaunch Co.", quote: "Professional, creative, and always ahead of deadlines. Neha delivered a full-stack platform that our team loves working with daily.", avatar: "RK" },
  { name: "Shreya Patel", role: "Lifestyle Brand, Aria Wellness", quote: "From logo to website to Instagram — Neha handled everything. It felt like having a full creative agency, but so much more personal and caring.", avatar: "SP" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Deep dive into your brand, goals, audience, and vision. We map out everything before a single pixel is placed." },
  { step: "02", title: "Strategy", desc: "A custom roadmap tailored to your goals — from content hierarchy to conversion funnels and launch timelines." },
  { step: "03", title: "Design", desc: "Mood boards, wireframes, and high-fidelity prototypes crafted to feel uniquely yours — elegant and on-brand." },
  { step: "04", title: "Development", desc: "Clean, fast, and SEO-ready code that brings the design to life — responsive on every device, optimized for speed." },
  { step: "05", title: "Launch", desc: "Final testing, go-live support, training, and a 30-day post-launch care window. Your success is the finish line." },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimSection({ children, className = "", delay = 0 }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`
    }}>{children}</div>
  );
}

function SkillBar({ name, pct, delay, dark }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: dark ? "#f5e6d3" : "#2d1f14", letterSpacing: "0.04em" }}>{name}</span>
        <span style={{ fontSize: "0.8rem", color: dark ? "#d4a5a0" : "#b07878", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(180,120,100,0.12)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: "linear-gradient(90deg, #d4908a, #b07aaa)",
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`
        }} />
      </div>
    </div>
  );
}

export default function NehaPatelPortfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters = ["All", "Web", "Social", "Video", "SEO", "Branding"];
  const filtered = activeFilter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === activeFilter);

  const bg = dark ? "#0f0a0d" : "#fdf8f5";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(180,130,110,0.15)";
  const text = dark ? "#f0e4da" : "#1a0f0a";
  const muted = dark ? "#a08888" : "#8a6a5a";

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", background: bg, color: text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #c09090; border-radius: 99px; }
        html { scroll-behavior: smooth; }
        .nav-link { cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; transition: color 0.3s; }
        .nav-link:hover { color: #c07878 !important; }
        .btn-primary { background: linear-gradient(135deg, #c07878, #9a5a9a); color: #fff; border: none; border-radius: 99px; padding: 0.9rem 2.2rem; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.88rem; letter-spacing: 0.08em; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(180,100,120,0.35); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(180,100,120,0.5); }
        .btn-outline { background: transparent; border: 1.5px solid currentColor; border-radius: 99px; padding: 0.85rem 2rem; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.88rem; letter-spacing: 0.06em; cursor: pointer; transition: all 0.3s; }
        .btn-outline:hover { background: rgba(180,100,120,0.1); border-color: #c07878; color: #c07878; }
        .glass-card { background: ${cardBg}; border: 1px solid ${border}; border-radius: 20px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); transition: transform 0.3s, box-shadow 0.3s; }
        .glass-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(180,100,120,0.18); }
        .service-card { cursor: default; }
        .tag { display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 99px; background: rgba(180,100,120,0.12); color: #b07878; margin-right: 0.4rem; margin-top: 0.4rem; }
        .filter-btn { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; padding: 0.5rem 1.3rem; border-radius: 99px; border: 1.5px solid ${border}; cursor: pointer; transition: all 0.25s; background: transparent; color: ${muted}; }
        .filter-btn.active, .filter-btn:hover { background: linear-gradient(135deg, #c07878, #9a5a9a); color: #fff; border-color: transparent; }
        .testimonial-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #d4908a, #a07aaa); display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
        input, textarea, select { width: 100%; padding: 0.9rem 1.1rem; background: ${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)"}; border: 1.5px solid ${border}; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: ${text}; outline: none; transition: border-color 0.3s; resize: none; }
        input:focus, textarea:focus, select:focus { border-color: #c07878; }
        input::placeholder, textarea::placeholder { color: ${muted}; }
        .process-step { position: relative; }
        .process-step::after { content: ''; position: absolute; top: 2rem; left: calc(50% + 1.5rem); width: calc(100% - 3rem); height: 1px; background: linear-gradient(90deg, #c07878, transparent); }
        .social-icon { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid ${border}; transition: all 0.3s; cursor: pointer; text-decoration: none; }
        .social-icon:hover { background: linear-gradient(135deg, #c07878, #9a5a9a); border-color: transparent; color: #fff !important; transform: translateY(-3px); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.05)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .hero-headline { animation: fadeInUp 1s ease 0.2s both; }
        .hero-sub { animation: fadeInUp 1s ease 0.5s both; }
        .hero-cta { animation: fadeInUp 1s ease 0.8s both; }
        .hero-image { animation: float 6s ease-in-out infinite; }
        .marquee-track { display: flex; animation: marquee 20s linear infinite; white-space: nowrap; }
        select option { background: ${dark ? "#1a0f12" : "#fff"}; }
        @media (max-width: 768px) {
          .process-step::after { display: none; }
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) { .mobile-menu { display: none !important; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? (dark ? "rgba(15,10,13,0.92)" : "rgba(253,248,245,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "none",
        transition: "all 0.4s", padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1 }}>Neha Patel</div>
          <div style={{ fontSize: "0.65rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginTop: "2px" }}>Creative & Digital Studio</div>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" style={{ color: muted }} onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
          <button className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.78rem" }} onClick={() => scrollTo("contact")}>Book a Call</button>
          <button onClick={() => setDark(!dark)} style={{ background: "none", border: `1.5px solid ${border}`, borderRadius: "50%", width: 38, height: 38, cursor: "pointer", color: text, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{dark ? "☀️" : "🌙"}</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: text, fontSize: "1.5rem" }} className="mobile-menu">☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: dark ? "rgba(15,10,13,0.97)" : "rgba(253,248,245,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: text, fontSize: "1.8rem" }}>×</button>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ fontSize: "1.8rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em" }} onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}>Book a Call</button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "5rem" }}>
        {/* BG blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,140,160,0.22) 0%, transparent 70%)", animation: "pulse-glow 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(160,140,200,0.18) 0%, transparent 70%)", animation: "pulse-glow 10s ease-in-out infinite 2s" }} />
          <div style={{ position: "absolute", top: "40%", left: "30%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,190,160,0.14) 0%, transparent 70%)", animation: "pulse-glow 7s ease-in-out infinite 1s" }} />
        </div>

        <div style={{ maxWidth: 1200, width: "100%", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div className="hero-headline" style={{ display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c07878", background: "rgba(192,120,120,0.1)", padding: "0.4rem 1rem", borderRadius: "99px", marginBottom: "1.5rem", border: "1px solid rgba(192,120,120,0.2)" }}>
              ✦ Available for New Projects
            </div>
            <h1 className="hero-headline" style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              Where Design<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Meets</em> Digital<br />
              Brilliance
            </h1>
            <p className="hero-sub" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "480px", marginBottom: "2.5rem" }}>
              I'm Neha — a Software Developer, Web Designer & Digital Content Creator with <strong style={{ color: text }}>7+ years</strong> of experience turning brand visions into stunning digital realities that attract premium clients.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("services")}>Explore My Work</button>
              <button className="btn-outline" style={{ color: text }} onClick={() => scrollTo("contact")}>Let's Collaborate →</button>
            </div>
            <div className="hero-cta" style={{ display: "flex", gap: "2.5rem", marginTop: "3rem" }}>
              {[["150+", "Projects"], ["7+", "Years"], ["98%", "Clients Happy"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#c07878", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div className="hero-image" style={{ position: "relative" }}>
              {/* Decorative ring */}
              <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "1px solid rgba(192,120,120,0.25)", animation: "spin-slow 25s linear infinite" }} />
              <div style={{ position: "absolute", inset: "-45px", borderRadius: "50%", border: "1px dashed rgba(160,120,180,0.2)", animation: "spin-slow 35s linear infinite reverse" }} />
              {/* Image placeholder */}
              <div style={{ width: "320px", height: "380px", borderRadius: "40% 60% 55% 45% / 45% 45% 55% 55%", background: dark ? "linear-gradient(135deg, #3a1a2a, #2a1a3a)" : "linear-gradient(135deg, #f5ddd5, #e8d5f0)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 30px 80px rgba(180,100,140,0.3)", border: "2px solid rgba(200,150,160,0.3)" }}>
                <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>👩‍💻</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Your photo here</div>
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "12px", padding: "0.75rem 1rem", border: "1px solid rgba(255,255,255,0.2)", textAlign: "left" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#c07878", letterSpacing: "0.1em", textTransform: "uppercase" }}>✦ Open to Clients</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "2px" }}>Neha Patel</div>
                </div>
              </div>
              {/* Floating badges */}
              <div style={{ position: "absolute", top: "-10px", right: "-30px", background: dark ? "rgba(40,20,30,0.9)" : "rgba(255,255,255,0.95)", border: `1px solid ${border}`, borderRadius: "14px", padding: "0.6rem 1rem", backdropFilter: "blur(10px)", boxShadow: "0 10px 30px rgba(180,100,120,0.2)" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: muted, letterSpacing: "0.08em" }}>LATEST PROJECT</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>🌸 Brand Launch</div>
              </div>
              <div style={{ position: "absolute", bottom: "20px", right: "-40px", background: "linear-gradient(135deg, #c07878, #9a5a9a)", borderRadius: "14px", padding: "0.6rem 1rem", boxShadow: "0 10px 30px rgba(180,100,120,0.4)", color: "#fff" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", opacity: 0.8, letterSpacing: "0.08em" }}>CLIENT LOVE</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>⭐ 5.0 Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, overflow: "hidden", borderTop: `1px solid ${border}`, padding: "0.9rem 0", background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.4)", backdropFilter: "blur(10px)" }}>
          <div className="marquee-track" style={{ gap: "3rem" }}>
            {[...Array(2)].map((_, i) => (
              ["Website Design", "✦", "Social Media", "◈", "Video Editing", "◉", "SEO & Branding", "⬡", "Content Creation", "◎", "WordPress", "▷", "React Development", "✦", "Digital Strategy", "◈", "Reels & Video", "◉"].map((t, j) => (
                <span key={`${i}-${j}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t === "✦" || t === "◈" || t === "◉" || t === "⬡" || t === "◎" || t === "▷" ? "#c07878" : muted, flexShrink: 0, marginRight: "3rem" }}>{t}</span>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <AnimSection>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "24px", background: dark ? "linear-gradient(135deg, #2a1520, #1a1530)" : "linear-gradient(135deg, #f5ddd5, #e8d5f0, #dde8f5)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 30px 80px rgba(180,100,140,0.2)" }}>
                <div style={{ textAlign: "center", color: muted }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🖼️</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}>About Photo Placeholder</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", background: "linear-gradient(135deg, #c07878, #9a5a9a)", borderRadius: "20px", padding: "1.5rem 2rem", boxShadow: "0 20px 50px rgba(180,100,120,0.4)", color: "#fff" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}>7+</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", opacity: 0.85, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>Years of Excellence</div>
              </div>
              <div style={{ position: "absolute", top: "-15px", left: "-15px", background: dark ? "rgba(40,20,30,0.9)" : "rgba(255,255,255,0.95)", border: `1px solid ${border}`, borderRadius: "16px", padding: "1rem 1.5rem", backdropFilter: "blur(10px)" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Expertise</div>
                <div style={{ fontSize: "1rem", fontWeight: 600, marginTop: "4px" }}>Full Stack + Design</div>
              </div>
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ About Me</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Crafting Digital<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Experiences</em> That Convert
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.9, color: muted, marginBottom: "1.5rem" }}>
              I'm Neha Patel — a multidisciplinary digital creative who believes your online presence should be as powerful as your purpose. With over 7 years of experience, I bridge the gap between stunning design and solid development.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.9, color: muted, marginBottom: "2.5rem" }}>
              From building full-stack web applications to crafting viral social media strategies, my work spans the entire digital ecosystem. I've helped 150+ small businesses, coaches, and personal brands elevate their online identity and grow their revenue.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
              {["Website Dev & Design", "WordPress Expert", "Social Media Strategy", "Video Production", "SEO & Analytics", "Brand Identity"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: muted }}>
                  <span style={{ color: "#c07878", fontSize: "1rem" }}>✓</span> {s}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Work With Me</button>
          </AnimSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "7rem 2rem", background: dark ? "rgba(255,255,255,0.02)" : "rgba(250,240,235,0.6)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Services</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem" }}>
              Everything Your Brand<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Needs to Thrive</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: muted, maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>One studio. Every digital service your business needs to look premium and grow consistently.</p>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={i * 0.1}>
                <div className="glass-card service-card" style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "2rem", color: "#c07878", marginBottom: "1rem", lineHeight: 1 }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: muted, lineHeight: 1.75, marginBottom: "1rem" }}>{s.desc}</p>
                  <div>{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Portfolio</div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem" }}>
            Selected<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Work & Projects</em>
          </h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
            {filters.map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((p, i) => (
            <AnimSection key={p.title} delay={i * 0.08}>
              <div className="glass-card" style={{ overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: "200px", background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 30%, ${p.accent}22, transparent 70%)` }} />
                  <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🖼️</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: p.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{p.cat}</div>
                  </div>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.9)", borderRadius: "99px", padding: "0.25rem 0.8rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: p.accent, letterSpacing: "0.08em" }}>{p.cat}</div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: muted }}>{p.sub}</p>
                  <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#c07878", fontWeight: 600, letterSpacing: "0.06em" }}>View Case Study →</div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "7rem 2rem", background: dark ? "linear-gradient(135deg, #1a0f15, #150f1a)" : "linear-gradient(135deg, #f5ddd5, #e8d5f0, #dde8f5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Skills</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15 }}>
              Tools of My<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Creative Craft</em>
            </h2>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem 5rem" }}>
            {SKILLS.map((s, i) => <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.07} dark={dark} />)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Process</div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15 }}>
            How We Create<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Magic Together</em>
          </h2>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", position: "relative" }}>
          {PROCESS.map((p, i) => (
            <AnimSection key={p.title} delay={i * 0.1} className="process-step">
              <div style={{ textAlign: "center", padding: "0 0.5rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #c07878, #9a5a9a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", boxShadow: "0 8px 25px rgba(180,100,120,0.35)" }}>{p.step}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.6rem" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: muted, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
              {i < 4 && <div style={{ position: "absolute", top: "1.6rem", left: "calc(50% + 26px)", right: "calc(-50% + 26px)", height: "1px", background: `linear-gradient(90deg, #c07878, transparent)` }} />}
            </AnimSection>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "7rem 2rem", background: dark ? "rgba(255,255,255,0.02)" : "rgba(250,240,235,0.6)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Testimonials</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15 }}>
              Words from<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Happy Clients</em>
            </h2>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimSection key={t.name} delay={i * 0.1}>
                <div className="glass-card" style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "2rem", color: "#c07878", marginBottom: "1rem", lineHeight: 1 }}>"</div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", color: muted, lineHeight: 1.8, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: muted }}>{t.role}</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: "#f0a050", fontSize: "0.75rem" }}>★★★★★</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BANNER */}
      <AnimSection>
        <div style={{ background: "linear-gradient(135deg, #c07878, #9a5a9a, #7a80c0)", padding: "4rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
              Ready to Elevate<br /><em style={{ fontStyle: "italic", fontWeight: 300 }}>Your Digital Presence?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>Book a free 30-minute discovery call and let's craft a strategy that transforms your brand online.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contact")} style={{ background: "#fff", color: "#c07878", border: "none", borderRadius: "99px", padding: "0.9rem 2.2rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>Book Free Consultation</button>
              <button onClick={() => scrollTo("portfolio")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "99px", padding: "0.85rem 2rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.88rem", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.3s" }}>See My Work →</button>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <AnimSection>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c07878", marginBottom: "1rem" }}>✦ Contact</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Let's Create<br /><em style={{ fontStyle: "italic", fontWeight: 300, color: "#c07878" }}>Something Stunning</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: muted, lineHeight: 1.8, marginBottom: "2.5rem" }}>Whether you're starting from scratch or ready to level up — I'm here for it. Let's talk about your vision and build something that turns heads.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "✉️", label: "Email", val: "hello@nehapatel.in" },
                { icon: "📍", label: "Location", val: "India — Available Worldwide" },
                { icon: "📞", label: "Phone", val: "+91 98765 43210" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(192,120,120,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", fontWeight: 500, color: text }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Find Me On</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "in", href: "https://linkedin.com", title: "LinkedIn" },
                { label: "📸", href: "https://instagram.com", title: "Instagram" },
                { label: "𝕏", href: "https://twitter.com", title: "Twitter/X" },
                { label: "▶", href: "https://youtube.com", title: "YouTube" },
                { label: "Be", href: "https://behance.net", title: "Behance" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: muted, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem" }} title={s.title}>{s.label}</a>
              ))}
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Send a Message</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: muted, marginBottom: "2rem" }}>I'll respond within 24 hours — usually much sooner. ✦</p>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌸</div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted }}>Thank you for reaching out. I'll be in touch soon!</p>
                  <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "0.4rem" }}>Your Name</label>
                      <input placeholder="Priya Sharma" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "0.4rem" }}>Email Address</label>
                      <input type="email" placeholder="you@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "0.4rem" }}>Service Needed</label>
                    <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      <option>Website Development</option>
                      <option>Social Media Marketing</option>
                      <option>Content Creation</option>
                      <option>Video Editing & Reels</option>
                      <option>SEO & Branding</option>
                      <option>Full Package</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "0.4rem" }}>Your Message</label>
                    <textarea rows={4} placeholder="Tell me about your project and goals..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button className="btn-primary" style={{ width: "100%", padding: "1rem" }} onClick={() => { if (formData.name && formData.email) setSubmitted(true); }}>
                    Send Message ✦
                  </button>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: muted, textAlign: "center" }}>Or book directly via <span style={{ color: "#c07878", cursor: "pointer", textDecoration: "underline" }}>Calendly</span></p>
                </div>
              )}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "3rem 2rem 2rem", background: dark ? "rgba(255,255,255,0.02)" : "rgba(250,240,235,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.4rem" }}>Neha Patel</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: "1rem" }}>Creative & Digital Studio</div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: muted, lineHeight: 1.8, maxWidth: 260 }}>Transforming brands through stunning design, strategic content, and powerful digital experiences.</p>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "1rem" }}>Services</div>
              {["Web Design", "WordPress", "Social Media", "Video Editing", "SEO", "Branding"].map(l => (
                <div key={l} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: muted, marginBottom: "0.5rem", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#c07878"} onMouseLeave={e => e.target.style.color = muted}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "1rem" }}>Quick Links</div>
              {NAV_LINKS.map(l => (
                <div key={l} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: muted, marginBottom: "0.5rem", cursor: "pointer", transition: "color 0.2s" }} onClick={() => scrollTo(l.toLowerCase())} onMouseEnter={e => e.target.style.color = "#c07878"} onMouseLeave={e => e.target.style.color = muted}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "1rem" }}>Connect</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: muted, marginBottom: "0.5rem" }}>hello@nehapatel.in</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: muted, marginBottom: "1.5rem" }}>+91 98765 43210</div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {["in", "📸", "𝕏", "▶"].map(s => (
                  <div key={s} className="social-icon" style={{ width: 36, height: 36, color: muted, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: muted }}>© 2025 Neha Patel. All rights reserved. Crafted with ✦ passion.</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: muted }}>Privacy Policy · Terms of Service</div>
          </div>
        </div>
      </footer>
    </div>
  );
}