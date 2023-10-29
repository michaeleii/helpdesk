import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

export const dynamic = "force-dynamic";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Help Desk",
  description: "A help desk app built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
