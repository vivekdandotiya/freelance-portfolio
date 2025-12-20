import { useEffect, useRef, useState } from "react"
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

// ==================== THREADS BACKGROUND COMPONENT ====================
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const Threads = ({ color = [1, 1, 1], amplitude = 1, distance = 0, enableMouseInteraction = false, ...rest }) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    function update(t) {
      if (enableMouseInteraction) {
        const smoothing = 0.05;
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }
      program.uniforms.iTime.value = t * 0.001;

      renderer.render({ scene: mesh });
      animationFrameId.current = requestAnimationFrame(update);
    }
    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);

      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return <div ref={containerRef} className="w-full h-full relative" {...rest} />;
};

// ==================== TEXT TYPE ANIMATION ====================
function TextType({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000, loop = true, className = "" }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;
    
    const currentText = texts[textIndex];
    
    if (!isDeleting && currentIndex < currentText.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === currentText.length) {
      // Check if we should loop or stop
      if (!loop) {
        setIsComplete(true);
        return;
      }
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setCurrentIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [currentIndex, displayedText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop, isComplete]);

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {displayedText}
      {!isComplete && <span style={{ animation: 'blink 1s infinite', marginLeft: '2px' }}>|</span>}
    </span>
  );
}

// ==================== NAVBAR ====================
function Navbar() {
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

        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.6));
          }
        }

        @keyframes vrPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
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
          background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 25%, #ffffff 50%, #e5e5e5 75%, #ffffff 100%);
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

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div className="vr-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #ffffff, #e5e5e5, #ffffff)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
              <span style={{ color: 'black', fontWeight: 900, fontSize: '0.75rem' }}>VH</span>
            </div>
            <span className="logo" style={{ fontSize: '1.5rem', display: window.innerWidth < 640 ? 'none' : 'inline' }}>VH Design</span>
          </div>

          {/* Desktop Navigation */}
          <div style={{ display: window.innerWidth < 768 ? 'none' : 'flex', alignItems: 'center', gap: '3rem', marginLeft: '3rem' }}>
            <a href="/" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', textDecoration: 'none' }}>
              Home
            </a>
            <a href="/projects" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>
              Project
            </a>
            <a href="/services" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>
              Services
            </a>
            <a href="/about" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>
              About
            </a>
            <a href="/reviews" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', textDecoration: 'none' }}>
              Record's
            </a>
            
          </div>

          {/* Right - CTA Buttons */}
          <div style={{ display: window.innerWidth < 768 ? 'none' : 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <a href="/contact" className="cta-button" style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Contact
            </a>
            <a href="/signup" className="cta-button" style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'black', background: 'linear-gradient(90deg, #ffffff, #e5e5e5)', boxShadow: '0 4px 6px rgba(255, 255, 255, 0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div style={{ display: window.innerWidth < 768 ? 'block' : 'none', marginLeft: 'auto' }}>
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu" style={{ display: window.innerWidth < 768 ? 'block' : 'none', background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="/" onClick={() => setIsOpen(false)} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', textDecoration: 'none' }}>
                Home
              </a>
              
              <a href="/services" onClick={() => setIsOpen(false)} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>
                Services
              </a>
              <a href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>
                About
              </a>
              <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="/contact" onClick={() => setIsOpen(false)} style={{ width: '100%', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', textDecoration: 'none', textAlign: 'center' }}>
                  Contact
                </a>
                <a href="/signup" onClick={() => setIsOpen(false)} style={{ width: '100%', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'black', background: 'linear-gradient(90deg, #ffffff, #e5e5e5)', textDecoration: 'none', textAlign: 'center' }}>
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div style={{ height: '4rem' }}></div>
    </>
  );
}

// ==================== ANIMATED TEXT LINE ====================
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

// ==================== DESIGNER LOGO ====================
function DesignerLogo() {
  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center core logo */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.3), rgba(200, 200, 200, 0.1), rgba(30, 30, 30, 0.8))",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 60px rgba(255, 255, 255, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 10,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "0.05em",
            background: "linear-gradient(135deg, #ffffff, #e5e5e5, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))",
          }}
        >
          ✦
        </div>
        <div
          style={{
            marginTop: "0.4rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#c0c0c0",
          }}
        >
          Designer
        </div>
      </div>
    </div>
  )
}

