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
          <p className="text-2xl text-primary font-bold max-w-2xl mx-auto mb-6 leading-relaxed">
            Nous transmettons les valeurs du Taekwondo avec passion depuis plus de 20 ans.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Découvrez l'Académie de Taekwondo Pluriel, votre partenaire dans la voie du Taekwondo.
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
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fondée en 2006 par Maître Karim Barradi, 7ème Dan et ancien membre de l'équipe nationale Française, notre académie incarne l'excellence du Taekwondo.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              De notre premier dojang à Paris jusqu'à nos 6 clubs actuels, nous formons aujourd'hui plus de 1500 élèves à travers la France, devenant l'une des plus grandes écoles de Taekwondo du pays.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre équipe d'instructeurs, champions nationaux et internationaux, vous accompagne à chaque étape de votre progression, du débutant au compétiteur confirmé.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 bg-primary rounded-lg overflow-hidden h-[400px]"
            initial={{ opacity: 0, x: 50, rotateY: -20 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -10, 0],
                transition: { 
                  duration: 10, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
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
            duration: 0.8, 
            delay: 0.4,
            staggerChildren: 0.15
          }}
        >
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="bg-enfants w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaMedal style={{ color: 'white', fontSize: '1.5rem' }} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              Nous visons l'excellence technique et pédagogique dans chacun de nos cours, en suivant les standards internationaux.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="bg-adultes w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaHandshake style={{ color: 'white', fontSize: '1.5rem' }} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Respect</h3>
            <p className="text-gray-600">
              Le respect mutuel est au cœur de notre philosophie, favorisant un environnement d'apprentissage positif et inclusif.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="bg-baby w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaUsers style={{ color: 'white', fontSize: '1.5rem' }} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Communauté</h3>
            <p className="text-gray-600">
              Nous créons une communauté unie où chaque élève est encouragé à se dépasser et à soutenir ses partenaires.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="bg-ados w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaGlobeAsia style={{ color: 'white', fontSize: '1.5rem' }} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Tradition</h3>
            <p className="text-gray-600">
              Tout en embrassant les aspects modernes du sport, nous restons fidèles aux traditions et à l'esprit du Taekwondo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
