import React, { useState } from 'react';
import API from '../api';

export default function LeadForm(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', serviceType:'UI Design', brief:'' });
  const [files, setFiles] = useState(null);
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k,v])=>data.append(k,v));
    if (files) for (let f of files) data.append('attachments', f);
    try {
      await API.post('/leads', data, { headers: {'Content-Type':'multipart/form-data'} });
      setMsg('Request sent — I will contact you soon!');
      setForm({ name:'', email:'', phone:'', serviceType:'UI Design', brief:'' });
      setFiles(null);
    } catch (err) { setMsg('Error sending request'); console.error(err); }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth:600, display:'grid', gap:8 }}>
      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" required />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" required />
      <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
      <select value={form.serviceType} onChange={e=>setForm({...form, serviceType:e.target.value})}>
        <option>UI Design</option><option>Website</option><option>Figma to HTML</option>
      </select>
      <textarea value={form.brief} onChange={e=>setForm({...form, brief:e.target.value})} placeholder="Brief"></textarea>
      <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
      <button type="submit">Send Request</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
