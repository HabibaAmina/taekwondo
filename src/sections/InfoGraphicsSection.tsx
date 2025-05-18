import { useState, useEffect, createRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMedal, FaUsers, FaGlobeEurope, FaGraduationCap } from 'react-icons/fa';

const InfoGraphicsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Stat data
  const stats = [
    {
      id: 1,
      icon: FaUsers,
      value: '1500+',
      label: 'Élèves actifs',
      color: 'bg-enfants'
    },
    {
      id: 2,
      icon: FaGlobeEurope,
      value: '6',
      label: 'Clubs en France',
      color: 'bg-ados'
    },
    {
      id: 3,
      icon: FaMedal,
      value: '120+',
      label: 'Médailles en compétition',
      color: 'bg-adultes'
    },
    {
      id: 4,
      icon: FaGraduationCap,
      value: '25',
      label: 'Instructeurs certifiés',
      color: 'bg-baby'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Count animation values
  const [countRefs] = useState(() => 
    stats.map(() => createRef<HTMLDivElement>())
  );

  // Animate count when in view
  useEffect(() => {
    if (inView) {
      countRefs.forEach((ref, index) => {
        if (ref.current) {
          const finalValue = parseInt(stats[index].value.replace(/\D/g, ''));
          
          const duration = 2000; // milliseconds
          const frameDuration = 1000 / 60; // 60 FPS
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;
          
          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(progress * finalValue);
            
            if (frame === totalFrames) {
              clearInterval(counter);
              if (ref.current) {
                ref.current.innerText = stats[index].value;
              }
            } else {
              if (ref.current) {
                ref.current.innerText = `${currentValue}${stats[index].value.includes('+') ? '+' : ''}`;
              }
            }
          }, frameDuration);
        }
      });
    }
  }, [inView]);

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center"
              variants={itemVariants}
            >
              <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto flex items-center justify-center mb-4`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <div 
                ref={countRefs[index]}
                className="text-4xl font-bold mb-2"
              >
                0
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfoGraphicsSection;
