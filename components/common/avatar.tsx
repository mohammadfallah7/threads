import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  alt: string;
  src?: string | null;
  size?: 32 | 40 | 50 | 60;
}

export const Avatar: FC<AvatarProps> = ({ alt, src, size = 50 }) => {
  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={
          src
            ? `${process.env.NEXT_PUBLIC_UPLOADCARE_CDN_CNAME}${src}/`
            : "/images/avatar.png"
        }
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
};
