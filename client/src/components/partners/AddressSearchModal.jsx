import { useEffect, useRef } from "react";

export default function AddressSearchModal({ open, onClose, onSelect }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open || !boxRef.current) return;
    const { daum } = window;
    if (!daum?.Postcode) return;

    const postcode = new daum.Postcode({
      oncomplete: (data) => {
        const address = data.roadAddress || data.address || "";
        const postal = data.zonecode || "";
        onSelect?.({ address, postal_code: postal });
        onClose?.();
      },
      width: "100%",
      height: "100%",
    });

    postcode.embed(boxRef.current);

    return () => {
      // 특별한 정리는 필요 없지만, 모달 닫힐 때 컨테이너 비우기
      if (boxRef.current) boxRef.current.innerHTML = "";
    };
  }, [open, onClose, onSelect]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl h-[520px] rounded-xl overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">주소 찾기</h3>
          <button
            className="text-sm px-3 py-1 border rounded"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
        <div ref={boxRef} className="w-full h-[460px]" />
      </div>
    </div>
  );
}
