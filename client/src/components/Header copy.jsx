// src/components/Header.jsx
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGnbOpen, setIsGnbOpen] = useState(false); // ▼ GNB 전체 드롭다운 on/off

  const handleToggleMenu = () => setIsMenuOpen((v) => !v);
  const handleCloseMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 hover:bg-white transition-colors duration-300">
      {/* nav를 relative로 두고, nav 영역을 벗어나면 전체 닫기 */}
      <nav
        className="relative max-w-full h-[90px] px-3 md:px-20"
        onMouseLeave={() => setIsGnbOpen(false)}
      >
        <div className="flex h-full items-center justify-start">
          {/* 로고 */}
          <a href="/" className="h-full inline-flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </a>

          {/* 메뉴 */}
          <div className="flex h-full items-center ml-auto gap-x-10">
            <ul className="hidden md:flex h-full gap-x-20">
              {/* BRAND */}
              <li
                className="group h-full relative"
                onMouseEnter={() => setIsGnbOpen(true)}
              >
                <a
                  href="#"
                  className="h-full flex items-center text-xl font-semibold hover:text-blue-500 transition-colors"
                >
                  BRAND
                </a>

                {/* 위치/스타일 그대로, 표시만 isGnbOpen으로 제어 */}
                <ul
                  className={`
                    ${isGnbOpen ? "block" : "hidden"}
                    absolute top-full left-1/2 -translate-x-1/2 w-max text-center
                  text-gray-900 z-[60] text-xl
                    px-6 md:px-10 py-4
                  `}
                >
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      BRAND STORY
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      DEPERWAVE
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400"></a>
                  </li>
                </ul>
              </li>

              {/* SHOP */}
              <li
                className="group h-full relative"
                onMouseEnter={() => setIsGnbOpen(true)}
              >
                <a
                  href="#"
                  className="h-full flex items-center text-xl font-semibold hover:text-blue-500 transition-colors"
                >
                  SHOP
                </a>

                <ul
                  className={`
                    ${isGnbOpen ? "block" : "hidden"}
                    absolute top-full left-1/2 -translate-x-1/2 w-max text-center
                  text-gray-900 z-[60] text-xl
                    px-6 md:px-10 py-4
                  `}
                >
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      ALL
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      FACE
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      SKINCARE
                    </a>
                  </li>
                </ul>
              </li>

              {/* COMMUNITY */}
              <li
                className="group h-full relative"
                onMouseEnter={() => setIsGnbOpen(true)}
              >
                <a
                  href="#"
                  className="h-full flex items-center text-xl font-semibold hover:text-blue-500 transition-colors"
                >
                  COMMUNITY
                </a>

                <ul
                  className={`
                    ${isGnbOpen ? "block" : "hidden"}
                    absolute top-full left-1/2 -translate-x-1/2 w-max text-center
                  text-gray-900 z-[60] text-xl
                    px-6 md:px-10 py-4
                  `}
                >
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      NOTICE
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      MEMBERSHIP
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-5 hover:text-blue-400">
                      FAQ
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 우측 링크 */}
          <div className="hidden md:flex h-full items-stretch ml-20">
            <a
              href="#"
              className="h-full inline-flex items-center hover:text-blue-500 transition-colors font-semibold text-xl"
            >
              KORERENMALL
            </a>
          </div>

          {/* 모바일 버튼 */}
          <button
            onClick={handleToggleMenu}
            className="md:hidden h-full inline-flex items-center"
          >
            <FontAwesomeIcon icon={faBars} size="xl" />
          </button>
        </div>

        {/* ▼ 공통 BG: nav 바로 아래. 위치는 고정, 표시만 isGnbOpen으로 제어 */}
        <div
          className={`
            ${isGnbOpen ? "block" : "hidden"}
            absolute inset-x-0 top-full
            w-full bg-white/90
            backdrop-blur-sm
            h-[190px] md:h-[200px] lg:h-[238px]
            z-40
          `}
        />
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  );
}
