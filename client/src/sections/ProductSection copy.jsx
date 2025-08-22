import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import useFadeUp from "../hooks/useFadeUp";

import prd1 from "../assets/images/product/prd_1.png";
import prd2 from "../assets/images/product/prd_2.png";
import prd3 from "../assets/images/product/prd_3.png";

const slides = [prd1, prd2, prd3];

export default function ProductSection() {
  const root = useRef(null);
  // root 영역 안에서 .reveal 요소에 페이드업
  useFadeUp(root);

  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(trackRef.current, { xPercent: -100 * index });
  }, []);

  useLayoutEffect(() => {
    gsap.to(trackRef.current, {
      xPercent: -100 * index,
      duration: 1.2,
      ease: "power4.inOut",
    });
  }, [index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));

  return (
    <section ref={root} className="pt-24 bg-gray-50">
      <div className="reveal w-full space-y-10">
        {/* 제품소개 텍스트 */}
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

        {/* 슬라이더 박스: 높이 고정 → 이미지가 항상 같은 높이로 꽉 참 */}
        <div className="relative bg-gray-50 overflow-hidden">
          {/* 트랙: 가로로 나열 */}
          <div ref={trackRef} className="reveal flex h-full">
            {slides.map((src, i) => (
              <div
                key={i}
                className="min-w-full h-full flex items-center justify-center"
              >
                {/* 이미지 래퍼: 이미지 실제 너비에 맞춰짐 → 버튼이 항상 이미지 옆에 붙음 */}
                <div className="relative w-fit h-full flex items-center">
                  {/* 이미지: 높이 꽉 채움 (예전 ‘꽉 찬’ 느낌 유지). 
                      자르지 않고 비율 유지하려면 object-contain, 
                      꽉 채우며 잘라도 되면 object-cover */}
                  <img
                    src={src}
                    alt={`product-${i + 1}`}
                    className="block h-full w-auto object-contain"
                    draggable="false"
                  />

                  {/* 현재 슬라이드에서만 버튼 표시 + 양쪽에 ‘붙어서’ 위치 */}
                  {i === index && index > 0 && (
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="absolute left-0 top-1/2 -translate-y-1/2
                                 grid place-items-center h-10 w-10 rounded-md
                                 text-gray-400 backdrop-blur-sm"
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="2xl"
                        className="hover:text-blue-500 transition-colors"
                      />
                    </button>
                  )}
                  {i === index && index < slides.length - 1 && (
                    <button
                      onClick={next}
                      aria-label="Next"
                      className="absolute right-0 top-1/2 -translate-y-1/2
                                 grid place-items-center h-10 w-10 rounded-md
                                 text-gray-400 backdrop-blur-sm"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        size="2x"
                        className="hover:text-blue-500 transition-colors"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
