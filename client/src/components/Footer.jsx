// src/components/Footer.jsx
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <footer className="bg-gray-50">
      {/* 상단 */}
      <div className="container max-w-7xl mx-auto px-5 py-8 md:px-6 md:py-16">
        {/* 그리드 시작 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* 브랜드 소개 시작 */}
          <div className="flex flex-col items-start">
            <div className="mb-3">
              <img src={logo} alt="Logo" className="h-5 md:h-8 w-auto" />
            </div>
            <div className="mt-2 md:mt-4 space-y-3 text-sm md:text-base">
              <ul>
                <li>
                  <strong>대표</strong> 김유신
                </li>
                <li>
                  <strong>사업자등록번호</strong> 107-88-39288
                </li>
                <li>
                  <strong>본사</strong> 서울시 강남구 학동로 309
                </li>
                <li>
                  <strong>TEL</strong> 1588-0909
                </li>
                <li>
                  <strong>A/S</strong> 1566-3382
                </li>
              </ul>
            </div>
          </div>
          {/* 빠른 링크 */}
          <div className="text-sm md:text-base flex flex-col">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 md:mt-4 space-y-2 md:space-y-3">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  BRAND
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  SHOP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  COMMUNITY
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm md:text-base">
            <h4 className="text-lg font-semibold">Important Links</h4>
            <ul className="mt-2 md:mt-4 md:space-y-3">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  이용 약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  개인정보처리 방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* 소셜 연결 */}
          <div className="text-sm md:text-base">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="mt-2 md:mt-4 flex flex-col justify-center space-y-2 md:space-y-3">
              <a href="#" className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <FontAwesomeIcon icon={faYoutube} className="text-red-600" />
                </div>
                <span className="hover:text-blue-500 transition-colors">
                  Youtube
                </span>
              </a>
              <a href="#" className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center bg-pink-500 rounded-md">
                  <FontAwesomeIcon icon={faInstagram} className="text-white" />
                </div>
                <span className="hover:text-blue-500 transition-colors">
                  Instagram
                </span>
              </a>
              <a href="#" className="flex items-center space-x-2">
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <FontAwesomeIcon icon={faComment} className="text-gray-700" />
                  <span className="absolute text-[9px] text-white bottom-0.5">
                    ch
                  </span>
                </div>
                <span className="hover:text-blue-500 transition-colors">
                  kakao
                </span>
              </a>
            </div>
          </div>
        </div>
        {/* 그리드 끝 */}
      </div>

      <div className="border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-6 py-2 md:py-6">
          <p className="md:ml-1 text-xs md:text-base">
            &copy; 2025 gsltech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
