import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Titel ~50–60 tekens voor Google snippet; zoektermen: pollenverwachting vandaag, hooikoorts vandaag
const title = "Pollenverwachting vandaag — Hooikoorts & pollen radar";
const description =
  "Bekijk de pollenverwachting vandaag per provincie en per uur. Zijn er pollen vandaag? Actuele hooikoorts radar en pollenmeting voor Nederland.";

export const metadata: Metadata = {
  title: `${title} | ${SITE_NAME}`,
  description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||(t!=='light'&&d);if(dark)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-page text-primary`}>
        {children}
      </body>
    </html>
  );
}
