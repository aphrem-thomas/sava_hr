import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight:["100" , "300" , "400" , "500" , "700" , "900"] , subsets:['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
