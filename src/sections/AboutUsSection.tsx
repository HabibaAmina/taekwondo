import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMedal, FaHandshake, FaUsers, FaGlobeAsia } from 'react-icons/fa';

const AboutUsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-background" id="about-us">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Qui Sommes-Nous</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez l'histoire et les valeurs de l'Académie de Taekwondo Pluriel, votre partenaire dans la voie du Taekwondo depuis plus de 15 ans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Notre Histoire</h3>
            <p className="text-gray-600 mb-4">
              Fondée en 2006 par Maître Karim Barradi, 7ème Dan et ancien membre de l'équipe nationale Française, l'Académie de Taekwondo Pluriel est née d'une passion pour l'art martial coréen et d'une volonté de transmettre ses valeurs authentiques.
            </p>
            <p className="text-gray-600 mb-4">
              Commençant avec un seul dojang à Paris, notre académie s'est progressivement développée pour répondre à une demande croissante. Aujourd'hui, avec 6 clubs répartis en France et plus de 1500 élèves actifs, nous sommes fiers d'être devenus l'une des plus grandes écoles de Taekwondo en France.
            </p>
            <p className="text-gray-600">
              Notre équipe d'instructeurs certifiés, dont plusieurs champions nationaux et internationaux, s'engage à offrir un enseignement de qualité adapté à tous les âges et tous les niveaux, des tout-petits aux adultes, des débutants aux compétiteurs confirmés.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 bg-primary rounded-lg overflow-hidden h-[400px]"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { 
                  duration: 20, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="w-full h-full"
            >
              <img 
                src="https://media.istockphoto.com/id/1142169858/fr/photo/formateur-montrant-%C3%A0-la-jeune-fille-comment-frapper-la-cible-de-coup-de-pied-cible-de.jpg?s=612x612&w=0&k=20&c=uK_O_B7ZHR25xMqKLFn9gtHpyCLxGssvVIsMWkJBr8E=" 
                alt="Dojang de l'académie" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            staggerChildren: 0.2
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-enfants w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaMedal className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              Nous visons l'excellence technique et pédagogique dans chacun de nos cours, en suivant les standards internationaux.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-adultes w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaHandshake className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Respect</h3>
            <p className="text-gray-600">
              Le respect mutuel est au cœur de notre philosophie, favorisant un environnement d'apprentissage positif et inclusif.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-baby w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Communauté</h3>
            <p className="text-gray-600">
              Nous créons une communauté unie où chaque élève est encouragé à se dépasser et à soutenir ses partenaires.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-ados w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaGlobeAsia className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tradition</h3>
            <p className="text-gray-600">
              Tout en embrassant les aspects modernes du sport, nous restons fidèles aux traditions et à l'esprit du Taekwondo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