// ==================== PROJECT CARD ====================
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    // Delay typing based on card index
    const timer = setTimeout(() => {
      setStartTyping(true)
    }, index * 500) // 500ms delay between each card
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(255, 255, 255, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          height: "200px",
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(200, 200, 200, 0.1))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
        }}
      >
        📱
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff", minHeight: "2rem" }}>
          {startTyping ? (
            <TextType 
              texts={[project.title]} 
              typingSpeed={60}
              deletingSpeed={0}
              pauseDuration={5000}
              loop={false}
            />
          ) : (
            <span style={{ opacity: 0 }}>{project.title}</span>
          )}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#c0c0c0", marginBottom: "1rem" }}>{project.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.75rem",
                padding: "0.3rem 0.8rem",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#e5e5e5",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== PROJECT GALLERY ====================
function ProjectGallery() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      category: "Web Design",
      tags: ["React", "Node.js", "MongoDB"],
      description: "Modern portfolio showcasing creative work with smooth animations",
    },
    {
      id: 2,
      title: "Figma Prototype",
      category: "UI/UX Design",
      tags: ["Figma", "Prototyping"],
      description: "Interactive mobile app design with user-centered approach",
    },
    {
      id: 3,
      title: "Task Manager Website",
      category: "Web Design",
      tags: ["HTML", "CSS", "PHP"],
      description: "Productivity tool for managing daily tasks efficiently",
    },
    {
      id: 4,
      title: "Activity Tracking Calendar",
      category: "Full Stack",
      tags: ["React", "PHP"],
      description: "Visual calendar for tracking habits and activities",
    },
  ]

  return (
    <section id="projects" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "40px",
          background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Latest Projects
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

// ==================== MAIN HOME COMPONENT ====================
export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000000",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{keyframesCSS}</style>

      {/* Animated Background */}
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        zIndex: 1,
        opacity: 0.6
      }}>
        <Threads 
          color={[1, 1, 1]} 
          amplitude={1} 
          distance={0.3} 
          enableMouseInteraction={true}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          zIndex: 5,
          maxWidth: "1120px",
          margin: "0 auto",
          minHeight: "80vh",
          alignItems: "center",
          padding: "4rem 6vw",
        }}
      >
        {/* Left content */}
        <section style={{ position: "relative", zIndex: 10 }}>
          <p
            style={{
              fontSize: "0.9rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: "1.5rem",
              opacity: 0,
              transform: "translateY(12px)",
              animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
              animationDelay: "0.15s",
            }}
          >
            FREELANCE <span style={{ color: "#e5e5e5" }}>UI/UX & MERN</span> DEVELOPER
          </p>

          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.7rem, 4vw, 3.4rem)",
              lineHeight: 1.4,
              marginBottom: "1.5rem",
              minHeight: "180px",
              
            }}
          >
            <TextType 
  texts={[
    "Designing & building websites.",
    "Creating amazing user experiences.",
    "Developing modern web pages."
  ]}
  typingSpeed={80}
  deletingSpeed={40}
  pauseDuration={2000}
/>

          </h1>

          <p
            style={{
              fontSize: "0.98rem",
              color: "#d1d5db",
              maxWidth: "32rem",
              marginBottom: "2rem",
              lineHeight: 1.6,
              opacity: 0,
              transform: "translateY(12px)",
              animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
              animationDelay: "1s",
            }}
          >
            From Figma design to live React & Node.js deployment. Hire me for landing pages, dashboards and custom web
            apps that convert visitors into clients.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              opacity: 0,
              transform: "translateY(12px)",
              animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
              animationDelay: "1.2s",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
                color: "black",
                boxShadow: "0 18px 40px rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s ease",
              }}
            >
              View Projects →
            </a>
            <a
              href="#contact"
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                color: "#e5e7eb",
                background: "rgba(20, 20, 20, 0.5)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              Hire Me
            </a>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.5rem",
              opacity: 0,
              animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
              animationDelay: "1.4s",
            }}
          >
            {["React", "Tailwind CSS", "Node.js", "MongoDB", "Figma"].map((skill, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.8rem",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "9999px",
                  background: "rgba(20, 20, 20, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  color: "#e5e7eb",
                  backdropFilter: "blur(10px)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Right side - Animated logo */}
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            opacity: 0,
            transform: "translateY(12px)",
            animation: "fadeInUp 0.7s forwards cubic-bezier(0.22, 0.61, 0.36, 1)",
            animationDelay: "0.75s",
          }}
        >
          <DesignerLogo />
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            Available for <span style={{ color: "#e5e5e5" }}>freelance projects & internships</span>.
          </p>
        </aside>
      </div>

      {/* Featured Projects Section */}
      <FeaturedProjects />
    </div>
  )
}

