import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/Logo-no tag.png";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import UserLinks from "./user-links";
// import Script from "next/script";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{background: '#155e9496'}}>
        <nav id="topNav" className="bg-zinc-300 text-white p-4 h-30 flex items-center justify-between"
          style={{background: 'white', border: 'thick dashed ghostwhite', borderRadius: '7px'}}>
          <Link href="/">
            <Image src={logo} alt="site logo" width={250} />
          </Link>
          <div id="descriptTop" style={{color: 'lightgray', fontFamily: 'cursive', fontStyle: 'italic', textShadow: '1px 1px dodgerblue, -1px 0px lightyellow', fontSize: 'x-large'}}>&quot;Protecting Life&apos;s Most Precious Assets... Our Children&quot;</div>
          <UserLinks />
        </nav>
        {children}
        {/* <Script
          src="upload-widget.cloudinary.com"
          type="text/javascript"
          strategy="beforeInteractive" // Load before page hydration
        /> */}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
