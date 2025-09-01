// src/pages/product/ProductOne.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import prdFront from "../../assets/images/product/prd1/frontview.webp";
import prdSide from "../../assets/images/product/prd1/sideview.webp";

import useCarousel from "../../hooks/useCarousel";

export default function ProductOne() {
  const slides = [prdFront, prdSide]; // 필요 시 더 추가
  const { trackRef, extended, dotIndex, next, prev, goReal, isEager } =
    useCarousel(slides, {
      duration: 1.0,
      ease: "power2.out",
      autoplay: {
        enabled: true,
        delay: 4000,
        pauseOnHover: true,
        pauseOnVisibility: true,
      },
    });

  return (
    <main className="container mx-auto max-w-[1920px] lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-20">
        {/* 이미지 캐러셀 */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[720px] aspect-[720/755] overflow-hidden bg-black select-none">
            {/* 트랙 */}
            <div
              ref={trackRef}
              className="flex will-change-transform h-full w-full"
            >
              {extended.map((src, i) => {
                const idx = slides.indexOf(src);
                const safeIdx = idx === -1 ? i % slides.length : idx;
                return (
                  <div key={i} className="min-w-full h-full">
                    <img
                      src={src}
                      alt={`prd-${safeIdx}`}
                      className="w-full h-full object-cover"
                      draggable="false"
                      loading={isEager(i) ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
            </div>

            {/* 좌우 버튼 */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-black"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-black"
            >
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </button>
          </div>

          {/* 인디케이터 (캐러셀 바로 아래, 같은 grid cell) */}
          <div className="flex justify-center mt-4 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goReal(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition ${
                  i === dotIndex
                    ? "w-6 bg-black shadow ring-1 ring-black/10"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 제품 정보 */}
        <div>
          <div className="w-full mx-auto lg:w-[750px] px-20 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              DEEPERWAVE
            </h2>
            <p className="mt-2 text-2xl md:text-5xl text-gray-900">
              저주파 마사지기
            </p>

            <div className="mt-[62px] h-[2px] bg-black" />

            {/* 스펙 표 */}
            <dl className="mt-1 text-base md:text-lg">
              <div className="grid grid-cols-[140px_1fr] gap-x-6 py-4 border-b border-gray-400">
                <dt className="text-black ml-5">제품분류</dt>
                <dd className="font-medium">웰니스 전자기기</dd>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-x-6 py-4 border-b border-gray-400">
                <dt className="text-black ml-5">제품형태</dt>
                <dd className="font-medium">본체 + 핸드피스 + 전극패드</dd>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-x-6 py-4 border-b border-gray-400">
                <dt className="text-black ml-5">주요기능</dt>
                <dd className="font-medium">
                  저주파 자극, 3가지 모드, 강도조절 50단계
                </dd>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-x-6 py-4 border-b border-gray-400">
                <dt className="text-black ml-5">제품사양</dt>
                <dd className="font-medium leading-relaxed">
                  전원: 전용 어댑터 전원 공급 방식(충전식 아님)
                  <br />
                  크기/무게: 300×200×95mm / 1.7kg
                  <br />
                  사용시간: 최대 5시간 연속 사용 가능
                  <br />
                  재질: PC + ABS
                </dd>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-x-6 py-4 border-b border-gray-400">
                <dt className="text-black ml-5">구성품</dt>
                <dd className="font-medium leading-relaxed">
                  본체, 어댑터, Y자형연결선, 핸드피스, 전극패드, 실리콘링
                </dd>
              </div>
            </dl>

            {/* CTA */}

            <div className="flex justify-center">
              <button className="mt-30 w-full md:w-[260px] h-14 md:h-16 rounded-md bg-[#2f63b8] text-white text-lg md:text-xl font-semibold hover:opacity-95">
                제품 문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
