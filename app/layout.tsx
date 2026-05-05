import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ortopedia en Bolívar | IMed Bolívar",
  description:
    "IMed Bolívar, ortopedia en Bolívar. Venta de productos ortopédicos, fajas, medias de compresión, movilidad y artículos de rehabilitación. Consultá por WhatsApp.",
  openGraph: {
    title: "Ortopedia en Bolívar | IMed Bolívar",
    description:
      "Productos ortopédicos en Bolívar. Fajas, movilidad, medias de compresión y más.",
    url: "https://imedbolivar.com.ar",
    siteName: "IMed Bolívar",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}