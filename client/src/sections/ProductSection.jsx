// src/components/ProductSection.jsx
import usePairCarousel from "../hooks/usePairCarousel";
import prd1 from "../assets/images/product/prod_1.jpg";
import prd2 from "../assets/images/product/prod_2.png";
import prd3 from "../assets/images/product/prod_3.png";
import prd4 from "../assets/images/product/prod_4.png";
import prd5 from "../assets/images/product/prod_5.png";

const items = [
  { src: prd2, title: "마크스 핏 레드 쿠션" },
  { src: prd3, title: "마크스 핏 AI 필터 쿠션" },
  { src: prd4, title: "글라이드 앤 하이드 블러링 컨실러" },
  { src: prd5, title: "마크스 핏 레드 파운데이션" },
];

export default function ProductSection() {
  const { wrapRef, trackRef, dragHandlers, autoplay } = usePairCarousel(
    items.length,
    {
      duration: 0.55,
      ease: "power3.out",
      swipeThreshold: 28,
      velocityBoost: 1.15,
      autoplay: {
        enabled: true, // 모바일에서만 동작
        delay: 4000,
        pauseOnHover: true, // 모바일은 영향 적지만 데스크톱 축소창 대비
        pauseOnVisibility: true,
        mobileOnly: true, // <768px 에서만
      },
    }
  );

  return (
    <section className="pt-24">
      <div className="w-full space-y-10 pb-24">
        <div className="text-center">
          <h3 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-red-600 mb-4 pb-4 lg:pb-10">
            BE YOU,
            <br className="block md:hidden" /> BE CONFIDENT
          </h3>
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pb-4 lg:pb-10">
            나만의 색깔로 빛나는 일상을 만들어주는 메이크업 브랜드
          </h4>
          <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl lg:text-2xl">
            나만의 색깔을 찾고 자신만의 개성을 마음껏 표현할 수 있도록,
            <br className="hidden md:block" />
            코어렌은 다양한 컬러 옵션을 통해
            <br className="hidden md:block" />
            당신의 일상이 더 빛나도록 만들어줍니다.
          </p>
        </div>
      </div>

      <div className="container max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-3 py-5">
          <div className="col-span-1">
            <img
              src={prd1}
              alt="prd1"
              className="w-full h-full overflow-hidden"
            />
          </div>

          <div className="col-span-1">
            {/* 모바일 캐러셀: 모바일에서만 autoplay. 호버 시 일시정지 핸들러 포함 */}
            <div
              ref={wrapRef}
              className="relative overflow-hidden select-none md:hidden touch-pan-y"
              {...autoplay.hoverHandlers}
            >
              <ul ref={trackRef} {...dragHandlers} className="flex touch-pan-y">
                {[
                  items[items.length - 2],
                  items[items.length - 1],
                  ...items,
                  items[0],
                  items[1],
                ].map((it, i) => (
                  <li key={i} className="w-1/2 shrink-0 px-2">
                    <div className="grid grid-cols-1 h-full">
                      <div className="bg-gray-50 rounded">
                        <img
                          src={it.src}
                          alt={`prd-m-${i}`}
                          className="w-full h-full overflow-hidden select-none"
                          draggable="false"
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </div>
                      <div className="bg-gray-50 flex justify-center items-center py-8 rounded">
                        <h3 className="text-base font-bold">{it.title}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* md 이상: 2×2 그리드 */}
            <ul className="hidden md:grid grid-cols-2 gap-4 h-full">
              {items.map((it, i) => (
                <li key={i} className="bg-white">
                  <div className="grid grid-cols-1 h-full">
                    <div className="bg-gray-50">
                      <img
                        src={it.src}
                        alt={`prd-${i + 2}`}
                        className="w-full h-full overflow-hidden"
                      />
                    </div>
                    <div className="bg-gray-50 flex justify-center items-center py-10">
                      <h3 className="text-[15px] md:text-xl lg:text-2xl font-bold">
                        {it.title}
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
