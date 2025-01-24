import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services Section */}
          <div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Our Services</h2>
            <p className="text-gray-400 text-sm">
              We provide cutting-edge solutions for asset tracking, employee management, and streamlined business operations.
            </p>
            <ul className="mt-4 space-y-2">
              <li>✔ Asset Management</li>
              <li>✔ Employee Onboarding Tools</li>
              <li>✔ Real-Time Insights & Reporting</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/features" className="text-gray-400 hover:text-yellow-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-yellow-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-yellow-400 transition">
                  Support
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-yellow-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Get in Touch</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                Email:{" "}
                <a href="mailto:support@xyz.com" className="hover:text-yellow-400 transition">
                  support@xyz.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+123456789" className="hover:text-yellow-400 transition">
                  +1 234 567 89
                </a>
              </li>
              <li>Address: 123 Asset Lane, Business City, USA</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 XYZ Asset Management. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
