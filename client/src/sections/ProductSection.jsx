// src/components/ProductSection.jsx
import { Link } from "react-router-dom";
import usePairCarousel from "../hooks/usePairCarousel";
import prd1 from "../assets/images/product/banner_portrait(1000x1333).webp";
import prd2 from "../assets/images/product/banner_prd_1.webp";
import prd3 from "../assets/images/product/banner_prd_2.webp";
import prd4 from "../assets/images/product/banner_prd_3.webp";
import prd5 from "../assets/images/product/banner_prd_4.webp";

const items = [
  { src: prd2, title: "핸드피스 올핏", link: "/products/allfit" },
  { src: prd3, title: "핸드피스 헤드핏", link: "/products/headfit" },
  { src: prd4, title: "핸드피스 집중핏", link: "/products/focusfit" },
  { src: prd5, title: "DEEPERWAVE", link: "/products/deeperwave" },
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
    <section className="">
      <div className="w-full py-[100px] lg:py-[170px] lg:pl-[170px] space-y-10">
        <div className="text-center lg:text-left px-3 md:px-0">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-[#315fa7] mb-4 pb-4 lg:pb-[32px]">
            WELLNESS WITHOUT LIMITS,
            <br /> WHEREVER YOU ARE
          </h3>
          <h4 className=" text-2xl md:text-3xl lg:text-7xl font-bold mb-4 pb-4 lg:pb-[110px]">
            당신의 매일이 균형을 갖추도록
          </h4>
          <p className="text-gray-800 leading-snug md:leading-tight text-[14px] md:text-2xl lg:text-5xl">
            우리는 당신의 라이프스타일에 자연스럽게 스며들어
            <br />
            일상 속에서 균형과 회복을 선사하는 웰니스 경험을 만듭니다.
          </p>
        </div>
      </div>

      <div className="container max-w-full mx-auto">
        <div className="text-center lg:text-left lg:px-[170px]">
          <h3 className="text-3xl md:text-4xl lg:text-7xl font-semibold text-[#000000] pb-4 mb:pb-8 lg:pb-[80px]">
            BEST & NEW
          </h3>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 py-5">
          <div className="col-span-1 relative">
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
              className="overflow-hidden select-none md:hidden touch-pan-y"
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
                      <div className="bg-gray-50 rounded ">
                        <img
                          src={it.src}
                          alt={`prd-m-${i}`}
                          className="w-full h-full overflow-hidden select-none"
                          draggable="false"
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </div>
                      <div className="bg-gray-50 flex flex-col justify-center items-center py-8 rounded">
                        <h3 className="text-base font-bold">{it.title}</h3>
                        <Link
                          to={it.link}
                          className="mt-2 text-sm font-medium text-[#707070] hover:text-gray-600"
                        >
                          VIEW MORE
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* md 이상: 2×2 그리드 */}
            <ul className="hidden md:grid grid-cols-2 gap-5 h-full">
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
                    <div className="bg-gray-50 flex flex-col justify-center items-center py-10">
                      <h3 className="text-[15px] md:text-xl lg:text-2xl font-bold">
                        {it.title}
                      </h3>
                      <Link
                        to={it.link}
                        className="mt-3 text-sm md:text-base font-medium text-[#707070] hover:text-gray-600"
                      >
                        <span>VIEW MORE</span>
                      </Link>
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
