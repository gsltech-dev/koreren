// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import instagram from "../assets/images/footer/instagram_icon.svg";
import naver from "../assets/images/footer/naver_icon.svg";
import kakao from "../assets/images/footer/kakao_icon.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      {/* 상단 */}
      <div className="container mx-auto px-5 py-8 md:px-6 md:py-[80px]">
        {/* 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch">
          {/* 좌측: 회사 정보 */}
          <div className="flex flex-col justify-center col-span-3">
            <div>
              <div className="mb-10 md:mb-3">
                <img src={logo} alt="Logo" className="h-6 md:h-8 w-auto" />
              </div>
              <div className="mt-2 md:mt-4 space-y-3 text-sm md:text-base">
                <ul>
                  <li className="flex items-center text-[15px] flex-wrap">
                    <p className="font-bold mr-[5px]">회사명:</p>
                    <p className="font-normal">(주)지에스엘텍</p>
                    <p className="px-[5px] md:px-[10px]">&nbsp;|&nbsp;</p>
                    <p className="font-bold mr-[5px]">대표자:</p>
                    <p className="font-normal">김유신</p>
                    <p className="px-[10px] hidden md:block">&nbsp;|&nbsp;</p>
                    <div className="w-full md:w-auto flex items-center">
                      <p className="font-bold mr-[5px]">사업자등록번호:</p>
                      <p className="font-normal">213-87-03472</p>
                      <p className="text-neutral-500">&nbsp;[사업자정보확인]</p>
                    </div>
                  </li>

                  <li className="flex items-center text-[15px] flex-wrap">
                    <p className="font-bold mr-[5px]">주소</p>
                    <p>06101 서울특별시 강남구 언주로 634, 4층</p>
                  </li>

                  <li className="flex items-center text-[15px] flex-wrap">
                    <p className="font-bold mr-[5px]">개인정보관리책임자:</p>
                    <p>김유신</p>

                    {/* 구분선: 모바일에서 숨김 */}
                    <p className="px-[10px] hidden md:block">&nbsp;|&nbsp;</p>

                    {/* 제휴문의 블록: 모바일에서는 줄바꿈, md 이상에서는 옆에 */}
                    <div className="w-full md:w-auto flex items-center">
                      <p className="font-bold mr-[5px]">제휴문의:</p>
                      <p>jso@gsland.tech</p>
                    </div>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-neutral-600">
                  © gsltech.Co.,Ltd. All Rights Reserved.
                </p>
              </div>
            </div>

            {/* 하단 링크 */}
            <div className="pt-10">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-700 text-[15px]">
                <li className="flex font-normal">
                  <Link to="/about" className="hover:underline">
                    회사소개
                  </Link>
                  <p className="px-[5px] md:px-[10px]">&nbsp;|&nbsp;</p>
                  <Link to="/privacy" className="hover:underline">
                    개인정보 처리방침
                  </Link>
                  <p className="px-[5px] md:px-[10px]">&nbsp;|&nbsp;</p>
                  <a href="#" className="hover:underline">
                    이용안내
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 우측: 고객센터 */}
          <div className="col-span-1 lg:px-5 flex flex-col justify-between h-full pt-5 md:pt-8">
            <div>
              <ul>
                <li className="flex items-center">
                  <p className="font-bold text-[15px] xl:text-[20px] mr-[10px] xl:mr-[15px]">
                    고객센터
                  </p>
                  <p className="font-semibold text-[15px] xl:text-[20px]">
                    02-515-2026
                  </p>
                </li>
                <li className="flex items-center">
                  <p className="font-bold text-[15px] xl:text-[20px] mr-[10px] xl:mr-[15px]">
                    운영시간
                  </p>
                  <p className="font-semibold text-[15px] xl:text-[20px]">
                    평일 10:00 ~ 17:00
                  </p>
                </li>
                <li>
                  <span className="font-normal text-[15px] xl:text-[20px]">
                    (주말 및 공휴일 휴무)
                  </span>
                </li>
              </ul>
              <div className="mt-4 mb-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full h-10 border border-neutral-400 rounded-sm text-sm"
                >
                  1:1 문의하기
                </Link>
              </div>
            </div>

            {/* 아이콘 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-400 flex items-center justify-center bg-[#707070]">
                <img
                  src={instagram}
                  alt="instagram"
                  className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
                />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-400 flex items-center justify-center bg-[#707070]">
                <img
                  src={kakao}
                  alt="kakao"
                  className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
                />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-400 flex items-center justify-center bg-[#707070]">
                <img
                  src={naver}
                  alt="naver"
                  className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 그리드 끝 */}
      </div>
    </footer>
  );
}
