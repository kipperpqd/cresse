import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { VerticalMenu } from "@/components/layout/VerticalMenu";

export const metadata: Metadata = {
  title: "CRESSE",
  description: "Clube dos Subtenentes e Sargentos do Exército",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VerticalMenu />
        <main className="md:ml-64 min-h-screen bg-background text-foreground relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
