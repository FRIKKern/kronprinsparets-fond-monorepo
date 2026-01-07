import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | FLYT-programmet",
    default: "FLYT-programmet",
  },
  description:
    "Flyt er Kronprinsparets Fonds fritidsprogram for ungdom i tiende klasse.",
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
