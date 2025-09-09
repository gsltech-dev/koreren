import img1 from "../assets/images/partners/partners_main.webp";
import { Link } from "react-router-dom";

export default function PartnersSection() {
  return (
    <section className="section section_location relative w-full aspect-[1000/1080] lg:aspect-[1920/695] mb-[150px] md:mb-[200px] lg:mb-[300px] ">
      <Link
        to="/partners"
        className="block w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${img1})` }}
      >
        {/* 오버레이 (배경 투명도 효과) */}
        <div className="absolute inset-0 bg-black/20" />
        {/* 텍스트 위치 & 사이즈 조정 */}
        <div
          className="absolute inset-0 flex flex-col justify-end items-start text-white 
                        px-5 md:px-[50px] 
                        pb-[90px] md:pb-[120px] lg:pb-[50px] xl:pb-[100px]"
        >
          <strong
            className="font-bold 
                             text-2xl sm:text-3xl 
                             md:text-3xl lg:text-5xl xl:text-5xl"
          >
            EXPLORE OUR PARTNER SHOPS
          </strong>
          <p
            className="mt-3 md:mt-5 
                        text-sm sm:text-base 
                        md:text-[20px] lg:text-2xl font-light"
          >
            우리의 가치를 전하는 매장들
          </p>
          <em
            className="mt-3 md:mt-5 
                         text-xs md:text-sm lg:text-base underline font-light"
          >
            VIEW MORE
          </em>
        </div>
      </Link>
    </section>
  );
}
