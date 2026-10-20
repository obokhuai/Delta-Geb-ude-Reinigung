import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Ceo, Hero, HomeCta, HomeIntro, PageIndex } from "@/components/sections";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const props = { locale: lang, dict };

  return (
    <>
      <Hero {...props} />
      <HomeIntro {...props} />
      <Ceo {...props} />
      <PageIndex {...props} />
      <HomeCta {...props} />
    </>
  );
}
