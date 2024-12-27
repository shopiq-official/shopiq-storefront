import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import Providers from "@/providers";
import Footer from "@/components/layout/footer/Footer";
import { getWebsiteData } from "@/api";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { Product } from "@/types";
const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;
const inter = Inter({ subsets: ["latin"], variable: "--main-primary-font" });
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--main-secondary-font",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "ENTER_TITLE",
  description: "ENTER_DESCRIPTION",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loadScript = `
    window.addEventListener('load', () => {
      const script = document.createElement('script');
      script.src = 'https://diewdbvvpuqqe.cloudfront.net/retaino.js';
      document.body.appendChild(script);
    });
  `;

  const websiteData: any = await getWebsiteData();

  const scripts = websiteData?.data?.scripts || [];
  const jsonLd: any = [];
  let res: any = await fetch(
    `https://api.shopiq.app/api/products/filter?isVariant=false&identifier=${identifier}&limit=1000000`,
    { next: { tags: ["products"] } }
  );
  res = await res.json();
  res.data.forEach((product: Product) => {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Product",
      product: product.title,
      description: product.description,
      price: product?.pricing?.price,
    });
  });

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {scripts
          .filter((val: any) => val.scriptPosition === "head")
          .map((script: any, index: number) => {
            let temp = script.value;

            if (script.scriptType === "google_tag_manager") {
              // Remove HTML comments
              temp = temp.replace(/<!--[\s\S]*?-->/g, "");

              // Remove <script> tags
              temp = temp.replace("<script>", "");
              temp = temp.replace("</script>", "");
            }

            return (
              <script
                key={index}
                dangerouslySetInnerHTML={{ __html: `${temp}` }}
              />
            );
          })}
      </head>

      <body className={`${inter.className} ${nunito.className}`}>
        {scripts
          .filter((val: any) => val.scriptPosition === "body")
          .map((script: any, index: number) => {
            if (script.scriptType === "google_tag_manager") {
              // Remove comments and <noscript> tags from script.value
              let temp = script.value.replace(/<!--[\s\S]*?-->/g, "");
              temp = temp.replace(/<noscript>/g, "");
              temp = temp.replace(/<\/noscript>/g, "");
              temp = temp.trim();

              // Regular expressions to extract attributes from <iframe> tag
              const srcRegex = /src="(.*?)"/;
              const heightRegex = /height="(.*?)"/;
              const widthRegex = /width="(.*?)"/;
              const styleRegex = /style="(.*?)"/;

              // Match attribute values
              const srcMatch = temp.match(srcRegex);
              const heightMatch = temp.match(heightRegex);
              const widthMatch = temp.match(widthRegex);
              const styleMatch = temp.match(styleRegex);

              // Extract attribute values or default to empty string
              const srcValue = srcMatch ? srcMatch[1] : "";
              const heightValue = heightMatch ? heightMatch[1] : "";
              const widthValue = widthMatch ? widthMatch[1] : "";
              const styleValue = styleMatch ? styleMatch[1] : "";

              // Render <noscript> with <iframe> inside
              return (
                <noscript
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: `<iframe
                    src=${srcValue}
                    height=${heightValue}
                    width=${widthValue}
                    style=${styleValue}
                  ></iframe>`,
                  }}
                ></noscript>
              );
            }

            return null; // If not google_tag_manager script type, return null or <></>
          })}
        <Providers>
          <div className="lg_screen_padding">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
        <script dangerouslySetInnerHTML={{ __html: `${loadScript}` }} />
      </body>
    </html>
  );
}
