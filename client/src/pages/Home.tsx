/*
 * Experience Blended — Home Page
 * Design: Elegant wedding coordination — warm ivory, charcoal, dusty rose
 * Sections: Nav, Hero, Services, Process, About, Pricing, Testimonials, Contact, Footer
 * Fonts: Playfair Display (headings) + DM Sans (body)
 * Accent: Dusty Rose — oklch(0.63 0.09 12)
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Mail, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80";
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Section Wrapper with scroll-triggered animation ─────────────────────────
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-bold tracking-[0.12em] text-sm uppercase transition-colors duration-300 ${
              scrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Experience Blended
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`nav-link text-sm font-medium transition-colors duration-300 ${
                  scrolled ? "text-[#1A1A1A]/70 hover:text-[#1A1A1A]" : "text-white/80 hover:text-white"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="text-sm font-semibold px-5 py-2.5 rounded-sm bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80 transition-all duration-200 hover:scale-[1.02]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book a Consultation
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors duration-300 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-[#FAF8F5] border-b border-[#1A1A1A]/10 shadow-lg"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-base font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="self-start text-sm font-semibold px-6 py-3 rounded-sm bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80 transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Beautiful wedding ceremony"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs font-semibold tracking-[0.28em] uppercase text-white/55 mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Day of Coordination
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Day,{" "}
          <em style={{ fontStyle: "italic" }}>Perfectly</em>
          <br />
          Orchestrated.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base md:text-lg text-white/75 tracking-wide mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          You've planned every detail. Now let us make sure every detail happens — so you can simply be present.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 text-sm font-semibold tracking-wide border border-white/50 text-white hover:bg-white/15 transition-all duration-200 rounded-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Explore Services
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 text-sm font-semibold tracking-wide bg-white text-[#1A1A1A] hover:bg-white/90 transition-all duration-200 rounded-sm hover:scale-[1.02]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Book a Consultation
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const services = [
  {
    title: "Vendor Coordination",
    description:
      "We communicate and confirm with every vendor — florists, caterers, photographers, DJs — so no detail slips through the cracks on your wedding day.",
  },
  {
    title: "Wedding Day Timeline",
    description:
      "A meticulously crafted, minute-by-minute timeline built around your vision, ensuring every moment flows naturally and on schedule.",
  },
  {
    title: "Ceremony Management",
    description:
      "From processional cues to managing the officiant and guiding the wedding party, we make sure your ceremony is flawless and deeply meaningful.",
  },
  {
    title: "Reception Oversight",
    description:
      "We coordinate introductions, toasts, first dances, cake cutting, and every reception moment — working quietly behind the scenes so you can dance freely.",
  },
  {
    title: "Setup & Breakdown",
    description:
      "We oversee venue setup, confirm decor placements match your vision, and manage breakdown at the end of the night so you never have to worry.",
  },
  {
    title: "Problem Solving & Logistics",
    description:
      "Unexpected hiccups are part of any big event. We anticipate issues before they arise and handle them calmly and efficiently when they do.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-[#FAF8F5] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What's Included
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Day of Coordination Services
            </h2>
            <p
              className="text-[#1A1A1A]/55 max-w-xl mx-auto text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Everything you need to walk into your wedding day with complete confidence, knowing every moment is handled with care.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-sm p-8 border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-px bg-[oklch(0.63_0.09_12)] mb-5" style={{ backgroundColor: "oklch(0.63 0.09 12)" }} />
                <h3
                  className="text-base font-bold text-[#1A1A1A] mb-3 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm text-[#1A1A1A]/60 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start with a free consultation to learn about you, your vision, and the details of your day. We want to understand your priorities so we can be your perfect partner.",
  },
  {
    number: "02",
    title: "Preparation",
    description:
      "In the weeks before your wedding, we reach out to all vendors, build your timeline, review your contracts, and conduct a venue walkthrough to prepare every contingency.",
  },
  {
    number: "03",
    title: "Your Day",
    description:
      "We arrive early, manage every detail, and keep things running beautifully behind the scenes — so you and your family can be fully present for every moment.",
  },
];

function Process() {
  return (
    <section className="relative bg-[#1A1A1A] py-28 overflow-hidden texture-overlay">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-white/35 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              How It Works
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              From First Call to Last Dance
            </h2>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={stagger} className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={fadeUp} custom={i} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-white/10 -translate-x-8 z-0" />
                )}
                <div className="relative z-10">
                  <p
                    className="text-5xl font-bold mb-6 leading-none"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.63 0.09 12)",
                    }}
                  >
                    {step.number}
                  </p>
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-white/55 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="bg-[#FAF8F5] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <img
              src={ABOUT_IMAGE}
              alt="Emma Frericks — Experience Blended"
              className="w-full object-cover rounded-sm"
              style={{ maxHeight: "540px", objectPosition: "center top" }}
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#1A1A1A]/15 rounded-sm pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-[#1A1A1A]/10 rounded-sm pointer-events-none" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              About
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hi, I'm{" "}
              <em style={{ fontStyle: "italic" }}>Emma.</em>
            </h2>
            <div
              className="space-y-4 text-[#1A1A1A]/65 text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>
                I'm the founder of Experience Blended and a passionate wedding Day of Coordinator. I started this business because I believe every couple deserves to be fully present on their wedding day — not chasing down vendors, watching the clock, or managing logistics.
              </p>
              <p>
                Your wedding day is one of the most important days of your life. My job is to be your calm, behind-the-scenes partner: the one who shows up early, knows your timeline inside and out, and handles every curveball so you never have to.
              </p>
              <p>
                I'd love to meet you and hear all about your vision. Let's make sure your day is everything you dreamed it would be.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 border border-[#1A1A1A]/30 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 rounded-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
const pricingIncludes = [
  "Free initial consultation",
  "Unlimited email & phone support (30 days prior)",
  "Vendor contact & confirmation (all vendors)",
  "Custom wedding day timeline",
  "Venue walkthrough prior to the wedding",
  "Ceremony rehearsal coordination",
  "Full wedding day coverage (up to 10 hours)",
  "On-site coordinator + assistant",
  "Vendor point of contact on the day",
  "Setup & décor oversight",
  "Reception management (toasts, dances, cake, etc.)",
  "End-of-night breakdown coordination",
];

function Pricing() {
  return (
    <section id="pricing" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Investment
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Day of Coordination Package
            </h2>
            <p
              className="text-[#1A1A1A]/55 max-w-lg mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              One comprehensive package designed to cover everything you need for a seamless, stress-free wedding day.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <div className="border border-[#1A1A1A]/15 rounded-sm p-10 bg-[#FAF8F5]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    The Full Experience
                  </p>
                  <h3
                    className="text-3xl font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Day of Coordination
                  </h3>
                </div>
                <div className="text-right">
                  <p
                    className="text-4xl font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Contact for Pricing
                  </p>
                  <p
                    className="text-xs text-[#1A1A1A]/40 mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Custom quotes based on your wedding
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-[#1A1A1A]/10 mb-8" />

              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {pricingIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[#1A1A1A]/70"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Check
                      size={15}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "oklch(0.63 0.09 12)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 rounded-sm text-sm font-semibold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all duration-200 hover:scale-[1.01]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a Free Consultation
              </button>

              <p
                className="text-center text-xs text-[#1A1A1A]/35 mt-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                A deposit is required to secure your date. Travel fees may apply beyond 30 miles.
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "Emma was absolutely incredible. She managed every single detail so seamlessly that we had zero stress on our wedding day. We were able to actually enjoy every moment knowing she had it all under control.",
    names: "Sarah & James",
    date: "September 2025",
  },
  {
    quote:
      "I don't know what we would have done without Emma. She anticipated problems before they happened, kept our vendors in line, and made sure everything ran perfectly. Worth every penny.",
    names: "Olivia & Marcus",
    date: "June 2025",
  },
  {
    quote:
      "From our first call to the last dance, Emma made us feel completely at ease. She truly understood our vision and executed it flawlessly. Our day was magical because of her.",
    names: "Lily & Connor",
    date: "October 2024",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-[#1A1A1A] py-28 overflow-hidden texture-overlay">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-white/35 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Kind Words
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Couples Are Saying
            </h2>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={stagger} className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.names}
                variants={fadeUp}
                custom={i}
                className="bg-white/5 border border-white/10 rounded-sm p-8 flex flex-col gap-6"
              >
                {/* Quote mark */}
                <span
                  className="text-5xl leading-none font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.63 0.09 12)",
                    lineHeight: "1",
                  }}
                >
                  "
                </span>
                <p
                  className="text-sm text-white/70 leading-relaxed flex-1 -mt-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t.quote}
                </p>
                <div>
                  <p
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.names}
                  </p>
                  <p
                    className="text-xs text-white/35 tracking-wider mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    partner: "",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: "Day of Coordination" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Submission failed.");
      setSubmitted(true);
      toast.success("Message sent! Emma will be in touch soon.");
      setForm({ name: "", email: "", partner: "", date: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#FAF8F5] py-28">
      <div className="max-w-2xl mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-12">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Let's Connect
            </p>
            <h2
              className="text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's talk about your day.
            </h2>
            <p
              className="text-[#1A1A1A]/55 text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Schedule a free consultation and let's start planning the most seamless, joy-filled day of your life.
            </p>
          </motion.div>
        </AnimatedSection>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 border border-[#1A1A1A]/10 rounded-sm"
          >
            <div
              className="text-4xl mb-4"
              style={{ color: "oklch(0.63 0.09 12)", fontFamily: "'Playfair Display', serif" }}
            >
              ✦
            </div>
            <h3
              className="text-2xl font-bold text-[#1A1A1A] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Message received!
            </h3>
            <p
              className="text-[#1A1A1A]/55 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Emma will be in touch within 1–2 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-[#1A1A1A] underline underline-offset-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <AnimatedSection>
            <motion.form variants={stagger} onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#1A1A1A]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Your Name <span className="text-[#1A1A1A]">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  type="text"
                  required
                  className="border border-[#1A1A1A]/15 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/10 transition-all bg-white placeholder:text-[#1A1A1A]/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#1A1A1A]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Email Address <span className="text-[#1A1A1A]">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  type="email"
                  required
                  className="border border-[#1A1A1A]/15 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/10 transition-all bg-white placeholder:text-[#1A1A1A]/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </motion.div>

              {/* Partner */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#1A1A1A]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Partner's Name
                </label>
                <input
                  name="partner"
                  value={form.partner}
                  onChange={handleChange}
                  placeholder="Your partner's name"
                  type="text"
                  className="border border-[#1A1A1A]/15 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/10 transition-all bg-white placeholder:text-[#1A1A1A]/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </motion.div>

              {/* Wedding Date */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#1A1A1A]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Wedding Date
                </label>
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy or flexible"
                  type="text"
                  className="border border-[#1A1A1A]/15 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/10 transition-all bg-white placeholder:text-[#1A1A1A]/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#1A1A1A]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Tell me about your wedding
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Venue, guest count, any details you'd like to share…"
                  rows={4}
                  className="border border-[#1A1A1A]/15 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/10 transition-all bg-white resize-none placeholder:text-[#1A1A1A]/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 px-8 py-4 rounded-sm text-sm font-semibold bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </motion.div>
            </motion.form>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1A1A1A] text-[#FAF8F5] pt-20 pb-10 overflow-hidden texture-overlay">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="text-lg font-bold tracking-[0.12em] mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Experience Blended
            </p>
            <p
              className="text-sm text-[#FAF8F5]/40 mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Your day, perfectly orchestrated.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:hello@experienceblended.com"
                className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#FAF8F5]/35 mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="text-sm text-[#FAF8F5]/55 hover:text-[#FAF8F5] transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#FAF8F5]/35 mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@experienceblended.com"
                className="text-sm text-[#FAF8F5]/55 hover:text-[#FAF8F5] transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                hello@experienceblended.com
              </a>
              <p
                className="text-sm text-[#FAF8F5]/55"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Fort Wayne, Indiana
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#FAF8F5]/25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {year} Experience Blended. All rights reserved.
          </p>
          <p
            className="text-xs text-[#FAF8F5]/25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Day of Coordination by Emma Frericks
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
