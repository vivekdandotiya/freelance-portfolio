// client/src/pages/Reviews.jsx
import React from "react";
import "./Reviews.css";

const stats = [
  { label: "Projects Delivered", value: "10+", note: "Landing pages, dashboards, full websites" },
  { label: "Happy Clients", value: "8+", note: "Freelancers, small businesses & startups" },
  { label: "Avg. Rating", value: "4.8/5", note: "Based on client feedback & repeat work" },
];

const projects = [
  {
    name: "HushhWallet – Fintech UI",
    type: "Product Design • Web App UI",
    result: "Improved user flow for onboarding, reduced drop-off screens.",
  },
  {
    name: "Animated Portfolio Website",
    type: "Frontend • React + Tailwind",
    result: "Smooth scroll + animation heavy portfolio for a designer.",
  },
  {
    name: "Event Management Dashboard",
    type: "Full Stack • MERN",
    result: "Admin dashboard to manage events, tickets & users.",
  },
];

const reviews = [
  {
    name: "AMAN",
    role: "Startup Founder",
    comment:
      "They delivered a high-performance business website with a clean architecture. Load times, responsiveness, and scalability were handled exceptionally well.",
  },
  {
    name: "ABHAY",
    role: "UI Designer",
    comment:
      "The UI layout was precise and well-structured. Strong visual hierarchy, spacing, and component consistency made it feel polished and enterprise-ready.",
  },
  {
    name: "SARANSH",
    role: "Portfolio Client",
    comment:
      "The portfolio was built with smooth animations, strong responsiveness, and excellent attention to detail. It clearly elevated my personal brand.",
  },
];

function Reviews() {
  return (
    <main className="reviews-page">
      {/* gradient background blur */}
      <div className="reviews-bg-glow" />

      <section className="reviews-container">
        {/* Header */}
        <header className="reviews-header fade-in-up delay-1">
          <p className="reviews-badge">Previous Work & Feedback</p>
          <h1 className="reviews-title">
            <span>R & R</span> - <span>Track Records & Reviews</span>
          </h1>
          <p className="reviews-subtitle">
            Great work speaks for itself.<br></br>
            Here’s a details of the projects We’ve built, the impact they created,<br></br> 
            and the feedback from people We worked with.
          </p>
        </header>

        {/* Stats */}
        <section className="reviews-stats fade-in-up delay-2">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
              <p className="stat-note">{item.note}</p>
            </div>
          ))}
        </section>

        {/* Project timeline */}
        <section className="reviews-timeline fade-in-up delay-3">
          <div className="section-heading">
            <h2>Selected projects</h2>
            <p>Recent projects where strong visuals and clean development came together.</p>
          </div>

          <div className="timeline-list">
            {projects.map((project, index) => (
              <div className="timeline-item" key={project.name}>
                <div className="timeline-dot" />
                <div className="timeline-line" />
                <div className="timeline-card">
                  <p className="timeline-year">{project.year}</p>
                  <h3 className="timeline-name">{project.name}</h3>
                  <p className="timeline-type">{project.type}</p>
                  <p className="timeline-result">{project.result}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews / Testimonials */}
        <section className="reviews-testimonials fade-in-up delay-4">
          <div className="section-heading">
            <h2>What clients say</h2>
            <p>Insights from clients help improve delivery quality and execution standards</p>
          </div>

          <div className="review-grid">
            {reviews.map((review, i) => (
              <article key={review.name} className="review-card hover-bounce">
                <div className="review-header">
                  <div className="avatar-circle">{review.name.charAt(0)}</div>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <p className="review-role">{review.role}</p>
                  </div>
                </div>
                <p className="review-comment">“{review.comment}”</p>
                <div className="review-rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                  <span className="review-rating-text">5.0</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Reviews;