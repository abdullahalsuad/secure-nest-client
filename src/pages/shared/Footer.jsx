import { TwitchIcon } from "lucide-react";
import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiGithub,
  FiMail,
  FiLinkedin,
} from "react-icons/fi";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-700 to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold">Secure Nest</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Secure your tomorrow today with our comprehensive life insurance
              solutions. We bring transparency and trust to the insurance
              industry.
            </p>
            <div className="flex space-x-4 cursor-pointer">
              <span className="bg-gradient-to-l from-teal-500 to-teal-600 rounded-full p-2">
                <FiFacebook />
              </span>

              <span className="bg-gradient-to-l from-teal-500 to-teal-600 rounded-full p-2 cursor-pointer">
                <FiTwitter />
              </span>
              <span className="bg-gradient-to-l from-teal-500 to-teal-600 rounded-full p-2 cursor-pointer">
                <FiLinkedin />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  All Policies
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Our Agents
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Get Quote
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Secure Nest. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
