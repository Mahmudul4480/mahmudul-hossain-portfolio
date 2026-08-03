import type { ServiceProcessStep } from "@/data/services";

interface ServiceProcessProps {
  steps: ServiceProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <div className="terminal service-process">
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
        &nbsp;process.log
      </div>
      <div className="body">
        {steps.map((step) => (
          <div key={step.step} className="row">
            <span className="step-no">{step.step}</span>
            <div>
              <span className="cmd">{step.title}</span>
              <span className="ok">✓</span>
              <span className="desc">{step.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
