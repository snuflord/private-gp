import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "./components/main-components/navigation/Navigation";

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
        {/* 
          Inline script to set the initial theme based on local storage.
          This script is considered safe in this context for the following reasons:
          1. **Static Content**: The script does not execute user-provided content or dynamic data. It only reads from localStorage, which is under your control.
          2. **No User Input**: The theme value is set by your application, not influenced by external or user input, which avoids XSS (Cross-Site Scripting) risks.
          3. **No Dynamic Code Execution**: The script does not dynamically generate or execute code; it simply applies a CSS class based on a pre-determined value (`'dark'` or `'light'`).
          4. **Immediate Execution**: By placing this script in the `<head>`, it ensures the correct theme is applied before the page fully loads, avoiding a flash of unstyled content (FOUC).
        */}
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
        {children}
      </body>
    </html>
  );
}
