import { motion } from 'framer-motion';
import { FaInfoCircle, FaBaby, FaChild, FaUserGraduate, FaUserTie, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { useInView } from 'react-intersection-observer';

interface Club {
  id: string;
  name: string;
}

type CourseType = 'baby_3' | 'baby_4' | 'baby_3_5' | 'enfants_5_6' | 'enfants_6_9' | 
  'enfants_7_8' | 'enfants_9_10' | 'ados_10_17' | 'ados_11_16' | 'adultes' | 'enfants_5_11' | 'ados_12_plus';

interface ClubCourseTypes {
  [key: string]: CourseType[];
}

interface PricingOption {
  id: CourseType;
  name: string;
  ageRange: string;
  icon: IconType;
  iconColor?: string;
  prices: {
    [key: string]: number;
  };
}

const PricingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedClub, setSelectedClub] = useState<string>('villebon');
  const [previousClub, setPreviousClub] = useState<string>('villebon');

  const clubs: Club[] = [
    { id: 'villebon', name: 'ATP Villebon-sur-Yvette' },
    { id: 'palaiseau', name: 'ATP Palaiseau' },
    { id: 'longjumeau', name: 'ATP Longjumeau' },
    { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse' },
    { id: 'magny', name: 'ATP Magny-les-Hameaux' },
    { id: 'ulis', name: 'ATP Les Ulis' },
  ];

  // Mapping des catégories d'âge disponibles par club
  const clubCourseTypes: ClubCourseTypes = {
    'villebon': ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
    'palaiseau': [],
    'longjumeau': ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
    'saint-remy': ['enfants_5_11', 'ados_12_plus'],
    'magny': [],
    'ulis': ['baby_3', 'baby_4', 'enfants_5_6', 'enfants_7_8', 'enfants_9_10', 'ados_11_16', 'adultes']
  };

  const pricingOptions: PricingOption[] = [
    {
      id: 'enfants_5_11',
      name: 'Enfants',
      ageRange: '5-11 ans',
      icon: FaChild,
      prices: {
        'villebon': 225,
        'palaiseau': 0,
        'longjumeau': 225,
        'saint-remy': 225,
        'magny': 0,
        'ulis': 225
      }
    },
    {
      id: 'ados_12_plus',
      name: 'Adolescents',
      ageRange: '12-17 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 245,
        'palaiseau': 0,
        'longjumeau': 245,
        'saint-remy': 245,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'baby_3_5',
      name: 'Baby Taekwondo',
      ageRange: '3-5 ans',
      icon: FaBaby,
      prices: {
        'villebon': 185,
        'palaiseau': 0,
        'longjumeau': 185,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 185
      }
    },
    {
      id: 'baby_3',
      name: 'Baby Taekwondo 3 ans',
      ageRange: '3 ans',
      icon: FaBaby,
      prices: {
        'villebon': 185,
        'palaiseau': 0,
        'longjumeau': 185,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 185
      }
    },
    {
      id: 'baby_4',
      name: 'Baby Taekwondo 4 ans',
      ageRange: '4 ans',
      icon: FaBaby,
      prices: {
        'villebon': 185,
        'palaiseau': 0,
        'longjumeau': 185,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 185
      }
    },
    {
      id: 'enfants_6_9',
      name: 'Enfants',
      ageRange: '6-9 ans',
      icon: FaChild,
      prices: {
        'villebon': 225,
        'palaiseau': 0,
        'longjumeau': 225,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'enfants_5_6',
      name: 'Enfants',
      ageRange: '5-6 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 225
      }
    },
    {
      id: 'enfants_7_8',
      name: 'Enfants',
      ageRange: '7-8 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'enfants_9_10',
      name: 'Enfants',
      ageRange: '9-10 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'ados_10_17',
      name: 'Adolescents',
      ageRange: '10-17 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 245,
        'palaiseau': 0,
        'longjumeau': 245,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'ados_11_16',
      name: 'Adolescents',
      ageRange: '11-16 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'adultes',
      name: 'Adultes',
      ageRange: '+16 ans',
      icon: FaUserTie,
      prices: {
        'villebon': 245,
        'palaiseau': 0,
        'longjumeau': 245,
        'saint-remy': 245,
        'magny': 0,
        'ulis': 265
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
        velocity: 2
      }
    },
    hover: {
      scale: 1.03,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  };



  return (
    <section className="py-20 bg-primary text-white" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tarifs</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez nos formules conçues pour chaque tranche d'âge. Nos tarifs sont pensés pour permettre à chacun de pratiquer le Taekwondo dans les meilleures conditions.
          </p>
        </motion.div>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Bloc d'informations communes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center bg-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Inclus dans tous nos tarifs</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-center space-x-2">
                <FaInfoCircle className="text-secondary text-xl" />
                <span>Licence FFTDA</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaInfoCircle className="text-secondary text-xl" />
                <span>Assurance</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaInfoCircle className="text-secondary text-xl" />
                <span>Accès aux compétitions</span>
              </div>
            </div>
          </motion.div>

          {/* Bloc des suppléments compétiteurs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center bg-secondary rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Suppléments Compétiteurs</h3>
            <div className="grid grid-cols-1 gap-4">
              {selectedClub === 'villebon' && (
                <div>
                  <p className="text-lg font-bold">+95€</p>
                  <p className="text-sm">Samedi 18h00-20h00</p>
                </div>
              )}
              {selectedClub === 'longjumeau' && (
                <div>
                  <p className="text-lg font-bold">+75€</p>
                  <p className="text-sm">1er dimanche du mois 14h30-16h30</p>
                </div>
              )}
              {selectedClub === 'ulis' && (
                <div>
                  <p className="text-lg font-bold">+80€</p>
                  <p className="text-sm">Dimanche 14h30-17h30</p>
                  <p className="text-xs italic">(sur sélection)</p>
                </div>
              )}
              {selectedClub === 'palaiseau' && (
                <div>
                  <p className="text-sm">Pour plus d'informations sur les tarifs,<br/>consultez le site de la MJC</p>
                </div>
              )}
              {selectedClub === 'saint-remy' && (
                <div>
                  <p className="text-lg font-bold">+90€</p>
                </div>
              )}
              {selectedClub === 'magny' && (
                <div>
                  <p className="text-sm">Cours en cours de planification</p>
                </div>
              )}
              {!['villebon', 'longjumeau', 'ulis', 'palaiseau', 'saint-remy', 'magny'].includes(selectedClub) && (
                <div className="text-gray-200">
                  <p>Sélectionnez un club pour voir les suppléments</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Club selector */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            {clubs.map((club) => (
              <button
                key={club.id}
                onClick={() => {
                  setPreviousClub(selectedClub);
                  setSelectedClub(club.id);
                }}
                className={`px-6 py-2 rounded-full transition-all ${selectedClub === club.id ? 'bg-secondary text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {club.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr"
        >
          {/* Affiche la carte spéciale pour Palaiseau si sélectionné */}
          {selectedClub === 'palaiseau' && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            >
              <div className="bg-gray-900 p-6 text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4"
                  variants={iconVariants}
                >
                  <FaInfoCircle className="text-4xl text-secondary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">ATP Palaiseau</h3>
                <p className="text-gray-400">Cours en cours de planification</p>
              </div>
              <div className="flex-grow p-8 flex flex-col items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-semibold text-secondary mb-6">
                    Pour plus d'informations sur les tarifs,<br/>
                    consultez le site de la MJC
                  </p>
                  <a href="https://www.mjcpalaiseau.com" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-medium">
                    Accéder au site MJC
                  </a>
                </div>
              </div>
            </motion.div>
          )}
          {/* Affiche la carte spéciale pour Magny si sélectionné */}
          {selectedClub === 'magny' && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            >
              <div className="bg-gray-900 p-6 text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4"
                  variants={iconVariants}
                >
                  <FaInfoCircle className="text-4xl text-secondary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">ATP Magny-les-Hameaux</h3>
                <p className="text-gray-400">Cours en cours de planification</p>
              </div>
              <div className="flex-grow p-8 flex items-center justify-center">
                <p className="text-xl font-semibold text-secondary text-center">
                  Cours en cours de planification
                </p>
              </div>
            </motion.div>
          )}
          {/* Affiche les autres cartes tarifs */}
          {pricingOptions
            .filter(option => clubCourseTypes[selectedClub]?.includes(option.id))
            .map((option) => {
              const IconComponent = option.icon;
              return (                <motion.div
                  key={option.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg flex flex-col min-h-[400px] flex-grow"
                  whileHover="hover"
                >
                  <div className="bg-gray-900 p-6 text-center relative">{option.id === 'adultes' && selectedClub !== 'ulis' && selectedClub !== 'longjumeau' && (
                      <div className="absolute top-2 right-2 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <FaStar className="mr-1" />
                        Populaire
                      </div>
                    )}
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4"
                      variants={iconVariants}
                    >
                      <IconComponent className="text-4xl text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                    <p className="text-gray-400">{option.ageRange}</p>
                  </div>
                  <div className="flex-grow p-8 flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <motion.p 
                        key={selectedClub}
                        initial={{ y: previousClub === selectedClub ? 0 : 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      >
                        {`${option.prices[selectedClub]}€`}
                      </motion.p>
                      <p className="text-gray-600 mt-2 font-medium">par an</p>
                    </motion.div>
                    <button 
                      onClick={() => window.location.href = '#registration'}
                      className="bg-secondary text-white w-full py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                    >
                      S'inscrire
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>


      </div>
    </section>
  );
};

export default PricingSection;