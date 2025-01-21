import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import Header from './(protected)/header'
import I18nProvider from "@/components/I18nProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mirroor AI",
  description: "",
};

const locales = ["en", "it"];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale)) return notFound();
  let messages;
  try {
    messages = (await import(`../../../locales/${params.locale}.json`)).default;
  } catch (error) {
    return notFound();
  }
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <I18nProvider locale={params.locale} messages={messages}>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html >
  );
}
