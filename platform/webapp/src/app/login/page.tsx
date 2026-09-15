'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { apiFetch } from '@/lib/api-client';

const TOKEN_KEY = 'unifora.token';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@demo.local');
  const [password, setPassword] = useState('sandbox-admin-8');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch<{ data?: { token?: string }; token?: string }>(
        '/v0/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );
      const token = res.data?.token ?? res.token;
      if (!token) throw new Error('No token in response');
      localStorage.setItem(TOKEN_KEY, token);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <header className="mb-8 text-center">
        <p className="font-display text-4xl text-signal tracking-tight">Unifora</p>
        <p className="mt-2 text-graphite-200">Cut the 80% data tax; hit quarter TTV</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="border border-white/10 bg-graphite-800/80 p-6 space-y-4"
      >
        <div>
          <label htmlFor="email" className="text-xs uppercase tracking-wide text-graphite-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs uppercase tracking-wide text-graphite-400">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
            required
          />
        </div>
        {error && (
          <p className="text-sm text-yard-slip" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-signal px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-soft disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in to control tower'}
        </button>
        <p className="text-center text-xs text-graphite-400 font-mono">
          Demo: admin@demo.local / sandbox-admin-8
        </p>
      </form>
    </div>
  );
}
