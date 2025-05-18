import { useEffect, useState, useRef } from 'react';
import './index.css';

// Components
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';
import HeroSection from './sections/HeroSection';
import CoursesSection from './sections/CoursesSection';
import ClubsSection from './sections/ClubsSection';
import GallerySection from './sections/GallerySection';
import ShopSection from './sections/ShopSection';
import RegistrationSection from './sections/RegistrationSection';
import TrialSection from './sections/TrialSection';
import TestimonialsSection from './sections/TestimonialsSection';
import InfoGraphicsSection from './sections/InfoGraphicsSection';
import AboutUsSection from './sections/AboutUsSection';
import FaqSection from './sections/FaqSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import SocialProofNotification from './components/SocialProofNotification';

export function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({ name: '', action: '', location: '' });
  
  // Refs for scroll navigation
  const coursesRef = useRef<HTMLDivElement>(null);
  const clubsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);
  const trialRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Load fonts
  useEffect(() => {
    const montserratLink = document.createElement('link');
    montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
    montserratLink.rel = 'stylesheet';
    document.head.appendChild(montserratLink);

    const interLink = document.createElement('link');
    interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    interLink.rel = 'stylesheet';
    document.head.appendChild(interLink);

    return () => {
      document.head.removeChild(montserratLink);
      document.head.removeChild(interLink);
    };
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Random social proof notifications
  useEffect(() => {
    const notifications = [
      { name: 'Sophie M.', action: 'vient de s\'inscrire au cours Baby', location: 'Club de Les Ulis' },
      { name: 'Lucas K.', action: 'vient d\'acheter un dobok', location: 'Club de Longjumeau' },
      { name: 'Emma D.', action: 'vient de réserver un cours d\'essai', location: 'Club de Palaiseau' },
      { name: 'Thomas L.', action: 'vient de s\'inscrire au cours Adultes', location: 'Club de Saint-Remy' },
      { name: 'Chloé B.', action: 'vient d\'acheter des protections', location: 'Club de Magny' },
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setCurrentNotification(randomNotification);
        setShowNotification(true);
        
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to section handler
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-primary scroll-smooth">
      <Navbar 
        scrollY={scrollY}
        scrollToSection={scrollToSection}
        refs={{ coursesRef, clubsRef, galleryRef, shopRef, registrationRef, trialRef, contactRef }}
      />
      <main>
        <HeroSection 
          scrollToSection={scrollToSection} 
          refs={{ coursesRef, clubsRef, registrationRef }}
        />
        
        <AboutUsSection />
        
        <div ref={coursesRef}>
          <CoursesSection />
        </div>
        
        <div ref={clubsRef}>
          <ClubsSection trialRef={trialRef} scrollToSection={scrollToSection} />
        </div>
        
        <div ref={galleryRef}>
          <GallerySection />
        </div>
        
        <div ref={shopRef}>
          <ShopSection />
        </div>
        
        <TestimonialsSection />
        
        <InfoGraphicsSection />
        
        <div ref={trialRef}>
          <TrialSection />
        </div>
        
        <div ref={registrationRef}>
          <RegistrationSection />
        </div>
        
        <FaqSection />

        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      
      <Footer 
        scrollToSection={scrollToSection}
        refs={{ coursesRef, clubsRef, galleryRef, shopRef, registrationRef, trialRef, contactRef }}
      />
      
      <ShoppingCart />
      
      {showNotification && (
        <SocialProofNotification 
          name={currentNotification.name}
          action={currentNotification.action}
          location={currentNotification.location}
        />
      )}

      {/* Mobile fixed footer navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center z-40">
        <button
          className="p-3 flex flex-col items-center justify-center text-xs"
          onClick={() => scrollToSection(coursesRef)}
        >
          <span className="text-secondary text-lg mb-1">📚</span>
          <span>Cours</span>
        </button>
        <button
          className="p-3 flex flex-col items-center justify-center text-xs"
          onClick={() => scrollToSection(clubsRef)}
        >
          <span className="text-secondary text-lg mb-1">🏢</span>
          <span>Clubs</span>
        </button>
        <button
          className="p-3 flex flex-col items-center justify-center text-xs"
          onClick={() => scrollToSection(shopRef)}
        >
          <span className="text-secondary text-lg mb-1">🛒</span>
          <span>Boutique</span>
        </button>
        <button
          className="p-3 flex flex-col items-center justify-center text-xs"
          onClick={() => scrollToSection(registrationRef)}
        >
          <span className="text-secondary text-lg mb-1">✍️</span>
          <span>Inscription</span>
        </button>
      </div>
    </div>
  );
}

export default App;
