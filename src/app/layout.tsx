import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "./components/main-components/Navigation";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Private GP UK",
  description: "Wilsmlow based private GP services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={ubuntu.className}>
          <Navigation />
          {children}
        </body>
    </html>
  );
}
