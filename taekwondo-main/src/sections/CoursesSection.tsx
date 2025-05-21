import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBaby, FaChild, FaUserGraduate, FaUserTie, FaMedal, FaClock, FaUsers, FaCheckCircle, FaArrowDown } from 'react-icons/fa';

const CourseObjective = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => {
  return (
    <div className="flex items-start space-x-3 mb-3">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h5 className="font-medium">{title}</h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const CourseCard = ({ 
  title, 
  color, 
  age, 
  description, 
  objectives,
  Icon,
  delay 
}: { 
  title: string; 
  color: string; 
  age: string;
  description: string;
  objectives: {icon: JSX.Element; title: string; description: string}[];
  Icon: React.ComponentType<any>; 
  delay: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgColor = color.replace('border', 'bg');

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${color} h-full flex flex-col`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-6">
          <div className={`p-3 rounded-full mr-4 ${bgColor}`}>
            <Icon className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {title}
              <span className={`text-sm px-2 py-1 rounded ${bgColor} text-white`}>{age}</span>
            </h3>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3 mb-6 flex-grow">
          {objectives.map((objective, index) => (
            <CourseObjective 
              key={index} 
              icon={objective.icon}
              title={objective.title} 
              description={objective.description} 
            />
          ))}
        </div>

        <button 
          onClick={() => window.scrollTo({ top: document.getElementById('trial')?.offsetTop, behavior: 'smooth' })}
          className={`w-full ${bgColor} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 mt-auto`}
        >
          <span>Cliquez ici pour essayer ce cours</span>
          <FaArrowDown className="animate-bounce" />
        </button>
      </div>
    </motion.div>
  );
};

const CoursesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courses = [
    {
      title: "Baby Taekwondo",
      color: "border-baby",
      bgColor: "bg-baby",
      age: "3-6 ans",
      description: "Initiation ludique aux bases du taekwondo, développement de la motricité et de la coordination.",
      objectives: [
        {
          icon: <FaChild className="text-baby" />,
          title: "Éveil moteur",
          description: "Développement de la coordination et de l'équilibre à travers des jeux et exercices adaptés"
        },
        {
          icon: <FaUsers className="text-baby" />,
          title: "Socialisation",
          description: "Apprentissage du respect et du partage dans un environnement positif et encourageant"
        },
        {
          icon: <FaCheckCircle className="text-baby" />,
          title: "Confiance en soi",
          description: "Renforcement de l'assurance personnelle par des petites victoires et la reconnaissance des efforts"
        }
      ],
      Icon: FaBaby
    },
    {
      title: "Enfants",
      color: "border-enfants",
      bgColor: "bg-enfants",
      age: "7-12 ans",
      description: "Apprentissage technique, développement de la concentration et éducation aux valeurs du taekwondo.",
      objectives: [
        {
          icon: <FaChild className="text-enfants" />,
          title: "Fondamentaux techniques",
          description: "Apprentissage progressif des positions, coups de pied et enchaînements de base"
        },
        {
          icon: <FaUsers className="text-enfants" />,
          title: "Discipline mentale",
          description: "Développement de la concentration, de la persévérance et du respect des règles"
        },
        {
          icon: <FaCheckCircle className="text-enfants" />,
          title: "Forme physique",
          description: "Amélioration de la souplesse, de l'endurance et de la force adaptée à l'âge"
        }
      ],
      Icon: FaChild
    },
    {
      title: "Adolescents",
      color: "border-ados",
      bgColor: "bg-ados",
      age: "10-17 ans",
      description: "Perfectionnement technique, préparation aux compétitions et développement de la confiance en soi.",
      objectives: [
        {
          icon: <FaClock className="text-ados" />,
          title: "Condition physique",
          description: "Développement musculaire et cardio-vasculaire adapté à la croissance adolescente"
        },
        {
          icon: <FaUsers className="text-ados" />,
          title: "Autodéfense",
          description: "Apprentissage de techniques efficaces et responsables pour gérer les situations de conflit"
        },
        {
          icon: <FaCheckCircle className="text-ados" />,
          title: "Préparation compétition",
          description: "Acquisition des techniques sportives et des stratégies de combat pour les compétitions"
        }
      ],
      Icon: FaUserGraduate
    },
    {
      title: "Adultes",
      color: "border-adultes",
      bgColor: "bg-adultes",
      age: "18 ans et +",
      description: "Maîtrise technique avancée, préparation physique, self-défense et bien-être mental.",
      objectives: [
        {
          icon: <FaClock className="text-adultes" />,
          title: "Perfectionnement technique",
          description: "Maîtrise approfondie des formes (poomsae) et des techniques avancées de combat"
        },
        {
          icon: <FaUsers className="text-adultes" />,
          title: "Condition physique complète",
          description: "Renforcement musculaire, cardio-training et amélioration de la flexibilité"
        },
        {
          icon: <FaCheckCircle className="text-adultes" />,
          title: "Bien-être global",
          description: "Réduction du stress, amélioration de la concentration et équilibre corps-esprit"
        }
      ],
      Icon: FaUserTie
    },
    {
      title: "Compétiteurs",
      color: "border-secondary",
      bgColor: "bg-secondary",
      age: "Sur sélection",
      description: "Entraînement intensif pour les compétitions régionales et nationales, perfectionnement des techniques de combat.",
      objectives: [
        {
          icon: <FaMedal className="text-secondary" />,
          title: "Performance sportive",
          description: "Entraînement intense visant l'excellence technique et tactique pour la compétition"
        },
        {
          icon: <FaUsers className="text-secondary" />,
          title: "Stratégie de combat",
          description: "Développement d'une approche tactique personnalisée et analyse des adversaires"
        },
        {
          icon: <FaCheckCircle className="text-secondary" />,
          title: "Préparation mentale",
          description: "Techniques de concentration, gestion du stress et visualisation pour optimiser les performances"
        }
      ],
      Icon: FaMedal
    }
  ];

  return (
    <section className="py-20 bg-background" id="courses">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Nos Cours</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le taekwondo pour tous les âges et tous les niveaux. Découvrez nos différentes formules adaptées à chaque étape de la vie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.slice(0, 4).map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              color={course.color}
              age={course.age}
              description={course.description}
              objectives={course.objectives}
              Icon={course.Icon}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Compétiteurs special highlight */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative bg-secondary/10 rounded-lg p-2 border-2 border-secondary">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
              Cours spécial
            </div>
            <CourseCard
              title={courses[4].title}
              color={courses[4].color}
              age={courses[4].age}
              description={courses[4].description}
              objectives={courses[4].objectives}
              Icon={courses[4].Icon}
              delay={0.1}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
