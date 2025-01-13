import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { Commissioner } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const fontSans = Commissioner({
  subsets: ["cyrillic"],
  variable: "--font-sans",
});

export const metadata = {
  // metadataBase: new URL(defaultUrl),
  metadataBase: "http://localhost:3000",
  title: "Design Assistant",
  description: "The easiest way for interior designers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={fontSans.className} suppressHydrationWarning>
      <body className="bg-secondary text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-6">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
                  <div className="flex items-center gap-5 font-semibold">
                    <Link href={"/"}>Design Assistant</Link>
                    <div className="flex items-center gap-2">
                      {/* <DeployButton /> */}
                    </div>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="flex w-full max-w-5xl flex-col gap-20 p-6">
                {children}
              </div>

              <footer className="mx-auto flex w-full max-w-5xl items-center justify-end gap-8 border-t p-6 py-16 text-center text-xs">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
