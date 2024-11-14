import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import "./theme.css"
import Navigation from "./components/main-components/navigation/Navigation";
import Footer from "./components/main-components/Footer";
import { LogoProvider } from "../../context/LogoContext";


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
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      </head>
      <body className={`${ubuntu.className} bg-white text-black dark:bg-stone-950 dark:text-white`}>

        <LogoProvider>
          <Navigation />
        </LogoProvider>
        
        { children }
        <Footer />
      </body>
    </html>
  );
}