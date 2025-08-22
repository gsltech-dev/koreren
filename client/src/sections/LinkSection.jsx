import news from "../assets/images/link/news.jpeg";
import ir from "../assets/images/link/ir.jpeg";
import media from "../assets/images/link/media.jpeg";
import map from "../assets/images/link/map.jpeg";
import { useRef } from "react";
import useFadeUp from "../hooks/useFadeUp";

export default function LinkSection() {
  const root = useRef(null);

  // root 영역 안에서 .reveal 요소에 페이드업
  useFadeUp(root);

  return (
    <section ref={root} className="py-15 bg-gray-100">
      <div className="container max-w-7xl mx-auto bg-gray-100">
        <div className="grid grid-cols-3 gap-5 px-3 py-5">
          {/* 제목 영역: 모바일 전체, md 이상 1칸 */}
          <div className="col-span-full md:col-span-1">
            <h2 className="reveal text-xl md:text-4xl font-semibold">
              코어렌
              <br /> 다양한 소식
            </h2>
            <p className="reveal mt-7 text-base md:text-xl text-gray-800">
              다양한 코어렌의 소식을 접할 수 있습니다.
            </p>
          </div>

          {/* 카드 영역: 모바일 전체, md 이상 2칸 */}
          <div className="col-span-full md:col-span-2  reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* 보도자료 */}
              <a href="#" className="block">
                <div className="relative w-full md:w-[420px] h-[330px] overflow-hidden group">
                  <img
                    src={news}
                    alt="보도자료"
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 p-8 w-full text-white pointer-events-none">
                    <h4 className="text-lg md:text-2xl font-semibold mb-3">
                      보도자료
                    </h4>
                    <p className="text-base md:text-lg">
                      코어렌의 끊임없는 변화를 알려드립니다.
                    </p>
                  </div>
                </div>
              </a>

              {/* IR */}
              <a href="#" className="block">
                <div className="relative w-full md:w-[420px] h-[330px] overflow-hidden group">
                  <img
                    src={ir}
                    alt="IR"
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 p-8 w-full text-white pointer-events-none">
                    <h4 className="text-lg md:text-2xl font-semibold mb-3">
                      IR
                    </h4>
                    <p className="text-base md:text-lg">
                      코어렌는 정확하고 투명한 경영정보를 제공합니다.
                    </p>
                  </div>
                </div>
              </a>

              {/* 미디어 */}
              <a href="#" className="block">
                <div className="relative w-full md:w-[420px] h-[330px] overflow-hidden group">
                  <img
                    src={media}
                    alt="미디어"
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 p-8 w-full text-white pointer-events-none">
                    <h4 className="text-lg md:text-2xl font-semibold mb-3">
                      미디어
                    </h4>
                    <p className="text-base md:text-lg">
                      코어렌 공식 SNS를 통해 다양한 소식과 의견을 공유합니다.
                    </p>
                  </div>
                </div>
              </a>

              {/* 오시는 길 */}
              <a href="#" className="block">
                <div className="relative w-full md:w-[420px] h-[330px] overflow-hidden group">
                  <img
                    src={map}
                    alt="오시는 길"
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 p-8 w-full text-white pointer-events-none">
                    <h4 className="text-lg md:text-2xl font-semibold mb-3">
                      오시는 길
                    </h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
