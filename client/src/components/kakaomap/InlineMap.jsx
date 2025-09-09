// client/src/components/kakaomap/InlineMap.jsx
import { useEffect, useRef, useState } from "react";

export default function InlineMap({ item, open }) {
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const MAP_H = isMobile ? 250 : 450;

  useEffect(() => {
    if (!open || !boxRef.current) {
      setVisible(false);
      return;
    }
    setVisible(true);

    const boot = () => {
      const { kakao } = window;
      if (!kakao?.maps || !kakao.maps.services) return;

      const el = boxRef.current;
      const map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });
      const marker = new kakao.maps.Marker();
      let overlay = null;

      const place = (lat, lng) => {
        const la = parseFloat(lat),
          ln = parseFloat(lng);
        if (!Number.isFinite(la) || !Number.isFinite(ln)) return;
        const pos = new kakao.maps.LatLng(la, ln);

        marker.setMap(map);
        marker.setPosition(pos);

        const html = `<div style="box-sizing:border-box;display:inline-block;position:relative;background:#2563eb;color:#fff;border-radius:8px;padding:8px 12px;font-size:13px;line-height:1;white-space:nowrap;">
          ${item?.name || ""}
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:-8px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #2563eb;"></div>
        </div>`;

        overlay = new kakao.maps.CustomOverlay({
          position: pos,
          content: html,
          xAnchor: 0.5,
          yAnchor: 2.8,
          zIndex: 3,
        });
        overlay.setMap(map);

        requestAnimationFrame(() => {
          map.relayout();
          map.setCenter(pos);
        });
      };

      const hasLatLng =
        item &&
        Number.isFinite(parseFloat(item.lat)) &&
        Number.isFinite(parseFloat(item.lng));

      if (hasLatLng) {
        place(item.lat, item.lng);
      } else {
        const addr = `${item?.address || ""} ${
          item?.detail_address || ""
        }`.trim();
        if (!addr) return;
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(addr, (res, status) => {
          if (status === kakao.maps.services.Status.OK && res?.[0]) {
            place(res[0].y, res[0].x);
          }
        });
      }

      return () => {
        if (overlay) overlay.setMap(null);
        marker.setMap(null);
      };
    };

    const { kakao } = window;
    let cleanup;
    if (kakao?.maps?.load) kakao.maps.load(() => (cleanup = boot()));
    else if (kakao?.maps) cleanup = boot();

    return () => {
      if (cleanup) cleanup();
      if (boxRef.current) boxRef.current.innerHTML = "";
    };
  }, [open, item]);

  return (
    <div
      className={`mt-3 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ height: open ? MAP_H : 0, overflow: "hidden" }}
    >
      <div ref={boxRef} style={{ width: "100%", height: MAP_H }} />
    </div>
  );
}
