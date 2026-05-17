'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Trash2, CreditCard, Truck, ShieldCheck, ChevronRight, User2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const formatINRCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);

type CouponFeedback = {
  type: 'success' | 'error';
  text: string;
};

export default function OrderPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, user, isLoggedIn } = useAppContext();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<CouponFeedback | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Dynamic User Info from AppContext
  const userEmail = user?.email || 'guest@example.com';
  const userName = user?.name || 'Guest User';

  const allocatedCard = {
    code: 'NANO-BOOST-2',
    value: 250,
    validTill: '31 Mar 2026',
    assignedTo: 'Pack of 2',
    note: 'Card already mapped to this order',
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + price;
  }, 0);

  const shipping = cartItems.length > 0 ? 50.0 : 0;
  const total = Math.max(0, subtotal + shipping - appliedDiscount);

  const handleApplyCoupon = () => {
    const normalized = couponCode.trim().toUpperCase();
    if (cartItems.length === 0) {
      setCouponFeedback({ type: 'error', text: 'Add items to the cart before applying coupons.' });
      return;
    }
    if (!normalized) {
      setCouponFeedback({ type: 'error', text: 'Enter a coupon code to redeem.' });
      setAppliedDiscount(0);
      return;
    }

    if (normalized === 'NANO50' || normalized === 'FRESH50') {
      const discountValue = Math.min(50, subtotal + shipping);
      setAppliedDiscount(discountValue);
      setCouponFeedback({
        type: 'success',
        text: `Coupon ${normalized} applied — ${formatINRCurrency(discountValue)} will be deducted for Pack of 2.`,
      });
      setCouponCode('');
      return;
    }

    setAppliedDiscount(0);
    setCouponFeedback({
      type: 'error',
      text: 'Coupon not recognised. Try NANO50 or FRESH50 for instant savings.',
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push('/checkout');
    }
  };

  useEffect(() => {
    if (!cartToast) return;
    const timer = setTimeout(() => setCartToast(null), 3200);
    return () => clearTimeout(timer);
  }, [cartToast]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Link href="/store" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold tracking-wide underline underline-offset-4 decoration-white/10 group-hover:decoration-orange-500 transition-all">Continue Shopping</span>
        </Link>

        {/* Success Toast */}
        <AnimatePresence>
          {cartToast && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center gap-3 border border-emerald-400"
            >
              <CheckCircle2 size={24} />
              <span className="text-lg font-black tracking-wide">{cartToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items Section */}
          <div className="flex-grow space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">YOUR CART</h1>
              <span className="text-xl font-bold text-white/40">{cartItems.length} ITEMS</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-20 text-center bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                <ShoppingBag size={80} className="mx-auto mb-6 text-white/10" />
                <h3 className="text-3xl font-black mb-3 italic">CART IS EMPTY</h3>
                <p className="text-white/40 mb-10 text-lg font-medium">Capture some energy and come back.</p>
                <Link href="/store" className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  REFILL NOW
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-center gap-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group relative overflow-hidden"
                  >
                    <div 
                      className="w-40 h-40 rounded-[2rem] flex-shrink-0 flex items-center justify-center p-6 shadow-2xl relative z-10"
                      style={{ background: item.gradient }}
                    >
                      <img src="/banana-bottle.png" alt={item.name} className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left relative z-10">
                      <h3 className="text-3xl font-black mb-3 tracking-tight">{item.name}</h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                        <span className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest text-white/50 border border-white/5">Pack of 2</span>
                        <span className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest text-white/50 border border-white/5">750ml Premium</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-4 w-full sm:w-auto relative z-10">
                      <div className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">{formatINRCurrency(parseFloat(item.price.replace(/[^0-9.]/g, '')))}</div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-4 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-xl translate-y-2 group-hover:translate-y-0"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout & User Summary */}
          <div className="w-full lg:w-[28rem]">
            <div className="bg-[#111] border border-white/10 p-10 rounded-[3rem] sticky top-32 shadow-[0_30px_100px_rgba(0,0,0,0.5)] space-y-8">
              <h3 className="text-3xl font-black italic tracking-tight border-b border-white/10 pb-6 uppercase">SUMMARY</h3>
              
              {/* Customer Info Section (Flipkart Style) */}
              <div className="border border-white/10 bg-black/40 rounded-[2rem] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <User2 size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Customer</p>
                      <p className="text-xl font-black text-white capitalize">{userName}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowUserDetails(!showUserDetails)}
                    className="text-xs font-black text-orange-400 hover:text-orange-300 uppercase tracking-widest transition-colors"
                  >
                    {showUserDetails ? 'CLOSE' : 'DETAILS'}
                  </button>
                </div>

                <AnimatePresence>
                  {showUserDetails && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-3 pt-4 border-t border-white/5"
                    >
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 font-bold">EMAIL</span>
                        <span className="text-white font-medium truncate ml-4 italic">{userEmail}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 font-bold">SHIP TO</span>
                        <span className="text-white font-medium capitalize">{userName}'s Primary</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 font-bold">PREFERENCE</span>
                        <span className="text-white font-medium">Pack of 2 (Default)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Totals */}
              <div className="space-y-5">
                <div className="flex justify-between text-white/50 font-bold tracking-wide">
                  <span>SUBTOTAL</span>
                  <span className="text-white">{formatINRCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/50 font-bold tracking-wide">
                  <span>SHIPPING</span>
                  <span className="text-white">{formatINRCurrency(shipping)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-black tracking-widest italic">
                    <span>COUPON DISCOUNT</span>
                    <span>-{formatINRCurrency(appliedDiscount)}</span>
                  </div>
                )}
                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-xl font-black italic tracking-tight">TOTAL</span>
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 shadow-xl tracking-tighter">
                    {formatINRCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Coupon System */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">REDEEM COUPON</p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter NANO50"
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-bold placeholder:text-white/20"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="px-6 rounded-2xl bg-white text-black font-black text-xs hover:bg-orange-500 hover:text-white transition-all shadow-lg uppercase tracking-widest"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <p className={`text-xs font-bold px-2 tracking-wide ${couponFeedback.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Main CTA */}
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full py-6 rounded-[2rem] bg-white text-black font-black text-2xl hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-3 group disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {!isLoggedIn ? 'LOGIN TO CHECKOUT' : 'CHECKOUT'}
                <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={28} />
              </button>

              <div className="flex flex-col gap-4 text-center">
                <div className="flex items-center justify-center gap-3 text-xs font-black tracking-widest text-white/30">
                  <Truck size={14} className="text-orange-500/60" />
                  FREE EXPRESS SHIPPING OVER ₹499
                </div>
                <div className="flex items-center justify-center gap-3 text-xs font-black tracking-widest text-white/30">
                  <ShieldCheck size={14} className="text-green-500/60" />
                  SECURE 256-BIT SSL CHECKOUT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
