import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "@/store/StoreProvider";
import { AuthProvider } from "@/features/auth/AuthContext";

export const metadata: Metadata = {
  title: "TShop",
  description: "Created by Theoneste",
  generator: "Theoneste-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <StoreProvider>
          <AuthProvider>
            {children}
            <Analytics />
          </AuthProvider>
        </StoreProvider>
      </body>

      <NextTopLoader
      color="#32f240"
       />
    </html>
  );
}
