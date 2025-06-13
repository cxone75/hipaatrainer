
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OnboardingGuard from "./components/OnboardingGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HIPAA Trainer - Complete HIPAA Compliance Training Platform",
    template: "%s - HIPAA Trainer"
  },
  description: "Comprehensive HIPAA compliance training and management platform for healthcare organizations. Streamline your compliance processes with expert-designed training modules, risk assessments, and audit preparation tools.",
  keywords: ["HIPAA compliance", "healthcare training", "HIPAA certification", "medical privacy", "healthcare security", "PHI protection", "compliance training", "healthcare regulations"],
  authors: [{ name: "HIPAA Trainer" }],
  creator: "HIPAA Trainer",
  publisher: "HIPAA Trainer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hipaatrainer.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hipaatrainer.net',
    siteName: 'HIPAA Trainer',
    title: 'HIPAA Trainer - Complete HIPAA Compliance Training Platform',
    description: 'Comprehensive HIPAA compliance training and management platform for healthcare organizations.',
    images: [
      {
        url: '/hipaatrainer-logo.png',
        width: 1200,
        height: 630,
        alt: 'HIPAA Trainer Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIPAA Trainer - Complete HIPAA Compliance Training Platform',
    description: 'Comprehensive HIPAA compliance training and management platform for healthcare organizations.',
    images: ['/hipaatrainer-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'msapplication-TileColor': '#7c3aed',
    'theme-color': '#7c3aed',
  },
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <OnboardingGuard>
          {children}
        </OnboardingGuard>
      </body>
    </html>
  );
}
