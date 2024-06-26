import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AppThemeProvider } from "./providers/themeProvider";
import ToastProvider from "./providers/toastProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "./providers/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TubeTalk",
  description: "TubeTalk - A video chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className + "dark:bg-[#141414]"}>
          <AppThemeProvider>
            <ToastProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </ToastProvider>
          </AppThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
