"use client";

import "@/app/layoutStyle.css";
import "antd/dist/antd.css";
import HeaderLayout from "@/components/headerLayout";
import FooterLayout from "@/components/footerLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flexBox">
          <header>
            <HeaderLayout />
          </header>
          <main>{children}</main>
          <footer>
            <FooterLayout />
          </footer>
        </div>
      </body>
    </html>
  );
}
