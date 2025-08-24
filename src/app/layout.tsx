import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";

const roboto = Roboto({ weight:["100" , "300" , "400" , "500" , "700" , "900"] , subsets:['latin']})

export const metadata: Metadata = {
  title: "SavaHR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <ResponsiveNavbar/>
        {children}
      </body>
    </html>
  );
}
