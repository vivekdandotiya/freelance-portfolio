// import { useState, useEffect } from 'react';

// export default function About() {
//   const [hoveredSkill, setHoveredSkill] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
    
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const timeline = [
//     {
//       year: "2024",
//       title: "Freelance UI/UX & Frontend",
//       detail: "Designing and building portfolio sites, landing pages and dashboards for clients using Figma, React and Tailwind.",
//       icon: "💼",
//       gradient: "from-violet-600 via-purple-600 to-fuchsia-600"
//     },
//     {
//       year: "2024",
//       title: "B.Tech (5th Semester)",
//       detail: "Learning Data Structures, OS, React, Node.js and building practical projects like this revenue-generation portfolio.",
//       icon: "🎓",
//       gradient: "from-cyan-600 via-blue-600 to-indigo-600"
//     },
//     {
//       year: "2023",
//       title: "MERN Experiments",
//       detail: "APIs, authentication, dashboards, CRUD operations and MongoDB integration with Node.js & Express.",
//       icon: "⚡",
//       gradient: "from-orange-600 via-red-600 to-pink-600"
//     },
//   ];

//   const techStack = [
//     { name: "React", level: 90, icon: "⚛️", color: "cyan" },
//     { name: "Node.js", level: 85, icon: "🟢", color: "green" },
//     { name: "Figma", level: 88, icon: "🎨", color: "purple" },
//     { name: "Tailwind", level: 92, icon: "💨", color: "blue" },
//     { name: "MongoDB", level: 80, icon: "🍃", color: "emerald" },
//   ];

//   const stats = [
//     { number: "50+", label: "Projects", icon: "🚀", color: "from-violet-500 to-purple-500" },
//     { number: "30+", label: "Clients", icon: "😊", color: "from-cyan-500 to-blue-500" },
//     { number: "3", label: "Years", icon: "💻", color: "from-orange-500 to-pink-500" },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden relative">
//       {/* Cursor follower effect */}
//       <div 
//         className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl opacity-30 transition-all duration-1000"
//         style={{
//           background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
//           left: mousePosition.x - 192,
//           top: mousePosition.y - 192,
//         }}
//       />

//       {/* Animated gradient mesh background */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//         <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Floating geometric shapes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float-random"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${10 + Math.random() * 20}s`,
//             }}
//           >
//             <div 
//               className={`w-2 h-2 ${i % 3 === 0 ? 'bg-purple-500/20' : i % 3 === 1 ? 'bg-cyan-500/20' : 'bg-pink-500/20'} ${
//                 i % 2 === 0 ? 'rounded-full' : 'rotate-45'
//               }`}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         {/* Hero Section */}
//         <div className="mb-32 text-center" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
//           <div className="inline-block mb-8 animate-float-gentle">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>
//               <div className="relative text-8xl animate-spin-slow">✨</div>
//             </div>
//           </div>
          
//           <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight">
//             <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
//               About
//             </span>
//             <br />
//             <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x-reverse">
//               Me
//             </span>
//           </h1>

//           <div className="max-w-3xl mx-auto space-y-4">
//             <p className="text-xl md:text-2xl text-gray-400 animate-fade-in-up animation-delay-200">
//               <span className="text-purple-400 font-bold">5th Semester B.Tech Student</span>
//             </p>
//             <p className="text-xl md:text-2xl text-gray-400 animate-fade-in-up animation-delay-400">
//               <span className="text-cyan-400 font-bold">Freelance Developer</span>
//             </p>
//             <p className="text-lg text-gray-500 animate-fade-in-up animation-delay-600">
//               Turning ideas into beautiful, interactive digital experiences
//             </p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
//           {stats.map((stat, i) => (
//             <div
//               key={i}
//               className="group relative animate-scale-in"
//               style={{ animationDelay: `${i * 200}ms` }}
//             >
//               <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 animate-pulse-slow`}></div>
              
//               <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-bounce-gentle">
//                     {stat.icon}
//                   </div>
//                   <div className={`text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
//                     {stat.number}
//                   </div>
//                   <div className="text-lg text-gray-400 font-medium">{stat.label}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Timeline Section */}
//         <div className="mb-32">
//           <h2 className="text-5xl font-black mb-16 flex items-center justify-center gap-4">
//             <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
//             <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Journey
//             </span>
//             <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping animation-delay-500"></div>
//           </h2>

//           <div className="relative">
//             {/* Vertical line */}
//             <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform -translate-x-1/2 hidden lg:block"></div>

//             <div className="space-y-16">
//               {timeline.map((item, i) => (
//                 <div
//                   key={i}
//                   className={`relative flex flex-col lg:flex-row items-center gap-8 ${
//                     i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                   } animate-slide-in-stagger`}
//                   style={{ animationDelay: `${i * 300}ms` }}
//                 >
//                   {/* Content card */}
//                   <div className="w-full lg:w-5/12">
//                     <div className="group relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
//                       <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                      
//                       <div className="relative">
//                         <div className="flex items-start gap-4 mb-4">
//                           <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
//                             {item.icon}
//                           </div>
//                           <div className="flex-1">
//                             <div className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>
//                               {item.year}
//                             </div>
//                             <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">
//                               {item.title}
//                             </h3>
//                           </div>
//                         </div>
//                         <p className="text-gray-400 leading-relaxed">
//                           {item.detail}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Center icon */}
//                   <div className="hidden lg:flex w-2/12 justify-center">
//                     <div className="relative w-16 h-16">
//                       <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full animate-ping opacity-75`}></div>
//                       <div className={`relative w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50`}>
//                         {item.icon}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full lg:w-5/12"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Skills Section */}
//         <div className="mb-32">
//           <h2 className="text-5xl font-black mb-16 text-center">
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//               Tech Stack
//             </span>
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Skills bars */}
//             <div className="space-y-6 animate-slide-in-left">
//               {techStack.map((tech, i) => (
//                 <div
//                   key={i}
//                   className="group relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
//                   onMouseEnter={() => setHoveredSkill(i)}
//                   onMouseLeave={() => setHoveredSkill(null)}
//                   style={{ animationDelay: `${i * 100}ms` }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <span className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
//                         {tech.icon}
//                       </span>
//                       <span className="text-xl font-bold">{tech.name}</span>
//                     </div>
//                     <span className={`text-2xl font-black transition-all duration-300 ${
//                       hoveredSkill === i ? `text-${tech.color}-400` : 'text-gray-600'
//                     }`}>
//                       {tech.level}%
//                     </span>
//                   </div>

