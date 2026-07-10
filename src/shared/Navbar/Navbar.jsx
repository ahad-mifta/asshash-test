import { Link } from "react-router";
import logo from "/logo.svg";

const Navbar = ({ pic }) => {
  return (
    <div className="navbar container mx-auto p-4 bg-transparent">
      <div className="navbar-start">
        <Link to="/">
          <img src={pic ? pic : logo} alt="logo" className="w-[200px]" />
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/psychological-test">
          <button className="bg-[#22B573] text-white text-xs sm:text-sm whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-[#1a935b] transition">
            সাইকোলজিক্যাল টেস্ট
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
