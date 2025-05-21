import { motion } from 'framer-motion';
import { FaBaby, FaChild, FaUserGraduate, FaUserTie, FaStar } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface PricingOption {
  id: string;
  name: string;
  ageRange: string;
  icon: IconType;
  prices: {
    [key: string]: number;
  };
}

interface ClubCourseTypes {
  [key: string]: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8,
      ease: 'easeOut'
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
    scale: 1.05,
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
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

const pricingOptions: PricingOption[] = [
  {
    id: 'baby',
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
    id: 'enfants',
    name: 'Enfants',
    ageRange: '6-12 ans',
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
    id: 'ados',
    name: 'Adolescents',
    ageRange: '13-17 ans',
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

const clubCourseTypes: ClubCourseTypes = {
  'villebon': ['baby', 'enfants', 'ados', 'adultes'],
  'palaiseau': [],
  'longjumeau': ['baby', 'enfants', 'ados', 'adultes'],
  'saint-remy': ['enfants', 'ados', 'adultes'],
  'magny': [],
  'ulis': ['baby', 'enfants', 'ados', 'adultes']
};

const PricingSection = () => {
  const selectedClub = 'villebon';

  return (
    <div className="container mx-auto px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
      >
        {/* Affiche les autres cartes tarifs */}
        {pricingOptions
          .filter(option => clubCourseTypes[selectedClub]?.includes(option.id))
          .map((option) => (
            <motion.div
              key={option.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative bg-white rounded-xl overflow-hidden shadow-lg flex flex-col min-h-[400px]"
            >
              <div className="bg-gray-900 p-6 text-center relative">
                {option.id === 'adultes' && (
                  <div className="absolute top-2 right-2 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <div className="mr-1">
                      <FaStar />
                    </div>
                    Populaire
                  </div>
                )}
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="text-2xl text-secondary">
                    <option.icon />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                <p className="text-gray-400">{option.ageRange}</p>
              </div>
              <div className="flex-grow p-8 flex flex-col items-center justify-center">
                <motion.div 
                  className="text-center mb-6"
                  initial={{ scale: 1 }}
                >
                  <motion.p 
                    key={selectedClub}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  >
                    {`${option.prices[selectedClub]}€`}
                  </motion.p>
                  <p className="text-gray-600 mt-2 font-medium">par an</p>
                </motion.div>
                <motion.button 
                  onClick={() => window.location.href = '#registration'}
                  className="bg-secondary text-white w-full py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  S'inscrire
                </motion.button>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default PricingSection;