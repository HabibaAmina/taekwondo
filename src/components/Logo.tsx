import { motion } from 'framer-motion';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className="flex items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={scrollToTop}
      role="button"
      aria-label="Retour en haut de la page"
    >
      <div className="h-10 w-10 flex items-center justify-center mr-2 bg-primary rounded-full">
        <span className="text-white font-display font-bold text-lg">ATP</span>
      </div>
      <div className="font-display font-bold text-lg text-primary">
        Académie<span className="text-secondary">Taekwondo</span>
      </div>
    </motion.div>
  );
};

export default Logo;
