import { useState } from "react";
import prd1 from "../assets/images/product/prod_1.jpg";
import prd2 from "../assets/images/product/prod_2.png";
import prd3 from "../assets/images/product/prod_3.png";
import prd4 from "../assets/images/product/prod_4.png";
import prd5 from "../assets/images/product/prod_5.png";

export default function ProductSection() {
  return (
    <section ref={root} className="pt-24">
      <div className="reveal w-full space-y-10 pb-24">
        {/* 제품소개 텍스트 */}
        <div className="text-center">
          <h3 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-red-600 mb-4 pb-4 lg:pb-10">
            BE YOU,
            <br className="block md:hidden" /> BE CONFIDENT
          </h3>
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pb-4 lg:pb-10">
            나만의 색깔로 빛나는 일상을 만들어주는 메이크업 브랜드
          </h4>
          <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl lg:text-2xl">
            나만의 색깔을 찾고 자신만의 개성을 마음껏 표현할 수 있도록,
            <br className="hidden md:block" />
            코어렌은 다양한 컬러 옵션을 통해
            <br className="hidden md:block" />
            당신의 일상이 더 빛나도록 만들어줍니다.
          </p>
        </div>
      </div>

      <div className="container max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-3 py-5">
          <div className="col-span-1">
            <img
              src={prd1}
              alt="prd1"
              className="w-full h-full overflow-hidden"
            />
          </div>
          <div className="col-span-1">
            <ul className="grid grid-cols-2 gap-4 h-full">
              <li className="bg-white">
                <div className="grid grid-cols-1 h-full">
                  <div className="bg-gray-50">
                    <img
                      src={prd2}
                      alt="prd2"
                      className="w-full h-full overflow-hidden"
                    />
                  </div>
                  <div className="bg-gray-50 flex justify-center items-center py-10">
                    <h3 className="text-[15px] md:text-xl lg:text-2xl font-bold">
                      마크스 핏 레드 쿠션
                    </h3>
                  </div>
                </div>
              </li>
              <li className="bg-white ">
                <div className="grid grid-cols-1 h-full">
                  <div className="bg-gray-50">
                    <img
                      src={prd3}
                      alt="prd3"
                      className="w-full h-full overflow-hidden"
                    />
                  </div>
                  <div className="bg-gray-50 flex justify-center items-center py-10">
                    <h3 className="text-[15px]md:text-xl lg:text-2xl font-bold">
                      마크스 핏 AI 필터 쿠션
                    </h3>
                  </div>
                </div>
              </li>
              <li className="bg-white">
                <div className="grid grid-cols-1 h-full">
                  <div className="bg-gray-50">
                    <img
                      src={prd4}
                      alt="prd4"
                      className="w-full h-full overflow-hidden"
                    />
                  </div>
                  <div className="bg-gray-50 flex justify-center items-center py-10">
                    <h3 className="text-[15px] md:text-xl lg:text-2xl font-bold">
                      글라이드 앤 하이드 블러링 컨실러
                    </h3>
                  </div>
                </div>
              </li>
              <li className="bg-white">
                <div className="grid grid-cols-1 h-full">
                  <div className="bg-gray-50">
                    <img
                      src={prd5}
                      alt="prd5"
                      className="w-full h-full overflow-hidden"
                    />
                  </div>
                  <div className="bg-gray-50 flex justify-center items-center py-10">
                    <h3 className="text-[15px] md:text-xl lg:text-2xl font-bold">
                      마크스 핏 레드 파운데이션
                    </h3>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
