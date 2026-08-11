import faqs from '../data/faq.json'

export default function FAQSection() {
  return (
    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <p>Everything you want to know about Team #16460, the GEarheads.</p>

      <div>
        {faqs.map((faq, i) => (
          <details key={i}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
