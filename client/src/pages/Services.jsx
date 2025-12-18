"use client"

import { useState, useEffect, useRef } from "react"

// Animated text line component
function AnimatedTextLine({ text, baseDelay = 0 }) {
  return (
    <span style={{ display: "block", whiteSpace: "nowrap" }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(18px)",
            animation: `titleFadeUp 0.55s forwards cubic-bezier(0.22, 0.61, 0.36, 1)`,
            animationDelay: `${baseDelay + index * 0.04}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

// Animated cursor component
function AnimatedCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cursorRef = useRef(null)
  const cursorFollowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px"
        cursorRef.current.style.top = e.clientY + "px"
      }

      if (cursorFollowRef.current) {
        setTimeout(() => {
          cursorFollowRef.current.style.left = e.clientX + "px"
          cursorFollowRef.current.style.top = e.clientY + "px"
        }, 50)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #c4b5fd, #a855f7)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
          transition: "all 0.1s ease",
        }}
      />
      <div
        ref={cursorFollowRef}
        style={{
          position: "fixed",
          width: "40px",
          height: "40px",
          border: "2px solid rgba(168, 85, 247, 0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "all 0.15s ease",
        }}
      />
    </>
  )
}

// Particle background
function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.4 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = `rgba(147, 197, 253, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}

// Floating shapes background
function FloatingShapes() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${Math.random() * 150 + 80}px`,
            height: `${Math.random() * 150 + 80}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${
              ["rgba(99, 102, 241, 0.08)", "rgba(168, 85, 247, 0.08)", "rgba(34, 211, 238, 0.08)"][i % 3]
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float${i % 3} ${20 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  )
}

// Service card with hover animation
function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)`,
        animationDelay: `${0.2 + index * 0.15}s`,
      }}
    >
      <div
        style={{
          borderRadius: "24px",
          border: `2px solid ${isHovered ? "rgba(168, 85, 247, 0.8)" : "rgba(99, 102, 241, 0.3)"}`,
          background: isHovered
            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))"
            : "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
          transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered ? "0 30px 60px rgba(168, 85, 247, 0.25)" : "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.3), transparent 70%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Service number */}
          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, #a855f7, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              opacity: 0.6,
              transition: "all 0.4s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#f9fafb",
              marginBottom: "1rem",
              transition: "color 0.4s ease",
              color: isHovered ? "#c4b5fd" : "#f9fafb",
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "0.95rem",
              color: "#d1d5db",
              marginBottom: "2rem",
              lineHeight: 1.6,
              transition: "all 0.4s ease",
              transform: isHovered ? "translateX(8px)" : "translateX(0)",
            }}
          >
            {service.desc}
          </p>

          {/* Features */}
          <div style={{ marginBottom: "2rem" }}>
            {service.features &&
              service.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                    opacity: 0,
                    animation: `slideInRight 0.5s forwards cubic-bezier(0.22, 0.61, 0.36, 1)`,
                    animationDelay: `${0.35 + index * 0.15 + i * 0.1}s`,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #a855f7, #6366f1)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#e5e7eb" }}>{feature}</span>
                </div>
              ))}
          </div>

          {/* Price and CTA */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.25rem" }}></p>
              <p
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #c4b5fd, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {service.price}
              </p>
            </div>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                border: "none",
                background: isHovered ? "linear-gradient(135deg, #a855f7, #6366f1)" : "rgba(99, 102, 241, 0.2)",
                color: isHovered ? "white" : "#c4b5fd",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.4s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: isHovered ? "0 10px 25px rgba(168, 85, 247, 0.4)" : "none",
                
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Services Page
export default function Services() {
  const services = [
    {
      title: "UI/UX Design",
      price: "",
      desc: "Beautiful, user-centered interface design with responsive layouts, design systems, component libraries, and detailed handoff documentation.",
      features: ["Figma design", "Design system", "Component library", "Responsive layouts", "Interactive prototypes"],
    },
    {
      title: "React Frontend",
      price: "",
      desc: "High-performance React applications built with Vite, featuring smooth animations, API integration, and Tailwind CSS styling.",
      features: ["React + Vite", "Tailwind CSS", "Smooth animations", "API integration", "Mobile responsive"],
    },
    {
      title: "Full-Stack Web App",
      price: "",
      desc: "Complete custom web applications with Node.js backend, MongoDB database, user authentication, and admin dashboards.",
      features: ["Node.js backend", "MongoDB database", "User authentication", "Admin dashboard", "Real-time features"],
    },
    {
      title: "E-Commerce Solution",
      price: "",
      desc: "End-to-end e-commerce platforms with payment integration, inventory management, customer analytics, and admin control panel.",
      features: ["Payment integration", "Inventory system", "Order management", "Analytics", "Customer dashboard"],
    },
  ]

  return (
    <div style={styles.container}>
      <style>{keyframesCSS}</style>

      {/* Background elements */}
      <ParticleBackground />
      <FloatingShapes />

      {/* Gradient blobs */}
      <div style={styles.bgBlob1} />
      <div style={styles.bgBlob2} />
      <div style={styles.bgBlob3} />

      {/* Animated cursor */}
      <AnimatedCursor />

      {/* Main content */}
      <div style={styles.content}>
        {/* Header section */}
        <section style={styles.header}>
          <p style={{ ...styles.tagline, ...styles.fadeIn, animationDelay: "0.15s" }}>SERVICES & PRICING</p>
          <h1 style={styles.title}>
            <AnimatedTextLine text="Premium Web Solutions" baseDelay={0.3} />
            <AnimatedTextLine text="For Your Vision" baseDelay={1} />
          </h1>
          <p style={{ ...styles.subtitle, ...styles.fadeIn, animationDelay: "1.2s" }}>
            Comprehensive design and development services tailored to your business needs. From stunning UI/UX design to
            fully functional web applications with cutting-edge technology.
          </p>
        </section>

        {/* Services grid */}
        <section style={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </section>

        {/* CTA Section */}
        <section style={{ ...styles.ctaSection, ...styles.fadeIn, animationDelay: "1.5s" }}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
          <p style={styles.ctaSubtitle}>Let's discuss your requirements and create something amazing together</p>
          <div style={styles.ctaButtons}>
            <button style={styles.ctaPrimaryBtn}>Get In Touch</button>
            <button style={styles.ctaSecondaryBtn}>Schedule Consultation</button>
          </div>
        </section>
      </div>
    </div>
  )
}

const keyframesCSS = `
  @keyframes titleFadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float0 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -30px); }
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-40px, 40px); }
  }

  @keyframes float2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(35px, 35px); }
  }

  @keyframes blobFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(80px, 40px) scale(1.2); }
  }

  @keyframes blobFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1.1); }
    50% { transform: translate(-60px, -50px) scale(0.9); }
  }

  @keyframes blobFloat3 {
    0%, 100% { transform: translate(0, 0) scale(0.9); }
    50% { transform: translate(40px, -40px) scale(1.15); }
  }
