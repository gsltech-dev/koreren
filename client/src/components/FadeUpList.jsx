// src/components/FadeUpList.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FadeUpList() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) 초기 상태 세팅
      gsap.set(".reveal", { y: 24, opacity: 0 });

      // 2) 각 요소별 트리거
      gsap.utils.toArray(".reveal", root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
              // markers: true, // 디버깅 원하면 주석 해제
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="space-y-8">
      {["보도자료", "IR", "미디어", "오시는 길"].map((t) => (
        <div
          key={t}
          className="reveal p-6 rounded-2xl bg-slate-800/40 text-white"
        >
          <h3 className="text-xl font-semibold">{t}</h3>
          <p className="text-white/70">
            스크롤하면 아래에서 위로 슥— 올라옵니다.
          </p>
        </div>
      ))}
    </div>
  );
}
