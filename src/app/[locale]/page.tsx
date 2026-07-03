import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/Avatar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SocialIcons } from "@/components/SocialIcons";
import { LinkTile, TileGrid } from "@/components/LinkTile";
import { profile, tileLinks } from "@/config/links";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Landing />;
}

function Landing() {
  const t = useTranslations("landing");

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <section className="relative w-[400px] max-w-full rounded-3xl bg-black border border-neutral-900 px-6 pt-12 pb-8">
        {/* Language toggle */}
        <div className="absolute right-5 top-5">
          <LanguageToggle />
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center animate-in">
          <Avatar />
          <h1 className="mt-5 text-center font-serif text-[28px] font-semibold leading-tight tracking-tight text-neutral-100">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">{t("role")}</p>
        </div>

        {/* Social icons */}
        <div className="mt-8 animate-in delay-1">
          <SocialIcons />
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-neutral-900 animate-in delay-2" />

        {/* Projects */}
        <div className="animate-in delay-3">
          <h2 className="mb-3 pl-1 text-sm font-medium text-neutral-500">
            {t("sections.projects")}
          </h2>
          <TileGrid>
            <LinkTile
              href={tileLinks.everbiohacking}
              label={t("tiles.everbiohacking")}
              iconSrc="/icons/everbiohacking.svg"
            />
            <LinkTile
              href={tileLinks.devhouse}
              label={t("tiles.devhouse")}
              iconSrc="/icons/home.svg"
            />
          </TileGrid>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-neutral-900 animate-in delay-3" />

        {/* Link tiles */}
        <div className="animate-in delay-4">
          <h2 className="mb-3 pl-1 text-sm font-medium text-neutral-500">
            {t("sections.links")}
          </h2>
          <TileGrid>
            <LinkTile
              href="/portfolio"
              label={t("tiles.portfolio")}
              iconSrc="/icons/portfolio.svg"
              external={false}
            />
            <LinkTile
              href={tileLinks.donate}
              label={t("tiles.donate")}
              iconSrc="/icons/donate.svg"
            />
          </TileGrid>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center animate-in delay-5">
          <p className="text-xs text-neutral-700">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </section>
    </main>
  );
}
