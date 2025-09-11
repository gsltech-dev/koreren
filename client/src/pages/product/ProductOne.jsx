// src/pages/product/ProductOne.jsx
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import prdFront from "../../assets/images/product/prd1/frontview.webp";
import prdSide from "../../assets/images/product/prd1/sideview.webp";
import detailImg from "../../assets/images/product/prd1/product-detail.jpeg";
import exchangeImg from "../../assets/images/product/prd1/exchange-return.jpeg";

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
      {/* 메인 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-10 lg:gap-y-20">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20  text-[#b3b3b3]"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20  text-[#b3b3b3]"
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

        <div className="w-full mx-auto lg:w-[750px] px-3 lg:px-20 overflow-hidden">
          <h2 className="text-center lg:text-left text-[30px] md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            DEEPERWAVE
          </h2>
          <p
            className="
            text-center lg:text-left text-[30px] lg:mt-2 text-2xl md:text-4xl lg:text-5xl text-gray-900"
          >
            저주파 마사지기
          </p>

          <div className="mt-[30px] lg:mt-[62px] h-[2px] bg-black" />

          {/* 스펙 표 */}
          <dl className="mt-1 text-[15px] md:text-lg">
            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-x-6 py-4 border-b border-gray-400">
              <dt className="text-black ml-3 md:ml-6 text-[14px] md:text-[17px]">
                제품분류
              </dt>
              <dd className="font-medium">웰니스 전자기기</dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-x-6 py-4 border-b border-gray-400">
              <dt className="text-black ml-3 md:ml-6 text-[14px] md:text-[17px]">
                제품형태
              </dt>
              <dd className="font-medium">본체 + 핸드피스 + 전극패드</dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-x-6 py-4 border-b border-gray-400">
              <dt className="text-black ml-3 md:ml-6 text-[14px] md:text-[17px]">
                주요기능
              </dt>
              <dd className="font-medium">
                저주파 자극, 3가지 모드, 강도조절 50단계
              </dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-x-6 py-4 border-b border-gray-400">
              <dt className="text-black ml-3 md:ml-6 text-[14px] md:text-[17px]">
                제품사양
              </dt>
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

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-x-6 py-4 border-b border-gray-400">
              <dt className="text-black ml-3 md:ml-6 text-[14px] md:text-[17px]">
                구성품
              </dt>
              <dd className="font-medium leading-relaxed">
                본체, 어댑터, Y자형연결선, 핸드피스, 전극패드, 실리콘링
              </dd>
            </div>
          </dl>

          {/* CTA */}

          <div className="flex justify-center">
            <Link
              to="/contact"
              className="mt-15 md:mt-30 w-full md:w-[260px] h-14 md:h-16 rounded-md bg-[#2f63b8] text-white text-lg md:text-xl font-semibold flex items-center justify-center hover:opacity-95"
            >
              제품 문의하기
            </Link>
          </div>
        </div>
      </div>
      {/* 메인 섹션 끝*/}

      {/* 상세정보 섹션 */}
      <div className="mt-20 md:mt-30 w-full flex justify-center px-3 lg:px-0">
        <div className="w-[1660px]">
          {/* 제목 */}
          <h3 className="text-2xl md:text-2xl text-center border-b-2 border-black pb-3">
            상세정보
          </h3>

          {/* 상세정보 표 */}
          <dl className="mt-1 text-[15px] md:text-lg">
            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-6 py-4 border-b border-gray-300 text-[14px] md:text-[17px]">
              <dt className="text-gray-600 font-medium ml-3 lg:ml-6 ">
                포장단위
              </dt>
              <dd>1세트 (본체 및 기본 구성품 포함)</dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-6 py-4 border-b border-gray-300 text-[14px] md:text-[17px]">
              <dt className="text-gray-600 font-medium ml-3 lg:ml-6 ">
                사용환경
              </dt>
              <dd>실내용/권장 온도 0~40℃</dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-6 py-4 border-b border-gray-300 text-[14px] md:text-[17px]">
              <dt className="text-gray-600 font-medium ml-3 lg:ml-6">
                보관환경
              </dt>
              <dd>직사광선을 피한 건조한 장소 / 권장 온도 -20~60℃</dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-6 py-4 border-b border-gray-300  text-[14px] md:text-[17px]">
              <dt className="text-gray-600 font-medium ml-3 lg:ml-6">
                보관방법
              </dt>
              <dd>
                사용 후 핸드피스와 전극패드를 청결히 관리하고, 핸드피스는 본체
                거치대에 보관하십시오.
              </dd>
            </div>

            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-x-2 lg:gap-6 py-4 border-b border-gray-300 text-[14px] md:text-[17px]">
              <dt className="text-gray-600 font-medium ml-3 lg:ml-6 ">
                주의사항
              </dt>
              <dd className="leading-relaxed text-[13px] md:text-[17px]">
                <strong className="font-bold">
                  본 제품은 의료기기가 아닌 웰니스 전자기기로 질병의 진단·치료
                  목적으로 사용할 수 없습니다.
                </strong>
                <br />
                사용 전 반드시 피부에 수분(물·수분크림·젤 등)을 도포하고, 사용
                중 건조해지면 수분을 보충하십시오.
                <br />
                임신 중, 심장질환자, 체내 전자기기(심박기 등) 착용자는 사용하지
                마십시오.
                <br />
                동일 부위에 장시간 사용을 피하고, 피부 이상 시 즉시 사용을
                중단하십시오.
                <br />
                보다 자세한 내용은 사용설명서를 참고해 주십시오.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/*상세정보 섹션 끝 */}

      {/* 상세페이지 영역 */}
      <section className="mt-20 flex justify-center px-3">
        <div className="w-full max-w-[900px]">
          {/* 1. Product Detail */}
          <figure className="mb-10">
            <img
              src={detailImg}
              alt="Product detail image"
              loading="lazy"
              className="w-full h-auto"
            />
            <figcaption className="sr-only">Product Detail Image</figcaption>
          </figure>

          {/* 2. Exchange & Return Policy */}
          <figure>
            <img
              src={exchangeImg}
              alt="Exchange and return policy image"
              loading="lazy"
              className="w-full h-auto"
            />
            <figcaption className="sr-only">
              Exchange & Return Policy
            </figcaption>
          </figure>
        </div>
      </section>
      {/* 상세페이지 영역 끝 */}
    </main>
  );
}
