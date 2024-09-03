import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "./components/main-components/navigation/Navigation";
import Footer from "./components/main-components/Footer";

// Import Ubuntu font
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Private GP UK",
  description: "Wilmslow based private GP services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${ubuntu.className} bg-white text-black dark:bg-stone-950 dark:text-white`}>
        <Navigation />
        { children }
        <Footer />
      </body>
    </html>
  );
}
