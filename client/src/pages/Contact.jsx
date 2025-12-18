"use client";

import { useState } from "react";

const API_BASE_URL = "https://freelance-portfolio-ys7f.onrender.com"; 
// ⬆ if your route is different (e.g. /leads or /contact), just change path in handleSubmit

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "UI Design",
    brief: "",
    fileUrl: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "success",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "success" });

    try {
      console.log("▶ Sending lead to backend...", form);

      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Backend error:", errText);
        throw new Error("Request failed");
      }

      const data = await res.json().catch(() => null);
      console.log("✅ Lead saved:", data);

      setStatus({
        loading: false,
        message: "✨ Request sent successfully! I'll get back to you soon.",
        type: "success",
      });

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "UI Design",
        brief: "",
        fileUrl: "",
      });
    } catch (err) {
      console.error("❌ Error sending request:", err);
      setStatus({
        loading: false,
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const services = ["UI Design", "Web Development", "Full-Stack App", "Branding"];

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Geist', sans-serif;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
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

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(251, 146, 60, 0.5);
      }
      50% {
        box-shadow: 0 0 20px rgba(251, 146, 60, 0.8);
      }
    }

    .animate-slideInUp {
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }

    .animation-delay-200 { animation-delay: 200ms; }
    .animation-delay-300 { animation-delay: 300ms; }
    .animation-delay-400 { animation-delay: 400ms; }
    .animation-delay-500 { animation-delay: 500ms; }
    .animation-delay-600 { animation-delay: 600ms; }
    .animation-delay-700 { animation-delay: 700ms; }
    .animation-delay-800 { animation-delay: 800ms; }
    .animation-delay-900 { animation-delay: 900ms; }
    .animation-delay-1000 { animation-delay: 1000ms; }

    html {
      scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #1e293b;
    }

    ::-webkit-scrollbar-thumb {
      background: #475569;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }

    .contact-container {
      min-height: 100vh;
      background: linear-gradient(to bottom, #0f172a, #0f172a 50%, #1e293b);
      color: #f8fafc;
    }

    .nav {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 50;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      padding: 1rem 0;
    }

    .nav-content {
      max-width: 90rem;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .nav-logo-circle {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #fbbf24, #fb923c);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1e1b4b;
      font-weight: bold;
      font-size: 1.125rem;
      transition: box-shadow 0.3s ease;
      cursor: pointer;
    }

    .nav-logo-circle:hover {
      box-shadow: 0 0 20px rgba(251, 146, 60, 0.5);
    }

    .nav-logo-text {
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: -0.02em;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      font-size: 0.875rem;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.3s ease;
      cursor: pointer;
    }

    .nav-link:hover {
      color: #fbbf24;
    }

    .hero-section {
      padding-top: 8rem;
      padding-bottom: 5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      overflow: hidden;
    }

    .hero-content {
      max-width: 56rem;
      margin: 0 auto;
    }

    .hero-tag {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #fbbf24;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }

    .hero-title {
      font-size: 3.75rem;
      font-weight: bold;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }

    .hero-title span {
      display: block;
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
    }

    .hero-title span:nth-child(2) {
      background: linear-gradient(to right, #fbbf24, #fb923c, #f97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation-delay: 200ms;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.25rem;
      }
    }

    .hero-description {
      font-size: 1.125rem;
      color: #94a3b8;
      max-width: 42rem;
      line-height: 1.75;
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 300ms;
    }

    .hero-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 2rem;
    }

    .skill-tag {
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid #475569;
      font-size: 0.875rem;
      color: #cbd5e1;
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .skill-tag:hover {
      border-color: rgba(251, 191, 36, 0.5);
      background: rgba(30, 41, 59, 0.8);
    }

    .contact-section {
      padding: 5rem 1.5rem;
      border-top: 1px solid #475569;
    }

    .contact-header {
      max-width: 56rem;
      margin: 0 auto;
      margin-bottom: 4rem;
      animation: slideInUp 0.8s ease-out forwards;
    }

    .contact-title {
      font-size: 2.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
      background: linear-gradient(to right, #f8fafc, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .contact-subtitle {
      color: #94a3b8;
      font-size: 1.125rem;
    }

    .form-container {
      max-width: 56rem;
      margin: 0 auto;
      background: rgba(30, 41, 59, 0.3);
      border: 1px solid #475569;
      border-radius: 1rem;
      padding: 2rem;
      backdrop-filter: blur(4px);
      animation: slideInUp 0.8s ease-out forwards;
      animation-delay: 300ms;
      transition: border-color 0.3s ease;
    }

    .form-container:hover {
      border-color: #334155;
    }

    @media (max-width: 768px) {
      .form-container {
        padding: 1.5rem;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .form-grid-3 {
        grid-template-columns: 1fr;
      }
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .form-grid-2 {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #475569;
      color: #f8fafc;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-input::placeholder,
    .form-select::placeholder,
    .form-textarea::placeholder {
      color: #64748b;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      border-color: #fbbf24;
      background: rgba(15, 23, 42, 0.8);
      box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.1);
    }

    .form-textarea {
      resize: none;
      font-family: inherit;
    }

    .form-select {
      appearance: none;
      cursor: pointer;
      padding-right: 2.5rem;
      background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="rgb(100,116,139)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>');
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.25rem;
      padding-right: 2.5rem;
    }

    .form-select:focus {
      background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="rgb(251,191,36)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>');
    }

    .status-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      animation: slideInUp 0.8s ease-out forwards;
    }

    .status-message.success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #6ee7b7;
    }

    .status-message.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .submit-button {
      position: relative;
      height: 3rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      overflow: hidden;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 900ms;
    }

    .submit-button-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #fbbf24, #fb923c, #f97316);
      transition: all 0.3s ease;
    }

    .submit-button-gradient:hover {
      transform: scale(1.1);
      box-shadow: 0 0 30px rgba(251, 146, 60, 0.5);
    }

    .submit-button-bg {
      position: absolute;
      inset: 0;
      background: #0f172a;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .submit-button:hover .submit-button-bg {
      opacity: 0;
    }

    .submit-button-text {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: white;
      transition: color 0.3s ease;
    }

    .submit-button:hover .submit-button-text {
      color: #0f172a;
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-helper {
      font-size: 0.75rem;
      color: #64748b;
      text-align: center;
      padding-top: 0.5rem;
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 1000ms;
    }

    .footer {
      border-top: 1px solid #475569;
      padding: 3rem 1.5rem;
    }

    .footer-content {
      max-width: 90rem;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      animation: slideInUp 0.8s ease-out forwards;
    }

    .footer-section:nth-child(2) {
      animation-delay: 300ms;
    }

    .footer-section-title {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #94a3b8;
      margin-bottom: 1rem;
    }

    .footer-email {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      text-decoration: none;
      color: inherit;
      transition: color 0.3s ease;
      width: fit-content;
      position: relative;
      group: hover;
    }

    .footer-email:hover {
      color: #fbbf24;
    }

    .footer-email svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }

    .footer-social-link {
      font-size: 0.875rem;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.3s ease;
      position: relative;
      display: inline-block;
    }

    .footer-social-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(to right, #fbbf24, #fb923c);
      transition: width 0.3s ease;
    }

    .footer-social-link:hover {
      color: #fbbf24;
    }

    .footer-social-link:hover::after {
      width: 100%;
    }

    .footer-bottom {
      border-top: 1px solid #475569;
      padding-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: #64748b;
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 500ms;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 1rem;
    }

    .footer-links a {
      color: #64748b;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #cbd5e1;
    }
  `;

  return (
    <div className="contact-container">
      <style>{styles}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div>
            <span className="hero-tag">Creative Design Studio</span>
            <h1 className="hero-title">
              <span>Let's create something</span>
              <span>extraordinary together</span>
            </h1>
          </div>
          <p className="hero-description">
            I specialize in crafting beautiful, intuitive digital experiences that bridge design and technology. From
            concept to launch, I bring your vision to life with precision and creativity.
          </p>
          <div className="hero-skills">
            {["UI/UX Design", "Web Development", "Digital Strategy"].map((skill, idx) => (
              <span key={skill} className="skill-tag" style={{ animationDelay: `${idx * 100 + 400}ms` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <div className="contact-header">
          <h2 className="contact-title">Let's talk</h2>
          <p className="contact-subtitle">
            Share details about your project and I'll respond with ideas, timeline, and pricing within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* Name, Email, Phone Grid */}
            <div className="form-grid-3">
              {[
                {
                  label: "Name",
                  name: "name",
                  type: "text",
                  placeholder: "Your name",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  label: "Phone",
                  name: "phone",
                  type: "tel",
                  placeholder: "+1 (555) 000-0000",
                },
              ].map((field, idx) => (
                <div key={field.name} className="form-group" style={{ animationDelay: `${idx * 100 + 400}ms` }}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required={field.name !== "phone"}
                    className="form-input"
                  />
                </div>
              ))}
            </div>

            {/* Service Type & File URL */}
            <div className="form-grid-2">
              <div className="form-group" style={{ animationDelay: "600ms" }}>
                <label className="form-label">Service Type</label>
                <select name="serviceType" value={form.serviceType} onChange={handleChange} className="form-select">
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ animationDelay: "700ms" }}>
                <label className="form-label">Reference / File URL</label>
                <input
                  type="url"
                  name="fileUrl"
                  placeholder="Figma / Dribbble / Drive link (optional)"
                  value={form.fileUrl}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fileUrl")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Brief */}
            <div className="form-group" style={{ animationDelay: "800ms" }}>
              <label className="form-label">Project Brief</label>
              <textarea
                name="brief"
                placeholder="Describe your project in 3-4 lines. What are you building? What's the goal?"
                value={form.brief}
                onChange={handleChange}
                onFocus={() => setFocusedField("brief")}
                onBlur={() => setFocusedField(null)}
                rows={5}
                required
                className="form-textarea"
              />
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`status-message ${status.type}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={status.loading} className="submit-button">
              <div className="submit-button-gradient" />
              <div className="submit-button-bg" />
              <span className="submit-button-text">{status.loading ? "Sending..." : "Send Request"}</span>
            </button>

            <p className="form-helper">I typically respond within 24 hours</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-section-title">Get in touch</h3>
              <a href="mailto:hello@example.com" className="footer-email">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                hello@example.com
              </a>
            </div>
            <div className="footer-section">
              <h3 className="footer-section-title">Follow</h3>
              <div className="footer-social">
                {[
                  { name: "Twitter", href: "#" },
                  { name: "Dribbble", href: "#" },
                  { name: "LinkedIn", href: "#" },
                ].map((social) => (
                  <a key={social.name} href={social.href} className="footer-social-link">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Designer Studio. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
