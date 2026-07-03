import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type LinkTileProps = {
  href: string;
  label: string;
  iconSrc: string;
  external?: boolean;
};

export function LinkTile({
  href,
  label,
  iconSrc,
  external = true,
}: LinkTileProps) {
  const content = (
    <>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 transition-colors duration-300 group-hover:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" width={28} height={28} className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="text-xs font-medium text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200">
        {label}
      </span>
    </>
  );

  const className =
    "group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl bg-neutral-950 transition-all duration-300 hover:bg-neutral-900 hover:scale-[1.02] active:scale-95";

  if (!external) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

export function TileGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2.5">{children}</div>;
}
