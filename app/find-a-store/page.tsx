'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FindAStorePage() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0d1a0d 100%)' }}>
      <Navbar />

      <section className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            {/* Animated Icon */}
            <div className="relative w-32 h-32 mx-auto mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-orange-400/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-dashed border-pink-400/30"
              />
              <div className="absolute inset-0 flex items-center justify-center text-5xl">
                🗺️
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-orange-400/30 text-orange-400 bg-orange-400/10">
                🔧 Currently Working On It
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Find a Store
              </h1>

              <p className="text-xl text-white/60 leading-relaxed mb-4">
                We're building a real-time store locator with maps and live inventory tracking.
              </p>
              <p className="text-lg text-white/40 mb-10">
                Our team is working hard to bring this feature to you soon. Check back shortly!
              </p>

              {/* Progress Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
                {[
                  { label: 'Design', pct: 100 },
                  { label: 'Development', pct: 65 },
                  { label: 'Launch', pct: 20 },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-2">{step.label}</div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${step.pct}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
                      />
                    </div>
                    <div className="text-white/30 text-xs mt-1">{step.pct}%</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-orange-50 transition-all hover:scale-105 active:scale-95"
                >
                  ← Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  Contact Us for Nearest Store
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
