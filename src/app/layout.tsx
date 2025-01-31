import type { Metadata } from "next";
import "simple-scss-library/dist/global.css";

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
      <body className="w-100vh">{children}</body>
    </html>
  );
}
