import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    template: '%s | Scribble Diffusion',
    default: 'Scribble Diffusion',
  },
  description: 'The official Next.js Learn Scribble Diffusion built with App Router.',
  metadataBase: new URL('https://scribble.mck2000.com/'),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
