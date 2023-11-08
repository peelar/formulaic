import { Inter } from "next/font/google";
import "./globals.css";
import { UserButton } from "./ui/UserButton";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  return (
    <div>
      <span>Formulaic</span>
      <UserButton />
    </div>
  );
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
