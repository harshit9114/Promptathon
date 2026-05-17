'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    icon: '🚚',
    title: 'Delivery Information',
    color: '#4CAF50',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3–5 business days. Express delivery (same-day or next-day) is available in select pin codes. All orders are shipped in insulated, eco-friendly coolers to keep your juices fresh.',
      },
      {
        q: 'Which areas do you deliver to?',
        a: "We currently deliver to all major cities across India including Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune, and 200+ tier-2 cities. Enter your pin code at checkout to check availability in your area.",
      },
      {
        q: 'What are the delivery charges?',
        a: 'Delivery is FREE on orders above ₹499. For orders below ₹499, a flat shipping fee of ₹49 is applicable. Express delivery charges may vary based on your location.',
      },
      {
        q: 'Can I track my order?',
        a: "Yes! Once your order is dispatched, you'll receive a tracking link via SMS and email. You can also track your order directly from the app or by contacting our support team.",
      },
    ],
  },
  {
    icon: '↩️',
    title: 'Returns & Refunds',
    color: '#2196F3',
    items: [
      {
        q: "What is Nano Banana's return policy?",
        a: 'We have a hassle-free 7-day return policy from the date of delivery. If you are not completely satisfied with your purchase, you can initiate a return or exchange — no questions asked.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact our customer care at 789-2365-3652 or email us at nano@gmail.com. Our team will schedule a pickup from your doorstep within 24 hours of raising the request.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 3–5 business days after we receive and inspect the returned product. The amount will be credited to your original payment method or as Nano Banana wallet credit (your choice).',
      },
      {
        q: 'What if I receive a damaged product?',
        a: "In the rare case that your product arrives damaged or leaking, please send us a photo within 24 hours of delivery. We'll immediately dispatch a replacement at no extra cost.",
      },
    ],
  },
  {
    icon: '📦',
    title: 'Packaging & Freshness',
    color: '#FF9800',
    items: [
      {
        q: 'How do you ensure freshness during transit?',
        a: 'All orders are packed in insulated eco-friendly coolers with food-grade ice gel packs that keep your juices cold for up to 48 hours, ensuring perfect freshness upon arrival.',
      },
      {
        q: 'Is the packaging eco-friendly?',
        a: 'Absolutely! We use 100% recyclable and biodegradable packaging materials. Our bottles are BPA-free and our cooler boxes are made from recycled cardboard. We are committed to zero-waste packaging by 2026.',
      },
    ],
  },
  {
    icon: '💳',
    title: 'Payment & Cancellation',
    color: '#9C27B0',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets (Paytm, PhonePe, Google Pay), EMI options, and Cash on Delivery (COD) for select pin codes.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'You can cancel your order within 1 hour of placing it for a full refund. After that, orders enter processing and cancellation may not be possible. For post-dispatch orders, please use the return process instead.',
      },
    ],
  },
];

export default function ShippingReturnsPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Shipping & Returns
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Everything you need to know about getting your Nano Banana products delivered fresh to your door.
          </p>
        </motion.div>

        {/* Quick Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          {[
            { icon: '🆓', label: 'Free Delivery', sub: 'On orders ₹499+' },
            { icon: '⚡', label: 'Express Ship', sub: 'Same/Next day' },
            { icon: '7️⃣', label: 'Day Returns', sub: 'Hassle free' },
            { icon: '💯', label: 'Fresh Guarantee', sub: 'Or full refund' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-white font-bold text-sm">{item.label}</div>
              <div className="text-white/40 text-xs mt-1">{item.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Accordion Sections */}
        <div className="space-y-6">
          {sections.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + si * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Section Header */}
              <div
                className="flex items-center gap-4 px-8 py-6 border-b border-white/10"
                style={{ background: `${section.color}11` }}
              >
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-white text-xl font-black">{section.title}</h2>
              </div>

              {/* Items */}
              <div className="divide-y divide-white/5">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={ii}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full text-left px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-white/80 font-medium group-hover:text-white transition-colors pr-4">
                          {item.q}
                        </span>
                        <span
                          className={`text-2xl font-light shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                          style={{ color: section.color }}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-8 pb-6"
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

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-400/20 rounded-3xl p-10 text-center"
        >
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-white text-2xl font-black mb-3">Still have questions?</h3>
          <p className="text-white/60 mb-6">Our support team is always ready to help you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:78923653652"
              className="px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-orange-50 transition-all hover:scale-105"
            >
              📞 Call 789-2365-3652
            </a>
            <a
              href="mailto:nano@gmail.com"
              className="px-8 py-4 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              ✉️ nano@gmail.com
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
