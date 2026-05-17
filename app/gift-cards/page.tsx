'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const giftAmounts = [199, 499, 999, 1999];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(499);
  const [customAmount, setCustomAmount] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemMessage, setRedeemMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [giftSuccess, setGiftSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'redeem'>('buy');

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (redeemCode.trim().length < 6) {
      setRedeemMessage({ type: 'error', text: 'Please enter a valid gift card code.' });
    } else {
      setRedeemMessage({ type: 'success', text: `Gift card redeemed successfully! ₹${selectedAmount} added to your account.` });
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0d1a0d 100%)' }}>
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Gift Cards</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Share the joy of pure, fresh juice with your loved ones.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex gap-1">
            {(['buy', 'redeem'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab === 'buy' ? '🎁 Buy Gift Card' : '💳 Redeem Card'}
              </button>
            ))}
          </div>
        </motion.div>

        {activeTab === 'buy' && (
          <motion.div
            key="buy"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Visual Gift Card */}
            <div className="relative max-w-lg mx-auto mb-12">
              <div
                className="rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FF9800 50%, #E91E63 100%)' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Cacao Noir</p>
                      <h2 className="text-white text-3xl font-black mt-1">Gift Card</h2>
                    </div>
                    <div className="text-4xl">🍊</div>
                  </div>
                  <div className="text-white text-5xl font-black mb-2">
                    ₹{customAmount || selectedAmount}
                  </div>
                  <p className="text-white/60 text-sm">Valid for all Cacao Noir products</p>
                </div>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
              <h3 className="text-white font-bold text-xl mb-6">Choose Amount</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {giftAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-4 rounded-2xl font-black text-lg border-2 transition-all duration-300 ${
                      selectedAmount === amt && !customAmount
                        ? 'border-orange-400 bg-orange-500/20 text-orange-400 scale-105 shadow-lg'
                        : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Or enter custom amount</label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount (min ₹100)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
            </div>

            {/* Recipient Info */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
              <h3 className="text-white font-bold text-xl mb-6">Recipient Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Recipient's Name", placeholder: 'Enter name', type: 'text' },
                  { label: "Recipient's Email", placeholder: 'Enter email', type: 'email' },
                  { label: 'Your Name', placeholder: 'From...', type: 'text' },
                  { label: 'Delivery Date', placeholder: '', type: 'date' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-white/60 text-sm mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-white/60 text-sm mb-2 block">Personal Message (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Write a heartfelt message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
                />
              </div>
            </div>

            {giftSuccess ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4 text-center text-green-400 font-bold text-lg">
                🎉 Gift Card Sent Successfully!
              </div>
            ) : (
              <button
                onClick={() => setGiftSuccess(true)}
                className="w-full py-5 rounded-2xl font-black text-xl text-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl tracking-wide"
                style={{ background: 'linear-gradient(135deg, #FFC107, #FF9800, #E91E63)' }}
              >
                Purchase Gift Card →
              </button>
            )}
          </motion.div>
        )}

        {activeTab === 'redeem' && (
          <motion.div
            key="redeem"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
              <div className="text-6xl mb-6">💳</div>
              <h2 className="text-white text-3xl font-black mb-3">Redeem Your Card</h2>
              <p className="text-white/50 mb-8">Enter the code from your gift card to add credit to your account.</p>

              <form onSubmit={handleRedeem} className="space-y-4">
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => { setRedeemCode(e.target.value.toUpperCase()); setRedeemMessage(null); }}
                  placeholder="XXXX-XXXX-XXXX"
                  maxLength={19}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:ring-2 focus:ring-orange-400 outline-none text-center text-xl font-bold tracking-widest uppercase"
                />

                {redeemMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl px-4 py-3 text-sm font-medium ${
                      redeemMessage.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {redeemMessage.type === 'success' ? '✅' : '❌'} {redeemMessage.text}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-black text-lg text-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #FFC107, #FF9800)' }}
                >
                  Redeem Card →
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 text-white/40 text-sm">
                <p>Gift cards do not expire and can be used across all Cacao Noir products.</p>
                <p className="mt-2">Having trouble? Contact us at <a href="mailto:nano@gmail.com" className="text-orange-400 hover:underline">nano@gmail.com</a></p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}
