'use client';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, register } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/store');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const result = register(email, password, name);
      if (result.success) {
        router.push('/store');
      } else {
        setError(result.error || 'Registration failed.');
        setIsLoading(false);
      }
    }, 800);
  };

  if (isLoggedIn) return null;

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-black text-white relative z-50">
      {/* Left Side: Spline Design */}
      <section className="relative hidden md:flex items-center justify-center bg-[#0d0d0d] overflow-hidden border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://my.spline.design/ailoginpagesplinehackathon-cNT0q2UXZxliPBoZqATlgpXD/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="pointer-events-auto"
            style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          />
        </div>
      </section>

      {/* Right Side: Register Form */}
      <section className="relative z-20 flex items-center justify-center p-8 lg:p-16 bg-[#111111] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        {/* Mobile background (spline) */}
        <div className="absolute inset-0 z-0 md:hidden opacity-40">
           <iframe 
            src="https://my.spline.design/ailoginpagesplinehackathon-cNT0q2UXZxliPBoZqATlgpXD/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="pointer-events-auto"
          />
          <div className="absolute inset-0 bg-[#111]/80 backdrop-blur-sm" />
        </div>

        <div 
          className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Create Account</h2>
            <p className="text-white/50 text-lg sm:text-xl font-medium">Join the future of energy tracking.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white/30 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-lg placeholder:text-white/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white/30 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-lg placeholder:text-white/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white/30 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={20} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-lg placeholder:text-white/20"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4 text-sm text-red-400 font-semibold">
                ⚠️ {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full relative overflow-hidden group h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating Account...
                  </>
                ) : 'CREATE ACCOUNT'}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>

          <p className="mt-12 text-center text-white/30 font-bold text-sm tracking-wide">
            Already have an account? <Link href="/" className="text-white hover:text-orange-400 underline underline-offset-4 decoration-2 decoration-orange-500/50 transition-colors">Sign In</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
