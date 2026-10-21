/**
 * Company details – edit this file to update the website.
 * Values in [square brackets] are placeholders. They are shown highlighted
 * on the site until you replace them.
 */
export const site = {
  name: "Delta Gebäude Reinigung",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.de",

  address: {
    street: "Wusthoffstraße 4",
    postalCode: "45131",
    city: "Essen",
    country: "Deutschland",
    countryCode: "DE"
  },
  phone: {
    display: "0201 27109762",
    href: "tel:+4920127109762",
    international: "+49 201 27109762"
  },
  whatsapp: {
    display: "+49 1521 1963058",
    /** Digits only – wa.me needs the number without spaces or plus. */
    number: "4915211963058",
    href: "https://wa.me/4915211963058"
  },
  email: "deltareinigung@yahoo.com",

  // Legal notice (Impressum) – required by German law
  owner: "[Inhaber/in bzw. Geschäftsführer/in]",
  legalForm: "[Rechtsform, z. B. Einzelunternehmen / GmbH]",
  vatId: "[USt-IdNr. gem. § 27a UStG, falls vorhanden]",
  register: "[Handelsregister / Registernummer, falls vorhanden]",
  chamber: "[Zuständige Handwerkskammer, falls zutreffend]",
  hosting: "[Name und Anschrift des Hosting-Anbieters]",

  // Managing director / CEO section on the home page
  ceo: {
    name: "Emmanuel Onyibe",
    photo: "/images/ceo.jpg"
  },

  hours: {
    de: "Mo–Sa 08:00–18:00",
    en: "Mon–Sat 8 am–6 pm"
  }
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.postalCode} ${site.address.city}`
)}`;

export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v);
