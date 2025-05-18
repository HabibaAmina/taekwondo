import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { clubsData, mapConfig } from '../data/clubsData';
import '../styles/map.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaArrowRight, FaInfo } from 'react-icons/fa';

interface ClubsSectionProps {
  trialRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

const ClubsSection = ({ trialRef, scrollToSection }: ClubsSectionProps) => {
  const [selectedClub, setSelectedClub] = useState(0);
  const [hoverClub, setHoverClub] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Updated club data with improved positioning
  const clubs = [
    {
      id: 1,
      name: "ATP Villebon-sur-Yvette",
      shortName: "Villebon",
      address: "12 Rue des Sports, 91140 Villebon-sur-Yvette",
      phone: "01 23 45 67 89",
      email: "villebon@atp-taekwondo.fr",
      description: "Notre dojang de Villebon-sur-Yvette, établi en 2008, est reconnu pour ses installations modernes et son équipe d'instructeurs passionnés. Ce club offre un environnement convivial et technique pour tous les niveaux.",
      schedule: [
        "Baby TKD (3-5 ans): Lundi 17h-18h",
        "Enfants (6-9 ans): Lundi 18h-19h et Jeudi 17h-19h",
        "Ados (10-17 ans): Lundi 18h-19h et Jeudi 18h-19h",
        "Compétiteurs: Uniquement sur sélection (Samedi 18h-20h)"
      ],
      coordinates: { x: 40, y: 30 },
      instructors: ["Maître Park", "Coach Marie"],
      facilities: ["2 Dojangs", "Vestiaires", "Parking"]
    },
    {
      id: 2,
      name: "ATP Palaiseau",
      shortName: "Palaiseau",
      address: "45 Rue des Arts Martiaux, 91120 Palaiseau",
      phone: "01 56 78 90 12",
      email: "palaiseau@atp-taekwondo.fr",
      description: "Le club de Palaiseau, ouvert en 2012, est notre centre spécialisé dans la formation des jeunes talents. Son équipe pédagogique expérimentée met l'accent sur un apprentissage ludique et progressif.",
      schedule: [
        "Baby TKD (3-5 ans): Lundi 17h-18h",
        "Enfants (6-9 ans): Lundi 18h-19h et Jeudi 17h-19h",
        "Ados (10-17 ans): Lundi 18h-19h et Jeudi 18h-19h",
        "Compétiteurs: Uniquement sur sélection (Samedi 18h-20h)"
      ],
      coordinates: { x: 70, y: 22 },
      instructors: ["Maître Lee", "Coach Thomas"],
      facilities: ["2 Dojangs", "Vestiaires", "Salle de musculation"]
    },
    {
      id: 3,
      name: "ATP Longjumeau",
      shortName: "Longjumeau",
      address: "78 Boulevard du Taekwondo, 91160 Longjumeau",
      phone: "01 91 23 45 67",
      email: "longjumeau@atp-taekwondo.fr",
      description: "Notre dojang de Longjumeau se distingue par son excellente équipe d'entraîneurs professionnels et son atmosphère familiale. Depuis 2015, ce club forme des pratiquants dans un esprit de respect et d'excellence technique.",
      schedule: [
        "Baby TKD (3-5 ans): Lundi 17h-18h",
        "Enfants (6-9 ans): Lundi 18h-19h et Jeudi 17h-19h",
        "Ados (10-17 ans): Lundi 18h-19h et Jeudi 18h-19h",
        "Compétiteurs: Uniquement sur sélection (Samedi 18h-20h)"
      ],
      coordinates: { x: 32, y: 70 },
      instructors: ["Maître Park", "Coach Marie"],
      facilities: ["2 Dojangs", "Vestiaires", "Espace détente"]
    },
    {
      id: 4,
      name: "ATP Saint-Rémy-lès-Chevreuse",
      shortName: "Saint-Rémy",
      address: "23 Rue du Combat, 78470 Saint-Rémy-lès-Chevreuse",
      phone: "01 61 78 90 12",
      email: "saint-remy@atp-taekwondo.fr",
      description: "Fondé en 2010, notre club de Saint-Rémy-lès-Chevreuse est réputé pour son expertise en combat sportif et self-défense. Dans un cadre verdoyant, nous proposons des cours dynamiques et personnalisés.",
      schedule: [
        "Baby TKD (3-5 ans): Lundi 17h-18h",
        "Enfants (6-9 ans): Lundi 18h-19h et Jeudi 17h-19h",
        "Ados (10-17 ans): Lundi 18h-19h et Jeudi 18h-19h",
        "Compétiteurs: Uniquement sur sélection (Samedi 18h-20h)"
      ],
      coordinates: { x: 80, y: 58 },
      instructors: ["Maître Cho", "Coach Lucas"],
      facilities: ["1 Dojang", "Vestiaires", "Boutique"]
    },
    {
      id: 5,
      name: "ATP Magny-les-Hameaux",
      shortName: "Magny",
      address: "56 Avenue des Arts Martiaux, 78114 Magny-les-Hameaux",
      phone: "01 56 78 90 12",
      email: "magny@atp-taekwondo.fr",
      description: "Le club de Magny-les-Hameaux, notre plus récent dojang ouvert en 2018, combine tradition et modernité dans un espace spacieux et lumineux. Son équipe jeune et dynamique propose un enseignement innovant du taekwondo.",
      schedule: [
        "Baby TKD (3-5 ans): Lundi 17h-18h",
        "Enfants (6-9 ans): Lundi 18h-19h et Jeudi 17h-19h",
        "Ados (10-17 ans): Lundi 18h-19h et Jeudi 18h-19h",
        "Compétiteurs: Uniquement sur sélection (Samedi 18h-20h)"
      ],
      coordinates: { x: 66, y: 45 },
      instructors: ["Maître Yoo", "Coach Emma"],
      facilities: ["2 Dojangs", "Vestiaires", "Salle d'étirement"]
    },
    {
      id: 6,
      name: "ATP Les Ulis",
      shortName: "Les Ulis",
      address: "34 Rue des Champions, 91940 Les Ulis",
      phone: "01 20 45 67 89",
      email: "ulis@atp-taekwondo.fr",
      description: "Notre club des Ulis, établi en 2009, est notre centre d'excellence pour la compétition. Avec des résultats nationaux impressionnants, ce dojang allie rigueur technique et esprit d'équipe dans un environnement motivant.",
      schedule: [
        "Baby TKD 3 ans: Samedi 09h30-10h20",
        "Baby TKD 4 ans: Samedi 10h25-11h20",
        "Enfants 5/6 ans: Mercredi 17h15-18h15 et Samedi 11h25-12h25",
        "Enfants 7/8 ans: Mercredi 18h15-19h15 et Samedi 14h00-15h00",
        "Enfants 9/10 ans: Mardi 18h15-19h15 et Samedi 15h00-16h00",
        "Ados 11/16 ans: Mercredi 19h15-20h15 et Samedi 15h-16h",
        "Adulte +16 ans: Mardi 20h30-22h00 et Jeudi 20h30-22h00",
        "Compétiteurs: Uniquement sur sélection (Dimanche 14h30-17h30)"
      ],
      coordinates: { x: 22, y: 42 },
      instructors: ["Maître Kwan", "Coach Julie"],
      facilities: ["1 Dojang", "Vestiaires", "Espace enfants"]
    }
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-background" id="clubs">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Nos Clubs</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos 6 clubs en France, chacun équipé de dojangs modernes et encadré par des maîtres certifiés. Rejoignez le club le plus proche de chez vous !
          </p>
        </motion.div>

        {/* Club Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {clubs.map((club, index) => (
            <motion.button
              key={club.id}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedClub === index 
                  ? 'bg-secondary text-white shadow-md' 
                  : 'bg-white text-primary border border-gray-200 hover:border-secondary'
              }`}
              onClick={() => setSelectedClub(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {club.shortName}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Redesigned Paris Metro Style Map */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 h-[620px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Carte des Clubs</h3>
            <div className="relative h-full w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Interactive map with metro-style layout */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full cursor-move" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feFlood floodColor="#3b82f6" floodOpacity="0.3" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                  <filter id="tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2" />
                  </filter>
                  <radialGradient id="club-marker-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
                    <stop offset="0%" stopColor="#FF8A8A" />
                    <stop offset="100%" stopColor="#FF5757" />
                  </radialGradient>
                </defs>
                
                {/* Region outline - similar to Paris Metro map */}
                <path 
                  d="M20,20 C30,15 45,13 55,15 C65,17 75,25 80,35 C85,45 85,55 80,65 C75,75 65,83 55,85 C45,87 30,85 20,80 C10,75 5,65 5,55 C5,45 10,25 20,20 Z" 
                  fill="white" 
                  stroke="#2C3E50" 
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                
                {/* Connection lines between clubs */}
                <path 
                  d="M45,30 L68,25 L65,42 L75,58" 
                  stroke="#3498DB" 
                  strokeWidth="1.2" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <path 
                  d="M45,30 L25,45 L35,67" 
                  stroke="#3498DB" 
                  strokeWidth="1.2" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Club location markers with tooltips */}
                {clubs.map((club, index) => (
                  <g 
                    key={club.id} 
                    className="club-marker"
                    onClick={() => setSelectedClub(index)}
                    onMouseEnter={() => setHoverClub(index)}
                    onMouseLeave={() => setHoverClub(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Club station marker - smaller and more spaced out */}
                    <motion.circle
                      cx={club.coordinates.x}
                      cy={club.coordinates.y}
                      r={selectedClub === index ? 3 : 2.2}
                      fill={selectedClub === index ? "#FF5757" : "#FF5757"}
                      stroke="white"
                      strokeWidth="1"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    />
                    
                    {/* Pulse animation for selected club */}
                    {selectedClub === index && (
                      <motion.circle
                        cx={club.coordinates.x}
                        cy={club.coordinates.y}
                        r={4}
                        fill="transparent"
                        stroke="#FF5757"
                        strokeWidth="0.8"
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          repeatType: "loop" 
                        }}
                      />
                    )}
                    
                    {/* Enhanced tooltip that appears on hover - better positioning */}
                    {hoverClub === index || selectedClub === index ? (
                      <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Club name in tooltip - better positioning */}
                        <text
                          x={club.coordinates.x + (club.coordinates.x < 50 ? -club.shortName.length * 1.5 : 5)}
                          y={club.coordinates.y - 5}
                          textAnchor={club.coordinates.x < 50 ? "end" : "start"}
                          dominantBaseline="middle"
                          className="font-bold"
                          fill="#2C3E50"
                          fontSize="3.5"
                          textLength={club.shortName.length * 1.5}
                          lengthAdjust="spacingAndGlyphs"
                        >
                          {club.shortName}
                        </text>
                        
                        {/* Improved connector line */}
                        <line 
                          x1={club.coordinates.x} 
                          y1={club.coordinates.y} 
                          x2={club.coordinates.x + (club.coordinates.x < 50 ? -8 : 8)} 
                          y2={club.coordinates.y - 5}
                          stroke="#6B7280"
                          strokeWidth="1"
                        />
                      </motion.g>
                    ) : null}
                  </g>
                ))}
                
                {/* Additional visual elements for map styling */}
                <path 
                  d="M15,65 C25,75 35,70 45,65 C55,60 65,65 75,70" 
                  stroke="#e0e0e0" 
                  strokeWidth="0.8" 
                  fill="none"
                  strokeDasharray="3,2"
                />
              </svg>
              
              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 p-3 rounded-lg text-sm shadow-md border border-gray-200">
                <div className="font-semibold mb-2 text-primary flex items-center">
                  <FaInfo className="mr-2 text-secondary" size={14} />
                  <span>Clubs ATP Taekwondo:</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {clubs.map((club, index) => (
                    <motion.div 
                      key={club.id} 
                      className="flex items-center cursor-pointer hover:text-secondary transition-colors"
                      onClick={() => setSelectedClub(index)}
                      whileHover={{ scale: 1.05, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-3 h-3 rounded-full mr-2 ${selectedClub === index ? 'bg-adultes' : 'bg-adultes/70'}`}></div>
                      <span className={selectedClub === index ? 'font-medium' : ''}>{club.shortName}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Club Details */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            key={`club-details-${selectedClub}`}
          >
            <div className="p-6">
              <motion.h3 
                className="text-2xl font-bold mb-2"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                {clubs[selectedClub].name}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 mb-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                {clubs[selectedClub].description}
              </motion.p>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 mt-6"
              >
                <motion.div variants={itemVariants} className="flex items-start">
                  <FaMapMarkerAlt className="text-secondary mt-1 mr-3" />
                  <span>{clubs[selectedClub].address}</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <FaPhone className="text-secondary mt-1 mr-3" />
                  <span>{clubs[selectedClub].phone}</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <FaEnvelope className="text-secondary mt-1 mr-3" />
                  <span>{clubs[selectedClub].email}</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <FaCalendarAlt className="text-secondary mt-1 mr-3" />
                  <div>
                    <p className="font-medium mb-1">Horaires des cours:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {clubs[selectedClub].schedule.map((time, index) => {
                        // Determine which icon to use based on the course type
                        let icon = null;
                        let bgColor = "bg-gray-100";
                        
                        if (time.includes("Baby")) {
                          icon = "👶";
                          bgColor = "bg-baby/10";
                        } else if (time.includes("Enfants")) {
                          icon = "🧒";
                          bgColor = "bg-enfants/10";
                        } else if (time.includes("Ados")) {
                          icon = "🧑‍🎓";
                          bgColor = "bg-ados/10";
                        } else if (time.includes("Adultes")) {
                          icon = "👨";
                          bgColor = "bg-adultes/10";
                        } else if (time.includes("Compétiteurs")) {
                          icon = "🏆";
                          bgColor = "bg-secondary/10";
                        }
                        
                        return (
                          <div key={index} className={`${bgColor} p-2 rounded-lg shadow-sm`}>
                            <div className="flex items-center mb-1">
                              <span className="mr-2 text-lg">{icon}</span>
                              <span className="font-medium text-sm">{time.split(":")[0]}</span>
                            </div>
                            <div className="text-xs text-gray-600 pl-7">
                              {time.split(":")[1]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="px-6 pb-6">
              <motion.button
                className="w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors"
                onClick={() => scrollToSection(trialRef)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Réserver un cours d'essai <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile Club Navigation */}
        <div className="flex justify-center space-x-3 lg:hidden mb-6">
          {clubs.map((club, index) => (
            <button
              key={club.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedClub === index 
                  ? 'bg-secondary text-white' 
                  : 'bg-white text-primary border border-gray-300'
              }`}
              onClick={() => setSelectedClub(index)}
              aria-label={`Voir ${club.name}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;
