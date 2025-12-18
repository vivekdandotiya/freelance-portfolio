// client/src/api.js

// Base API URL – .env me VITE_API_URL set kiya hai
// Example: VITE_API_URL="https://freelance-portfolio-ys7f.onrender.com/api"
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* -------------------------------- Projects -------------------------------- */

// Home page + Projects page ke liye
export async function getProjects() {
  try {
    const res = await fetch(`${API}/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.error("getProjects error:", err);
    return [];
  }
}

// Kuch purane code me fetchProjects use ho raha tha
// isliye alias bana diya – dono same kaam karenge
export async function fetchProjects() {
  return getProjects();
}

// Optional: Sirf 3 recent projects (Home page "Recent Projects" section)
export async function getRecentProjects(limit = 3) {
  const projects = await getProjects();
  return projects.slice(0, limit);
}

// 🔥 NEW: Purane code ke liye alias
// Home.jsx me agar import { getProjectsHome } from "../api"; likha hai
// to ye function wahi data dega jo getRecentProjects deta hai
export async function getProjectsHome(limit = 3) {
  return getRecentProjects(limit);
}

/* --------------------------------- Leads ---------------------------------- */

// Naya lead / contact form submit
export async function submitLead(data) {
  try {
    const res = await fetch(`${API}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to submit lead");
    }

    return await res.json();
  } catch (err) {
    console.error("submitLead error:", err);
    throw err;
  }
}

// Purane code me createLead naam use ho raha tha
// Contact.jsx me import { createLead } from "../api";
// isliye yaha alias bana diya
export async function createLead(data) {
  return submitLead(data);
}

/* --------------------------------- Auth ----------------------------------- */
/*
  Agar tumne backend me /api/auth/login & /api/auth/register
  banaya hai to ye helpers use kar sakte ho.

  Abhi optional hain – use karna ho to Login / Signup pages me
  import karke call kar lena.
*/

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // { token, user }
  } catch (err) {
    console.error("loginUser error:", err);
    throw err;
  }
}

export async function signupUser(payload) {
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (err) {
    console.error("signupUser error:", err);
    throw err;
  }
}

// Default export – optional, agar kahin use karna ho
export default {
  getProjects,
  fetchProjects,
  getRecentProjects,
  getProjectsHome,
  submitLead,
  createLead,
  loginUser,
  signupUser,
};
