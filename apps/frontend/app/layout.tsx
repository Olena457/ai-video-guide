import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PasswordModal from "@/src/components/PasswordModal";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video-to-Guide AI",
  description: "Manage your video tasks efficiently.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PasswordModal />
        {children}
      </body>
    </html>
  );
}
