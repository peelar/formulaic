import Link from "next/link";
import { UserButton } from "./user-button";

export const MainNavigation = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center">
      <Link className="font-bold" href="/">
        Formulaic
      </Link>
      <UserButton />
    </nav>
  );
};
