import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function MobileMenu({ isOpen, onClose }) {
  // 포털 없이도 동작하지만, 포털을 쓰면 z-index/스택 컨텍스트 이슈가 줄어듭니다.
  const content = (
    <>
      {/* 오버레이(백드롭) */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-400 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-[60]`}
        onClick={onClose}
        aria-hidden
      />

      {/* 슬라이딩 패널 */}
      <aside
        className={`fixed right-0 inset-y-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-[70]`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-end py-4">
          <button
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="p-2 rounded hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="text-gray-600"
            />
          </button>
        </div>

        <nav className="flex flex-col gap-8 px-6 pb-8">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            제품소개
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            전시 학회
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            미디어
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            IR
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            회사소개
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            고객센터
          </a>
          <div className="font-semibold text-sm">
            <a href="#" className="text-blue-500 transition-colors">
              KORERENMALL
            </a>
          </div>
        </nav>
      </aside>
    </>
  );

  // 포털 사용 (body로 렌더) — 원치 않으면 그냥 return content
  return createPortal(content, document.body);
}

export default MobileMenu;
