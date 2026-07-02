import { useTranslations } from "next-intl";
import { socialLinks } from "@/config/links";

type SocialKey = keyof typeof socialLinks;

const order: SocialKey[] = [
  "instagram",
  "tiktok",
  "youtube",
  "whatsapp",
  "telegram",
];

export function SocialIcons() {
  const t = useTranslations("landing.social");

  return (
    <ul className="flex items-center justify-center gap-3">
      {order.map((key) => (
        <li key={key}>
          <a
            href={socialLinks[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(key)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-200 hover:bg-neutral-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/icons/${key}.svg`}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 opacity-40 transition-opacity duration-200 hover:opacity-80"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
