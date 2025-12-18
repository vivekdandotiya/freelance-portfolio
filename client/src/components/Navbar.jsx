"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ activePath }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.6));
          }
        }

        @keyframes vrPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.7));
          }
        }

        nav {
          animation: slideDown 0.6s ease-out;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .logo {
          animation: logoGlow 3s ease-in-out infinite;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 25%, #ffffff 50%, #d4d4d4 75%, #ffffff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vr-badge {
          animation: vrPulse 2.5s ease-in-out infinite;
          position: relative;
          flex-shrink: 0;
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffffff, #e5e5e5);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cta-button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.2);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .mobile-menu {
          animation: fadeIn 0.3s ease-out;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="vr-badge flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-black shadow-lg border border-white/20">
              <span className="text-white font-black text-xs">VH</span>
            </div>
            <span className="logo text-2xl hidden sm:inline">VH Design</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 ml-12">
            <Link
              to="/"
              className="nav-link text-sm font-medium text-white hover:text-gray-300 transition-all"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Project
            </Link>
            <Link
              to="/services"
              className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              About
            </Link>
            <Link
              to="/reviews"
              className="nav-link text-sm font-medium text-white hover:text-gray-300 transition-all"
            >
              Record's
            </Link>
            <Link
              to="https://vivekdandotiya.github.io/portfolio./"
              className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Portfolio
            </Link>
          </div>

          {/* Right - CTA Buttons */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <Link
              to="/contact"
              className="cta-button px-6 py-2 rounded-lg text-sm font-medium text-white border border-white/20 hover:border-white/50 transition-all flex items-center justify-center"
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="cta-button px-6 py-2 rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-200 shadow-lg shadow-white/20 flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-white hover:text-gray-300 transition-all"
              >
                Home
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                Project
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                About
              </Link>
              <Link
                to="/reviews"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-white hover:text-gray-300 transition-all"
              >
                Record's
              </Link>
              <Link
                to="https://vivekdandotiya.github.io/portfolio./"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                Portfolio
              </Link>
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-2 rounded-lg text-sm font-medium text-white border border-white/20 hover:border-white/50 transition-all text-center"
                >
                  Contact
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-2 rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-200 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </>
  );
}