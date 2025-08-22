// src/hooks/useCarousel.js
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";

/**
 * useCarousel
 * - 무한 루프(클론 + 스냅)
 * - 인디케이터 즉시 반응(dotIndex), 트랙은 GSAP 애니메이션(cur)
 * - autoplay 옵션 지원 (호버/가시성에 따른 일시정지 포함)
 *
 * @param {string[]} slides
 * @param {object} options
 * @param {number}  [options.duration=0.6]                // 전환 시간 (초)
 * @param {string}  [options.ease="power3.out"]           // GSAP easing
 * @param {object}  [options.autoplay]
 * @param {boolean} [options.autoplay.enabled=false]      // 자동재생 사용 여부
 * @param {number}  [options.autoplay.delay=3500]         // 간격(ms)
 * @param {boolean} [options.autoplay.pauseOnHover=true]  // 호버 시 일시정지
 * @param {boolean} [options.autoplay.pauseOnVisibility=true] // 탭 비가시성 시 일시정지
 */
export default function useCarousel(
  slides,
  {
    duration = 1.0,
    ease = "power2.out",
    autoplay = {
      enabled: false,
      delay: 3500,
      pauseOnHover: true,
      pauseOnVisibility: true,
    },
  } = {}
) {
  const trackRef = useRef(null);
  const isAnimating = useRef(false);

  // autoplay 관리
  const intervalRef = useRef(null);
  const savedNextRef = useRef(null);

  // [마지막 클론, 실제1..N, 첫 클론]
  const extended = [slides[slides.length - 1], ...slides, slides[0]];
  const LEN = slides.length;
  const REAL_FIRST = 1;
  const REAL_LAST = LEN;

  // 트랙 위치(extended 기준) + 인디케이터(0..LEN-1)
  const initialCur = REAL_FIRST;
  const [cur, setCur] = useState(initialCur);
  const [dotIndex, setDotIndex] = useState((initialCur - 1 + LEN) % LEN);

  // autoplay 상태 (enabled면 기본 재생, 아니면 정지)
  const [isPaused, setPaused] = useState(!autoplay?.enabled);

  // 초기 위치(화면 그리기 전 고정) — transform은 GSAP만 제어
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -100 * cur, force3D: true });
  }, []); // eslint-disable-line

  // 스냅(애니메 없이 위치 세팅)
  const snapTo = (pos) => {
    const el = trackRef.current;
    gsap.set(el, { xPercent: -100 * pos, force3D: true });
    setCur(pos);
  };

  // 공통 이동 (한 칸 이동 후 경계에서 스냅)
  const moveTo = (to) => {
    const el = trackRef.current;
    if (!el || isAnimating.current) return;

    isAnimating.current = true;
    gsap.killTweensOf(el);

    gsap.to(el, {
      xPercent: -100 * to,
      duration,
      ease,
      force3D: true,
      overwrite: "auto",
      onComplete: () => {
        if (to === REAL_LAST + 1) {
          // 마지막 클론 → 실제 첫 장
          snapTo(REAL_FIRST);
        } else if (to === 0) {
          // 첫 클론 → 실제 마지막
          snapTo(REAL_LAST);
        } else {
          setCur(to);
        }
        isAnimating.current = false;
      },
    });
  };

  // 다음/이전 (인디케이터는 즉시 반응)
  const next = () => {
    if (isAnimating.current) return;
    setDotIndex((d) => (d + 1) % LEN);
    moveTo(cur + 1);
  };
  const prev = () => {
    if (isAnimating.current) return;
    setDotIndex((d) => (d - 1 + LEN) % LEN);
    moveTo(cur - 1);
  };

  // 인디케이터 클릭 이동 (경계 자연스럽게 처리)
  const goReal = (i /* 0..LEN-1 */) => {
    if (isAnimating.current) return;
    setDotIndex(i);
    const target = i + 1; // extended 기준
    if (cur === REAL_LAST && target === REAL_FIRST) {
      moveTo(REAL_LAST + 1); // → 1로
    } else if (cur === REAL_FIRST && target === REAL_LAST) {
      moveTo(0); // ← 마지막으로
    } else {
      moveTo(target);
    }
  };

  // 현재/인접 슬라이드 eager 로딩 → 빈 프레임 방지
  const isEager = (i) => i === cur || i === cur - 1 || i === cur + 1;

  /* ---------- Autoplay ---------- */

  // 최신 next 참조 저장 (클로저 이슈 방지)
  useEffect(() => {
    savedNextRef.current = next;
  }, [next]);

  const clearIntervalSafe = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (autoplay?.pauseOnVisibility && document.visibilityState !== "visible")
        return;
      savedNextRef.current?.();
    }, autoplay?.delay ?? 3500);
  };

  // autoplay 메인 이펙트
  useEffect(() => {
    if (!autoplay?.enabled || isPaused) {
      clearIntervalSafe();
      return;
    }
    startInterval();
    return clearIntervalSafe;
  }, [
    autoplay?.enabled,
    autoplay?.delay,
    isPaused,
    autoplay?.pauseOnVisibility,
  ]);

  // 탭 가시성 변화 시 처리
  useEffect(() => {
    if (!autoplay?.enabled || !autoplay?.pauseOnVisibility) return;
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        clearIntervalSafe();
      } else if (!isPaused) {
        startInterval();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [autoplay?.enabled, autoplay?.pauseOnVisibility, isPaused]);

  // 외부 제어용 API
  const autoplayApi = {
    paused: isPaused,
    start: () => setPaused(false),
    stop: () => {
      setPaused(true);
      clearIntervalSafe();
    },
    onMouseEnter: autoplay?.pauseOnHover ? () => autoplayApi.stop() : undefined,
    onMouseLeave: autoplay?.pauseOnHover
      ? () => autoplayApi.start()
      : undefined,
  };

  return {
    // 렌더링/제어
    trackRef,
    extended,
    dotIndex,
    next,
    prev,
    goReal,
    isEager,

    // autoplay 제어
    autoplay: autoplayApi,
  };
}
