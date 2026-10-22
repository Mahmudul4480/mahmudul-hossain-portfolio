import Image from "next/image";
import { sectionImages } from "@/data/section-images";

const steps = [
  {
    no: "01",
    cmd: "$ scaffold database schema",
    desc: "Tables, relations and indexes generated from the data model.",
  },
  {
    no: "02",
    cmd: "$ generate migrations",
    desc: "Versioned, reversible migrations ready for staging.",
  },
  {
    no: "03",
    cmd: "$ harden rls policies",
    desc: "Manual pass: tenant isolation, auth edge cases, abuse limits.",
  },
  {
    no: "04",
    cmd: "$ ship production feature",
    desc: "Deployed at roughly 2x standard market speed.",
  },
];

export default function HomeExperience() {
  return (
    <section className="h-exp" id="workflow-log" data-tone="light">
      <div className="h-exp-head">
        <p className="h-eyebrow">How I build fast</p>
        <h2 className="h-display h-display-center">
          Experi<span className="h-script">ence</span>
        </h2>
        <p className="h-center-copy">
          I use Cursor IDE and Claude Code to scaffold schemas, write migrations and generate UI
          boilerplate — eliminating manual coding latency. Every feature still gets shipped at
          production quality, because the saved time goes straight into custom business logic,
          authorization layers and edge-case testing, not corner-cutting.
        </p>
      </div>

      <div className="h-exp-proof">
        <Image
          src={sectionImages.velocity}
          alt="Mahmudul Hossain using AI-native development workflow on laptop"
          width={960}
          height={720}
          className="h-side-photo h-side-photo-light"
          sizes="(max-width: 900px) 100vw, 480px"
        />
        <div className="code-panel">
          <div className="bar">
            <div className="traffic">
              <span />
              <span />
              <span />
            </div>
            <span className="filename">policies/tenants_rls.sql</span>
          </div>
          <pre>
            <span className="c-cm">-- row-level security: strict tenant isolation</span>
            {"\n"}
            <span className="c-kw">alter table</span> invoices <span className="c-kw">enable</span>{" "}
            row <span className="c-kw">level</span> security;
            {"\n\n"}
            <span className="c-kw">create policy</span>{" "}
            <span className="c-str">&quot;tenant_isolation&quot;</span>
            {"\n  "}
            <span className="c-kw">on</span> invoices
            {"\n  "}
            <span className="c-kw">for</span> <span className="c-kw">all</span>
            {"\n  "}
            <span className="c-kw">using</span> (tenant_id = auth.
            <span className="c-fn">jwt</span>
            ()-&gt;&gt;
            <span className="c-str">&apos;tenant_id&apos;</span>);
            {"\n\n"}
            <span className="c-cm">-- deploy status</span>
            {"\n"}
            <span className="c-fn">vercel</span> deploy --prod
            {"\n"}
            <span className="c-num">✓</span> build complete <span className="c-num">(14s)</span>
            {"\n"}
            <span className="c-num">✓</span> 0 leaked rows across{" "}
            <span className="c-num">2,400+</span> tenants
            <span className="caret" />
          </pre>
        </div>
      </div>

      <div className="h-exp-stack">
        {steps.map((step) => (
          <article key={step.no} className="h-exp-card" data-exp-card>
            <p className="h-exp-no">{step.no}</p>
            <h3>{step.cmd}</h3>
            <p>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
