import img1 from "../assets/images/instagram/instagram_01.jpg";
import img2 from "../assets/images/instagram/instagram_02.jpg";
import img3 from "../assets/images/instagram/instagram_03.jpg";

export default function InstaSection() {
  return (
    <section className="py-10 mb-[100px]  md:mb-[150px] lg:mb-[310px]">
      <div className="container max-w-full mx-auto">
        <div className="flex items-end px-6 lg:px-[140px] pb-[40px] lg:pb-[80px]">
          <h3 className="text-3xl lg:text-7xl font-semibold">OUR STORY</h3>
          <span className="text-[10px] md:text-[30px] lg:text-3xl ml-3 lg:ml-5">
            @KOREREN_Instagram
          </span>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-0">
          <a
            href="https://www.instagram.com/koreren_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square block"
          >
            <img
              src={img1}
              alt="instagram post 1"
              className="w-full h-full object-cover"
            />
          </a>

          <a
            href="https://www.instagram.com/koreren_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square block"
          >
            <img
              src={img2}
              alt="instagram post 2"
              className="w-full h-full object-cover"
            />
          </a>

          <a
            href="https://www.instagram.com/koreren_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square block"
          >
            <img
              src={img3}
              alt="instagram post 3"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
