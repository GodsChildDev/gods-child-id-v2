import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/Logo-GodsChildID-w-tag.png";
import { ClerkProvider } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "God's Child ID",
  description: "Protecting Life's Most Precious Asset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-zinc-300 text-white p-4 h-30 flex items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="site logo" width={250} />
          </Link>
          <div>
              <div className="flex items-center">
                <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link>
              </div>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
