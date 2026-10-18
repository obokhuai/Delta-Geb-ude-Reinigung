import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { About, Ceo, Contact, Hero, Quote, Services, WhyUs } from "@/components/sections";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const props = { locale: lang, dict };

  return (
    <>
      <Hero {...props} />
      <About {...props} />
      <Ceo {...props} />
      <Services {...props} />
      <WhyUs {...props} />
      <Quote {...props} />
      <Contact {...props} />
    </>
  );
}
