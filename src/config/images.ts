/**
 * Photos used on the site.
 *
 * Current photos are free stock photos from Pexels (https://www.pexels.com/license/ –
 * free for commercial use, no attribution required). They show cleaners at work but are
 * NOT photos of the Delta team. Replace them with your own photos when you have them:
 * put the files in /public/images/ and change `src` to e.g. "/images/office.jpg".
 *
 * Remote photos are fetched and optimised by the Next.js server, so visitors' browsers
 * never connect to Pexels directly.
 */
import type { Locale } from "@/i18n/config";
import type { ServiceId } from "@/lib/validation";

export interface SiteImage {
  src: string;
  alt: Record<Locale, string>;
  /** Link to the original photo (for your records / licence check) */
  source: string;
}

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

/** Hero slideshow – one photo per slide, in slide order */
export const heroImages: SiteImage[] = [
  {
    src: pexels(9462761),
    alt: {
      de: "Zwei Reinigungskräfte in Arbeitskleidung mit Reinigungsutensilien",
      en: "Two cleaning professionals in work uniforms with cleaning supplies"
    },
    source: "https://www.pexels.com/photo/two-cleaning-ladies-standing-back-to-back-9462761/"
  },
  {
    src: pexels(9462135),
    alt: {
      de: "Reinigungskraft saugt einen Holzboden",
      en: "Cleaner vacuuming a wooden floor"
    },
    source: "https://www.pexels.com/photo/a-person-in-black-uniform-holding-red-and-black-vacuum-cleaner-9462135/"
  },
  {
    src: pexels(9462759),
    alt: {
      de: "Zimmerpersonal bezieht ein Bett in einem Hotelzimmer",
      en: "Housekeeping staff making a bed in a hotel room"
    },
    source: "https://www.pexels.com/photo/cleaning-ladies-making-the-bed-9462759/"
  },
  {
    src: pexels(6195277),
    alt: {
      de: "Zwei Reinigungskräfte saugen und fegen ein Wohnzimmer",
      en: "Two cleaners vacuuming and sweeping a living room"
    },
    source: "https://www.pexels.com/photo/women-in-orange-uniform-cleaning-the-floor-6195277/"
  },
  {
    src: pexels(31983866),
    alt: {
      de: "Fensterreiniger reinigen eine Glasfassade von einer Arbeitsbühne aus",
      en: "Window cleaners cleaning a glass facade from a lift platform"
    },
    source: "https://www.pexels.com/photo/professional-window-cleaners-at-work-on-glass-building-31983866/"
  }
];

/** Service cards – only the services that have a photo. The rest use an icon. */
export const serviceImages: Partial<Record<ServiceId, SiteImage>> = {
  hotel: {
    src: pexels(9462742),
    alt: { de: "Zimmerpersonal wechselt die Bettwäsche im Hotelzimmer", en: "Housekeepers changing the bedding in a hotel room" },
    source: "https://www.pexels.com/photo/housekeepers-changing-bedding-in-hotel-room-9462742/"
  },
  house: {
    src: pexels(6195274),
    alt: { de: "Zwei Reinigungskräfte saugen und wischen ein Wohnzimmer", en: "Two cleaners vacuuming and mopping a living room" },
    source: "https://www.pexels.com/photo/women-cleaning-inside-of-a-house-6195274/"
  },
  office: {
    src: pexels(10567271),
    alt: { de: "Schreibtisch wird mit Sprühflasche und Tuch gereinigt", en: "Desk being cleaned with a spray bottle and cloth" },
    source: "https://www.pexels.com/photo/man-cleaning-desk-10567271/"
  },
  glass: {
    src: pexels(9462100),
    alt: { de: "Reinigungskraft putzt ein Fenster mit einem Mikrofasertuch", en: "Cleaner wiping a window with a microfibre cloth" },
    source: "https://www.pexels.com/photo/woman-in-black-shirt-holding-blue-textile-near-window-9462100/"
  },
  general: {
    src: pexels(6197108),
    alt: { de: "Reinigungsteam wischt Boden und Glasflächen in einem Essbereich", en: "Cleaning team mopping the floor and wiping glass in a dining area" },
    source: "https://www.pexels.com/photo/group-of-people-cleaning-a-dining-room-6197108/"
  }
};

/** About section */
export const aboutImage: SiteImage = {
  src: pexels(6195131),
  alt: { de: "Drei Reinigungskräfte mit Ausrüstung in einer Wohnung", en: "Three cleaners with equipment in a home" },
  source: "https://www.pexels.com/photo/man-in-red-polo-shirt-beside-woman-in-blue-polo-shirt-6195131/"
};
