import HeroSection from "../sections/HeroSection";
import ProductSection from "../sections/ProductSection";
// import BusinessSection from "../sections/BusinessSection";
import InstaSection from "../sections/InstaSection";
import PartnersSection from "../sections/PartnersSection";
// import LinkSection from "../sections/LinkSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSection />
      <InstaSection />
      <PartnersSection />
      {/* <BusinessSection />
      <LinkSection /> */}
      {/* 다른 섹션들 */}
    </div>
  );
}
