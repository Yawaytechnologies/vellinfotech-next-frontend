import HeroSection from "../components/home/Hero";
import WhyChooseUs from "../components/home/Whychooseus";
import LanguageStack from "../components/home/LanguageStack";
import AboutUs from "../components/home/AboutUs";
import PopularCoursesSection from "../components/home/PopularCourses";
import FAQSection from "../components/home/Faq";

export const metadata = {
  title: "Vell InfoTech | Best Software Training & Placement Chennai",
  description:
    "Vell InfoTech Chennai | Offers best software training & IT courses with 100% placement support | Learn Java, Python, Full Stack, AI, Data Science & get high-paying IT jobs.",
  keywords:
    "IT training institute in Chennai, Best IT training institute, Software training institute, IT courses with placement, Placement training institute, Software developer training, IT job training and placement",
  alternates: { canonical: "https://www.vellinfotech.com/" },
  openGraph: {
    title: "Vell InfoTech | Best Software Training & Placement Chennai",
    description:
      "Vell InfoTech Chennai | Offers best software training & IT courses with 100% placement support.",
    url: "https://www.vellinfotech.com/",
    type: "website",
  },
};

export default function HomePage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Vell InfoTech",
    url: "https://www.vellinfotech.com",
    logo: "https://www.vellinfotech.com/images/Logoo.png",
    description:
      "Best IT training institute in Chennai offering software courses with 100% placement support.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    telephone: "+91-9600593838",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className="bg-white pt-10 md:pt-26 lg:pt-28">
        <HeroSection />
        <div id="next-section">
          <AboutUs />
        </div>
        <WhyChooseUs />
        <LanguageStack />
        <PopularCoursesSection />
        <FAQSection />
      </div>
    </>
  );
}
