import { Inter } from "next/font/google";
import "../globals.css";
import "../typography.css";
import { cx } from "class-variance-authority";
import { MainNavigation } from "../src/ui/main-navigation";
import { Toaster } from "../src/@/components/ui/toaster";

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
      {/* cant put className on body because layout shift 🤷 */}
      <body>
        <div className={cx(inter.variable, "md:mx-8 my-4")}>
          <MainNavigation />
          <div className="container mx-auto">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
