import type { Metadata } from "next";
import { dmsans } from "@/ui/styles/fonts";
import "simple-scss-library/dist/main.css";

export const metadata: Metadata = {
  title: "Text Editor",
  description: "An Editor for Writers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${dmsans.className} w-100vw h-100vh container p-container`}
      >
        {children}
      </body>
    </html>
  );
}
