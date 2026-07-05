import circle from "../../../assets/faq/faqCircle.png";
const FaqHalf = () => {
  return (
    <div className="xl:faqBg bg-[#06582C] min-h-screen flex items-center">
      <div className="container mx-auto p-4 lg:mt-64">
        <div className="flex items-center justify-between flex-col lg:flex-row-reverse gap-5 mt-10">
          <img src={circle} className="w-[300px] lg:w-auto" />
          <div className="lg:w-[700px] w-auto ">
            <h3 className="text-5xl xl:text-7xl  md:text-left font-montSemiBold text-center  mt-32 text-white ">
              Powered by Blockchain & <br />
              Smart Contracts
            </h3>
            <p className="py-6 text-white font-montRegular text-2xl">
              Your investment shares are digitally secured on the blockchain.
              That means no one—not even us—can change or manipulate your
              ownership once recorded. This system is future-proof, scalable,
              and designed with global interoperability in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqHalf;