//                   <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
//                     <div
//                       className={`absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out`}
//                       style={{
//                         width: hoveredSkill === i ? `${tech.level}%` : '0%',
//                         boxShadow: hoveredSkill === i ? '0 0 20px rgba(168, 85, 247, 0.8)' : 'none'
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-white/20 animate-shimmer-fast"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Education Card */}
//             <div className="space-y-6 animate-slide-in-right">
//               <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                
//                 <div className="relative">
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="text-6xl animate-bounce-gentle">🎓</div>
//                     <div>
//                       <p className="text-sm text-cyan-400 font-bold mb-1">EDUCATION</p>
//                       <h3 className="text-3xl font-black mb-1">B.Tech</h3>
//                       <p className="text-gray-400">Computer Science • 5th Semester</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4 mb-6">
//                     <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Focus Areas</p>
//                     {[
//                       "Clean UI/UX in Figma",
//                       "Production React + Vite + Tailwind",
//                       "Node.js APIs with MongoDB",
//                       "Deployment on Render & Vercel"
//                     ].map((item, i) => (
//                       <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
//                         <div className="w-2 h-2 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full animate-pulse"></div>
//                         <span className="text-gray-100">{item}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">Soft Skills</p>
//                     <div className="flex flex-wrap gap-3">
//                       {["Communication", "Problem Solving", "Consistency", "Team Work"].map((skill, i) => (
//                         <div
//                           key={i}
//                           className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-sm font-medium hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-default animate-fade-in"
//                           style={{ animationDelay: `${i * 100}ms` }}
//                         >
//                           {skill}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="relative animate-scale-in">
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl"></div>
          
