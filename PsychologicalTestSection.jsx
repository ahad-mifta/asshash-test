import React from "react";
import { Link } from "react-router-dom";

const PsychologicalTestSection = () => {
  return (
    <section className="py-16 px-4 bg-[#f2fcf6]">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-[#22B573] mb-6">Take a Psychological Test</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
          Understand your mental health better. We offer structured tests for Anxiety, Depression, and OCD to help you evaluate your well-being.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#22B573]">
            <h3 className="text-2xl font-bold mb-4 text-black">Anxiety Test</h3>
            <p className="text-gray-600 text-base">
              Evaluate your anxiety levels and get a detailed insight into your emotional well-being.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#22B573]">
            <h3 className="text-2xl font-bold mb-4 text-black">Depression Test</h3>
            <p className="text-gray-600 text-base">
              Understand your emotional state and check for signs of depression with our screening.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#22B573]">
            <h3 className="text-2xl font-bold mb-4 text-black">OCD Test</h3>
            <p className="text-gray-600 text-base">
              Identify symptoms of Obsessive-Compulsive Disorder through our structured assessment.
            </p>
          </div>
        </div>

        <Link to="/psychological-test">
          <button className="bg-[#22B573] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#1a935b] transition shadow-lg">
            Start Your Test Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PsychologicalTestSection;