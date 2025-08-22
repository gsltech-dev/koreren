// src/hooks/useFadeUp.js
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function useFadeUp(
  rootRef,
  { selector = ".reveal", start = "top 80%" } = {}
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(selector, { y: 24, opacity: 0 });
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef, selector, start]);
}
