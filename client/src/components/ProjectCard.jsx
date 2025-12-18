import React from "react";
import ElectricBorder from "./ElectricBorder";

export default function ProjectCard({ project }) {
  return (
    <ElectricBorder
      color="#8b5cf6"
      speed={1.2}
      chaos={1}
      thickness={2}
      style={{ borderRadius: 10 }}
    >
      <div style={{ padding: 14 }}>
        {project.images && (
  <img
    src={project.images}
    alt={project.title}
    style={{
      width: "100%",
      height: 160,
      objectFit: "cover",
      borderRadius: 8,
    }}
  />
)}

        <h3>{project.title}</h3>

        <p style={{ fontSize: 14 }}>
          {(project.description || "").slice(0, 120)}
        </p>

        {project.figmaUrl && (
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Figma →
          </a>
        )}
      </div>
    </ElectricBorder>
  );
}
