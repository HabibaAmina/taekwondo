import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<number | null>(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      age: 15,
      role: "Compétitrice Junior",
      quote: "Le taekwondo fait partie de ma vie depuis 4 ans maintenant. C'est un sport qui m'a aidée à développer ma confiance en moi et ma discipline. J'adore les compétitions et l'esprit d'équipe !",
      image: "https://img.freepik.com/photos-premium/portrait-fille-taekwondo-position-greve-debout-ecole-arts-martiaux_232070-22259.jpg",
      club: "ATP Villebon-sur-Yvette"
    },
    {
      id: 2,
      name: "Thomas et Emma",
      age: 16,  // Les pratiquants sur la photo semblent être des adolescents
      role: "Compétiteurs Junior",
      quote: "Grâce à l'ATP, nous nous entraînons ensemble et nous avons tous les deux gagné nos premières médailles en championnat régional. Les entraîneurs sont exigeants mais toujours encourageants.",
      image: "https://img.freepik.com/photos-gratuite/asiatiques-pratiquent-taekwondo_23-2150753721.jpg",
      club: "ATP Longjumeau"
    },
    {
      id: 3,
      name: "Marie Bernard",
      age: 28,
      role: "Ceinture Noire",
      quote: "Le taekwondo m'a permis de me dépasser et d'atteindre des objectifs que je pensais inaccessibles. Obtenir ma ceinture noire a été une fierté immense. L'enseignement à l'ATP est exceptionnel, avec un équilibre parfait entre tradition et modernité.",
      image: "https://img.freepik.com/photos-gratuite/femme-uniforme-blanc-ceinture-noire-regardant-camera_23-2148322352.jpg",
      club: "ATP Les Ulis"
    },
    {
      id: 4,
      name: "Lucas Petit",
      age: 40,
      role: "Instructeur",
      quote: "Enseigner le taekwondo est une passion. Voir les élèves progresser et gagner en confiance est très gratifiant.",
      image: "https://img.freepik.com/photos-premium/entraineur-taekwondo-position-attaque-dans-ecole-arts-martiaux_232070-22930.jpg",
      club: "ATP Saint-Rémy-lès-Chevreuse"
    },
    {
      id: 5,
      name: "Théo Girard",
      age: 12,  // Le garçon sur la photo semble avoir environ 12 ans
      role: "Compétiteur Combat",
      quote: "Le combat en taekwondo me passionne ! Les entraînements sont intensifs et j'ai déjà participé à plusieurs championnats. Mon objectif est d'atteindre le niveau international.",
      image: "https://img.freepik.com/photos-gratuite/garcon-taille-moyenne-pratiquant-taekwondo_23-2150753775.jpg",
      club: "ATP Palaiseau"
    }
  ];

  // Set up autoplay
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, testimonials.length]);

  // Pause autoplay when user interacts
  const handleManualChange = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
    
    // Resume autoplay after 10 seconds of inactivity
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    setTimeout(() => {
      setIsAutoplay(true);
    }, 10000);
  };

  // Navigation controls
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    handleManualChange(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    handleManualChange(newIndex);
  };

  return (
    <section className="py-20 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Témoignages</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos élèves et de leurs parents qui ont rejoint l'Académie de Taekwondo Pluriel.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          style={{ maxHeight: '400px' }}
                        />
                      </div>
                      <div className="md:w-2/3 p-8 flex flex-col justify-between">
                        <div>
                          <FaQuoteLeft className="text-3xl text-secondary opacity-20 mb-4" />
                          <p className="text-gray-600 italic text-lg mb-6">"{testimonial.quote}"</p>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{testimonial.name}</h3>
                          <p className="text-gray-500">
                            {testimonial.role} {testimonial.age && `• ${testimonial.age} ans`}
                          </p>
                          <p className="text-secondary font-medium">{testimonial.club}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:text-secondary transition-colors z-10"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:text-secondary transition-colors z-10"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-xl" />
          </button>
          
          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-secondary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => handleManualChange(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
