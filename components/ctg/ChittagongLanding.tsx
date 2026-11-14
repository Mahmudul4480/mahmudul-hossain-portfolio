"use client";

import { Galada, Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Beach, Container, Deg, IndustryIcons, RainTree, Ship, Skyline } from "./CtgArt";
import { ClipSlot } from "./ClipSlot";
import "./ctg.css";
import {
  chittagongAreas,
  chittagongBangla,
  chittagongFaqs,
  chittagongOfferings,
  chittagongPrep,
  chittagongProcess,
  chittagongReasons,
  chittagongWork,
  webDeveloperChittagong,
} from "@/data/web-developer-chittagong";
import { siteConfig } from "@/data/site";

const galada = Galada({ weight: "400", subsets: ["bengali"], variable: "--font-ctg-galada", display: "swap" });
const hind = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-ctg-sans",
  display: "swap",
});
const serif = Noto_Serif_Bengali({
  weight: ["500", "700"],
  subsets: ["bengali"],
  variable: "--font-ctg-serif",
  display: "swap",
});

const PLACES = [
  "পতেঙ্গা",
  "কর্ণফুলী",
  "সিআরবি",
  "আকবরশাহ",
  "আগ্রাবাদ",
  "বন্দর",
  "জামালখান",
  "ষোলশহর",
  "ফয়’স লেক",
  "নিউমার্কেট",
  "হালিশহর",
  "খুলশী",
  "চকবাজার",
  "জিইসি",
];

const ICON_KEYS = ["school", "shipping", "clinic", "shop"] as const;

function CtgReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="ctg-hero">
      <motion.div className="ctg-hero__art" style={{ y }}>
        <Skyline className="ctg-hero__svg" />
      </motion.div>
      <motion.div className="ctg-hero__copy ctg-wrap" style={{ y: textY, opacity: fade }}>
        <p className="ctg-kicker">
          <span className="ctg-dot" /> {webDeveloperChittagong.eyebrow}
        </p>
        <h1 className="ctg-hero__title">{webDeveloperChittagong.heroHeadline}</h1>
        <p className="ctg-hero__sub">
          I&apos;m {siteConfig.name} ({siteConfig.nameBn}), a solo full-stack web and app developer
          based in Chattogram, Bangladesh. If you want a web developer in Chittagong, you can hire
          an agency that sells the project and passes it on. I don&apos;t. You talk to me, I build
          it, and I&apos;m still the person you message after launch.
        </p>
        <p className="ctg-hero__lede">
          A website developer in Chattogram should be able to sit with you. I do that from here, and
          I also work remotely across Bangladesh and abroad. I build business websites, landing
          pages, SaaS, ERP and school portals, rental management software, and Android apps — with
          Next.js, React, Supabase, Firebase, and Flutter.
        </p>
        <p className="ctg-en">Based in Chattogram. Web, software, and Android — one person, start to launch.</p>
        <div className="ctg-cta-row">
          <a className="ctg-btn ctg-btn--red" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp me
          </a>
          <Link className="ctg-btn ctg-btn--ghost" href={webDeveloperChittagong.ctaHref ?? "/#contact"}>
            {webDeveloperChittagong.ctaLabel}
          </Link>
        </div>
      </motion.div>
      <div className="ctg-hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...PLACES, ...PLACES];
  return (
    <div className="ctg-marquee" aria-hidden="true">
      <div className="ctg-marquee__track">
        {row.map((place, index) => (
          <span key={`${place}-${index}`}>
            {place}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="ctg-sec ctg-sec--dock" id="build">
      <div className="ctg-wrap">
        <CtgReveal>
          <p className="ctg-kicker">Next.js · React · Supabase · Firebase · Flutter</p>
          <h2 className="ctg-h2">What I build</h2>
          <p className="ctg-lede">
            A site, a landing page, or the software behind the counter. Where a service page already
            exists, it&apos;s linked.
          </p>
        </CtgReveal>
        <div className="ctg-stack">
          {chittagongOfferings.map((offer, index) => (
            <CtgReveal key={offer.title} delay={index * 0.06} className="ctg-box">
              <div className="ctg-box__art">
                <Container color={index % 2 ? "#5eead4" : "#f2a93b"} label={String(index + 1).padStart(2, "0")} />
              </div>
              <div className="ctg-box__body">
                <h3>{offer.title}</h3>
                <p>{offer.body}</p>
                {offer.links?.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </CtgReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="ctg-sec ctg-sec--paper" id="why-local">
      <RainTree className="ctg-tree ctg-tree--l" />
      <div className="ctg-wrap">
        <CtgReveal>
          <p className="ctg-kicker ctg-kicker--dark">Chattogram · same morning</p>
          <h2 className="ctg-h2 ctg-h2--dark">
            Why hire a developer who is already in Chattogram
          </h2>
          <p className="ctg-lede ctg-lede--dark">
            A remote developer can be the right hire. This is what changes when the person writing
            the code already lives in Chattogram.
          </p>
        </CtgReveal>
        <div className="ctg-ind">
          {chittagongReasons.map((reason, index) => {
            const Icon = IndustryIcons[ICON_KEYS[index % ICON_KEYS.length]];
            return (
              <CtgReveal key={reason.title} delay={index * 0.08} className={`ctg-ind__card ${index % 2 ? "ctg-ind__card--blue" : ""}`}>
                <div className="ctg-ind__icon">
                  <Icon className="ctg-ind__svg" />
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </CtgReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="ctg-sec ctg-sec--dock" id="work">
      <div className="ctg-wrap">
        <CtgReveal>
          <p className="ctg-kicker">Already public on this site</p>
          <h2 className="ctg-h2">Work you can open</h2>
          <p className="ctg-lede">
            Already public on this site. I haven&apos;t added a client for this page — open the
            write-up or the live link.
          </p>
        </CtgReveal>
        <div className="ctg-work">
          {chittagongWork.map((project, index) => (
            <CtgReveal key={project.title} delay={index * 0.08}>
              <article>
                <Image src={project.image} alt={project.imageAlt} width={640} height={360} sizes="(max-width: 800px) 100vw, 360px" />
                <div>
                  <p className="ctg-en">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  {project.links.map((link) =>
                    link.external ? (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </article>
            </CtgReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoyageStop({
  i,
  progress,
  stop,
  total,
}: {
  i: number;
  progress: MotionValue<number>;
  stop: (typeof chittagongProcess)[number];
  total: number;
}) {
  const seg = 1 / total;
  const c = (v: number) => Math.min(1, Math.max(0, v));
  const a = c(i * seg - 0.02);
  const b = c(i * seg + 0.03);
  const d = c((i + 1) * seg - 0.03);
  const e = c((i + 1) * seg - 0.01);
  const last = i === total - 1;
  const first = i === 0;
  const opacity = useTransform(
    progress,
    first ? [0, d, e] : last ? [a, b, 1] : [a, b, d, e],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, first ? [0, 1] : [a, b], first ? [0, 0] : [40, 0]);
  return (
    <motion.article className="ctg-voy__card" style={{ opacity, y }}>
      <span className="ctg-voy__port">
        {stop.step} · {stop.title}
      </span>
      <h3>{stop.title}</h3>
      <p>{stop.description}</p>
    </motion.article>
  );
}

function Voyage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const shipX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps = chittagongProcess;
  return (
    <section ref={ref} className="ctg-voy" id="process" style={{ height: `${steps.length * 85 + 60}vh` }}>
      <div className="ctg-voy__sticky">
        <div className="ctg-wrap ctg-voy__head">
          <p className="ctg-kicker">Four steps</p>
          <h2 className="ctg-h2">How a project runs</h2>
          <p className="ctg-lede">
            Four steps. You don&apos;t need a specification — send the list below and I can say
            whether I&apos;m the right person, and what the job actually is.
          </p>
        </div>
        <div className="ctg-wrap ctg-voy__stage">
          <div className="ctg-voy__cards">
            {steps.map((step, index) => (
              <VoyageStop key={step.step} i={index} progress={scrollYProgress} stop={step} total={steps.length} />
            ))}
          </div>
          <div className="ctg-voy__route">
            <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="ctg-voy__svg" aria-hidden="true">
              <path d="M10 60 C200 10 300 110 500 60 S800 10 990 60" stroke="rgba(231,236,246,0.18)" strokeWidth="4" fill="none" strokeDasharray="10 10" />
              <motion.path d="M10 60 C200 10 300 110 500 60 S800 10 990 60" stroke="#5eead4" strokeWidth="5" fill="none" style={{ pathLength: line }} />
            </svg>
            <div className="ctg-voy__ports">
              {steps.map((step, index) => (
                <span key={step.step} style={{ left: `${(index / (steps.length - 1)) * 100}%` }}>
                  <b />
                  {step.title}
                </span>
              ))}
            </div>
            <motion.div className="ctg-voy__ship" style={{ left: shipX }}>
              <svg viewBox="-10 -90 320 140" aria-hidden="true">
                <Ship x={0} y={0} scale={1} />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteCard() {
  return (
    <section className="ctg-sec ctg-sec--navy" id="quote">
      <div className="ctg-wrap ctg-bill">
        <CtgReveal className="ctg-bill__copy">
          <p className="ctg-kicker">What helps me quote</p>
          <h2 className="ctg-h2">
            How much does a website cost in Chittagong?
          </h2>
          <p className="ctg-lede">
            It depends on the scope. A business site, a landing page, a school portal, and a rental
            app are different jobs, so I don&apos;t publish a price. WhatsApp me, email{" "}
            {siteConfig.email}, or use the quote form, and I&apos;ll reply with a scope and a quote.
          </p>
          <Link className="ctg-link" href={webDeveloperChittagong.ctaHref ?? "/#contact"}>
            {webDeveloperChittagong.ctaLabel}
          </Link>
        </CtgReveal>
        <CtgReveal className="ctg-lading" delay={0.1}>
          <div className="ctg-lading__head">
            <span>SCOPE · WHAT TO SEND</span>
            <span className="ctg-stamp">CTG</span>
          </div>
          <ul>
            {chittagongPrep.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CtgReveal>
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section className="ctg-sec ctg-sec--paper" id="areas">
      <div className="ctg-wrap">
        <CtgReveal>
          <p className="ctg-kicker ctg-kicker--dark">Meet in the city</p>
          <h2 className="ctg-h2 ctg-h2--dark">Areas I serve</h2>
          <p className="ctg-lede ctg-lede--dark">
            I can meet in these parts of Chattogram. The rest of the city is fine too — these are
            simply places where sitting down for an hour is easy.
          </p>
          <ul className="ctg-chips">
            {chittagongAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="ctg-lede ctg-lede--dark">
            I also work remotely across Bangladesh, and with people in Europe, the United States,
            and Canada who want one engineer rather than an agency. Where we meet changes. Who
            writes the code does not.
          </p>
        </CtgReveal>
      </div>
    </section>
  );
}

function Bangla() {
  const faqs = chittagongFaqs.filter((faq) => faq.lang === "bn");
  return (
    <section className="ctg-sec ctg-sec--ember" id="bangla" lang="bn">
      <div className="ctg-wrap ctg-mez">
        <CtgReveal className="ctg-mez__art">
          <Deg className="ctg-deg" />
        </CtgReveal>
        <CtgReveal className="ctg-mez__copy" delay={0.1}>
          <p className="ctg-kicker">বাংলায়</p>
          <h2 className="ctg-h2">{chittagongBangla.heading}</h2>
          {chittagongBangla.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="ctg-lede">
              {paragraph}
            </p>
          ))}
          <div className="ctg-faq">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </CtgReveal>
      </div>
    </section>
  );
}

function Scenes() {
  return (
    <section className="ctg-sec ctg-sec--deep" id="scenes">
      <div className="ctg-wrap">
        <CtgReveal>
          <p className="ctg-kicker">Chattogram</p>
          <h2 className="ctg-h2">Port, bridge, beach, hills</h2>
        </CtgReveal>
        <div className="ctg-clips">
          <ClipSlot id="port" title="চট্টগ্রাম বন্দর" en="Port of Chattogram" variant="port" />
          <ClipSlot id="bridge" title="কর্ণফুলী সেতু" en="Karnaphuli bridge" variant="bridge" />
          <ClipSlot id="patenga" title="পতেঙ্গা" en="Patenga" variant="beach" />
          <ClipSlot id="crb" title="সিআরবি" en="CRB rain-trees" variant="crb" />
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="ctg-visit" id="contact-cta">
      <Beach className="ctg-visit__art" />
      <div className="ctg-wrap ctg-visit__inner">
        <CtgReveal className="ctg-visit__card">
          <p className="ctg-kicker">Let&apos;s talk</p>
          <h2 className="ctg-h2">Need a web developer in Chittagong?</h2>
          <p className="ctg-lede">
            Tell me what you want built, whether we should meet in Chattogram, and when you need it.
            I&apos;ll reply with a scope and a quote — no package price until I understand the job.
          </p>
          <div className="ctg-cta-row">
            <a className="ctg-btn ctg-btn--red" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp me
            </a>
            <a className="ctg-btn ctg-btn--ghost" href={`mailto:${siteConfig.email}`}>
              Email me
            </a>
            <Link className="ctg-btn ctg-btn--ghost" href="/#contact">
              Request a quote
            </Link>
          </div>
        </CtgReveal>
      </div>
    </section>
  );
}

function Faqs() {
  const faqs = chittagongFaqs.filter((faq) => faq.lang !== "bn");
  return (
    <section className="ctg-sec ctg-sec--navy" id="faq">
      <div className="ctg-wrap">
        <CtgReveal>
          <h2 className="ctg-h2">Frequently asked questions</h2>
          <p className="ctg-lede">If your question isn&apos;t here, send it.</p>
          <div className="ctg-faq">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </CtgReveal>
      </div>
    </section>
  );
}

export default function ChittagongLanding() {
  return (
    <div className={`ctg ${galada.variable} ${hind.variable} ${serif.variable}`}>
      <Hero />
      <Marquee />
      <Services />
      <Reasons />
      <Work />
      <Voyage />
      <QuoteCard />
      <Areas />
      <Bangla />
      <Scenes />
      <Faqs />
      <Visit />
    </div>
  );
}
