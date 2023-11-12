import { UserButton } from "./user-button";

export const MainNavigation = () => {
  return (
    <nav className="flex justify-between">
      <span className="font-bold">Formulaic</span>
      <UserButton />
    </nav>
  );
};
