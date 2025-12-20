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
      title: "Freelance UI/UX & Frontend",
      detail: "Designing and building portfolio sites, landing pages and dashboards for clients using Figma, React and Tailwind.",
      icon: "💼"
    },
    {
      title: "B.Tech (Students)",
      detail: "Learning Data Structures, OS, React, Node.js and building practical projects like revenue-generation portfolios.",
      icon: "🎓"
    },
    {
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
    { number: "5+", label: "Projects", icon: "🚀" },
    { number: "4+", label: "Clients", icon: "😊" },
    { number: "2+", label: "Years", icon: "💻" },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)", 
      color: "#ffffff",
      position: "relative",
      overflowX: "hidden"
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
              <span style={{ color: "#ffffff", fontWeight: 700 }}>Software Engineering Consultants</span>
            </p>
            <p style={{ fontSize: "1.5rem", color: "#c0c0c0", marginBottom: "1rem", animation: "fadeInUp 0.8s ease-out 0.4s backwards" }}>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>Enterprise Web & UI/UX Solutions Architect</span>
            </p>
            <p style={{ fontSize: "1.1rem", color: "#808080", animation: "fadeInUp 0.8s ease-out 0.6s backwards" }}>
              Delivering secure, scalable, and performance-driven digital platforms
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
              display: "block"
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
                  <div style={{ flex: "1", maxWidth: "45%" }}>
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

                  <div style={{ flex: "1", maxWidth: "45%" }}></div>
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
        <div style={{ position: "relative", animation: "scaleIn 0.8s ease-out backwards", marginBottom: "8rem" }}>
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

              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
                <a
                  href="/contact"
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
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Get In Touch
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
  
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

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