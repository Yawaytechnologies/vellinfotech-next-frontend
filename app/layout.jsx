import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Header from "../components/common/header";
import Footer from "../components/common/Footer";
import Whatsapp from "../components/common/Whatsapp";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://www.vellinfotech.com"),
  title: {
    default: "Vell InfoTech | Best Software Training & Placement Chennai",
    template: "%s | Vell InfoTech",
  },
  description:
    "Vell InfoTech Chennai offers best software training & IT courses with 100% placement support. Learn Java, Python, Full Stack, AI, Data Science & get high-paying IT jobs.",
  openGraph: {
    siteName: "Vell InfoTech",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`}</Script>
        <style>{`
          .vell-toast-container{top:90px!important;width:100%!important;padding:0 12px!important;z-index:999999!important;}
          .vell-toast{border-radius:12px!important;}
          @media(max-width:767px){.vell-toast-container{top:60px!important;}}
        `}</style>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <div className="min-h-screen flex flex-col bg-slate-50 md:bg-gradient-to-br md:from-[#0a2d55] md:to-[#051a30]">
            <Header />
            <main className="flex-1 bg-transparent pt-[53px] md:pt-[87px]">
              {children}
            </main>
            <Footer />
            <Whatsapp phone="+91 9600593838" variant="float" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
