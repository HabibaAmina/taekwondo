import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GallerySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<number | null>(null);

  // Gallery image mock data
  const images = [
    {
      id: 1,
      src: "https://www.sports.gouv.fr/sites/default/files/2022-08/taekwondo-combat-2-jpg-480.jpg",
      alt: "Entraînement de taekwondo",
      category: "training"
    },
    {
      id: 2,
      src: "https://taekwondo-meylan.com/wp-content/uploads/2018/02/taekwondo-meylan-cours-enfants-5-a-7.jpg",
      alt: "Championnat régional",
      category: "competition"
    },
    {
      id: 3,
      src: "https://taekwondo-meylan.com/wp-content/uploads/2018/02/taekwondo-meylan-cours-enfants-8-a-15-1.jpg",
      alt: "Cours enfants",
      category: "children"
    },
    {
      id: 4,
      src: "https://taekwondo-meylan.com/wp-content/gallery/taekwondo-meylan/Taekwendo-Photo-Annie-Frenot-172.jpg",
      alt: "Démonstration technique",
      category: "demo"
    },
    {
      id: 5,
      src: "https://taekwondo-meylan.com/wp-content/gallery/taekwondo-meylan/Taekwendo-Photo-Annie-Frenot-84.jpg",
      alt: "Passage de grade",
      category: "training"
    },
    {
      id: 6,
      src: "https://taekwondo-meylan.com/wp-content/gallery/taekwondo-meylan/Taekwendo-Photo-Annie-Frenot-222.jpg",
      alt: "Remise de médailles",
      category: "competition"
    }
  ];

  // Set up autoplay
  useEffect(() => {
    autoPlayRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(images.length / 3));
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(images.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(images.length / 3) - 1 : prevIndex - 1));
  };

  return (
    <section className="py-20 bg-primary text-white" id="gallery">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Galerie</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez les moments forts de nos entraînements, compétitions et événements au sein de l'Académie de Taekwondo Pluriel.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <motion.div 
            className="flex transition-transform duration-500 ease-in-out"
            animate={{ x: -currentIndex * 100 + '%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
          >
            {Array.from({ length: Math.ceil(images.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.slice(slideIndex * 3, slideIndex * 3 + 3).map((image) => (
                    <motion.div
                      key={image.id}
                      className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedImage(image.src)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-medium">{image.alt}</p>
                        <FaSearch className="absolute top-4 right-4 text-white text-xl" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <motion.button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.button>
          
          <motion.button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(images.length / 3) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-secondary' : 'bg-gray-300/50 hover:bg-gray-300/80'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Image lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.button 
                className="absolute top-4 right-4 text-white text-3xl z-10 p-2"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
              <motion.img
                src={selectedImage}
                alt="Gallery preview"
                className="max-w-full max-h-[90vh] object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
