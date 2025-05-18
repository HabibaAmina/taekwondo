import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';

interface NavbarProps {
  scrollY: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    coursesRef: React.RefObject<HTMLDivElement>;
    clubsRef: React.RefObject<HTMLDivElement>;
    galleryRef: React.RefObject<HTMLDivElement>;
    shopRef: React.RefObject<HTMLDivElement>;
    registrationRef: React.RefObject<HTMLDivElement>;
    trialRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };
}

const Navbar = ({ scrollY, scrollToSection, refs }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.coursesRef)}
          >
            Nos Cours
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.clubsRef)}
          >
            Nos Clubs
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.galleryRef)}
          >
            Galerie
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.shopRef)}
          >
            Boutique
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.trialRef)}
          >
            Cours d'essai
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.contactRef)}
          >
            Contact
          </div>
          <button
            className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors"
            onClick={() => scrollToSection(refs.registrationRef)}
          >
            S'inscrire
          </button>
          
          {/* Cart is now rendered directly in App.tsx */}
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          {/* Cart is now rendered directly in App.tsx */}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none"
          >
            <FaBars className={`text-2xl ${isOpen ? 'hidden' : 'block'}`} />
            <FaTimes className={`text-2xl ${isOpen ? 'block' : 'hidden'}`} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                  scrollToSection(refs.coursesRef);
                  setIsOpen(false);
                }}
              >
                Nos Cours
              </div>
              <div 
                className="py-2 border-b border-gray-100" 
                onClick={() => {
                  scrollToSection(refs.clubsRef);
                  setIsOpen(false);
                }}
              >
                Nos Clubs
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                  scrollToSection(refs.galleryRef);
                  setIsOpen(false);
                }}
              >
                Galerie
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                  scrollToSection(refs.shopRef);
                  setIsOpen(false);
                }}
              >
                Boutique
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                  scrollToSection(refs.trialRef);
                  setIsOpen(false);
                }}
              >
                Cours d'essai
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                  scrollToSection(refs.contactRef);
                  setIsOpen(false);
                }}
              >
                Contact
              </div>
              <button
                className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors"
                onClick={() => {
                  scrollToSection(refs.registrationRef);
                  setIsOpen(false);
                }}
              >
                S'inscrire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
