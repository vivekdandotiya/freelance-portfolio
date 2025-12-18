import { useState } from "react";

// Project Card Component
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        background: "rgba(20, 20, 20, 0.5)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "24px",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered 
          ? "0 30px 80px rgba(255, 255, 255, 0.15)" 
          : "0 10px 40px rgba(0, 0, 0, 0.3)",
        animation: "fadeInUp 0.8s ease-out backwards",
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Glow effect on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none"
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        padding: "2rem",
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }}>
        {/* Left Side - Image/Video */}
        <div style={{
          position: "relative",
          aspectRatio: "16/10",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          {/* Video on hover, Image by default */}
          {isHovered && project.video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.5s ease"
              }}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: isHovered ? "scale(1.1)" : "scale(1)"
              }}
            />
          )}

          {/* Overlay gradient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.5s ease"
          }} />

          {/* Project number badge */}
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#ffffff"
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Right Side - Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              animation: isHovered ? "pulse 2s ease-in-out infinite" : "none"
            }} />
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#c0c0c0"
            }}>
              {project.category}
            </span>
          </div>

          <h3 style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            transition: "color 0.3s ease",
            margin: 0
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: "1rem",
            color: "#b0b0b0",
            lineHeight: 1.6,
            margin: 0
          }}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "0.5rem"
          }}>
            {project.tech.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#e5e5e5",
                  fontWeight: 500,
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem"
          }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                View Live →
              </a>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                Figma Design
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Project Page
export default function Project() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      category: "Web Design",
      description: "Modern portfolio website with smooth animations, clean UI, and responsive design. Built with React and Tailwind CSS for optimal performance.",
      image: "/images/project1.png",
      video: "/videos/project2.mp4", // Replace with your video
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "Full Stack",
      description: "Complete ecommerce solution with shopping cart, user authentication, payment gateway integration, and admin dashboard for inventory management.",
      image: "/images/project2.png",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your video
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      category: "UI/UX Design",
      description: "Real-time analytics dashboard with interactive charts, data visualization, and comprehensive reporting features for business intelligence.",
      image: "/images/project3.png",
      video: "/videos/project3.mp4", // Replace with your video
      tech: ["React", "D3.js", "Firebase"],
      liveUrl: "https://example.com"
    },
    {
      id: 4,
      title: "Mobile App UI Design",
      category: "UI/UX Design",
      description: "High-fidelity mobile application design with intuitive user flows, modern aesthetics, and pixel-perfect interface components.",
      image: "/images/project4.png",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your video
      tech: ["Figma", "Prototyping", "Design System"],
      figmaUrl: "https://figma.com"
    },
    {
      id: 5,
      title: "Landing Page",
      category: "Web Design",
      description: "Conversion-focused landing page for startups with compelling copy, call-to-actions, and seamless user experience to maximize conversions.",
      image: "/images/project5.png",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your video
      tech: ["React", "Tailwind CSS", "SEO"],
      liveUrl: "https://example.com"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#ffffff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle gradient orbs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "20%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
        filter: "blur(80px)",
        animation: "float 20s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "10%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
        filter: "blur(80px)",
        animation: "float 25s ease-in-out infinite reverse"
      }} />

      {/* Minimal noise texture overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        pointerEvents: "none"
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "5rem 2rem"
      }}>
        {/* Header */}
        <div style={{
          marginBottom: "4rem",
          animation: "fadeInUp 0.8s ease-out backwards"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem"
          }}>
            <div style={{
              width: "4px",
              height: "40px",
              background: "linear-gradient(180deg, #ffffff, #e5e5e5)",
              borderRadius: "9999px"
            }} />
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              background: "linear-gradient(90deg, #ffffff, #e5e5e5, #ffffff)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite",
              margin: 0
            }}>
              All Projects
            </h1>
          </div>
          
          <p style={{
            maxWidth: "600px",
            fontSize: "1.25rem",
            color: "#c0c0c0",
            lineHeight: 1.6,
            margin: 0
          }}>
            A complete collection of my design and development work, showcasing creativity and technical expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>
    </div>
  );
}