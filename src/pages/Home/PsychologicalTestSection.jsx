import React from "react";
import { Link } from "react-router";
import { paymentFee, testList } from "../PsychologicalTest/psychologicalTestData";

const PsychologicalTestSection = () => {
  return (
    <section className="bg-[#f2fcf6] px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#22B573] shadow-sm">
              বাংলা সাইকোলজিক্যাল স্ক্রিনিং
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#10251b] md:text-4xl">
              উদ্বেগ, বিষণ্নতা ও ওসিডি সম্পর্কে প্রাথমিক রিপোর্ট পান
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">
              SSLCommerz পেমেন্টের পর নাম, বয়স, ইমেইল ও ফোন নম্বর দিয়ে
              একবারে একটি করে প্রশ্নের উত্তর দিন। শেষে স্কোরভিত্তিক রিপোর্ট
              তৈরি হবে এবং ইমেইলে পাঠানোর জন্য সংরক্ষিত হবে।
            </p>
          </div>
          <Link
            to="/psychological-test"
            className="inline-flex items-center justify-center rounded-full bg-[#22B573] px-8 py-4 font-bold text-white shadow-lg transition hover:bg-[#1a935b]"
          >
            টেস্ট নির্বাচন করুন
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testList.map((test) => (
            <article
              key={test.id}
              className="rounded-lg border border-[#dcefe5] bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#e9f8f0] px-3 py-1 text-sm font-semibold text-[#22B573]">
                  {test.questions.length} প্রশ্ন
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  ৳{paymentFee}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#10251b]">
                {test.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-600">{test.subtitle}</p>
              <Link
                to={`/psychological-test/${test.id}`}
                className="mt-6 inline-flex font-bold text-[#22B573] hover:text-[#1a935b]"
              >
                শুরু করুন →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PsychologicalTestSection;