// ==================== FEATURED PROJECTS ====================
function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with secure payment integration, real-time inventory management, and personalized recommendations. Built with modern web technologies for optimal performance.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "rgba(255, 100, 100, 0.15)",
      emoji: "🛍️"
    },
    {
      id: 2,
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, team workspaces, drag-and-drop interface, and advanced analytics. Perfect for remote teams and agile workflows.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      color: "rgba(100, 200, 255, 0.15)",
      emoji: "✅"
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Comprehensive analytics platform for social media management with AI-powered insights, automated reporting, and multi-platform integration for better decision making.",
      tech: ["React", "D3.js", "Express", "PostgreSQL"],
      color: "rgba(150, 100, 255, 0.15)",
      emoji: "📊"
    },
    {
      id: 4,
      title: "Portfolio Builder",
      description: "Intuitive drag-and-drop website builder with beautiful templates, custom domain support, and one-click deployment. Perfect for creatives and professionals.",
      tech: ["React", "Next.js", "Tailwind CSS"],
      color: "rgba(100, 255, 150, 0.15)",
      emoji: "💼"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsAnimating(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section style={{ 
      padding: "120px 24px", 
      maxWidth: "1400px", 
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    }}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "6rem", 
        alignItems: "center",
        width: "100%"
      }}>
        {/* Left Side - Project Info */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <p style={{
            fontSize: "0.9rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9ca3af",
            marginBottom: "1rem",
            opacity: isAnimating ? 0 : 1,
            transition: "opacity 0.3s ease"
          }}>
            Featured Project {currentIndex + 1} / {projects.length}
          </p>

          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              color: "#ffffff",
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(20px)" : "translateY(0)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              lineHeight: 1.2
            }}
          >
            {projects[currentIndex].title}
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#c0c0c0",
              marginBottom: "2.5rem",
              lineHeight: 1.8,
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(20px)" : "translateY(0)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
            }}
          >
            {projects[currentIndex].description}
          </p>

          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "0.75rem",
            marginBottom: "2rem",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(20px)" : "translateY(0)",
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
          }}>
            {projects[currentIndex].tech.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.9rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#e5e5e5",
                  fontWeight: 500
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
                  setIsAnimating(false);
                }, 600);
              }}
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "0.9rem",
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev + 1) % projects.length);
                  setIsAnimating(false);
                }, 600);
              }}
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #ffffff, #e5e5e5)",
                border: "none",
                color: "#000000",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "0.9rem",
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right Side - Card Stack */}
        <div style={{ 
          position: "relative", 
          height: "600px",
          perspective: "1500px"
        }}>
          {projects.map((project, index) => {
            const offset = (index - currentIndex + projects.length) % projects.length;
            
            return (
              <div
                key={project.id}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "450px",
                  height: "550px",
                  background: `linear-gradient(135deg, ${project.color}, rgba(20, 20, 20, 0.95))`,
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: offset === 0 
                    ? "0 30px 80px rgba(0, 0, 0, 0.6)" 
                    : "0 10px 40px rgba(0, 0, 0, 0.4)",
                  transform: `
                    translate(-50%, -50%) 
                    translateX(${offset * 40}px) 
                    translateY(${offset * -40}px) 
                    translateZ(${-offset * 150}px)
                    rotateY(${offset * 8}deg)
                    scale(${1 - offset * 0.08})
                  `,
                  zIndex: projects.length - offset,
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transformStyle: "preserve-3d",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                  opacity: offset > 2 ? 0 : 1,
                }}
              >
                {/* Card Image/Icon Area */}
                <div
                  style={{
                    width: "100%",
                    height: "65%",
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(200, 200, 200, 0.1))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 30% 30%, ${project.color}, transparent 70%)`,
                    opacity: 0.5
                  }} />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {project.emoji}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ 
                    fontSize: "1.8rem", 
                    fontWeight: 700, 
                    color: "#ffffff", 
                    marginBottom: "0.8rem",
                    lineHeight: 1.2
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ 
                    fontSize: "0.95rem", 
                    color: "#b0b0b0", 
                    lineHeight: 1.5 
                  }}>
                    {project.description.slice(0, 80)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==================== KEYFRAMES CSS ====================
const keyframesCSS = `
  @keyframes titleFadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`