

import NavBar from "@/components/Home/nav-bar";
import Footer from "@/components/Home/footer";
import HeroSection from "@/components/Home/hero-section";
import FeaturesSection from "@/components/Home/features";
import CtaSection from "@/components/Home/cta-section";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}

        <FeaturesSection   />
        

        {/* CTA Section */}
        <CtaSection />
       
      </main>

      <Footer />
    </div>
  );
}
