// src/pages/About.jsx
import FadeUpList from "../components/FadeUpList";
import about1 from "../assets/images/about/about_img_1.webp";
import about2 from "../assets/images/about/about_img_2.webp";
import about_logo from "../assets/images/about/about_brand_logo.webp";

export default function About() {
  return (
    <main className="container mx-auto max-w-[1920px]">
      {/* HERO */}
      <section className="bg-[#315fa7] mb-[100px] lg:mb-[200px]">
        <div className="flex h-[50vh] lg:h-[95vh] items-center justify-center">
          <div className="text-center">
            {/* 제목 */}
            <h1
              className="text-white font-extrabold tracking-[-0.03em] leading-tight
                             text-4xl md:text-6xl lg:text-[62px]"
            >
              WELLNESS WITHOUT LIMITS,
            </h1>
            <p
              className="mt-2 text-white/95 font-bold tracking-[-0.03em] leading-tight
                            text-3xl md:text-5xl lg:text-[62px]"
            >
              WHEREVER YOU ARE
            </p>
          </div>
        </div>
      </section>

      <section>
        <div>
          {/* 1300×770 비율 이미지 */}
          <div className="w-full h-[50vh] lg:w-2/3 aspect-[16/9]">
            <img
              src={about1}
              alt="about1"
              className="inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="my-[100px] lg:my-[200px] lg:ml-[200px]">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-7xl font-semibold leading-tight">
                코어렌은 일상 속 균형과 회복을 지켜주는 <br></br>웰니스
                브랜드입니다.
              </h3>

              <p className="mt-[35px] lg:mt-[70px] text-xl md:text-3xl lg:text-7xl font-[350] leading-tight">
                오늘의 피로를 풀고, 더 나은 내일을 준비할 수 있도록
                <br></br>코어렌은 일상 속 작은 회복을 함께합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* 브라우저 전체 기준으로 오른쪽 정렬 */}
        <div className="">
          {/* 1300×770 이미지 */}
          <div className="w-full h-[50vh] lg:w-2/3 aspect-[16/9] ml-auto">
            <img
              src={about2}
              alt="about2"
              className="h-full w-full object-cover"
            />
          </div>

          {/* 이미지와 200px 간격, 텍스트도 오른쪽 정렬 */}
          <div className="my-[100px] lg:my-[200px] lg:mr-[200px] text-center lg:text-right lg:ml-auto">
            <h3 className="text-2xl md:text-3xl lg:text-7xl leading-tight lg:leading-[95px] font-semibold tracking-[-0.03em] text-black">
              코어렌이 추구하는 웰니스의 본질은
              <br />
              "진정한 아름다움의 회복"에 있습니다.
            </h3>

            <p className="mt-[35px] lg:mt-[70px] text-xl  md:text-2xl lg:text-5xl leading-tight lg:leading-[60px] font-normal tracking-[-0.03em] text-black">
              진정한 아름다움의 회복은 단순한 외모가 아니라, 지친 몸과
              <br />
              마음을 돌보고 균형과 자신감을 되찾는 순간에서 시작됩니다.
            </p>

            <p className="mt-[25px] lg:mt-[50px] text-xl md:text-2xl lg:text-5xl leading-tight lg:leading-[60px] font-normal tracking-[-0.03em] text-black">
              코어렌은 일상의 회복을 통해,
              <br />
              당신이 더 건강하고 빛나는 내일을 맞이하도록 함께합니다.
            </p>
          </div>
        </div>
      </section>
      <section className="">
        <div className="h-[80vh] lg:h-[60vh]">
          <div className="grid grid-cols-1 xl:grid-cols-2 h-full">
            <div className="col-span-1 flex items-center justify-center">
              <img
                src={about_logo}
                alt="about_logo"
                className="w-[832px] h-[260px]"
              />
            </div>
            <div className="col-span-1 lg:px-40 py-5 h-full flex flex-col justify-center">
              <div className="mb-[50px]">
                <h5 className="text-3xl text-[#70s7070]">BRAND LOGO DESIGN</h5>
              </div>
              <p className="lg:text-2xl mb-[20px]">
                KOREREN의 로고는 Korea, Core, Renew 라는 이름처럼<br></br>
                한국에서 시작된 브랜드가, 본질을 지키며, 일상의 회복과<br></br>
                새로운 균형을 만들어간다는 의미를 담고 있습니다.
              </p>

              <p className="lg:text-2xl mb-[90px]">
                단단한 인상 속에서도 부드러운 흐름을 품은 로고는<br></br>
                "진정한 아름다움의 회복"이라는 우리의 약속을 상징힙나디.
              </p>
              <div className="flex items-center mb-[25px]">
                <div className="w-[51px] h-[51px] bg-[#1b1b1b] rounded-full mr-[15px]"></div>
                <div>
                  <p className="lg:text-xl">KORE BLACK</p>
                  <span className="text-[18px] text-[#5c5c5c]">
                    HEX #1B1B1B | RGB 27,27,27 | CMYK 0,0,0, 89
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[51px] h-[51px] bg-[#315fa7] rounded-full mr-[15px]"></div>
                <div>
                  <p className="lg:text-xl">KORE BLACK</p>
                  <span className="text-[18px] text-[#5c5c5c]">
                    HEX #2154C5 | RGB 27,27,197 | CMYK 88,70,0, 0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
