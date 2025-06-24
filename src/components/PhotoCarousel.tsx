'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/hero-pictures/1.jpeg',
  '/hero-pictures/2.jpeg',
  '/hero-pictures/3.jpeg',
  '/hero-pictures/4.jpeg',
  '/hero-pictures/5.jpeg',
  '/hero-pictures/6.jpeg',
];

const ALBUM_SIZE = 3; // cuántas fotos mostrar atrás
const ROTATIONS = [-10, 6, -4]; // grados de rotación para las fotos atrás
const SCALES = [0.92, 0.96, 0.98]; // escalas para las fotos atrás

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  // Calcula los índices de las fotos atrás
  const getBackIndexes = () => {
    const arr = [];
    for (let i = ALBUM_SIZE; i > 0; i--) {
      arr.push((index - i + images.length) % images.length);
    }
    return arr;
  };

  return (
    <div className="relative flex aspect-[16/9] w-full max-w-[400px] items-center justify-center">
      {/* Fotos atrás con rotación y escala */}
      {getBackIndexes().map((imgIdx, i) => (
        <motion.div
          key={imgIdx}
          className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
          style={{
            rotate: ROTATIONS[i],
            scale: SCALES[i],
            filter: 'blur(1.5px)',
            opacity: 0.6 - i * 0.15,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6 - i * 0.15, scale: SCALES[i] }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={images[imgIdx]}
            alt={`Proyecto ${imgIdx + 1}`}
            fill
            className="rounded-xl object-cover shadow-md"
            sizes="(max-width: 768px) 100vw, 400px"
            draggable={false}
          />
        </motion.div>
      ))}
      {/* Imagen principal animada */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute top-0 left-0 z-10 h-full w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={images[index]}
            alt={`Proyecto ${index + 1}`}
            fill
            className="rounded-xl object-cover shadow-lg"
            sizes="(max-width: 768px) 100vw, 400px"
            draggable={false}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
