import img1 from "../../../assets/hero/first.png";
import img2 from "../../../assets/hero/second.png";

const HeroThree = () => {
  return (
    <div>
      <div className=" grid lg:grid-cols-3 grid-cols-1 items-center gap-8">
        <img
          src={img1}
          alt="Healthcare support"
          className=" w-full hidden lg:block"
        />

        <div className="text-center my-10 lg:my-0 ">
          <h1 className="text-2xl md:text-4xl/relaxed text-gray-800  ">
            Local centers providing in <br /> person healthcare{" "}
            <span className="font-bold">support</span>{" "}
            <br className="lg:hidden " />
            <span className="lg:text-5xl text-green-500">Bridging</span>
            &nbsp; the gap between digital care and on-ground access
          </h1>
        </div>

        <img
          src={img2}
          alt="Healthcare access"
          className=" w-full hidden lg:block"
        />
      </div>
    </div>
  );
};

export default HeroThree;
