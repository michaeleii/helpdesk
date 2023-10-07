import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/components/dojo-logo.png";
import { User } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "./LogoutButton";

interface NavBarProps {
  user: User | undefined;
}

function Navbar({ user }: NavBarProps) {
  return (
    <nav>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="Help Desk Logo"
          width={80}
          quality={100}
          placeholder="blur"
        />
        <h1>Help Desk</h1>
      </Link>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      {user && (
        <>
          <span className="text-right">Hello, {user.email}</span>
          <LogoutButton />
        </>
      )}
    </nav>
  );
}
export default Navbar;
