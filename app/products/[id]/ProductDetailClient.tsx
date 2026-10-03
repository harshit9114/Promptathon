'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const productIndex = products.findIndex((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(productIndex >= 0 ? productIndex : 0);
  const { cartItems, addToCart } = useAppContext();
  const [cartAdded, setCartAdded] = useState(false);
  const product = products[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.setProperty('--product-gradient', product.gradient);
  }, [currentIndex, product]);

  useEffect(() => {
    setCartAdded(cartItems.some((item) => item.id === product?.id));
  }, [cartItems, product]);

  useEffect(() => {
    router.replace(`/products/${products[currentIndex].id}`, { scroll: false });
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.buyNowSection.price,
      gradient: product.gradient,
    });
  };

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f1a' }}>
        <div className="text-center text-white">
          <h1 className="text-3xl font-black mb-4">Product not found</h1>
          <Link href="/products" className="text-orange-400 hover:underline">← Back to all products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-20 left-6 z-50"
      >
        <Link
          href="/products"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white/70 hover:text-white text-sm font-medium transition-all hover:bg-black/60"
        >
          <ChevronLeft size={16} />
          All Products
        </Link>
      </motion.div>

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
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full"
        >
          <ProductBottleScroll product={product} />

          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
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
                <span className="text-4xl md:text-6xl font-medium bg-white/20 px-8 py-3 rounded-full border border-white/30 backdrop-blur-md shadow-xl">
                  {product.buyNowSection.price}
                </span>
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
                className={`text-xl sm:text-2xl md:text-3xl font-black px-10 sm:px-16 py-5 sm:py-6 rounded-full transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)] tracking-wide ${
                  cartAdded
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white text-black hover:bg-orange-50 hover:scale-105 active:scale-95'
                }`}
              >
                {cartAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              </button>
            </div>
          </motion.section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
