import React from "react";
import { Link } from "react-router";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import { paymentFee, testList } from "./psychologicalTestData";

const PsychologicalTest = () => {
  return (
    <div className="min-h-screen bg-[#f7fbf8]">
      <div className="bg-white">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-[#e9f8f0] px-4 py-2 text-sm font-semibold text-[#22B573]">
              মানসিক স্বাস্থ্য স্ক্রিনিং
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#10251b] md:text-5xl">
              আপনার জন্য উপযুক্ত সাইকোলজিক্যাল টেস্ট নির্বাচন করুন
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              বাংলা প্রশ্নমালার মাধ্যমে উদ্বেগ, বিষণ্নতা অথবা ওসিডি সম্পর্কিত
              প্রাথমিক ধারণা নিন। পেমেন্ট সম্পন্ন করার পর আপনার তথ্য দিয়ে
              একবারে একটি করে প্রশ্নের উত্তর দিতে পারবেন।
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["SSLCommerz পেমেন্ট", "ইমেইল রিপোর্ট", "ডাটাবেস সেভ"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#dcefe5] bg-white px-4 py-4 text-sm font-semibold text-[#173d2b] shadow-sm"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-lg border border-[#dcefe5] bg-white p-6 shadow-xl shadow-green-100/60">
            <div className="rounded-lg bg-[#10251b] p-6 text-white">
              <p className="text-sm text-green-100">টেস্ট ফি</p>
              <p className="mt-2 text-4xl font-bold">৳{paymentFee}</p>
              <p className="mt-3 text-sm leading-6 text-green-50">
                পেমেন্টের পরে নাম, বয়স, ইমেইল ও ফোন নম্বর সংগ্রহ করা হবে।
                রিপোর্ট তৈরি হলে সেটি ইমেইলে পাঠানোর জন্য সাবমিট হবে।
              </p>
            </div>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p>• এটি প্রাথমিক স্ক্রিনিং, চিকিৎসকের চূড়ান্ত রোগনির্ণয় নয়।</p>
              <p>• জরুরি মানসিক কষ্ট হলে দ্রুত স্থানীয় জরুরি সেবায় যোগাযোগ করুন।</p>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {testList.map((test) => (
            <article
              key={test.id}
              className="flex min-h-[300px] flex-col rounded-lg border border-[#dcefe5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-100/70"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#e9f8f0] px-3 py-1 text-sm font-semibold text-[#22B573]">
                  {test.questions.length} প্রশ্ন
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {test.duration}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#10251b]">
                {test.title}
              </h2>
              <p className="mt-3 flex-1 leading-7 text-gray-600">
                {test.subtitle}
              </p>
              <Link
                to={`/psychological-test/${test.id}`}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#22B573] px-6 py-3 font-bold text-white transition hover:bg-[#1a935b]"
              >
                টেস্ট শুরু করুন
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer color="bg-green-900" />
    </div>
  );
};

export default PsychologicalTest;
