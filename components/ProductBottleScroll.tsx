'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface Props {
  product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [initialLoaded, setInitialLoaded] = useState(false);
  const frameCount = product.frameCount;

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const requestRef = useRef<number>();
  const canvasMathRef = useRef<{ drawWidth: number; drawHeight: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    setInitialLoaded(false);
    imagesRef.current = new Array(frameCount).fill(null);
    canvasMathRef.current = null;
    
    let isCancelled = false;

    const calculateCanvasMath = (img: HTMLImageElement) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }
        
        canvasMathRef.current = { drawWidth, drawHeight, offsetX, offsetY };
    };

    const fetchImage = (i: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `${product.folderPath}/${i}.jpg`;
        img.onload = () => {
             if (isCancelled) return resolve();
             imagesRef.current[i - 1] = img;
             if (i === 1) calculateCanvasMath(img);
             resolve();
        }
        img.onerror = () => {
             resolve();
        }
      });
    };

    const loadImages = async () => {
       const initialBatch = [];
       for (let i = 1; i <= Math.min(10, frameCount); i++) {
           initialBatch.push(fetchImage(i));
       }
       await Promise.all(initialBatch);
       if (isCancelled) return;
       
       setInitialLoaded(true);

       requestAnimationFrame(() => renderFrame(0));

       for (let i = 11; i <= frameCount; i += 5) {
           if (isCancelled) break;
           const batch = [];
           for (let j = 0; j < 5 && i + j <= frameCount; j++) {
               batch.push(fetchImage(i + j));
           }
           await Promise.all(batch);
       }
    };

    loadImages();

    return () => {
        isCancelled = true;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
  }, [product.folderPath]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!initialLoaded) return;
    
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * frameCount))
    );
    
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
  });

  const renderFrame = (index: number) => {
    if (!canvasRef.current) return;
    const img = imagesRef.current[index];
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!canvasMathRef.current) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;
        if (imgRatio > canvasRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }
        canvasMathRef.current = { drawWidth, drawHeight, offsetX, offsetY };
    }

    const { drawWidth, drawHeight, offsetX, offsetY } = canvasMathRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
      const resize = () => {
          if (containerRef.current && canvasRef.current) {
              const canvas = canvasRef.current;
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              
              const firstImg = imagesRef.current.find(Boolean);
              if (firstImg) {
                  const canvasRatio = canvas.width / canvas.height;
                  const imgRatio = firstImg.width / firstImg.height;
                  let drawWidth = canvas.width;
                  let drawHeight = canvas.height;
                  let offsetX = 0;
                  let offsetY = 0;
                  if (imgRatio > canvasRatio) {
                    drawHeight = canvas.width / imgRatio;
                    offsetY = (canvas.height - drawHeight) / 2;
                  } else {
                    drawWidth = canvas.height * imgRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                  }
                  canvasMathRef.current = { drawWidth, drawHeight, offsetX, offsetY };

                  const frameIndex = Math.min(
                      frameCount - 1,
                      Math.max(0, Math.floor(scrollYProgress.get() * frameCount))
                  );
                  requestAnimationFrame(() => renderFrame(frameIndex));
              } else {
                  canvasMathRef.current = null;
              }
          }
      };
      window.addEventListener('resize', resize);
      resize();
      return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {!initialLoaded && (
           <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="animate-pulse flex flex-col items-center gap-4">
                 <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                 <p className="text-white font-medium drop-shadow-md">Blending freshness...</p>
              </div>
           </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none relative z-10"
        />
        <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
