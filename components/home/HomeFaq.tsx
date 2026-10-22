import { services } from "@/data/services";

export default function HomeFaq() {
  let number = 0;

  return (
    <section className="h-faq" id="faq" data-tone="light">
      <div className="h-split">
        <div className="h-sticky">
          <p className="h-eyebrow">Common questions</p>
          <h2 className="h-display">FAQ</h2>
          <p className="h-sticky-copy">
            Scope, timelines, and how an engagement runs — the same answers published on each
            service page.
          </p>
        </div>
        <div className="h-faq-list">
          {services.map((service) => (
            <div key={service.slug} className="h-faq-group">
              <h3>{service.name}</h3>
              {service.faqs.map((faq) => {
                number += 1;
                const label = String(number).padStart(2, "0");
                return (
                  <article key={faq.question} className="h-faq-item">
                    <p className="h-svc-no">{label}</p>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
