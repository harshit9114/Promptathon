'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function StorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cartItems, addToCart } = useAppContext();
  const product = products[currentIndex];

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.setProperty('--product-gradient', product.gradient);
  }, [currentIndex, product]);

  useEffect(() => {
    setIsAdded(cartItems.some(item => item.id === product.id));
  }, [cartItems, product]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.buyNowSection.price,
      gradient: product.gradient
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />

      {/* Sticky Product Switcher */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 shadow-2xl">
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90 border border-white/20"
          aria-label="Previous product"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all rounded-full ${i === currentIndex ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Switch to ${p.name}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90 border border-white/20"
          aria-label="Next product"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full"
        >
          {/* Scroll Experience */}
          <ProductBottleScroll product={product} />

          {/* Details Section */}
          <motion.section 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-32 px-6 max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg">{product.detailsSection.title}</h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/90 drop-shadow-md">
                  {product.detailsSection.description}
                </p>
                
                <h3 className="text-3xl md:text-5xl font-black mt-16 mb-6 drop-shadow-lg">{product.freshnessSection.title}</h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/90 drop-shadow-md">
                  {product.freshnessSection.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 flex-wrap gap-4 sm:gap-6 h-fit">
                {product.stats.map((stat, i) => (
                  <div key={i} className={`bg-black/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 text-center ${i === 2 ? 'sm:col-span-2' : ''}`}>
                    <div className="text-4xl sm:text-5xl md:text-7xl font-black mb-2">{stat.val}</div>
                    <div className="text-xs sm:text-sm md:text-lg font-bold text-white/70 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Commerce Section */}
          <motion.section 
            id="commerce"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-32 bg-black/40 backdrop-blur-xl border-y border-white/10"
          >
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-12 drop-shadow-xl flex flex-col md:flex-row items-center justify-center gap-6">
                <span>{product.name}</span>
                <span className="text-4xl md:text-6xl font-medium bg-white/20 px-8 py-3 rounded-full border border-white/30 backdrop-blur-md shadow-xl">{product.buyNowSection.price}</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {product.buyNowSection.processingParams.map((param, i) => (
                  <span key={i} className="px-6 py-3 rounded-full border-2 border-white/30 text-lg font-bold tracking-wide backdrop-blur-sm bg-white/5">
                    {param}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
                <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">✓</span>
                    Delivery Promise
                  </h4>
                  <p className="text-white/80 leading-relaxed text-lg">{product.buyNowSection.deliveryPromise}</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">↻</span>
                    Return Policy
                  </h4>
                  <p className="text-white/80 leading-relaxed text-lg">{product.buyNowSection.returnPolicy}</p>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className={`text-xl sm:text-2xl md:text-3xl font-black px-10 sm:px-16 py-5 sm:py-6 rounded-full transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)] tracking-wide ${isAdded ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white text-black hover:bg-product-orange hover:text-black hover:scale-105 active:scale-95'}`}
              >
                {isAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              </button>
            </div>
          </motion.section>

        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
