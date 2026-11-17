import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI LIVE STUDIO",
  description: "Seu estúdio inteligente de criação de vídeos."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
