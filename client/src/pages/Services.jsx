import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "UI / UX Design",
      desc: "Human-centered interfaces crafted for clarity, usability, and consistency across devices.",
      features: [
        "Design Systems & Style Guides",
        "Wireframes & Interactive Prototypes",
        "Responsive & Mobile-First Layouts",
        "Accessibility (WCAG) Compliance",
      ],
    },
    {
      title: "Frontend Development",
      desc: "High-performance frontends built with modern frameworks and clean architecture.",
      features: [
        "React & Component-Based Architecture",
        "Tailwind CSS & Scalable Styling Systems",
        "API Integration & State Management",
        "Performance Optimization (Core Web Vitals)",
      ],
    },
    {
      title: "Full-Stack Applications",
      desc: "Secure, scalable applications engineered for long-term business growth.",
      features: [
        "Node.js Backend Architecture",
        "Database Design & Optimization",
        "Authentication & Role-Based Access",
        "Admin Panels & Dashboards",
      ],
    },
    {
      title: "E-Commerce Solutions",
      desc: "Conversion-focused platforms designed to sell seamlessly and scale effortlessly.",
      features: [
        "Secure Payment Gateway Integration",
        "Product & Order Management",
        "Admin Dashboard & Analytics",
        "Performance & Conversion Optimization",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 h-[360px] w-[360px] rounded-full bg-purple-500/10 blur-[100px]" />

      {/* HERO */}
      <section className="mx-auto max-w-6xl text-center mb-20">
        <span className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm tracking-widest text-gray-400">
          ENTERPRISE · RELIABLE · SCALABLE
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          Enterprise-Ready Web Solutions
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Built with Precision.
          </span>
        </h1>

        <p className="mt-6 mx-auto max-w-xl text-gray-400 text-base md:text-lg">
          We deliver enterprise-ready digital solutions engineered for
          performance, scalability, and long-term growth.
        </p>
      </section>

      {/* SERVICES */}
      <section
        className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 mb-24"
        style={{ perspective: "1200px" }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="
              group relative rounded-2xl border border-white/10 
              bg-white/5 backdrop-blur-xl p-9
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:scale-[1.02]
              hover:border-white/30
              hover:bg-white/[0.08]
              hover:shadow-[0_25px_80px_rgba(255,255,255,0.18)]
            "
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-white/15 to-transparent" />

            <div className="relative z-10 translate-z-10">
              <div className="mb-4 text-4xl font-extrabold text-white/10">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="mb-3 text-2xl md:text-3xl font-semibold">
                {service.title}
              </h3>

              <p className="mb-5 text-gray-400 text-base">
                {service.desc}
              </p>

              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm md:text-base text-gray-300"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-xs font-bold">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* CTA / FOOTER */}
      <section
        className="
          mx-auto max-w-3xl text-center rounded-2xl 
          border border-white/10 bg-white/5 backdrop-blur-xl p-14
          transition-all duration-300 ease-out
          hover:-translate-y-2 hover:scale-[1.02]
          hover:border-white/30
          hover:bg-white/[0.08]
          hover:shadow-[0_30px_100px_rgba(255,255,255,0.2)]
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Start Your Project?
        </h2>

        <p className="mx-auto mb-8 max-w-md text-gray-400 text-base md:text-lg">
          Let’s discuss your goals and build something impactful.
        </p>

        <button
          onClick={() => {
            navigate("/contact");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-full bg-white px-14 py-4 text-base md:text-lg font-semibold text-black transition hover:scale-105"
        >
          Get In Touch
        </button>
      </section>
    </div>
  );
}