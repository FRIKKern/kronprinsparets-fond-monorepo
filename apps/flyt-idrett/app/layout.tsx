import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | FLYT Idrett",
    default: "FLYT Idrett",
  },
  description:
    "Digital kulturplattform som hjelper trenere å skape trygge, inkluderende og utviklende idrettsmiljø.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body
        style={{
          fontFamily: '"Barlow", sans-serif',
          position: "relative",
        }}
      >
        <div className="root" style={{ isolation: "isolate" }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
