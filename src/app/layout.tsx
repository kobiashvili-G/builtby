import type { Metadata } from "next";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuiltBy.pro — Projects by Kobi",
  description:
    "A collection of live projects, experiments & tools — crafted with curiosity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
