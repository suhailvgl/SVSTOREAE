import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
    subsets: ["latin"],
    });

    const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
        subsets: ["latin"],
        });

        export const metadata: Metadata = {
          title: "SVSTOREAE | Online Shopping",
            description: "Shop premium beauty and cosmetic products from SVSTOREAE.",
              verification: {
                  google: "blgVF30fB6vtmzfvyCe5i_1bOJDt88FnLCNHQV3mLk8",
                    },
                    };

                    export default function RootLayout({
                      children,
                      }: Readonly<{
                        children: React.ReactNode;
                        }>) {
                          return (
                              <html lang="en">
                                    <body
                                            className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}
                                                  >
                                                          {children}
                                                                </body>
                                                                    </html>
                                                                      );
                                                                      }