`

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1f1435, #050716 55%, #020308)",
    color: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflow: "hidden",
    padding: "4rem 6vw",
  },
  content: {
    position: "relative",
    zIndex: 5,
    maxWidth: "1200px",
    margin: "0 auto",
  },
  bgBlob1: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #4f46e5, transparent 70%)",
    filter: "blur(60px)",
    top: "-60px",
    left: "-40px",
    animation: "blobFloat1 24s ease-in-out infinite",
    pointerEvents: "none",
    opacity: 0.5,
  },
  bgBlob2: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #a855f7, transparent 70%)",
    filter: "blur(60px)",
    bottom: "-80px",
    right: "0",
    animation: "blobFloat2 28s ease-in-out infinite",
    pointerEvents: "none",
    opacity: 0.4,
  },
  bgBlob3: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #22d3ee, transparent 70%)",
    filter: "blur(60px)",
    top: "40%",
    right: "10%",
    animation: "blobFloat3 26s ease-in-out infinite",
    pointerEvents: "none",
    opacity: 0.35,
  },
  header: {
    textAlign: "center",
    marginBottom: "5rem",
  },
  tagline: {
    fontSize: "0.9rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "1.5rem",
    opacity: 0,
    transform: "translateY(12px)",
    animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
  title: {
    fontWeight: 800,
    fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
    lineHeight: 1.1,
    marginBottom: "2rem",
    background: "linear-gradient(135deg, #fff, #c4b5fd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 30px rgba(196, 181, 253, 0.3)",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.7,
    opacity: 0,
    transform: "translateY(12px)",
    animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "4rem",
  },
  ctaSection: {
    textAlign: "center",
    padding: "4rem",
    borderRadius: "32px",
    border: "2px solid rgba(99, 102, 241, 0.3)",
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #a855f7, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ctaSubtitle: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    marginBottom: "2.5rem",
    maxWidth: "500px",
    margin: "0 auto",
    marginTop: "1rem",
    marginBottom: "2.5rem",
  },
  ctaButtons: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaPrimaryBtn: {
    padding: "1rem 2.5rem",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #a855f7, #6366f1)",
    color: "white",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)",
    },
  },
  ctaSecondaryBtn: {
    padding: "1rem 2.5rem",
    borderRadius: "999px",
    border: "2px solid rgba(196, 181, 253, 0.5)",
    background: "rgba(15, 23, 42, 0.5)",
    color: "#c4b5fd",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover": {
      borderColor: "#a855f7",
      background: "rgba(168, 85, 247, 0.1)",
    },
  },
  fadeIn: {
    opacity: 0,
    transform: "translateY(12px)",
    animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
}
