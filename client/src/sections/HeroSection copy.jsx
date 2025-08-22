import { useRef } from "react";
import useFadeUp from "../hooks/useFadeUp";
import heroImg from "../assets/images/hero.png";

export default function HeroSection() {
  const root = useRef(null);

  // root 영역 안에서 .reveal을 가진 요소 페이드업
  useFadeUp(root);

  return (
    <section
      ref={root}
      className="relative h-screen -mt-[90px] overflow-hidden"
    >
      {/* 이미지 레이어 */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" /> {/* 어두운 오버레이 */}
      </div>

      {/* 텍스트 컨텐츠 레이어 */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 text-center text-white">
        <h1 className="reveal text-xl md:text-2xl max-w-3xl leading-relaxed">
          코어렌(Koreren) 은 피부 미용기기 분야에서 성장하고 있는 브랜드로,
          저주파 기술을 활용해 근육 회복과 피부 건강 개선에 도움이 되는 고객
          중심의 혁신 제품을 개발하고 있습니다.
        </h1>
      </div>
    </section>
  );
}
