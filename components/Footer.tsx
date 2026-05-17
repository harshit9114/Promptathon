'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });
      if (res.ok) {
        setSubscribed(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 mb-6">
              Cacao Noir
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The future of freshness. We brew the finest organic juices with advanced cold-pressed technology to bring you pure sunshine in a bottle.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white/90">Shop Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-orange-400 transition-colors">All Products</Link></li>
              <li><Link href="/gift-cards" className="hover:text-orange-400 transition-colors">Gift Cards</Link></li>
              <li><Link href="/find-a-store" className="hover:text-orange-400 transition-colors">Find a Store</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white/90">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-orange-400 transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white/90">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive drops and fresh news.</p>
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm text-green-400 font-medium">
                ✓ Thank you for contacting us! Check your inbox.
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-white placeholder-gray-500"
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={isLoading} className="bg-white text-black rounded-lg px-4 py-3 text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {isLoading ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Cacao Noir. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