//           <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[3rem] p-16 text-center hover:border-purple-500/50 transition-all duration-500">
//             <div className="max-w-3xl mx-auto">
//               <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
//                 Let's Create Something Extraordinary
//               </h2>
//               <p className="text-xl text-gray-400 mb-10 leading-relaxed">
//                 Portfolio sites, landing pages, or full-stack applications — I bring your vision to life with modern design and cutting-edge technology.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-6 justify-center">
//                 <a
//                   href="#contact"
//                   className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative flex items-center justify-center gap-2">
//                     Get In Touch
//                     <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
//                   </span>
//                 </a>

//                 <a
//                   href="#projects"
//                   className="group px-10 py-5 bg-zinc-800/50 border-2 border-zinc-700 rounded-full font-bold text-lg hover:bg-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
//                 >
//                   <span className="flex items-center justify-center gap-2">
//                     View Projects
//                     <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           25% { transform: translate(20px, -50px) scale(1.1); }
//           50% { transform: translate(-20px, 20px) scale(0.9); }
//           75% { transform: translate(50px, 50px) scale(1.05); }
//         }

//         @keyframes float-random {
//           0%, 100% { transform: translate(0, 0); opacity: 0.3; }
//           50% { transform: translate(100px, -100px); opacity: 0.8; }
//         }

//         @keyframes float-gentle {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }

//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }

//         @keyframes gradient-x-reverse {
//           0%, 100% { background-position: 100% 50%; }
//           50% { background-position: 0% 50%; }
//         }

//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes scale-in {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         @keyframes bounce-gentle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.5; }
//           50% { opacity: 1; }
//         }

//         @keyframes slide-in-stagger {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes slide-in-left {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes slide-in-right {
//           from { opacity: 0; transform: translateX(50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes shimmer-fast {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }

//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .animate-blob {
//           animation: blob 7s infinite;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }

//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }

//         .animation-delay-200 {
//           animation-delay: 200ms;
//         }

//         .animation-delay-400 {
//           animation-delay: 400ms;
//         }

//         .animation-delay-600 {
//           animation-delay: 600ms;
//         }

//         .animation-delay-500 {
//           animation-delay: 500ms;
//         }

//         .animate-float-random {
//           animation: float-random linear infinite;
//         }

//         .animate-float-gentle {
//           animation: float-gentle 6s ease-in-out infinite;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }

//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 5s ease infinite;
//         }

//         .animate-gradient-x-reverse {
//           background-size: 200% 200%;
//           animation: gradient-x-reverse 5s ease infinite;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out backwards;
//         }

//         .animate-scale-in {
//           animation: scale-in 0.8s ease-out backwards;
//         }

//         .animate-bounce-gentle {
//           animation: bounce-gentle 3s ease-in-out infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s ease-in-out infinite;
//         }

//         .animate-slide-in-stagger {
//           animation: slide-in-stagger 0.8s ease-out backwards;
//         }

//         .animate-slide-in-left {
//           animation: slide-in-left 0.8s ease-out backwards;
//         }

//         .animate-slide-in-right {
//           animation: slide-in-right 0.8s ease-out backwards;
//         }

