// src/components/HeroSection.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useCarousel from "../hooks/useCarousel";

import main1 from "../assets/images/main/bg_5.jpg";
import main2 from "../assets/images/main/bg_2.jpg";
import main3 from "../assets/images/main/bg_3.jpg";
import main4 from "../assets/images/main/bg_4.jpg";

import mainM1 from "../assets/images/main/main_m_1.jpg";
import mainM2 from "../assets/images/main/main_m_2.jpg";
import mainM3 from "../assets/images/main/main_m_3.jpg";
import mainM4 from "../assets/images/main/main_m_4.jpg";

// 기본은 모바일 이미지
const slides = [mainM1, mainM2, mainM3, mainM4];
// lg(1024px~)에서 쓸 데스크톱 이미지 (순서 1:1 매칭)
const slidesLg = [main1, main2, main3, main4];

export default function HeroSection() {
  const { trackRef, extended, dotIndex, next, prev, goReal, isEager } =
    useCarousel(slides, {
      duration: 1.0,
      ease: "power2.out",
      autoplay: {
        enabled: true,
        delay: 6000,
        pauseOnHover: false,
        pauseOnVisibility: true,
      },
    });

  const baseLen = slides.length;

  return (
    <section className="relative h-auto lg:h-screen -mt-[90px] overflow-hidden select-none bg-black">
      {/* 트랙 */}
      <div
        ref={trackRef}
        className="flex will-change-transform lg:absolute lg:inset-0"
      >
        {extended.map((src, i) => {
          // 원본 인덱스 역매핑 (순환/복제 대비)
          const idx = slides.indexOf(src);
          const safeIdx = idx === -1 ? i % baseLen : idx;
          const lgSrc = slidesLg[safeIdx];

          return (
            <div key={i} className="min-w-full h-full bg-black ">
              <picture>
                {/* lg 이상에서는 데스크톱 이미지 사용 */}
                <source media="(min-width: 1024px)" srcSet={lgSrc} />
                {/* 기본(모바일/태블릿)은 모바일 이미지 */}
                <img
                  src={src}
                  alt={`slide-${safeIdx + 1}`}
                  className="w-full h-full lg:object-cover"
                  draggable="false"
                  loading={isEager(i) ? "eager" : "lazy"}
                  decoding="async"
                  sizes="100vw"
                  {...(isEager(i) ? { fetchpriority: "high" } : {})}
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* 좌우 버튼 */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white z-20"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white z-20"
      >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goReal(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition
              ${
                i === dotIndex
                  ? "bg-white shadow ring-1 ring-black/10 scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
