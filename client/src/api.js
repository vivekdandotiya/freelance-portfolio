// client/src/api.js

// Base API URL
// .env example:
// VITE_API_URL=http://localhost:5000/api
const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ============================== PROJECTS ============================== */

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

// alias (old code support)
export async function fetchProjects() {
  return getProjects();
}

export async function getRecentProjects(limit = 3) {
  const projects = await getProjects();
  return projects.slice(0, limit);
}

// alias (Home.jsx support)
export async function getProjectsHome(limit = 3) {
  return getRecentProjects(limit);
}

/* ================================ LEADS ================================ */

export async function submitLead(data) {
  try {
    const res = await fetch(`${API}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to submit lead");
    }

    return result;
  } catch (err) {
    console.error("submitLead error:", err);
    throw err;
  }
}

// alias (Contact.jsx support)
export async function createLead(data) {
  return submitLead(data);
}

/* ================================ AUTH ================================= */

export async function signupUser(payload) {
  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Signup failed");
    }

    return data; // { msg: "Signup successful" }
  } catch (err) {
    console.error("signupUser error:", err);
    throw err;
  }
}

export async function loginUser(credentials) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}


/* ============================ DEFAULT EXPORT =========================== */

export default {
  getProjects,
  fetchProjects,
  getRecentProjects,
  getProjectsHome,
  submitLead,
  createLead,
  signupUser,
  loginUser,
};
