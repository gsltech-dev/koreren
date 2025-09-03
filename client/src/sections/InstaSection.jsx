import img1 from "../assets/images/instagram/sideview.webp";
import img2 from "../assets/images/instagram/sideview.webp";
import img3 from "../assets/images/instagram/sideview.webp";
import img4 from "../assets/images/instagram/sideview.webp";
import img5 from "../assets/images/instagram/sideview.webp";
import img6 from "../assets/images/instagram/sideview.webp";

export default function InstaSection() {
  return (
    <section className="py-10 mb-[310px]">
      <div className="container max-w-full mx-auto">
        <div className="flex items-end px-6 lg:px-[140px] pb-[40px] lg:pb-[80px]">
          <h3 className="text-3xl lg:text-7xl font-semibold">OUR STORY</h3>
          <span className="text-lg lg:text-3xl ml-3 lg:ml-5">
            @KOREREN_Instagram
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square">
            <img src={img1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square">
            <img src={img2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square">
            <img src={img3} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square">
            <img src={img4} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
