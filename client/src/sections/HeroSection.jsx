// src/components/HeroSection.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useCarousel from "../hooks/useCarousel";

import main1 from "../assets/images/main/banner_01.webp";
import main2 from "../assets/images/main/banner_02.webp";
import main3 from "../assets/images/main/banner_03.webp";
import mainM1 from "../assets/images/main/banner_m_01.webp";
import mainM2 from "../assets/images/main/banner_m_02.webp";
import mainM3 from "../assets/images/main/banner_m_03.webp";

// 각 슬라이드별 링크 정의
const slides = [
  { m: mainM1, lg: main1, href: "/product/1", label: "제품 보기" },
  { m: mainM2, lg: main2, href: "/product/1", label: "제품 보기" },
  { m: mainM3, lg: main3, href: "/", label: "홈" },
];

// useCarousel는 모바일 src 배열을 받도록 유지
const mobileSources = slides.map((s) => s.m);

export default function HeroSection() {
  const { trackRef, extended, dotIndex, next, prev, goReal, isEager } =
    useCarousel(mobileSources, {
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
      <div
        ref={trackRef}
        className="flex will-change-transform lg:absolute lg:inset-0"
      >
        {extended.map((src, i) => {
          const idx = mobileSources.indexOf(src);
          const safeIdx = idx === -1 ? i % baseLen : idx;
          const s = slides[safeIdx];

          return (
            <div key={i} className="min-w-full h-full bg-black">
              <Link to={s.href} aria-label={s.label} className="block h-full">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={s.lg} />
                  <img
                    src={s.m}
                    alt={`slide-${safeIdx + 1}`}
                    className="w-full h-full lg:object-cover"
                    draggable="false"
                    loading={isEager(i) ? "eager" : "lazy"}
                    decoding="async"
                    sizes="100vw"
                    {...(isEager(i) ? { fetchPriority: "high" } : {})}
                  />
                </picture>
              </Link>
            </div>
          );
        })}
      </div>

      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#b3b3b3] z-20"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#b3b3b3] z-20"
      >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goReal(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition ${
              i === dotIndex
                ? "w-6 bg-[#1b1b1b] shadow ring-1 ring-black/10"
                : "w-1.5 bg-[#cecece] hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
