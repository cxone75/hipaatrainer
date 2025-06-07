import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OnboardingGuard from "./components/OnboardingGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HIPAA Tracker",
  description: "HIPAA compliance tracking and user management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/" async></script>
      </head>
      <body className={inter.className}>
        <OnboardingGuard>
          {children}
        </OnboardingGuard>
      </body>
    </html>
  );
}