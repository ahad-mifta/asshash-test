import React, { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

// OCD Test questions and options from ocd.md
const ocdTestOptions = ["একেবারেই নেই", "খুবই সামান্য", "সামান্য", "একটু বেশি", "অনেক বেশি"];
const ocdTestScores = [0, 1, 2, 3, 4];

const testQuestions = [ // Sourced from ocd.md
  { id: 1, text: "আমার মাথায় ধর্ম নিয়ে নানান ধরনের অদ্ভুত এবং বাজে চিন্তা আসে যা আমি চাইলেও থামাতে পারি না।" },
  { id: 2, text: "পবিত্র স্থানকে অপবিত্র করছি এমন কল্পনা বা ছবি আসে মনে, আমি চাইলেও তা মন থেকে সরাতে পারিনা।" },
  { id: 3, text: "নাস্তিকতাবাদী চিন্তা আমার মনের মধ্যে এত বার বার আসতে থাকে যে মনে হয় আমার ঈমান (সৃষ্টিকর্তার প্রতি বিশ্বাস) নেই বা নষ্ট হয়ে গেছে।" },
  { id: 4, text: "সারাক্ষণ সন্দেহ হয় আমি বুঝি নাপাক, নোংরা, বা অশুচি হয়ে গেছি।" },
  { id: 5, text: "সারাক্ষণ মনে হয় আমার গায়ে-হাতে ময়লা বা জীবাণু লেগে আছে।" },
  { id: 6, text: "কোন কিছু পরিস্কার করার সময় অনেকবার বা অনেক সময় লাগিয়ে ধুই, যদিও বুঝি এতবার ধোয়ার দরকার নেই, কিন্তু না ধুয়ে পারি না।" },
  { id: 7, text: "পরিস্কার পরিচ্ছন্নতার জন্য আমাকে প্রচুর পরিমান সাবান বা ডিটারজেন্ট পাউডার ব্যাবহার করতে হয়।" },
  { id: 8, text: "যেখানে নোংরা থাকতে পারে ঐসব স্থান সম্পর্কে আমি অতিরিক্ত সচেতন থাকি এবং প্রায়শই এড়িয়ে চলি।" },
  { id: 9, text: "আমার গায়ে কারো স্পর্শ লাগলে আমি গোসল বা পরিস্কার না হওয়া পর্যন্ত অশান্তিতে ভুগতে থাকি।" },
  { id: 10, text: "গোসল করতে আমার প্রচুর সময় এমনকি কয়েক ঘন্টাও লেগে যায়।" },
  { id: 11, text: "কোন কাজ করার মাঝে যদি আমার মনে চিšতা আসে যে আমি নাপাক হয়ে গেছি, তাহলে আমি তৎক্ষনাৎ গোসল বা পরিচ্ছন্ন হতে যাই।" },
  { id: 12, text: "বিভিন্ন জিনিস আমি বারবার পরীক্ষা করে দেখি।" },
  { id: 13, text: "নামাজ /উপাসনা করতে গেলে সন্দেহ লাগে হয়তো সুরা /শ্লোক ঠিকমত পড়া হয়নি, তখন আবার পড়ি, এভাবে অনেক সময় লেগে যায়।" },
  { id: 14, text: "হিসাব করতে আমার খুব অসুবিধা হয়, শুধু মনে হয় বুঝি গোনায় ভুল হয়ে গেল।" },
  { id: 15, text: "আমার মনের মত না হওয়া পর্যšত আমি একই কাজ বারবার করতে থাকি।" },
  { id: 16, text: "বিভিন্ন জিনিস আমি একটি নির্দিষ্ট সংখ্যক বার করি।" },
  { id: 17, text: "প্রাত্যহিক কাজ করতে আমার প্রচুর সময় লাগে বা প্রায় কোন কাজই সময় মত করতে পারি না।" },
  { id: 18, text: "কোন কাজ করার সময় যদি আমার নির্ধারিত ধারাবাহিকতায় কোন ছেদ পড়ে বা বিঘ্ন ঘটে তবে সে কাজটি আমাকে আবার প্রথম থেকে শুরু করতে হয়।" },
  { id: 19, text: "আমি বুঝি আমি এমন কিছু আচরণ করি যা অতিরিক্ত এবং অপ্রয়োজনীয়, কিন্তু তারপরও না করে পারি না।" },
  { id: 20, text: "কিছু কিছু ব্যাপার নিয়ে আমি অতিরিক্ত খুঁতখুঁতে বলে অন্যরা প্রায়ই আমার উপর বিরক্ত হয়।" },
];

const PsychologicalTest = () => {
  const [step, setStep] = useState(1);
  const [selectedTest, setSelectedTest] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", age: "", email: "", phone: "" });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTestSelection = (testName) => {
    setSelectedTest(testName);
    setStep(2);
  };

  const handlePaymentAndStart = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate SSL Commerz Payment Gateway API Call
    setTimeout(() => {
      alert("SSL Commerz Payment Successful!");
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const handleAnswer = (optionScore) => {
    const newScore = score + optionScore;
    setScore(newScore);
    
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitTest(newScore);
    }
  };

  const submitTest = (finalScore) => {
    setIsSubmitting(true);
    // Simulate API call to save user details/score to the Database and send an Email report
    setTimeout(() => {
      alert("আপনার উত্তর সফলভাবে ডাটাবেসে সংরক্ষিত হয়েছে এবং ইমেইলে রিপোর্ট পাঠানো হয়েছে।");
      setIsSubmitting(false);
      setStep(4);
    }, 2000);
  };

  // Result feedback logic based on ocd.md
  const getResultFeedback = () => {
    if (score <= 16) {
      return "আপনার উত্তরগুলো থেকে বোঝা যায় যে আপনার অভ্যাস, চিন্তাভাবনা বা দৈনন্দিন রুটিন স্বাভাবিক ও সুস্থ সীমার মধ্যে রয়েছে। আপনার বর্তমান ফলাফল নির্দেশ করে যে এসব প্রবণতা খুবই সামান্য এবং এগুলো আপনার দৈনন্দিন জীবন বা মানসিক সুস্থতার ওপর উল্লেখযোগ্য কোনো নেতিবাচক প্রভাব ফেলছে না।";
    }
    if (score <= 23) {
      return "আপনার উত্তরগুলো থেকে বোঝা যায় যে আপনার মধ্যে মৃদু মাত্রার অবসেসিভ-কমপালসিভ প্রবণতা রয়েছে। যদিও এসব প্রবণতা কখনো কখনো বিরক্তিকর বা সময়সাপেক্ষ মনে হতে পারে, তবে সঠিক পদক্ষেপ গ্রহণ করলে এগুলো কার্যকরভাবে নিয়ন্ত্রণ করা সম্ভব।";
    }
    if (score <= 40) {
      return "আপনার উত্তরগুলো থেকে বোঝা যায় যে আপনি মাঝারি মাত্রার অবসেসিভ-কমপালসিভ মানসিক কষ্ট অনুভব করছেন। এর ফলে কর্মক্ষেত্র, পড়াশোনা বা দৈনন্দিন কাজের গতি ও মনোযোগ ব্যাহত হতে পারে এবং ব্যক্তিগত হতাশাও তৈরি হতে পারে। একজন ক্লিনিক্যাল মনোবিজ্ঞানীর মতো মানসিক স্বাস্থ্য পেশাজীবীর সঙ্গে পরামর্শ করার জোরালো সুপারিশ করা হচ্ছে।";
    }
    if (score <= 49) {
      return "আপনার উত্তরগুলো থেকে বোঝা যায় যে আপনি তীব্র মাত্রার অবসেসিভ-কমপালসিভ মানসিক কষ্ট অনুভব করছেন। এর ফলে আপনার দৈনন্দিন জীবন, দায়িত্ব পালন, সম্পর্ক এবং মানসিক শান্তি উল্লেখযোগ্যভাবে ব্যাহত হতে পারে। একজন যোগ্য ক্লিনিক্যাল সাইকোলজিস্ট বা মনোরোগ বিশেষজ্ঞের পরামর্শ গ্রহণ করা অত্যন্ত গুরুত্বপূর্ণ।";
    }
    // score >= 50
    return "আপনার উত্তরগুলো থেকে বোঝা যায় যে আপনি অত্যন্ত তীব্র মাত্রার অবসেসিভ-কমপালসিভ মানসিক কষ্ট অনুভব করছেন। এই পর্যায়ে স্বাভাবিকভাবে জীবনযাপন করা বা মানসিক স্বস্তি অনুভব করা অত্যন্ত কঠিন হয়ে পড়ে। তবে মনে রাখবেন, এই অবস্থা যতই তীব্র হোক না কেন, যথাযথ চিকিৎসার মাধ্যমে উল্লেখযোগ্য উন্নতি সম্পূর্ণ সম্ভব। অবিলম্বে পেশাগত চিকিৎসা গ্রহণ করুন।";
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black">
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-6 max-w-4xl min-h-[60vh] flex flex-col justify-center">
        
        {/* Step 1: Test Selection */}
        {step === 1 && (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-[#22B573] mb-6 font-montHeavy">Psychological Tests</h1>
            <p className="text-gray-600 mb-8 text-lg">আপনার মানসিক স্বাস্থ্য মূল্যায়নের জন্য একটি পরীক্ষা নির্বাচন করুন।</p>
            <div className="grid gap-6 md:grid-cols-3">
              {/* For now, only OCD Test is active as requested */}
              <button
                  onClick={() => handleTestSelection("OCD Test")}
                  className="p-8 border-2 border-[#22B573] text-[#22B573] rounded-2xl hover:bg-[#22B573] hover:text-white transition-all duration-300 font-semibold text-xl md:col-start-2"
                >
                  OCD Test
              </button>
              {/* You can add back "Anxiety Test" and "Depression Test" here later */}
              {/* {["Anxiety Test", "Depression Test", "OCD Test"].map((test) => (
                <button
                  key={test}
                  onClick={() => handleTestSelection(test)}
                  className="p-8 border-2 border-[#22B573] text-[#22B573] rounded-2xl hover:bg-[#22B573] hover:text-white transition-all duration-300 font-semibold text-xl"
                >
                  {test}
                </button>
              ))} */}
            </div>
          </div>
        )}

        {/* Step 2: User Information & Payment */}
        {step === 2 && (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#22B573] mb-8">{selectedTest} - Details & Payment</h2>
            <form onSubmit={handlePaymentAndStart} className="space-y-5 max-w-lg mx-auto">
              <div><label className="block text-sm font-semibold mb-2">Full Name</label><input required type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#22B573]" value={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold mb-2">Age</label><input required type="number" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#22B573]" value={userInfo.age} onChange={(e) => setUserInfo({...userInfo, age: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold mb-2">Email Address</label><input required type="email" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#22B573]" value={userInfo.email} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold mb-2">Phone Number</label><input required type="tel" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#22B573]" value={userInfo.phone} onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})} /></div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#22B573] text-white py-4 mt-4 rounded-xl font-bold text-lg hover:bg-[#1a935b] transition disabled:opacity-70">
                {isSubmitting ? "Processing Payment..." : "Pay Fee (SSL Commerz) & Start Test"}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Taking the Test */}
        {step === 3 && (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-w-2xl mx-auto w-full relative">
             {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 rounded-3xl flex items-center justify-center z-10">
                 <p className="text-xl font-bold text-[#22B573]">Generating Report...</p>
              </div>
            )}
            <div className="mb-8 flex justify-between items-center text-sm font-semibold text-gray-500">
              <span>Question {currentQuestion + 1} of {testQuestions.length}</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#22B573] h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}></div>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-center leading-snug">{testQuestions[currentQuestion].text}</h3>
            <div className="space-y-4">
              {ocdTestOptions.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(ocdTestScores[index])} className="w-full p-4 md:p-5 border-2 border-gray-200 rounded-xl hover:border-[#22B573] hover:bg-[#22B573] hover:text-white transition-all duration-200 text-left font-medium text-lg">
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Display Results */}
        {step === 4 && (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] text-center max-w-2xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-[#22B573] mb-6">Test Result</h2>
            <div className="p-6 bg-[#f2fcf6] rounded-2xl mb-8"><p className="text-xl text-gray-800 font-medium leading-relaxed">{getResultFeedback()}</p></div>
            <p className="text-gray-600 mb-8 text-lg">A detailed report has been sent to <br/><strong className="text-black">{userInfo.email}</strong>.</p>
            <button onClick={() => { setStep(1); setScore(0); setCurrentQuestion(0); setUserInfo({ name: "", age: "", email: "", phone: "" }); }} className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition text-lg">Take Another Test</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PsychologicalTest;