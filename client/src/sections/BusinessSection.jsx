import business from "../assets/images/business/medical.png";
import aesthetic from "../assets/images/business/aesthetic.jpg";
import homecare from "../assets/images/business/homecare.jpg";
import { useRef } from "react";
import useFadeUp from "../hooks/useFadeUp";

export default function BusinessSection() {
  const root = useRef(null);

  // root 영역 안에서 .reveal 요소에 페이드업
  useFadeUp(root);

  return (
    <section ref={root} className="py-24 bg-gray-50">
      <div className="reveal w-full space-y-10">
        {/* 헤더 + 설명 */}
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
            사업 소개
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            글로벌 No.1 세계 최고의 미용의료 플랫폼 디퍼웨이브
          </p>
        </div>

        {/* 시각화 영역 */}
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-3">
            <article className="bg-gray-100 overflow-hidden">
              <img src={business} alt="#" className="w-full object-cover" />
              <div className="py-5 px-3">
                <h2 className="text-base md:text-lg font-semibold text-left mb-4">
                  MEDICAL
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  코어렌(Koreren)은 피부과, 에스테틱, 메디컬 뷰티 현장에서
                  안정적이고 효율적인 케어를 지원하는 의료·미용 솔루션을
                  제공합니다. 복잡하고 시간이 많이 소요되던 기존 장비의 한계를
                  개선해, 누구나 직관적으로 사용할 수 있는 설계를 구현했습니다.
                  안전성과 기술력을 바탕으로, 피부케어 샵 창업자부터 숙련된
                  전문가까지 모두에게 새로운 가능성과 만족스러운 케어 경험을
                  제공합니다.
                </p>
              </div>
            </article>

            <article className="bg-gray-100 overflow-hidden">
              <img src={aesthetic} alt="#" className="w-full object-cover" />
              <div className="py-5 px-3">
                <h2 className="text-base md:text-lg font-semibold text-left mb-4">
                  AESTHETIC
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  코어렌은 국내외 미용·메디컬 시장에 특화된 뷰티 케어 기기를
                  개발·제공하며, 미용 센터와 피부케어 샵의 서비스 품질과 운영
                  표준을 한층 높이는 것을 목표로 합니다.
                </p>
              </div>
            </article>

            <article className="bg-gray-100 overflow-hidden">
              <img src={homecare} alt="#" className="w-full object-cover" />
              <div className="py-5 px-3">
                <h2 className="text-base md:text-lg font-semibold text-left mb-4">
                  SOLO STARTUP
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  피부케어 경험이 많지 않아도, 코어렌의 직관적이고 간편한 설계로
                  누구나 쉽게 시작할 수 있습니다. 복잡한 교육이나 고가 장비
                  없이도 안정적이고 효과적인 케어를 제공할 수 있어, 소규모
                  창업과 개인 샵 운영에 새로운 기회를 열어드립니다.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
