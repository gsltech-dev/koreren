import HeroSection from "../sections/HeroSection";
import ProductSection from "../sections/ProductSection";
import BusinessSection from "../sections/BusinessSection";
import LinkSection from "../sections/LinkSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSection />
      <BusinessSection />
      <LinkSection />
      {/* 다른 섹션들 */}
    </div>
  );
}
