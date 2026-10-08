import Reveal from "./Reveal";
import SectionVisual from "./SectionVisual";
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

export default function VelocityTerminal() {
  return (
    <section className="section" id="workflow-log">
      <div className="wrap">
        <SectionVisual
          imageSrc={sectionImages.velocity}
          imageAlt="Mahmudul Hossain using AI-native development workflow on laptop"
          imagePosition="left"
        >
          <p className="eyebrow">How I build fast</p>
          <h2>AI-native workflow, not AI-generated output</h2>
          <p className="section-visual-lede">
            I use Cursor IDE and Claude Code to scaffold schemas, write migrations and generate UI
            boilerplate — eliminating manual coding latency. Every feature still gets shipped at
            production quality, because the saved time goes straight into custom business logic,
            authorization layers and edge-case testing, not corner-cutting.
          </p>
        </SectionVisual>

        <Reveal className="velocity-stack">
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
              <span className="c-kw">alter table</span> invoices{" "}
              <span className="c-kw">enable</span> row <span className="c-kw">level</span> security;
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

          <div className="terminal">
            <div className="bar">
              <div className="traffic">
                <span
                  style={{
                    background: "#ff5f57",
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    background: "#febc2e",
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    background: "#28c840",
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    display: "block",
                  }}
                />
              </div>
              &nbsp;build.log
            </div>
            <div className="body">
              {steps.map((step) => (
                <div key={step.no} className="row">
                  <span className="step-no">{step.no}</span>
                  <div>
                    <span className="cmd">{step.cmd}</span>
                    <span className="ok">✓</span>
                    <span className="desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
