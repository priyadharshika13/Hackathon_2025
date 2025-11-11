/// <reference types="vite/client" />
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LoginResponse = {
  access_token: string;
  role?: 'admin' | 'user' | string;
};

const API: string | undefined = import.meta.env.VITE_API; // e.g., https://sooqlyapp.onrender.com

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (API) {
        // ---- Real login (FastAPI) ----
        const res = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          // Try to extract message from server; otherwise show generic error
          let message = 'Invalid email or password.';
          try {
            const text = await res.text();
            message = text || message;
          } catch {
            /* ignore */
          }
          throw new Error(message);
        }

        const data: LoginResponse = await res.json();
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('role', (data.role as string) || 'user');
      } else {
        // ---- Demo fallback (remove when backend is ready) ----
        localStorage.setItem('auth_token', 'mock_token');
        localStorage.setItem('role', 'admin');
      }

      const role = localStorage.getItem('role');
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
      {/* Animated background blobs (behind everything) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-orange-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20"
          >
            <span className="text-3xl font-extrabold text-white">SQ</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Sooqly Admin</h1>
          <p className="text-white/60 mt-1">Sign in to continue</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@sooqly.app"
                  autoComplete="username"
                  required
                  className="w-full pl-11 pr-3 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-11 pr-10 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-md px-3 py-2"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo creds */}
          <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5 text-center text-xs text-white/60">
            <p className="mb-1">Demo Credentials</p>
            <p className="text-white/50">Email: admin@stafftract.app • Password: demo123</p>
            {!API && (
              <p className="mt-2 text-[11px] text-amber-300/80">
                Running in demo mode because <code className="text-amber-200">VITE_API</code> is not set.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
