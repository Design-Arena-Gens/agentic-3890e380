import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Игорь | Психологический триллер",
  description: "Тихий триллер с элементами психологического ужаса",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
