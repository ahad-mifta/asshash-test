import img1 from "../../../assets/howitworks/img1.png";
import img2 from "../../../assets/howitworks/img2.png";
import img3 from "../../../assets/howitworks/img3.png";
import img4 from "../../../assets/howitworks/img4.png";

const HowItWork = () => {
  const datas = [
    {
      img: img1,
      title: "Download or Open the App",
    },
    {
      img: img2,
      title: "Choose Your Service",
      desc: "Medical, mental health, or spiritual wellness",
    },
    {
      img: img3,
      title: "Get Care Anywhere",
      desc: "Online or at our local health hubs",
    },
    {
      img: img4,
      title: "Follow-up & Wellness Plans",
      desc: "Continuous support for lasting health",
    },
  ];

  return (
    <div className="my-7">
      <h2 className="text-4xl font-bold mb-8 ">How it works</h2>

      <div className=" flex flex-col lg:flex-row justify-center items-center gap-10">
        {datas.map((item, index) => (
          <div
            key={index}
            className="relative w-72 h-96 bg-[#22B573] rounded-2xl shadow-lg flex flex-col items-center justify-end p-6"
          >
            <div className="absolute top-10 w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="object-contain w-full"
              />
            </div>

            <p className="text-white text-center font-bold text-xl mb-6">
              {item.title}
            </p>
            {item.desc && (
              <p className="text-white text-center text-sm">{item.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
