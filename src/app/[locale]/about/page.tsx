import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { profile } from "@/config/links";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AutoSlider } from "@/components/AutoSlider";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About />;
}

function About() {
  const t = useTranslations("about");

  return (
    <main className="min-h-dvh font-sans text-neutral-100 selection:bg-neutral-800">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Navigation Header */}
        <header className="mb-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0 animate-in">
          <div className="flex flex-col">
            <h1 className="font-serif text-lg font-semibold">{profile.name}</h1>
            <span className="text-sm text-neutral-500">
              {t("hero.title")}
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/portfolio"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {t("nav.portfolio")}
            </Link>
            <Link
              href="/about"
              className="text-white transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {t("nav.links")}
            </Link>
            <LanguageToggle />
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-20 flex flex-col items-center text-center animate-in delay-1">
          <h2 className="mb-4 font-serif text-4xl font-semibold sm:text-5xl">
            {t("hero.title")}
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400">
            {t("hero.subtitle")}
          </p>
        </section>

        {/* Childhood Section */}
        <section className="mb-24 flex flex-col gap-8 md:flex-row md:items-center md:gap-16 animate-in delay-2">
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-neutral-100">
              {t("childhood.title")}
            </h3>
            <p className="text-base leading-relaxed text-neutral-400">
              {t("childhood.description")}
            </p>
          </div>
          <AutoSlider 
            images={[
              "/images/about/childhood-1.jpg", 
              "/images/about/childhood-2.jpg", 
              "/images/about/childhood-3.jpg", 
              "/images/about/childhood-4.jpg", 
              "/images/about/childhood-5.jpg",
              "/images/about/childhood-6.jpg",
              "/images/about/childhood-7.jpg",
              "/images/about/childhood-8.jpg"
            ]} 
          />
        </section>

        {/* Studies Section */}
        <section className="mb-24 flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-16 animate-in delay-3">
          <AutoSlider 
            images={[
              "/images/about/studies-1.jpg", 
              "/images/about/studies-2.jpg", 
              "/images/about/studies-3.jpg"
            ]} 
          />
          
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-neutral-100">
              {t("studies.title")}
            </h3>
            <p className="text-base leading-relaxed text-neutral-400">
              {t("studies.description")}
            </p>
          </div>
        </section>

        {/* Work Section */}
        <section className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16 animate-in delay-4">
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-neutral-100">
              {t("work.title")}
            </h3>
            <p className="text-base leading-relaxed text-neutral-400">
              {t("work.description")}
            </p>
          </div>
          
          <AutoSlider 
            images={[
              "/images/about/work-1.jpg", 
              "/images/about/work-2.jpg"
            ]} 
          />
        </section>

      </div>
    </main>
  );
}
