// Contact channels for the demo agency. Fictitious values, disclosed on the page.
export const CONTACT = {
  whatsapp: '5491100000000',
  email: 'contacto@inmobiliariademo.demo',
};

export function whatsappHref(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject, body) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Presentational: contact-only conversion. WhatsApp + mailto, no forms, no accounts.
function ContactCTA({ listing }) {
  const message = `Hola, me interesa "${listing.title}" (${listing.id}) del catálogo demo de Inmobiliaria Demo.`;
  const subject = `Consulta por ${listing.title}`;

  return (
    <section className="contact-cta" aria-labelledby="contacto-titulo">
      <h2 id="contacto-titulo">Consultar por esta propiedad</h2>
      <p>
        Escribinos por WhatsApp o por email con el código <strong>{listing.id}</strong> y te respondemos con la
        información disponible en esta demo.
      </p>
      <div className="contact-cta__actions">
        <a
          className="btn btn--primary"
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escribir por WhatsApp por ${listing.title}`}
        >
          Escribir por WhatsApp
        </a>
        <a className="btn btn--ghost" href={mailtoHref(subject, message)} aria-label={`Enviar un email por ${listing.title}`}>
          Enviar un email
        </a>
      </div>
      <p className="contact-cta__note">
        Demo: el número de WhatsApp y el correo son ficticios. No hay formularios, cuentas ni pagos en este sitio.
      </p>
    </section>
  );
}

export default ContactCTA;
