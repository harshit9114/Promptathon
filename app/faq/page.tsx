'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    category: '🛍️ Orders',
    questions: [
      { q: 'How do I place an order?', a: 'Simply browse our products, add your favorites to cart, and checkout. We accept UPI, cards, net banking, and COD.' },
      { q: 'Can I modify my order after placing it?', a: 'Orders can be modified within 1 hour of purchase. After that, they move into processing and may not be editable.' },
      { q: 'Is there a minimum order value?', a: 'No minimum order value! However, orders above ₹499 qualify for free delivery.' },
    ],
  },
  {
    category: '🧃 Products',
    questions: [
      { q: 'Are your juices 100% natural?', a: 'Yes! All our juices are cold-pressed from real fruits with zero artificial flavors, colors, or preservatives.' },
      { q: "What is the shelf life?", a: 'Our cold-pressed juices stay fresh for 5–7 days when refrigerated. Always store them below 4°C.' },
      { q: 'Are the juices vegan?', a: 'All our fruit juices are 100% vegan. The Dutch Chocolate uses plant-based almond milk, making it dairy-free and vegan.' },
    ],
  },
  {
    category: '🚚 Delivery',
    questions: [
      { q: 'How long does delivery take?', a: 'Standard: 3–5 business days. Express: same-day or next-day in select cities.' },
      { q: 'Do you deliver across India?', a: 'We deliver to 200+ cities across India. Check availability by entering your pin code at checkout.' },
    ],
  },
  {
    category: '💳 Payments',
    questions: [
      { q: 'What payment methods are accepted?', a: 'UPI, Credit/Debit Cards, Net Banking, Paytm, PhonePe, Google Pay, and Cash on Delivery (select areas).' },
      { q: 'Is it safe to pay online?', a: 'Absolutely. We use 256-bit SSL encryption and are PCI DSS compliant. Your payment information is never stored.' },
    ],
  },
];

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0d1a0d 100%)' }}>
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">FAQ</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Frequently asked questions. Can't find your answer?{' '}
            <a href="/contact" className="text-orange-400 hover:underline">Contact us →</a>
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="px-8 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-white font-bold text-lg">{cat.category}</h2>
              </div>
              <div className="divide-y divide-white/5">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={qi}>
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full text-left px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="text-white/80 font-medium pr-4">{item.q}</span>
                        <span className={`text-orange-400 text-2xl font-light shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="px-8 pb-5"
                        >
                          <p className="text-white/50 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
