// client/src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import About from "./pages/About";
import Project from "./pages/Project";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reviews from "./pages/Reviews";





export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top glass nav */}
      
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-sm font-semibold shadow-lg shadow-purple-500/40">
              VJ
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">
                Vivek Dandotiya
              </div>
              <div className="text-xs text-slate-400">
                UI/UX & MERN Developer
              </div>
            </div>
          </div>

          <Navbar
  key={location.pathname}
  activePath={location.pathname}
/>

        </div>
      

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reviews" element={<Reviews />} />

      </Routes>
    </div>
  );
}
