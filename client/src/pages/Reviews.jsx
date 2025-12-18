// client/src/pages/Reviews.jsx
import React from "react";
import "./Reviews.css";

const stats = [
  { label: "Projects Delivered", value: "18+", note: "Landing pages, dashboards, full websites" },
  { label: "Happy Clients", value: "12+", note: "Freelancers, small businesses & startups" },
  { label: "Avg. Rating", value: "4.9/5", note: "Based on client feedback & repeat work" },
];

const projects = [
  {
    year: "2025",
    name: "HushhWallet – Fintech UI",
    type: "Product Design • Web App UI",
    result: "Improved user flow for onboarding, reduced drop-off screens.",
  },
  {
    year: "2024",
    name: "Animated Portfolio Website",
    type: "Frontend • React + Tailwind",
    result: "Smooth scroll + animation heavy portfolio for a designer.",
  },
  {
    year: "2024",
    name: "Event Management Dashboard",
    type: "Full Stack • MERN",
    result: "Admin dashboard to manage events, tickets & users.",
  },
];

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Startup Founder",
    comment:
      "Vivek understood the brief very quickly and turned it into a clean dashboard UI. Communication & deadlines – both on point.",
  },
  {
    name: "Priya Verma",
    role: "Freelance Designer",
    comment:
      "The animated portfolio he built for me looks super premium. Smooth interactions, responsive and easy to update.",
  },
  {
    name: "International Client",
    role: "Product Manager (Remote)",
    comment:
      "Great with React + Node. Clear handoff, neat code and detailed Loom walkthroughs after delivery. Highly recommended.",
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
            <span>Track record</span> & <span>client reviews</span>
          </h1>
          <p className="reviews-subtitle">
            Thoda sa proof bhi zaroori hota hai ✌️. Ye page dikhata hai ki maine kis type ke projects kiye
            hain, kya results aaye aur clients ne kya feedback diya.
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
            <p>Recent kaam jahan design + dev dono important the.</p>
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
            <p>Yeh feedback mujhe next projects me aur better banata hai.</p>
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
