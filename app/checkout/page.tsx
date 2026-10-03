'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Truck, CreditCard, User, ChevronRight, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const formatINRCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);

type CheckoutStep = 'LOGIN' | 'ADDRESS' | 'SUMMARY' | 'PAYMENT';

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user, cartItems, clearCart } = useAppContext();
  
  const [activeStep, setActiveStep] = useState<CheckoutStep>('ADDRESS');
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', locality: '', address: '' });
  const [paymentOption, setPaymentOption] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.push('/login');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + price;
  }, 0);

  const shipping = cartItems.length > 0 ? 50.0 : 0;
  const total = subtotal + shipping;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep('SUMMARY');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      clearCart();
    }, 2500);
  };

  if (!isLoggedIn) return <div className="min-h-screen bg-black" />;

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-black text-white selection:bg-orange-500 overflow-hidden">
        <Navbar />
        <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-32 h-32 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center mb-8 border-4 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
          >
            <CheckCircle2 size={64} className="text-emerald-400" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            ORDER <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">CONFIRMED</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-white/50 text-xl font-medium mb-12"
          >
            Your Nano energy is being prepared for dispatch.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link href="/store" className="inline-flex px-10 py-5 rounded-full bg-white text-black font-black hover:bg-orange-500 hover:text-white transition-all text-lg tracking-widest uppercase shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500 relative z-10">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-5 flex items-center justify-between bg-white/5 cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Check size={16} strokeWidth={4} />
                </span>
                <div>
                  <h3 className="text-white/70 font-bold tracking-widest uppercase text-sm">1. LOGIN</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-white tracking-wide truncate">{user?.name}</span>
                    <span className="text-white/40 text-sm hidden sm:inline-block truncate">({user?.email})</span>
                  </div>
                </div>
              </div>
              <Link href="/login" className="text-orange-400 text-sm font-bold uppercase tracking-widest hover:text-orange-300">Change</Link>
            </div>
          </div>

          <div className={`bg-[#111] border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 ${activeStep === 'ADDRESS' ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]' : 'border-white/10'}`}>
            <div 
              className={`px-6 py-5 flex items-center justify-between cursor-pointer transition-colors ${activeStep === 'ADDRESS' ? 'bg-orange-500/10' : activeStep === 'SUMMARY' || activeStep === 'PAYMENT' ? 'bg-white/5' : ''}`}
              onClick={() => { if (activeStep !== 'ADDRESS') setActiveStep('ADDRESS'); }}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded flex items-center justify-center font-black text-sm border shadow-lg transition-all ${activeStep === 'SUMMARY' || activeStep === 'PAYMENT' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-orange-500 text-white border-orange-400'}`}>
                  {activeStep === 'SUMMARY' || activeStep === 'PAYMENT' ? <Check size={16} strokeWidth={4} /> : '2'}
                </span>
                <div>
                  <h3 className={`font-bold tracking-widest uppercase text-sm ${activeStep === 'ADDRESS' ? 'text-orange-400' : 'text-white/70'}`}>2. DELIVERY ADDRESS</h3>
                  {(activeStep === 'SUMMARY' || activeStep === 'PAYMENT') && address.name && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-bold text-white capitalize">{address.name}</span>
                      <span className="text-white/40 text-sm hidden sm:inline-block truncate">- {address.address}, {address.locality}</span>
                    </div>
                  )}
                </div>
              </div>
              {(activeStep === 'SUMMARY' || activeStep === 'PAYMENT') && (
                <button className="text-orange-400 text-sm font-bold uppercase tracking-widest hover:text-orange-300">Change</button>
              )}
            </div>

            <AnimatePresence>
              {activeStep === 'ADDRESS' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-8 border-t border-white/5 bg-[#0a0a0a]"
                >
                  <form onSubmit={handleAddressSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black tracking-widest text-white/40 uppercase ml-1">Name</label>
                        <input type="text" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-orange-500 focus:outline-none focus:bg-white/10 transition-all font-medium" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black tracking-widest text-white/40 uppercase ml-1">10-digit Phone Number</label>
                        <input type="tel" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-orange-500 focus:outline-none focus:bg-white/10 transition-all font-medium" pattern="[0-9]{10}" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black tracking-widest text-white/40 uppercase ml-1">Pincode</label>
                        <input type="text" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-orange-500 focus:outline-none focus:bg-white/10 transition-all font-medium" pattern="[0-9]{6}" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black tracking-widest text-white/40 uppercase ml-1">Locality</label>
                        <input type="text" value={address.locality} onChange={(e) => setAddress({...address, locality: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-orange-500 focus:outline-none focus:bg-white/10 transition-all font-medium" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black tracking-widest text-white/40 uppercase ml-1">Address (Area and Street)</label>
                      <textarea value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-orange-500 focus:outline-none focus:bg-white/10 transition-all font-medium resize-none" required />
                    </div>
                    <button type="submit" className="px-10 py-4 bg-orange-500 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors shadow-[0_10px_20px_rgba(249,115,22,0.3)]">
                      Save and Deliver Here
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`bg-[#111] border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 ${activeStep === 'SUMMARY' ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]' : 'border-white/10'}`}>
            <div 
              className={`px-6 py-5 flex items-center gap-4 cursor-pointer transition-colors ${activeStep === 'SUMMARY' ? 'bg-orange-500/10' : activeStep === 'PAYMENT' ? 'bg-white/5' : ''}`}
            >
              <span className={`w-8 h-8 rounded flex items-center justify-center font-black text-sm border shadow-lg transition-all ${activeStep === 'PAYMENT' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : activeStep === 'SUMMARY' ? 'bg-orange-500 text-white border-orange-400' : 'bg-white/10 text-white/50 border-white/5'}`}>
                {activeStep === 'PAYMENT' ? <Check size={16} strokeWidth={4} /> : '3'}
              </span>
              <div>
                <h3 className={`font-bold tracking-widest uppercase text-sm ${activeStep === 'SUMMARY' ? 'text-orange-400' : 'text-white/70'}`}>3. ORDER SUMMARY</h3>
                {activeStep === 'PAYMENT' && <div className="mt-1 font-bold text-white">{cartItems.length} Items</div>}
              </div>
              {activeStep === 'PAYMENT' && (
                <button onClick={() => setActiveStep('SUMMARY')} className="ml-auto text-orange-400 text-sm font-bold uppercase tracking-widest hover:text-orange-300">Change</button>
              )}
            </div>

            <AnimatePresence>
              {activeStep === 'SUMMARY' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/5 bg-[#0a0a0a]"
                >
                  <div className="p-6 space-y-4">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-6 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-24 h-24 rounded-xl flex items-center justify-center relative overflow-hidden" style={{ background: item.gradient }}>
                          <img src="/banana-bottle.png" alt={item.name} className="w-16 h-16 object-contain drop-shadow-xl z-10" />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <h4 className="text-xl font-black capitalize">{item.name}</h4>
                          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">Pack of 2</p>
                          <p className="text-xl font-black text-orange-400 mt-2">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-[#111] border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Order Email</p>
                      <p className="text-white font-medium">{user?.email}</p>
                    </div>
                    <button 
                      onClick={() => setActiveStep('PAYMENT')}
                      className="px-10 py-4 bg-orange-500 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors shadow-[0_10px_20px_rgba(249,115,22,0.3)]"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`bg-[#111] border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 ${activeStep === 'PAYMENT' ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]' : 'border-white/10'}`}>
            <div className={`px-6 py-5 flex items-center gap-4 transition-colors ${activeStep === 'PAYMENT' ? 'bg-orange-500/10' : ''}`}>
              <span className={`w-8 h-8 rounded flex items-center justify-center font-black text-sm border shadow-lg transition-all ${activeStep === 'PAYMENT' ? 'bg-orange-500 text-white border-orange-400' : 'bg-white/10 text-white/50 border-white/5'}`}>
                4
              </span>
              <h3 className={`font-bold tracking-widest uppercase text-sm ${activeStep === 'PAYMENT' ? 'text-orange-400' : 'text-white/70'}`}>4. PAYMENT OPTIONS</h3>
            </div>

            <AnimatePresence>
              {activeStep === 'PAYMENT' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-8 border-t border-white/5 bg-[#0a0a0a]"
                >
                  <div className="space-y-4">
                    {[
                      { id: 'UPI', label: 'UPI', sub: (
                        <div className="mt-4">
                          <p className="text-white/50 text-sm mb-3">Choose an option</p>
                          <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">PhonePe</button>
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">Google Pay</button>
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">Your UPI ID</button>
                          </div>
                        </div>
                      )},
                      { id: 'Wallets', label: 'Wallets', sub: (
                        <div className="mt-4">
                          <p className="text-white/50 text-sm mb-3">Choose a wallet</p>
                          <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">Paytm</button>
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">Amazon Pay</button>
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50">Mobikwik</button>
                          </div>
                        </div>
                      )},
                      { id: 'Credit / Debit / ATM Card', label: 'Credit / Debit / ATM Card', sub: (
                        <div className="mt-4 space-y-3">
                          <input type="text" placeholder="Card Number" maxLength={19} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-orange-500 focus:outline-none transition-all font-medium text-sm placeholder:text-white/30" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM / YY" maxLength={5} className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-orange-500 focus:outline-none transition-all font-medium text-sm placeholder:text-white/30" />
                            <input type="text" placeholder="CVV" maxLength={3} className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-orange-500 focus:outline-none transition-all font-medium text-sm placeholder:text-white/30" />
                          </div>
                          <input type="text" placeholder="Name on Card" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-orange-500 focus:outline-none transition-all font-medium text-sm placeholder:text-white/30" />
                        </div>
                      )},
                      { id: 'Net Banking', label: 'Net Banking', sub: (
                        <div className="mt-4">
                          <p className="text-white/50 text-sm mb-3">Select your bank</p>
                          <div className="flex flex-wrap gap-3">
                            {['SBI', 'HDFC', 'ICICI', 'Axis', 'Other Banks'].map(bank => (
                              <button key={bank} className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#111] hover:bg-white/5 font-bold transition-all hover:border-orange-500/50 text-sm">{bank}</button>
                            ))}
                          </div>
                        </div>
                      )},
                      { id: 'Cash on Delivery', label: 'Cash on Delivery', sub: (
                        <div className="mt-3">
                          <p className="text-white/50 text-sm">Pay in cash when your order is delivered. No extra charges.</p>
                        </div>
                      )},
                    ].map(({ id, label, sub }) => (
                      <div
                        key={id}
                        onClick={() => setPaymentOption(id)}
                        className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${paymentOption === id ? 'border-orange-500 bg-orange-500/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${paymentOption === id ? 'border-orange-500' : 'border-white/30'}`}>
                          {paymentOption === id && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </div>
                        <div className="flex-grow">
                          <span className={`font-bold tracking-wide ${paymentOption === id ? 'text-white' : 'text-white/70'}`}>{label}</span>
                          {paymentOption === id && sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="px-12 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg tracking-widest uppercase rounded-2xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)] transition-all flex items-center gap-3 disabled:opacity-70"
                    >
                      {isProcessing ? <Loader2 className="animate-spin" size={24} /> : null}
                      {formatINRCurrency(total)} PAY
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-32">
            <h3 className="text-white/50 font-black tracking-widest uppercase text-sm border-b border-white/10 pb-4 mb-4">Price Details</h3>
            
            <div className="space-y-4 font-medium mb-6">
              <div className="flex justify-between items-center text-white/80">
                <span>Price ({cartItems.length} items)</span>
                <span>{formatINRCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span>Delivery Charges</span>
                <span className={shipping === 0 ? "text-emerald-400 font-bold" : ""}>
                  {shipping === 0 ? 'FREE' : formatINRCurrency(shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center border-y border-white/10 py-5 mb-6 text-xl">
              <span className="font-black italic tracking-wide">Amount Payable</span>
              <span className="font-black text-white">{formatINRCurrency(total)}</span>
            </div>

            <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold tracking-wide">
              <ShieldCheck size={20} />
              <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
