'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [formSent, setFormSent] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0d1a0d 100%)' }}>
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            We're always here to help. Reach out via any channel, our team typically responds within 2–4 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  📞
                </div>
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-1">Customer Care</p>
                  <a
                    href="tel:78923653652"
                    className="text-2xl font-black text-white hover:text-green-400 transition-colors"
                  >
                    789-2365-3652
                  </a>
                  <p className="text-white/40 text-sm mt-1">Mon–Sat, 9 AM – 7 PM IST</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-1">Email Us</p>
                  <a
                    href="mailto:nano@gmail.com"
                    className="text-2xl font-black text-white hover:text-orange-400 transition-colors break-all"
                  >
                    nano@gmail.com
                  </a>
                  <p className="text-white/40 text-sm mt-1">We reply within 2–4 hours</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/78923653652"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-black text-white hover:text-green-400 transition-colors"
                  >
                    789-2365-3652
                  </a>
                  <p className="text-white/40 text-sm mt-1">Quick replies guaranteed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-400/20 rounded-3xl p-8"
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                🕐 Support Hours
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
                  { day: 'Saturday', time: '10:00 AM – 5:00 PM IST' },
                  { day: 'Sunday', time: 'Closed (Email only)' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-white/60">
                    <span>{row.day}</span>
                    <span className="text-white/80 font-medium">{row.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <h2 className="text-white text-2xl font-black mb-6">Send a Message</h2>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-white text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-white/60">We'll get back to you within 2–4 hours.</p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-6 px-6 py-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all text-sm"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Phone (optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 focus:ring-2 focus:ring-orange-400 outline-none">
                    <option value="" style={{ background: '#1a1025' }}>Select a topic</option>
                    <option value="order" style={{ background: '#1a1025' }}>Order Issue</option>
                    <option value="product" style={{ background: '#1a1025' }}>Product Query</option>
                    <option value="refund" style={{ background: '#1a1025' }}>Refund/Return</option>
                    <option value="gift" style={{ background: '#1a1025' }}>Gift Card</option>
                    <option value="other" style={{ background: '#1a1025' }}>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your issue or query in detail..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-black text-lg text-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
