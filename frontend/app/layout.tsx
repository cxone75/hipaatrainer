
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
  keywords: [
    "HIPAA compliance", "healthcare training", "HIPAA certification", "medical privacy", 
    "healthcare security", "PHI protection", "compliance training", "healthcare regulations",
    "HIPAA audit", "healthcare compliance software", "medical data security", "patient privacy",
    "healthcare risk assessment", "HIPAA training online", "medical compliance platform",
    "healthcare data protection", "HIPAA security rule", "medical records privacy"
  ],
  authors: [{ name: "HIPAA Trainer Team", url: "https://hipaatrainer.net" }],
  creator: "HIPAA Trainer",
  publisher: "HIPAA Trainer",
  category: "Healthcare Technology",
  classification: "Healthcare Compliance Software",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hipaatrainer.net'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hipaatrainer.net',
    siteName: 'HIPAA Trainer',
    title: 'HIPAA Trainer - Complete HIPAA Compliance Training Platform',
    description: 'Comprehensive HIPAA compliance training and management platform for healthcare organizations. Expert-designed modules, risk assessments, and audit preparation tools.',
    images: [
      {
        url: '/hipaatrainer-logo.png',
        width: 1200,
        height: 630,
        alt: 'HIPAA Trainer - Healthcare Compliance Platform Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hipaatrainer',
    creator: '@hipaatrainer',
    title: 'HIPAA Trainer - Complete HIPAA Compliance Training Platform',
    description: 'Comprehensive HIPAA compliance training and management platform for healthcare organizations.',
    images: {
      url: '/hipaatrainer-logo.png',
      alt: 'HIPAA Trainer Logo',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  other: {
    'msapplication-TileColor': '#7c3aed',
    'theme-color': '#7c3aed',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'HIPAA Trainer',
    'mobile-web-app-capable': 'yes',
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="HIPAA Trainer" />
        <meta name="apple-mobile-web-app-title" content="HIPAA Trainer" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HIPAA Trainer",
              "url": "https://hipaatrainer.net",
              "logo": "https://hipaatrainer.net/hipaatrainer-logo.png",
              "description": "Comprehensive HIPAA compliance training and management platform for healthcare organizations",
              "foundingDate": "2024",
              "industry": "Healthcare Technology",
              "serviceArea": "United States",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@hipaatrainer.net"
              },
              "sameAs": [
                "https://twitter.com/hipaatrainer",
                "https://linkedin.com/company/hipaatrainer"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Healthcare Compliance Training",
                "itemOffered": {
                  "@type": "Service",
                  "name": "HIPAA Compliance Training Platform",
                  "description": "Complete HIPAA compliance training and management solution"
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <OnboardingGuard>
          {children}
        </OnboardingGuard>
      </body>
    </html>
  );
}
