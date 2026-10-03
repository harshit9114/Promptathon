'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AllProductsPage() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0d1a0d 100%)' }}>
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Our Products
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Premium cold-pressed juices crafted with the finest ingredients. Click any product to explore its story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl cursor-pointer"
                  style={{ background: `linear-gradient(160deg, ${product.themeColor}22 0%, #0a0a0a 100%)` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl blur-xl"
                    style={{ background: product.gradient }}
                  />

                  <div className="relative h-72 flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(circle at center, ${product.themeColor}33 0%, transparent 70%)` }}
                    />
                    <img
                      src={`${product.folderPath}/${['mango', 'pomegranate', 'guava', 'strawberry'].includes(product.id) ? product.frameCount : 1}.jpg`}
                      alt={product.name}
                      className="relative z-10 h-64 w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                        animation: 'shine 1.5s ease-in-out infinite'
                      }}
                    />
                  </div>

                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl font-black text-white leading-tight">{product.name}</h2>
                      <span
                        className="text-xl font-black rounded-full px-4 py-1 border border-white/20 ml-2 shrink-0"
                        style={{ color: product.themeColor }}
                      >
                        {product.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 mb-4">{product.subName}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feat, j) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1 rounded-full border font-medium"
                          style={{ borderColor: `${product.themeColor}55`, color: product.themeColor, background: `${product.themeColor}11` }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div
                      className="w-full py-3 rounded-2xl text-center font-bold text-sm tracking-widest uppercase transition-all duration-300 group-hover:shadow-lg border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${product.themeColor}33, ${product.themeColor}11)`,
                        color: product.themeColor
                      }}
                    >
                      Explore Product →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
