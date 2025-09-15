// src/hooks/useCarousel.js
import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
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
 *
 * (추가) 드래그/스와이프 지원:
 *  - Pointer 이벤트 기반으로 모바일/데스크톱 공통 동작
 *  - 드래그 중에는 트랙을 실시간으로 이동시키고, 업 시 임계치 판단 후 스냅/전환
 *  - 전환·스냅 시 dotIndex를 항상 동기화해 "dot가 못 따라오는 현상" 제거
 *  - 드래그 시작~종료 동안 autoplay 자동 일시정지, 종료 후 재개
 */
export default function useCarousel(
  slides,
  {
    duration = 1.0,
    ease = "power2.out",
    swipeThreshold = 28,
    velocityBoost = 1.1,
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

  /* ---------- (추가) 드래그 상태 ---------- */
  const dragging = useRef(false); // 드래그 중 여부
  const startX = useRef(0); // 포인터 다운 시 X
  const lastX = useRef(0); // 마지막 move X
  const startT = useRef(0); // 포인터 다운 시각
  const widthRef = useRef(1); // 트랙 폭 캐시
  const basePosAtDragStart = useRef(0); // 드래그 시작 시 논리 위치(cur, 실수 사용)

  // 초기 위치(화면 그리기 전 고정) — transform은 GSAP만 제어
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -100 * cur, force3D: true });
  }, []); // eslint-disable-line

  // (추가) pos→dotIndex 변환: 스냅/전환의 단일 진실원
  const setDotFromPos = useCallback(
    (pos) => setDotIndex((((pos - 1) % LEN) + LEN) % LEN),
    [LEN]
  );

  // 스냅(애니메 없이 위치 세팅)
  const snapTo = (pos) => {
    const el = trackRef.current;
    gsap.set(el, { xPercent: -100 * pos, force3D: true });
    setCur(pos);
    setDotFromPos(pos); // (추가) dot 동기화
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
          setDotFromPos(to); // (추가) dot 동기화 보강
        }
        isAnimating.current = false;
      },
    });
  };

  // 다음/이전 (인디케이터는 즉시 반응) — 내부적으로도 dot 동기화되므로 setDotIndex 생략 가능
  const next = useCallback(() => {
    if (isAnimating.current) return;
    moveTo(cur + 1);
  }, [cur]);

  const prev = useCallback(() => {
    if (isAnimating.current) return;
    moveTo(cur - 1);
  }, [cur]);

  // 인디케이터 클릭 이동 (경계 자연스럽게 처리)
  const goReal = (i /* 0..LEN-1 */) => {
    if (isAnimating.current) return;
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

  /* ---------- (추가) Drag / Swipe 구현 ---------- */

  // (추가) 드래그 중 실시간 xPercent 적용 로직
  const setXPercentDuringDrag = (deltaPx) => {
    const el = trackRef.current;
    if (!el) return;
    const w = widthRef.current || 1;
    const deltaRatio = deltaPx / w; // 화면 대비 이동 비율
    const visualPos = basePosAtDragStart.current - deltaRatio; // 우측 드래그(+dx) → pos 감소
    gsap.set(el, { xPercent: -100 * visualPos, force3D: true });
  };

  // (추가) 포인터 다운: 드래그 시작, autoplay 정지
  const onPointerDown = (e) => {
    if (isAnimating.current) return;
    dragging.current = true;

    // 트랙 전체 너비를 기준으로 비율 계산 → 반응형에서도 일관
    widthRef.current =
      trackRef.current?.getBoundingClientRect().width || window.innerWidth || 1;

    startX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    lastX.current = startX.current;
    startT.current = performance.now();
    basePosAtDragStart.current = cur;

    gsap.killTweensOf(trackRef.current);
    autoplayApi.stop();

    // 포인터 캡처로 move/up 누락 방지
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {}
  };

  // (추가) 포인터 이동: 트랙을 실시간으로 따라오게
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const x =
      e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? lastX.current;
    lastX.current = x;
    const dx = x - startX.current;
    setXPercentDuringDrag(dx);
  };

  // (추가) 포인터 업: 임계치 판정 후 스냅/전환, autoplay 재개
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const dx = lastX.current - startX.current;
    const dt = Math.max(1, performance.now() - startT.current); // ms
    const speed = (Math.abs(dx) / dt) * 1000; // px/s

    const w = widthRef.current || 1;
    const ratio = Math.abs(dx) / w; // 화면 대비 이동 비율
    const wantNext = dx < 0;
    const crossedDistance = ratio >= 0.18; // 화면 18% 이동 기준
    const crossedSpeed = speed >= 600; // 빠른 플릭 허용

    if (Math.abs(dx) >= swipeThreshold && (crossedDistance || crossedSpeed)) {
      if (wantNext) moveTo(cur + 1);
      else moveTo(cur - 1);
    } else {
      snapTo(cur); // 원위치
    }

    if (!autoplay.paused) autoplayApi.start();
  };

  // (추가) 터치·마우스 경계 케이스 보강
  const dragHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    onMouseLeave: () => {
      if (dragging.current) onPointerUp();
    },
  };

  /**
   * (추가) 통합 사용법
   * - 트랙 래퍼(div)에 ref={trackRef}와 함께 {...dragHandlers}를 그대로 펼쳐 넣으세요.
   *   <div ref={trackRef} {...dragHandlers} className="flex ...">...</div>
   * - autoplay.pauseOnHover을 사용하는 경우, 래퍼에 onMouseEnter/Leave를 연결하려면
   *   {...autoplay}를 별도 요소에 바인딩하거나 수동으로 이벤트를 달아도 됩니다.
   */

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

    // (추가) 드래그/스와이프 이벤트 핸들러
    dragHandlers,
  };
}
