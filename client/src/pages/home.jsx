import React, { useEffect, useState } from 'react';
import API from '../api';
import ProjectCard from '../components/ProjectCard';
import LeadForm from '../components/LeadForm';

export default function Home(){
  const [projects, setProjects] = useState([]);
  useEffect(()=>{ API.get('/projects').then(r=>setProjects(r.data)).catch(console.error); }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>My Portfolio</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop:16 }}>
        {projects.map(p=> <ProjectCard key={p._id} project={p} />)}
      </div>
      <section style={{ marginTop: 40 }}>
        <h2>Hire Me</h2>
        <LeadForm />
      </section>
    </div>
  );
}
