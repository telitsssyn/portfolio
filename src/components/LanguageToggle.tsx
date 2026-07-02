"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("landing");
  const [isPending, startTransition] = useTransition();

  const next = locale === "en" ? "ru" : "en";

  function toggle() {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label={t("language")}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs tracking-wide text-neutral-500 transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
    >
      <span className={locale === "en" ? "text-neutral-100" : "text-neutral-600"}>
        EN
      </span>
      <span className="text-neutral-800">/</span>
      <span className={locale === "ru" ? "text-neutral-100" : "text-neutral-600"}>
        RU
      </span>
    </button>
  );
}
