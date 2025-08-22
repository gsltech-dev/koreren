// src/hooks/usePairCarousel.js
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

/**
 * usePairCarousel + 모바일 전용 autoplay
 * - 2장 뷰(카드폭=50%), 스와이프(1~2장), 무한루프(±2 클론)
 * - autoplay: 모바일(<768px)에서만 동작, 호버/가시성/드래그 시 일시정지
 */
export default function usePairCarousel(
  count,
  {
    duration = 1.0,
    ease = "power3.out",
    swipeThreshold = 28, // 스와이프 감지 최소 픽셀
    velocityBoost = 1.15, // 속도 보정 계수
    autoplay = {
      enabled: false, // autoplay 사용 여부
      delay: 3500, // autoplay 간격(ms)
      pauseOnHover: false, // hover 시 정지
      pauseOnVisibility: false, // 탭 비활성 시 정지
      mobileOnly: true, // 모바일에서만 autoplay
    },
  } = {}
) {
  // 확장 인덱스 범위: [L2, L1, 0..N-1, F0, F1]
  const REAL_START = 2; // 실제 첫 카드 위치
  const REAL_END = count + 1; // 실제 마지막 카드 위치
  const MIN_I = 0; // 확장 최소 인덱스
  const MAX_I = count + 2; // 확장 최대 인덱스

  const [pos, setPos] = useState(REAL_START); // 현재 위치

  const wrapRef = useRef(null); // wrapper(<div>)
  const trackRef = useRef(null); // track(<ul>)
  const isAnimating = useRef(false); // 애니메이션 중 여부
  const activePointerId = useRef(null); // 현재 드래그 포인터 id

  // 드래그 상태 저장
  const drag = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    delta: 0,
    startT: 0,
    lastT: 0,
  });

  /* ------ autoplay state ------ */
  const intervalRef = useRef(null); // setInterval 참조
  const [isPaused, setPaused] = useState(!autoplay?.enabled); // autoplay 정지 여부
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? !window.matchMedia("(min-width: 768px)").matches
      : true
  );

  // 화면 리사이즈 대응: 768px 이상이면 데스크탑 → autoplay 차단
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsMobile(!mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const clearIntervalSafe = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // autoplay 가능 조건 체크
  const canAutoplay = () => {
    if (!autoplay?.enabled) return false;
    if (autoplay?.mobileOnly && !isMobile) return false;
    if (isPaused) return false;
    if (
      autoplay?.pauseOnVisibility &&
      typeof document !== "undefined" &&
      document.visibilityState !== "visible"
    )
      return false;
    return true;
  };

  // autoplay 시작
  const startInterval = () => {
    if (intervalRef.current || !canAutoplay()) return;
    intervalRef.current = setInterval(() => {
      if (!canAutoplay()) return;
      // 한 카드(50%)씩 이동
      moveTo(Math.min(MAX_I, pos + 1));
    }, autoplay?.delay ?? 3500);
  };

  // autoplay 상태 감시
  useEffect(() => {
    if (canAutoplay()) startInterval();
    else clearIntervalSafe();
    return clearIntervalSafe;
  }, [
    isMobile,
    isPaused,
    autoplay?.enabled,
    autoplay?.delay,
    autoplay?.mobileOnly,
    autoplay?.pauseOnVisibility,
    pos,
  ]);

  // 브라우저 visibilitychange 이벤트 처리
  useEffect(() => {
    if (!autoplay?.enabled || !autoplay?.pauseOnVisibility) return;
    const onVis = () => {
      if (document.visibilityState === "hidden") clearIntervalSafe();
      else startInterval();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [autoplay?.enabled, autoplay?.pauseOnVisibility]);

  // 외부로 제공할 autoplay API
  const autoplayApi = {
    paused: isPaused,
    start: () => setPaused(false),
    stop: () => {
      setPaused(true);
      clearIntervalSafe();
    },
    hoverHandlers: autoplay?.pauseOnHover
      ? {
          onMouseEnter: () => autoplayApi.stop(),
          onMouseLeave: () => autoplayApi.start(),
        }
      : {},
  };

  // 초기 위치
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -pos * 50, force3D: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // snapTo: 애니메이션 없이 바로 위치 세팅
  const snapTo = (i) => {
    const el = trackRef.current;
    gsap.set(el, { xPercent: -i * 50, force3D: true });
    setPos(i);
  };

  // moveTo: 애니메이션으로 이동 + 루프 경계 보정
  const moveTo = (to) => {
    const el = trackRef.current;
    if (!el || isAnimating.current) return;

    isAnimating.current = true;
    gsap.killTweensOf(el);

    gsap.to(el, {
      xPercent: -to * 50,
      duration,
      ease,
      force3D: true,
      overwrite: "auto",
      onComplete: () => {
        if (to > REAL_END) {
          snapTo(to - count); // 오른쪽 끝 → 실제 첫 카드로
        } else if (to < REAL_START) {
          snapTo(to + count); // 왼쪽 끝 → 실제 마지막 카드로
        } else {
          setPos(to);
        }
        isAnimating.current = false;
      },
    });
  };

  /* Pointer Events */
  const onPointerDown = (e) => {
    if (isAnimating.current) return;
    autoplayApi.stop(); // 드래그 시작 시 autoplay 일시정지
    activePointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);

    const x = e.clientX;
    const t = performance.now();
    drag.current.active = true;
    drag.current.startX = drag.current.lastX = x;
    drag.current.delta = 0;
    drag.current.startT = drag.current.lastT = t;
  };

  const onPointerMove = (e) => {
    if (!drag.current.active || e.pointerId !== activePointerId.current) return;
    e.preventDefault?.();

    const x = e.clientX;
    const t = performance.now();
    const dx = x - drag.current.startX;

    drag.current.delta = dx;
    drag.current.lastX = x;
    drag.current.lastT = t;

    const wrap = wrapRef.current;
    const el = trackRef.current;
    if (!wrap || !el) return;

    // 카드 1장 = 래퍼 절반 폭
    const cardPx = (wrap.clientWidth || window.innerWidth || 375) / 2;
    const percentDelta = (dx / cardPx) * 50; // 1장=50%
    const base = -pos * 50;

    // 드래그 실시간 반영
    gsap.set(el, { xPercent: base + percentDelta, force3D: true });
  };

  // 드래그 종료 처리
  const finishPointer = () => {
    const { delta, startT, lastT } = drag.current;
    drag.current.active = false;
    activePointerId.current = null;

    const dt = Math.max(16, lastT - startT);
    const v = Math.abs(delta) / dt;

    const wrap = wrapRef.current;
    const cardPx = (wrap?.clientWidth || window.innerWidth || 375) / 2;
    const abs = Math.abs(delta);

    // 이동 거리/속도로 장 수 결정 (0=원위치, 1~2장 이동)
    let k = abs > cardPx * 1.25 ? 2 : abs > swipeThreshold ? 1 : 0;
    if (k === 1 && v > velocityBoost) k = 2;

    if (k === 0) {
      moveTo(pos); // 원위치

      autoplayApi.start(); // 드래그 종료 후 autoplay 재개
      return;
    }

    const dir = delta < 0 ? +1 : -1; // 왼쪽 드래그 → 다음(+)
    let to = pos + dir * k;
    to = Math.max(MIN_I, Math.min(MAX_I, to));
    moveTo(to);

    autoplayApi.start(); // 전환 후 autoplay 재개
  };

  const onPointerUp = (e) => {
    if (e.pointerId !== activePointerId.current) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    finishPointer();
  };

  const onPointerCancel = (e) => {
    if (e.pointerId !== activePointerId.current) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    finishPointer();
  };

  return {
    wrapRef,
    trackRef,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    autoplay: autoplayApi, // 외부에서 hoverHandlers 등 사용 가능
  };
}
