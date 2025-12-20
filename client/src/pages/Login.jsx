import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api.js";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus({ loading: true, error: "" });

    try {
      const data = await loginUser(form);

      // ✅ Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to HOME
      navigate("/");
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Invalid credentials",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="relative max-w-md w-full">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/25 to-emerald-500/15 blur-xl" />

        <div className="relative rounded-3xl border border-white/10 bg-[#0b1020] px-6 py-8 shadow-xl">
          <h1 className="text-xl font-semibold text-white mb-1">
             Login
          </h1>
          <p className="text-xs text-gray-400 mb-6">
            Login to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>

            {status.error && (
              <p className="text-xs text-red-400">{status.error}</p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full rounded-full bg-violet-500 py-2 text-sm font-semibold text-black hover:bg-violet-400 disabled:opacity-60"
            >
              {status.loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-gray-400 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-violet-300 hover:text-violet-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
