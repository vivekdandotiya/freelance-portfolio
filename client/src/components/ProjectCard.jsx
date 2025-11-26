import React from 'react';
export default function ProjectCard({ project }){
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:12 }}>
      {project.images?.[0] && <img src={project.images[0].url} alt="" style={{ height:160, width:'100%', objectFit:'cover', borderRadius:6 }} />}
      <h3>{project.title}</h3>
      <p>{(project.description||'').slice(0,120)}</p>
      {project.figmaUrl && <a href={project.figmaUrl} target="_blank" rel="noreferrer">Open Figma</a>}
    </div>
  );
}