//         .animate-shimmer-fast {
//           animation: shimmer-fast 1.5s infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out backwards;
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const timeline = [
    {
      year: "2024",
      title: "Freelance UI/UX & Frontend",
      detail: "Designing and building portfolio sites, landing pages and dashboards for clients using Figma, React and Tailwind.",
      icon: "💼"
    },
    {
      year: "2024",
      title: "B.Tech (5th Semester)",
      detail: "Learning Data Structures, OS, React, Node.js and building practical projects like revenue-generation portfolios.",
      icon: "🎓"
    },
    {
      year: "2023",
      title: "MERN Stack Development",
      detail: "APIs, authentication, dashboards, CRUD operations and MongoDB integration with Node.js & Express.",
      icon: "⚡"
    },
  ];

  const techStack = [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Figma", level: 88, icon: "🎨" },
    { name: "Tailwind", level: 92, icon: "💨" },
    { name: "MongoDB", level: 80, icon: "🍃" },
  ];

  const stats = [
    { number: "50+", label: "Projects", icon: "🚀" },
    { number: "30+", label: "Clients", icon: "😊" },
    { number: "3", label: "Years", icon: "💻" },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)", 
      color: "#ffffff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Cursor follower */}
      <div 
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(80px)",
          opacity: 0.15,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      />

      {/* Animated grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "gridMove 20s linear infinite"
      }} />

      {/* Floating particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 2 === 0 ? "2px" : "3px",
              height: i % 2 === 0 ? "2px" : "3px",
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        {/* Hero Section */}
        <div style={{ marginBottom: "8rem", textAlign: "center" }}>
          <div style={{ display: "inline-block", marginBottom: "2rem", animation: "floatGentle 6s ease-in-out infinite" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)",
                borderRadius: "50%",
                filter: "blur(40px)",
                animation: "pulseGlow 3s ease-in-out infinite"
              }} />
              <div style={{ position: "relative", fontSize: "5rem", animation: "rotate 20s linear infinite" }}>✨</div>
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(4rem, 10vw, 7rem)", 
            fontWeight: 900, 
            marginBottom: "1.5rem",
            lineHeight: 1.1
          }}>
            <div style={{ 
              display: "inline-block",
              background: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite"
            }}>
              About
            </div>
            <br />
            <div style={{ 
              display: "inline-block",
              background: "linear-gradient(90deg, #e5e5e5, #ffffff, #e5e5e5)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmerReverse 3s ease-in-out infinite"
            }}>
              Me
            </div>
          </h1>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontSize: "1.5rem", color: "#c0c0c0", marginBottom: "1rem", animation: "fadeInUp 0.8s ease-out 0.2s backwards" }}>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>5th Semester B.Tech Student</span>
            </p>
            <p style={{ fontSize: "1.5rem", color: "#c0c0c0", marginBottom: "1rem", animation: "fadeInUp 0.8s ease-out 0.4s backwards" }}>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>Freelance Developer</span>
            </p>
            <p style={{ fontSize: "1.1rem", color: "#808080", animation: "fadeInUp 0.8s ease-out 0.6s backwards" }}>
              Turning ideas into beautiful, interactive digital experiences
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "2rem", 
          marginBottom: "8rem" 
        }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                animation: "scaleIn 0.8s ease-out backwards",
                animationDelay: `${i * 200}ms`
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)",
                borderRadius: "24px",
                filter: "blur(20px)",
                opacity: 0,
                transition: "opacity 0.5s ease",
              }} className="stat-glow" />
              
              <div style={{
                position: "relative",
                background: "rgba(20, 20, 20, 0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "24px",
                padding: "2.5rem",
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.currentTarget.previousSibling.style.opacity = "0.5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.previousSibling.style.opacity = "0";
              }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    fontSize: "4rem", 
                    transition: "transform 0.5s ease",
                    animation: "bounceGentle 3s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: "3.5rem", 
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: "1.1rem", color: "#c0c0c0", fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div style={{ marginBottom: "8rem" }}>
          <h2 style={{ 
            fontSize: "3rem", 
            fontWeight: 900, 
            marginBottom: "4rem", 
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem"
          }}>
            <div style={{ 
              width: "12px", 
              height: "12px", 
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
            }} />
            <span style={{
              background: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite"
            }}>
              Journey
            </span>
            <div style={{ 
              width: "12px", 
              height: "12px", 
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s"
            }} />
          </h2>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))",
              transform: "translateX(-50%)",
              display: window.innerWidth < 1024 ? "none" : "block"
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                    alignItems: "center",
                    gap: "2rem",
                    animation: "slideInStagger 0.8s ease-out backwards",
                    animationDelay: `${i * 300}ms`
                  }}
                >
                  {/* Content card */}
                  <div style={{ flex: "1", maxWidth: window.innerWidth < 1024 ? "100%" : "45%" }}>
                    <div style={{
                      position: "relative",
                      background: "rgba(20, 20, 20, 0.5)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      padding: "2rem",
                      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                      e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 255, 255, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    >
                      <div style={{ display: "flex", alignItems: "start", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{ 
                          fontSize: "3rem",
                          transition: "transform 0.5s ease"
                        }} className="timeline-icon">
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: "0.9rem", 
                            fontWeight: 700,
                            color: "#ffffff",
                            marginBottom: "0.5rem"
                          }}>
                            {item.year}
                          </div>
                          <h3 style={{ 
                            fontSize: "1.5rem", 
                            fontWeight: 700, 
                            marginBottom: "0.75rem",
                            color: "#ffffff",
                            transition: "color 0.3s ease"
                          }}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p style={{ color: "#c0c0c0", lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  {window.innerWidth >= 1024 && (
                    <div style={{ display: "flex", justifyContent: "center", width: "10%" }}>
                      <div style={{ position: "relative", width: "64px", height: "64px" }}>
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "50%",
                          animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
                        }} />
                        <div style={{
                          position: "relative",
                          width: "64px",
                          height: "64px",
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                          boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                        }}>
                          {item.icon}
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ flex: "1", maxWidth: window.innerWidth < 1024 ? "0" : "45%" }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div style={{ marginBottom: "8rem" }}>
          <h2 style={{ 
            fontSize: "3rem", 
            fontWeight: 900, 
            marginBottom: "4rem", 
            textAlign: "center",
            background: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s ease-in-out infinite"
          }}>
            Tech Stack
          </h2>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem" 
          }}>
            {techStack.map((tech, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  background: "rgba(20, 20, 20, 0.5)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: "pointer",
                  animation: "fadeIn 0.6s ease-out backwards",
                  animationDelay: `${i * 100}ms`
                }}
                onMouseEnter={(e) => {
                  setHoveredSkill(i);
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  setHoveredSkill(null);
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ 
                      fontSize: "2.5rem",
                      transition: "transform 0.3s ease",
                      transform: hoveredSkill === i ? "scale(1.2) rotate(12deg)" : "scale(1)"
                    }}>
                      {tech.icon}
                    </span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>{tech.name}</span>
                  </div>
                  <span style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: 900,
                    color: hoveredSkill === i ? "#ffffff" : "#666"
                  }}>
                    {tech.level}%
                  </span>
                </div>

                <div style={{ 
                  position: "relative", 
                  height: "12px", 
                  background: "rgba(255, 255, 255, 0.1)", 
                  borderRadius: "9999px",
                  overflow: "hidden"
                }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: "0 0 0 0",
                      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))",
                      borderRadius: "9999px",
                      width: hoveredSkill === i ? `${tech.level}%` : "0%",
                      transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      boxShadow: hoveredSkill === i ? "0 0 20px rgba(255, 255, 255, 0.5)" : "none"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ position: "relative", animation: "scaleIn 0.8s ease-out backwards" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            borderRadius: "3rem",
            filter: "blur(60px)"
          }} />
          
          <div style={{
            position: "relative",
            background: "rgba(20, 20, 20, 0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "3rem",
            padding: "4rem",
            textAlign: "center",
            transition: "border-color 0.5s ease"
          }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ 
                fontSize: "clamp(2rem, 5vw, 3.5rem)", 
                fontWeight: 900, 
                marginBottom: "1.5rem",
                background: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s ease-in-out infinite"
              }}>
                Let's Create Something Extraordinary
              </h2>
              <p style={{ fontSize: "1.25rem", color: "#c0c0c0", marginBottom: "2.5rem", lineHeight: 1.6 }}>
                Portfolio sites, landing pages, or full-stack applications — I bring your vision to life with modern design and cutting-edge technology.
              </p>

              <div style={{ display: "flex", flexDirection: window.innerWidth < 640 ? "column" : "row", gap: "1.5rem", justifyContent: "center" }}>
                <a
                  href="#contact"
                  style={{
                    position: "relative",
                    padding: "1.25rem 2.5rem",
                    background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#000000",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 20px 60px rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Get In Touch
                  <span>→</span>
                </a>

                <a
                  href="#projects"
                  style={{
                    padding: "1.25rem 2.5rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  }}
                >
                  View Projects
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(50px, -50px); opacity: 0.8; }
        }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmerReverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes slideInStagger {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .timeline-icon {
          transition: transform 0.5s ease;
        }

        div:hover .timeline-icon {
          transform: scale(1.2) rotate(12deg);
        }
      `}</style>
    </div>
  );
}