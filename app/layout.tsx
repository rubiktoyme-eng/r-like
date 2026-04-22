import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "R-LIKE | 美容専売品の店舗受取・配送サービス",
  description: "美容室Rubik'sグループ運営。シャンプー・トリートメント・スタイリング剤など美容室専売品を、店舗受取またはご自宅配送でお届けします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
