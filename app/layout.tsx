import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "NextJs Auth SOLID",
  description: "Modern authentication application built with Next.js following SOLID principles. Secure, performant, and easily maintainable.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
              {children}
          </body>
        </html>
    </Providers>
  );
}
