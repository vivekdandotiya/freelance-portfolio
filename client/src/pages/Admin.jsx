import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Admin(){
  const [leads, setLeads] = useState([]);
  useEffect(()=>{ API.get('/leads').then(r=>setLeads(r.data)).catch(console.error); }, []);
  return (
    <div style={{ padding:20 }}>
      <h1>Admin — Leads</h1>
      <div style={{ display:'grid', gap:12 }}>
        {leads.map(l=>(
          <div key={l._id} style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
            <strong>{l.name}</strong> — {l.serviceType} <br/>
            {l.email} | {l.phone} <br/>
            {l.brief}
          </div>
        ))}
      </div>
    </div>
  );
}
