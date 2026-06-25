import { Link } from "react-router";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = ({ color = "bg-[#18332A]" }) => {
  return (
    <div className={`${color} text-white`}>
      <div className="container mx-auto px-6 py-12">
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left Section: Logo + Socials */}
          <div className="flex flex-col items-start">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src="/footer.png" alt="logo" className="w-40 mb-6" />
            </Link>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/17DHBJzX2r/?mibextid=wwXIfr" aria-label="Facebook">
                <FaFacebook className="text-2xl hover:opacity-80" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:opacity-80" />
              </a>
              <a href="#" aria-label="Twitter/X">
                <FaSquareXTwitter className="text-2xl hover:opacity-80" />
              </a>
            </div>
            {/* Address */}
            <div className="text-sm text-gray-200 mb-3">
              <p>28/22, Rajbari, Savar, Dhaka</p>
            </div>

            {/* Trade License */}
            <div className="text-sm text-gray-200">
              <p className="font-semibold">Trade License Number</p>
              <p>20252628006023734</p>
            </div>
          </div>

          {/* Middle Section: Privacy Policy */}
          <div className="text-left md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-3">Privacy Policy</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link to="/privacy-policy/patient" className="hover:underline">
                  Patient App Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy/doctor" className="hover:underline">
                  Doctor App Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </footer>

        {/* SSL Badge */}
        <div className="flex justify-center py-12 border-t border-gray-700 w-full">
          <a
            href="https://sslcommerz.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity w-full flex justify-center"
          >
            <img src="/ssl.png" alt="SSL Certificate" className="h-80 w-full object-contain" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
