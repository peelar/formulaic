import Link from "next/link";
import { UserButton } from "./user-button";

export const MainNavigation = () => {
  return (
    <nav className="flex justify-between">
      <Link className="font-bold" href="/">
        Formulaic
      </Link>
      <UserButton />
    </nav>
  );
};
