import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { profile, socialLinks, tileLinks, portfolioProjects } from "@/config/links";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const portfolioSocials = [
  { id: "linkedin", href: socialLinks.linkedin, icon: "/icons/linkedin.svg" },
  { id: "github", href: socialLinks.github, icon: "/icons/github.svg" },
  { id: "whatsapp", href: socialLinks.whatsapp, icon: "/icons/whatsapp.svg" },
  { id: "telegram", href: socialLinks.telegram, icon: "/icons/telegram.svg" },
  { id: "fiverr", href: tileLinks.fiverr, icon: "/icons/fi.svg" },
  { id: "upwork", href: tileLinks.upwork, icon: "/icons/upwork.svg" },
];

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Portfolio />;
}

function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <main className="min-h-dvh font-sans text-neutral-100 selection:bg-neutral-800">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Navigation Header */}
        <header className="mb-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0 animate-in">
          <div className="flex flex-col">
            <h1 className="font-serif text-lg font-semibold">{profile.name}</h1>
            <span className="text-sm text-neutral-500">
              {t("role")}
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/portfolio"
              className="text-white transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about"
              className="text-neutral-400 transition-colors hover:text-white"
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
        <section className="mb-20 flex flex-col gap-8 md:flex-row md:items-start md:gap-12 animate-in delay-1">
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarSrc}
              alt={profile.name}
              className="h-40 w-40 rounded-full object-cover md:h-56 md:w-56"
            />
          </div>
          <div className="flex max-w-xl flex-col justify-center">
            <h2 className="mb-4 font-serif text-3xl font-semibold sm:text-4xl">
              {t("hero.greeting")}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-neutral-400 sm:text-lg">
              {t("hero.description")}
            </p>
            <ul className="flex flex-wrap items-center gap-3">
              {portfolioSocials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(`social.${social.id}`)}
                    className="group flex h-14 w-14 items-center justify-center rounded-full transition-colors hover:bg-neutral-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={social.icon}
                      alt=""
                      className="h-12 w-12 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stack Section */}
        <section className="mb-20 max-w-2xl animate-in delay-2">
          <h3 className="mb-6 font-serif text-2xl font-semibold">
            {t("stack.title")}
          </h3>
          <ul className="flex flex-col gap-2 text-base text-neutral-300">
            <li>
              <span className="text-neutral-500">Frontend:</span>{" "}
              {t("stack.frontend")}
            </li>
            <li>
              <span className="text-neutral-500">Backend:</span>{" "}
              {t("stack.backend")}
            </li>
            <li>
              <span className="text-neutral-500">Tools:</span>{" "}
              {t("stack.tools")}
            </li>
            <li>
              <span className="text-neutral-500">Also:</span> {t("stack.also")}
            </li>
          </ul>
        </section>

        {/* Work Section */}
        <section className="animate-in delay-3">
          <h3 className="mb-8 font-serif text-2xl font-semibold">
            {t("work.title")}
          </h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {portfolioProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4"
              >
                <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-colors group-hover:border-neutral-700 shadow-sm">
                  {/* Browser Header */}
                  <div className="flex h-8 w-full items-center gap-1.5 border-b border-neutral-800 bg-neutral-900/50 px-4">
                    <div className="h-2 w-2 rounded-full bg-neutral-700 transition-colors group-hover:bg-red-500/80" />
                    <div className="h-2 w-2 rounded-full bg-neutral-700 transition-colors group-hover:bg-amber-500/80" />
                    <div className="h-2 w-2 rounded-full bg-neutral-700 transition-colors group-hover:bg-green-500/80" />
                  </div>
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageSrc}
                      alt={t(`work.projects.${project.id}.title`)}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-100 transition-colors group-hover:text-white">
                    {t(`work.projects.${project.id}.title`)}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-400">
                    {t(`work.projects.${project.id}.description`)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
