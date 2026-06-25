import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import { answerOptions, getReport, paymentFee, tests } from "./psychologicalTestData";

const initialUser = {
  name: "",
  age: "",
  email: "",
  phone: "",
};

const saveReport = async (payload) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/psychological-tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Report submit failed");
    }

    return "server";
  }

  const existing = JSON.parse(
    localStorage.getItem("psychologicalTestReports") || "[]"
  );
  localStorage.setItem(
    "psychologicalTestReports",
    JSON.stringify([...existing, payload])
  );

  return "local";
};

const OcdTest = () => {
  const { testId = "ocd" } = useParams();
  const test = tests[testId] || tests.ocd;
  const options = answerOptions[test.answerType];
  const [step, setStep] = useState("payment");
  const [user, setUser] = useState(initialUser);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportStatus, setReportStatus] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  const score = useMemo(
    () => answers.reduce((total, answer) => total + Number(answer || 0), 0),
    [answers]
  );
  const report = getReport(test, score);
  const progress = Math.round((answers.length / test.questions.length) * 100);
  const selectedAnswer = answers[currentIndex];

  const handlePayment = () => {
    const sslCommerzUrl = import.meta.env.VITE_SSLCOMMERZ_PAYMENT_URL;

    if (sslCommerzUrl) {
      window.open(sslCommerzUrl, "_blank", "noopener,noreferrer");
      setPaymentMessage(
        "SSLCommerz পেমেন্ট পেজ নতুন ট্যাবে খোলা হয়েছে। পেমেন্ট শেষ হলে নিচের বাটনে এগিয়ে যান।"
      );
      return;
    }

    setPaymentMessage(
      "ডেমো মোডে SSLCommerz পেমেন্ট সম্পন্ন ধরা হয়েছে। লাইভ পেমেন্টের জন্য VITE_SSLCOMMERZ_PAYMENT_URL অথবা backend initiate endpoint যুক্ত করুন।"
    );
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    setStep("questions");
  };

  const handleAnswer = (value) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);

    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    setStep("report");
    submitReport(nextAnswers);
  };

  const submitReport = async (finalAnswers) => {
    setReportStatus("রিপোর্ট সংরক্ষণ ও ইমেইল পাঠানোর জন্য প্রস্তুত করা হচ্ছে...");

    const payload = {
      user,
      testId: test.id,
      testTitle: test.title,
      score: finalAnswers.reduce((total, answer) => total + Number(answer), 0),
      resultTitle: getReport(
        test,
        finalAnswers.reduce((total, answer) => total + Number(answer), 0)
      ).title,
      answers: finalAnswers,
      createdAt: new Date().toISOString(),
    };

    try {
      const target = await saveReport(payload);
      setReportStatus(
        target === "server"
          ? "রিপোর্ট ডাটাবেসে সেভ হয়েছে এবং ইমেইল সার্ভিসে পাঠানো হয়েছে।"
          : "Backend সেট না থাকায় রিপোর্ট ব্রাউজারের localStorage-এ সেভ হয়েছে।"
      );
    } catch {
      setReportStatus(
        "রিপোর্ট তৈরি হয়েছে, তবে সার্ভারে পাঠানো যায়নি। backend endpoint পরীক্ষা করুন।"
      );
    }
  };

  const resetTest = () => {
    setStep("payment");
    setUser(initialUser);
    setAnswers([]);
    setCurrentIndex(0);
    setReportStatus("");
    setPaymentMessage("");
  };

  return (
    <div className="min-h-screen bg-[#f7fbf8]">
      <div className="bg-white">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/psychological-test"
              className="text-sm font-semibold text-[#22B573]"
            >
              ← সব টেস্টে ফিরে যান
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-[#10251b] md:text-4xl">
              {test.title}
            </h1>
            <p className="mt-2 max-w-2xl text-gray-600">{test.subtitle}</p>
          </div>
          <div className="rounded-lg border border-[#dcefe5] bg-white px-5 py-4 text-right shadow-sm">
            <p className="text-sm text-gray-500">টেস্ট ফি</p>
            <p className="text-2xl font-bold text-[#22B573]">৳{paymentFee}</p>
          </div>
        </div>

        <section className="rounded-lg border border-[#dcefe5] bg-white p-5 shadow-xl shadow-green-100/50 md:p-8">
          <div className="mb-8 grid gap-3 md:grid-cols-4">
            {["পেমেন্ট", "তথ্য", "প্রশ্ন", "রিপোর্ট"].map((label, index) => {
              const activeIndex = ["payment", "details", "questions", "report"].indexOf(step);
              return (
                <div
                  key={label}
                  className={`rounded-lg px-4 py-3 text-sm font-bold ${
                    index <= activeIndex
                      ? "bg-[#22B573] text-white"
                      : "bg-[#eef7f2] text-[#173d2b]"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {step === "payment" && (
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="text-2xl font-bold text-[#10251b]">
                  SSLCommerz পেমেন্ট সম্পন্ন করুন
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  পেমেন্ট সম্পন্ন হলে আপনার ব্যক্তিগত তথ্য নেওয়া হবে এবং তারপর
                  প্রশ্ন শুরু হবে। লাইভ সার্ভারে SSLCommerz initiate endpoint
                  যুক্ত করলে এই ধাপ সরাসরি পেমেন্ট গেটওয়েতে যাবে।
                </p>
                {paymentMessage && (
                  <p className="mt-5 rounded-lg bg-[#e9f8f0] p-4 text-sm font-semibold text-[#173d2b]">
                    {paymentMessage}
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-[#dcefe5] bg-[#f8fdfb] p-6">
                <p className="text-sm font-semibold text-gray-500">পরিশোধযোগ্য</p>
                <p className="mt-2 text-4xl font-bold text-[#10251b]">
                  ৳{paymentFee}
                </p>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="mt-6 w-full rounded-full bg-[#22B573] px-6 py-3 font-bold text-white transition hover:bg-[#1a935b]"
                >
                  SSLCommerz দিয়ে পে করুন
                </button>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="mt-3 w-full rounded-full border border-[#22B573] px-6 py-3 font-bold text-[#22B573] transition hover:bg-[#e9f8f0]"
                >
                  পেমেন্ট সম্পন্ন হয়েছে, এগিয়ে যান
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <form onSubmit={handleUserSubmit} className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-[#10251b]">
                আপনার তথ্য দিন
              </h2>
              <p className="mt-2 text-gray-600">
                রিপোর্ট তৈরি, ইমেইল পাঠানো এবং ডাটাবেসে সংরক্ষণের জন্য তথ্য প্রয়োজন।
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["name", "নাম", "text"],
                  ["age", "বয়স", "number"],
                  ["email", "ইমেইল", "email"],
                  ["phone", "ফোন নম্বর", "tel"],
                ].map(([name, label, type]) => (
                  <label key={name} className="block">
                    <span className="mb-2 block text-sm font-bold text-[#173d2b]">
                      {label}
                    </span>
                    <input
                      required
                      name={name}
                      type={type}
                      value={user[name]}
                      onChange={handleUserChange}
                      className="w-full rounded-lg border border-[#cfe6d8] px-4 py-3 outline-none transition focus:border-[#22B573] focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="mt-7 rounded-full bg-[#22B573] px-8 py-3 font-bold text-white transition hover:bg-[#1a935b]"
              >
                প্রশ্ন শুরু করুন
              </button>
            </form>
          )}

          {step === "questions" && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm font-semibold text-gray-500">
                  <span>
                    প্রশ্ন {currentIndex + 1} / {test.questions.length}
                  </span>
                  <span>{progress}% সম্পন্ন</span>
                </div>
                <div className="h-2 rounded-full bg-[#e4f3eb]">
                  <div
                    className="h-2 rounded-full bg-[#22B573] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-[#f8fdfb] p-6 md:p-8">
                <p className="text-xl font-bold leading-9 text-[#10251b] md:text-2xl">
                  {test.questions[currentIndex]}
                </p>
                <div className="mt-8 grid gap-3">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className={`rounded-lg border px-5 py-4 text-left font-semibold transition ${
                        selectedAnswer === option.value
                          ? "border-[#22B573] bg-[#e9f8f0] text-[#173d2b]"
                          : "border-[#dcefe5] bg-white text-gray-700 hover:border-[#22B573]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((index) => index - 1)}
                  className="rounded-full border border-[#cfe6d8] px-5 py-2 font-semibold text-[#173d2b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  আগের প্রশ্ন
                </button>
                <button
                  type="button"
                  onClick={resetTest}
                  className="rounded-full px-5 py-2 font-semibold text-gray-500 hover:text-[#173d2b]"
                >
                  নতুন করে শুরু
                </button>
              </div>
            </div>
          )}

          {step === "report" && (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-[#10251b] p-6 text-white md:p-8">
                <p className="text-sm font-semibold text-green-100">
                  {user.name} এর রিপোর্ট
                </p>
                <h2 className="mt-3 text-3xl font-bold">{report.title}</h2>
                <p className="mt-4 text-lg text-green-50">
                  মোট স্কোর: <span className="font-bold">{score}</span>
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-[#dcefe5] bg-[#f8fdfb] p-6">
                <h3 className="text-xl font-bold text-[#10251b]">
                  ফলাফলের ব্যাখ্যা
                </h3>
                <p className="mt-3 leading-8 text-gray-700">{report.text}</p>
                <p className="mt-5 rounded-lg bg-white p-4 text-sm leading-6 text-gray-600">
                  এই রিপোর্টটি প্রাথমিক স্ক্রিনিং হিসেবে তৈরি। এটি চিকিৎসকের
                  চূড়ান্ত রোগনির্ণয়ের বিকল্প নয়।
                </p>
                {reportStatus && (
                  <p className="mt-4 text-sm font-semibold text-[#22B573]">
                    {reportStatus}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetTest}
                  className="rounded-full bg-[#22B573] px-6 py-3 font-bold text-white transition hover:bg-[#1a935b]"
                >
                  আরেকটি টেস্ট দিন
                </button>
                <Link
                  to="/psychological-test"
                  className="rounded-full border border-[#22B573] px-6 py-3 font-bold text-[#22B573] transition hover:bg-[#e9f8f0]"
                >
                  সব টেস্ট দেখুন
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer color="bg-green-900" />
    </div>
  );
};

export default OcdTest;
