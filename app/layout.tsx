import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const DEFAULT_TITLE = "Lanka Ivory Destination — Sri Lanka, travelled properly";
const DEFAULT_DESCRIPTION =
    "Private, tailor-made journeys across Sri Lanka. Chauffeur-guides, hand-checked hotels, and itineraries built around how you want to travel.";
const DEFAULT_IMAGE = "/Destinations/Sigiriya1.jpg";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: DEFAULT_TITLE,
        template: `%s — ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName: SITE_NAME,
        locale: "en_US",
        url: "/",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: DEFAULT_TITLE }],
    },
    twitter: {
        card: "summary_large_image",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: [DEFAULT_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    // favicon.ico / icon.png / apple-icon.png in app/ are auto-detected by Next.js
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}${DEFAULT_IMAGE}`,
    description: DEFAULT_DESCRIPTION,
    email: "hello@lankaivorydestinations.com",
    telephone: "+94112345678",
    address: {
        "@type": "PostalAddress",
        streetAddress: "No. 37/22 B, Atulugama Road, Pubudu Rotarigama",
        addressLocality: "Bandaragama",
        addressRegion: "Western Province",
        postalCode: "12530",
        addressCountry: "LK",
    },
    areaServed: {
        "@type": "Country",
        name: "Sri Lanka",
    },
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Nav />
        {children}
        <Footer />
        <WhatsAppButton />
        </body>
        </html>
    );
}
