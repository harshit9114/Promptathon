'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Product } from '@/data/products';

interface Props {
  product: Product;
  scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [50, 0, 0, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.4, 0.45, 0.65, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.45, 0.65, 0.7], [50, 0, 0, -50]);

  const opacity4 = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 1], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center w-[calc(100%-3rem)] left-0 right-0 mx-auto md:w-auto md:text-left md:left-12 md:right-auto md:mx-0 top-1/4 max-w-xl">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">{product.section1.title}</h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-white/95">{product.section1.subtitle}</p>
      </motion.div>

      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute text-center w-[calc(100%-3rem)] left-0 right-0 mx-auto md:w-auto md:text-right md:right-12 md:left-auto md:mx-0 top-1/3 max-w-xl">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">{product.section2.title}</h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-white/95">{product.section2.subtitle}</p>
      </motion.div>

      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center w-[calc(100%-3rem)] left-0 right-0 mx-auto md:w-auto md:text-left md:left-12 md:right-auto md:mx-0 top-1/2 max-w-xl">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">{product.section3.title}</h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-white/95">{product.section3.subtitle}</p>
      </motion.div>

      <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute text-center top-1/3 w-[calc(100%-3rem)] left-0 right-0 mx-auto max-w-4xl">
        <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-4 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">{product.section4.title}</h2>
        <p className="text-xl md:text-3xl lg:text-4xl font-semibold drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] text-white/95">{product.section4.subtitle}</p>
      </motion.div>

    </div>
  );
}
