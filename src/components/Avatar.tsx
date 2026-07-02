import Image from "next/image";
import { profile } from "@/config/links";

export function Avatar() {
  return (
    <div className="h-[120px] w-[120px] overflow-hidden rounded-full ring-1 ring-neutral-800">
      <Image
        src={profile.avatarSrc}
        alt={profile.name}
        width={120}
        height={120}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}
