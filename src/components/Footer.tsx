import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

interface FooterProps {
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

const Footer = ({ scrollToSection, refs }: FooterProps) => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="mb-6 flex items-center">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6">
              L'Académie de Taekwondo Pluriel vous accueille dans ses 6 clubs en France pour vous initier à l'art martial coréen.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.coursesRef)}
                >
                  Nos Cours
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.clubsRef)}
                >
                  Nos Clubs
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.galleryRef)}
                >
                  Galerie
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.shopRef)}
                >
                  Boutique
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.registrationRef)}
                >
                  Inscription
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection(refs.trialRef)}
                >
                  Cours d'essai
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-secondary" /> 
                <span className="text-gray-300">12 Avenue des Sports, 75001 Paris</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-secondary" /> 
                <span className="text-gray-300">01 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-secondary" /> 
                <span className="text-gray-300">videoiaticktock@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Horaires Siège</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Lundi - Vendredi: 10h - 19h</li>
              <li>Samedi: 10h - 18h</li>
              <li>Dimanche: Fermé</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Académie de Taekwondo Pluriel - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
