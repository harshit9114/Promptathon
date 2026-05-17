'use client';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Loader2, Github, Chrome } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/store');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoggedIn(true, email);
      setIsLoading(false);
      router.push('/store');
    }, 1500);
  };

  if (isLoggedIn) return null; // Prevent flash of login form

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-black text-white relative z-50">
      {/* Left Side: Spline Design */}
      <section className="relative hidden md:flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://my.spline.design/ailoginpagesplinehackathon-cNT0q2UXZxliPBoZqATlgpXD/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="pointer-events-none"
            style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          />
        </div>
        
        {/* Subtle Overlay Text */}
        <div className="relative z-10 text-center px-12 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
          >
            NANO <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">ENERGY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl font-medium tracking-wide uppercase"
          >
            Powered by 3D Innovation
          </motion.p>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="relative flex items-center justify-center p-8 lg:p-16 bg-transparent md:bg-[#020202]">
        {/* Mobile background (spline) - lower priority for mobile but still visible if needed */}
        <div className="absolute inset-0 z-0 md:hidden opacity-40">
           <iframe 
            src="https://my.spline.design/ailoginpagesplinehackathon-cNT0q2UXZxliPBoZqATlgpXD/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold tracking-wide">Back to Store</span>
          </Link>

          <div>
            <h2 className="text-4xl font-black mb-3">Welcome Back</h2>
            <p className="text-white/60 mb-10 text-lg">Experience the future of energy tracking.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold uppercase tracking-widest text-white/40">Password</label>
                <Link href="#" className="text-sm font-bold text-orange-400 hover:text-orange-300">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-lg"
                  required
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full relative overflow-hidden group py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <span className="relative px-4 bg-[#020202] text-white/30 text-sm font-bold uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-bold">
                <Chrome size={20} />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-bold">
                <Github size={20} />
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-white/40 font-medium">
            Don't have an account? <Link href="#" className="text-white font-bold hover:text-orange-400 underline underline-offset-4 decoration-2 decoration-orange-500/50">Register now</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
