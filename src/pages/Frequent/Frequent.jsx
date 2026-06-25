import { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

const faqs = [
  {
    question: "Who can invest with Digiyog?",
    answer:
      "Anyone with a Bangladeshi bank account or MFS (Mobile Financial Services) account can invest in fractionalized real estate properties through Digiyog.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "We use advanced cybersecurity technologies and strict access controls to protect user data stored in the cloud.",
  },
  {
    question: "Can I visit the property myself?",
    answer:
      "Yes! We provide property details and encourage you to visit the properties in person.",
  },
  {
    question: "What is the minimum investment amount on Digiyog?",
    answer: "The minimum investment is BDT 500.",
  },
  {
    question: "Is there a maximum amount that I can invest?",
    answer:
      "Digiyog does not set a maximum, but certain properties may have share caps based on demand.",
  },
  {
    question: "What is fractional investment?",
    answer:
      "It's a way for multiple investors to own shares of a single property and earn rental income and appreciation.",
  },
  {
    question: "What benefit does a fractional investment platform provide?",
    answer:
      "It lets anyone invest in real estate affordably by buying small shares of properties.",
  },
  {
    question: "How does it work on Digiyog?",
    answer:
      "You invest from BDT 500, choose properties, and earn returns based on property category and performance.",
  },
];

const investmentFaqs = [
  {
    question: "What is the investment process?",
    answer: `Users can choose from a variety of real estate properties (land, flats, apartments, etc.) and select the number of fractional shares they would like to invest in. After confirming their selection, users can proceed with the checkout process. To complete the transaction, users need to log into their Digiyog account and make the payment. Once payment is completed and verified by Digiyog (which may take 2-3 business days), users will be able to track their investment progress in their <strong>Portfolio</strong> page.`,
  },
  {
    question: "When do I get my return?",
    answer: `Returns depend on the type of investment you make. You can hold your investment until the property reaches maturity or choose to exit early by selling your shares through the <strong>Secondary Marketplace</strong>. The maturity period for each property is clearly stated on the property details page.`,
  },
  {
    question:
      "What if something goes wrong with Digiyog? Is my investment secured?",
    answer: `Your investment is fully secured. Even if Digiyog faces operational challenges, you still own your real estate shares. Your investment is legally protected, and in the event of Digiyog’s closure, you retain full ownership of the property shares and will receive any proceeds from property sales.`,
  },
  {
    question: "What will Digiyog charge me?",
    answer: `Digiyog operates on a profit-sharing model. The platform keeps <strong>20%</strong> of any profits generated from your investment, while you keep <strong>80%</strong>. This percentage only applies to profits, not the original investment amount. There is also a small platform fee that applies to transactions, which is detailed in our <strong>Terms & Conditions</strong>.`,
  },
  {
    question: "How much return do I get on my investment?",
    answer: `The return on investment (ROI) varies by property type and market conditions. Digiyog does not offer fixed returns or interest, and your profits will depend on the performance and appreciation of the property over time. The <strong>forecasted return at maturity</strong> is provided on each property’s details page to give you an estimate. However, please note that these figures are based on previous market data and current trends and may fluctuate.`,
  },
  {
    question: "How do you calculate the value of the property?",
    answer: `The value of properties is evaluated every 3 to 6 months. Digiyog uses market comparables and independent land brokers' average prices to adjust property values. The prices are updated regularly to reflect current market trends, ensuring that the price of your shares aligns with the real-time market value of the property.`,
  },
  {
    question: "When and how will I receive my returns with profit?",
    answer: `Properties on Digiyog are typically held for a maturity period of 3 to 5 years, depending on the type of investment. Once the property is sold, the total appreciated value, including profits, is distributed to investors who hold shares in the property, on a pro-rata basis. The exact maturity period for each property is clearly outlined on the property details page.`,
  },
  {
    question:
      "What if I want to withdraw my invested amount? What is the process?",
    answer: `Currently, withdrawals are not possible unless the property is sold or has reached its maturity. However, Digiyog offers a <strong>Secondary Marketplace</strong> where you can sell your shares to other investors. For more details, please visit the <strong>Marketplace</strong> section.`,
  },
  {
    question: "How do I make the payment for my investment?",
    answer: `Digiyog accepts payments via direct bank transfers or MFS (Mobile Financial Services) platforms like <strong>bKash</strong>. After transferring the funds, you must upload a screenshot of the transaction proof to complete the process. Further details on payment methods are provided during the checkout.`,
  },
];
const secondaryMarketplaceFaqs = [
  {
    question: "What is the secondary marketplace?",
    answer: `The <strong>Secondary Marketplace</strong> is a trading platform where Digiyog members can buy and sell fractional shares of real estate investments with other users. This marketplace allows you to liquidate your investments or purchase additional shares without having to wait for the property to reach maturity. The marketplace provides liquidity to investors by enabling peer-to-peer transactions.`,
  },
  {
    question: "Is the secondary marketplace secured?",
    answer: `Yes, the <strong>Secondary Marketplace</strong>  is fully secured. All transactions take place between Digiyog registered users, and no third-party entities are involved. The marketplace operates under the same high-security standards as the rest of the Digiyog platform, ensuring the safety of all transactions and data.`,
  },
  {
    question: "How do I sell or list my property on the secondary marketplace?",
    answer: `<ul class="list-disc ml-10 xl:ml-20">
    <li>Navigate to your <strong>Portfolio</strong> page.</li>
    <li>Locate the property you wish to sell under the <strong>Invested Properties</strong> section.</li>
    <li> Click the <strong>Sell</strong> button next to the property you want to list.</li>
    <li>Set your desired selling price for the shares you wish to sell.</li>
    </ul><br/>
    Once your listing is complete, other users will be able to view and purchase your shares in the <strong>Secondary Marketplace</strong>.`,
  },
];
const legalFaqs = [
  {
    question: "What paperwork do I receive when I invest?",
    answer: `When you invest in fractional shares of a property on <strong>Digiyog</strong>, you will receive a receipt and a legal document that serves as proof of your ownership in the property. This document confirms your stake in the property and provides a legal record of your investment.`,
  },
  {
    question: "How does Digiyog ensure that all property titles are clear?",
    answer: `Digiyog works with a team of experienced real estate lawyers and agents to conduct thorough due diligence on all properties listed on the platform. This process includes verifying the property’s legal documents, ownership history, and transaction records. Only properties that have passed this rigorous due diligence are made available for investment. This ensures that all titles are clear and that your investment is secure.`,
  },
  {
    question: "Can I verify the property deed document myself?",
    answer: `Yes, you can verify the property deed document. To view the property deed, please send a request to <strong>Digiyog’s support team</strong> via email at <strong><a href="mailto:support@digiyog.com"">support@digiyog.com</a></strong> . You can either receive a digital copy of the deed or schedule a time to view it in person at Digiyog’s office.`,
  },
  {
    question: "How do I know Digiyog is a legally registered company?",
    answer: `Digiyog is a legally registered company with the appropriate government authorities in Bangladesh. You can contact our <strong>customer support</strong> via WhatsApp at <strong>01769991122</strong> to request a copy of Digiyog's registration documents and trade license for verification.`,
  },
];

const Frequent = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [openInvestmentIndex, setOpenInvestmentIndex] = useState(null);
  const [opensecondaryMarketplaceFaqs, setOpensecondaryMarketplaceFaqs] =
    useState(null);
  const [openlegalFaqs, setOpenlegalFaqs] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const toggleInvestmentFaq = (index) => {
    setOpenInvestmentIndex((prev) => (prev === index ? null : index));
  };
  const togglesecondaryMarketplaceFaqs = (index) => {
    setOpensecondaryMarketplaceFaqs((prev) => (prev === index ? null : index));
  };
  const togglelegalFaqs = (index) => {
    setOpenlegalFaqs((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#06582C]">
      <Navbar />
      <div className="flex justify-center items-center h-[500px]">
        <h1 className="text-6xl lg:text-4xl 2xl:text-6xl text-white font-bold leading-15 w-[400px] text-center">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="bg-white ">
        <div className="container mx-auto p-4">
          {/* first grid */}
          <div className="flex flex-wrap gap-5 mt-10 lg:mt-20">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full md:w-[calc(50%-10px)]">
                <div
                  className={`collapse collapse-arrow border border-base-300 bg-base-100 ${
                    openFaqIndex === index
                      ? "collapse-open [&>div::after]:text-green-500"
                      : ""
                  }`}
                >
                  <div
                    className="collapse-title font-semibold cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                  </div>
                  {openFaqIndex === index && (
                    <div
                      className="collapse-content text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* second grid */}
          <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mt-10 lg:mt-20">
            INVESTMENT
          </h1>
          <div className="flex flex-wrap gap-5 mt-10 lg:mt-20">
            {investmentFaqs.map((faq, index) => (
              <div key={index} className="w-full md:w-[calc(50%-10px)]">
                <div
                  className={`collapse collapse-arrow border border-base-300 bg-base-100 ${
                    openInvestmentIndex === index
                      ? "collapse-open [&>div::after]:text-green-500"
                      : ""
                  }`}
                >
                  <div
                    className="collapse-title font-semibold cursor-pointer"
                    onClick={() => toggleInvestmentFaq(index)}
                  >
                    {faq.question}
                  </div>
                  {openInvestmentIndex === index && (
                    <div
                      className="collapse-content text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* third grid */}
          <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mt-10 lg:mt-20">
            SECONDARY MARKETPLACE
          </h1>
          <div className="flex flex-wrap gap-5 mt-10 lg:mt-20 ">
            {secondaryMarketplaceFaqs.map((faq, index) => (
              <div key={index} className="w-full md:w-[calc(50%-10px)]">
                <div
                  className={`collapse collapse-arrow border border-base-300 bg-base-100 ${
                    opensecondaryMarketplaceFaqs === index
                      ? "collapse-open [&>div::after]:text-green-500"
                      : ""
                  }`}
                >
                  <div
                    className="collapse-title font-semibold cursor-pointer"
                    onClick={() => togglesecondaryMarketplaceFaqs(index)}
                  >
                    {faq.question}
                  </div>
                  {opensecondaryMarketplaceFaqs === index && (
                    <div
                      className="collapse-content text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* fourth grid */}
          <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mt-10 lg:mt-20 ">
            LEGAL
          </h1>
          <div className="flex flex-wrap gap-5 mt-10 lg:mt-20 mb-20">
            {legalFaqs.map((faq, index) => (
              <div key={index} className="w-full md:w-[calc(50%-10px)]">
                <div
                  className={`collapse collapse-arrow border border-base-300 bg-base-100 ${
                    openlegalFaqs === index
                      ? "collapse-open [&>div::after]:text-green-500"
                      : ""
                  }`}
                >
                  <div
                    className="collapse-title font-semibold cursor-pointer"
                    onClick={() => togglelegalFaqs(index)}
                  >
                    {faq.question}
                  </div>
                  {openlegalFaqs === index && (
                    <div
                      className="collapse-content text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer color="bg-[#006838]" />
    </div>
  );
};

export default Frequent;
