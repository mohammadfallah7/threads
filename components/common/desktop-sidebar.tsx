import Image from "next/image";
import { LogoutButton } from "../authentication";
import { Navbar } from "./navbar";
import Link from "next/link";

export const DesktopSidebar = () => {
  return (
    <aside className="fixed top-0 bottom-0 left-0 hidden md:flex pb-4 px-3 flex-col items-center justify-between text-muted">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={60}
          height={60}
          alt="Logo"
          loading="eager"
        />
      </Link>
      <Navbar />
      <LogoutButton />
    </aside>
  );
};
