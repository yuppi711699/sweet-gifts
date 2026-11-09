import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GiftCards from "@/components/GiftCards";
import OrderExperience from "@/components/OrderExperience";
import Customization from "@/components/Customization";
import HowItWorks from "@/components/HowItWorks";
import CorporateOrders from "@/components/CorporateOrders";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <GiftCards />
        <OrderExperience>
          <Customization />
          <HowItWorks />
          <CorporateOrders />
        </OrderExperience>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
