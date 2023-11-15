import { Inter } from "next/font/google";
import "../globals.css";
import "../typography.css";
import { cx } from "class-variance-authority";
import { MainNavigation } from "../src/ui/main-navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(inter.variable, "mx-8 my-4")}>
        <MainNavigation />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
