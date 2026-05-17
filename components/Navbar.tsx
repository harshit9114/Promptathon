'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { User, ShoppingCart, LogOut, Mail, Settings, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, cartItems } = useAppContext();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToCommerce = () => {
    const el = document.getElementById('commerce');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserDropdown(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-black/20 border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f97316" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            Cacao Noir
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/" className="hidden md:block text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-4 md:gap-7">
              <Link href="/order" className="relative group">
                <ShoppingCart size={24} className="text-white/70 group-hover:text-white transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-tr from-orange-500 to-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center p-1">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white/90 group-hover:text-white hidden sm:inline-block capitalize">{user?.name || 'User'}</span>
                  <ChevronDown size={14} className={`text-white/50 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-[#111] border border-white/10 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mx-2 mb-2">
                        <p className="text-xs font-black uppercase tracking-widest text-white/30">Logged in as</p>
                        <p className="text-sm font-bold text-white truncate mt-1">{user?.email || 'user@example.com'}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-sm font-semibold transition-colors">
                          <User size={18} className="text-orange-400" />
                          My Profile
                        </button>
                        <Link href="/order" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-sm font-semibold transition-colors">
                          <ShoppingCart size={18} className="text-pink-400" />
                          Orders & Tracking
                        </Link>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-sm font-semibold transition-colors border-t border-white/5 mt-2 text-red-400" onClick={handleLogout}>
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
          
          <Link href="/order" className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm transition-all hover:bg-orange-50 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2">
            Order Now
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
