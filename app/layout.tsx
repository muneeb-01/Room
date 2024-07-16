import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room",
  description: "Video Calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/logo.svg",
        },
        variables: {
          colorText: "#000",
          colorPrimary: "#0e78f9",
          colorBackground: "#FFF",
          colorTextOnPrimaryBackground: "#fff",
        },
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${inter.className} bg-dark-2`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
