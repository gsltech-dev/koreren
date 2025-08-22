// src/hooks/useLenis.js
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis + GSAP ScrollTrigger 부드러운 스크롤 훅
 * @param {Object} options - Lenis 옵션(선택)
 *  예) { duration: 1.0, wheelMultiplier: 1.0, touchMultiplier: 1.2, easing: (t)=>1-Math.pow(1-t,3) }
 */
export default function useLenis(options = {}) {
  const lenisRef = useRef(null);
  const tickerCbRef = useRef(null);

  useEffect(() => {
    // 사용자 모션 최소화 설정이면 비활성화
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1, // 관성 길이(감속) 0.8~1.5 추천
      smoothWheel: true, // 휠 부드럽게
      smoothTouch: true, // 터치 부드럽게
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      ...options,
    });

    lenisRef.current = lenis;
    // 전역 접근(앵커 스크롤 등에서 사용)
    window.__lenis = lenis;

    // Lenis 스크롤 이벤트가 발생할 때 ScrollTrigger 업데이트
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker로 Lenis 구동 → 동기화 & 성능 안정
    const tickerCb = (time) => {
      // gsap.ticker는 seconds 단위 → lenis.raf는 ms 필요
      lenis.raf(time * 1000);
    };
    tickerCbRef.current = tickerCb;
    gsap.ticker.add(tickerCb);

    // rAF 지연 보정 끄기(부드러움 향상)
    const prevLag = gsap.ticker.lagSmoothing();
    gsap.ticker.lagSmoothing(0);

    // 초기 리프레시
    ScrollTrigger.refresh();

    return () => {
      // 정리
      if (tickerCbRef.current) gsap.ticker.remove(tickerCbRef.current);
      gsap.ticker.lagSmoothing(
        ...(Array.isArray(prevLag) ? prevLag : [1000, 16])
      );
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [options]);
}

/**
 * 선택: 전역 앵커 스크롤 도우미
 * 예) onClick={() => scrollToTarget('#section1', { offset: -90 })}
 */
export function scrollToTarget(target, opts = {}) {
  const lenis = window.__lenis;
  if (!lenis) return;
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  lenis.scrollTo(el, {
    offset: 0,
    duration: 1.0,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    ...opts,
  });
}
