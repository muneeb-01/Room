import React, { ReactNode } from "react";
import StreamProvider from "@/Providers/StreamClientProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room",
  description: "Video Calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <StreamProvider>{children}</StreamProvider>
    </div>
  );
};

export default RootLayout;
