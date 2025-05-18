import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
interface HeroSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    coursesRef: React.RefObject<HTMLDivElement>;
    clubsRef: React.RefObject<HTMLDivElement>;
    registrationRef: React.RefObject<HTMLDivElement>;
  };
}
const HeroSection = ({
  scrollToSection,
  refs
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Play videos when component mounts
    const playVideos = async () => {
      try {
        // Try to play the first video
        if (videoRef.current) {
          await videoRef.current.play();
        }

        // Try to play the second video
        if (videoRef2.current) {
          await videoRef2.current.play();
        }
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };
    playVideos();

    // Add event listeners for when videos can play
    const handleCanPlay = (video: HTMLVideoElement) => {
      video.play().catch(e => console.log("Play failed after canplay:", e));
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', () => handleCanPlay(videoRef.current!));
    }
    if (videoRef2.current) {
      videoRef2.current.addEventListener('canplay', () => handleCanPlay(videoRef2.current!));
    }
    return () => {
      // Clean up event listeners
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplay', () => handleCanPlay(videoRef.current!));
      }
      if (videoRef2.current) {
        videoRef2.current.removeEventListener('canplay', () => handleCanPlay(videoRef2.current!));
      }
    };
  }, []);
  return <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div className="w-full h-full" initial={{
        opacity: 0
      }} animate={{
        opacity: 1,
        transition: {
          duration: 1
        }
      }}>
          {/* Hero Carousel */}
          <div className="relative w-full h-full">
            <motion.div className="absolute inset-0 flex" animate={{
            x: [0, '-300%']
          }} transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}>
              {/* Slide 1: Video */}
              <div className="min-w-full h-full relative flex-shrink-0">
                <video ref={videoRef} className="w-full h-full object-cover" muted loop playsInline preload="auto">
                  <source src="https://videos.pexels.com/video-files/6005335/6005335-hd_1920_1080_25fps.mp4" type="video/mp4" />
                  <source src="https://media.istockphoto.com/id/1678602046/fr/vid%C3%A9o/entra%C3%AEnement-de-karat%C3%A9-enfants-de-diff%C3%A9rents-%C3%A2ges-en-kimono.mp4?s=mp4-480x480-is&k=20&c=XyIQNYkH0BtNS_fwnrCSqhZehX46N8OdmWjwqHlJ83M=" type="video/mp4" />
                </video>
              </div>
              
              {/* Slide 2: Image */}
              <div className="min-w-full h-full relative flex-shrink-0">
                <img src="https://media.istockphoto.com/id/1142171010/fr/photo/groupe-denfants-caucasiens-sportifs-dans-des-doboks-ayant-la-classe-de-taekwondo-dans-la.jpg?b=1&s=612x612&w=0&k=20&c=O3VlG_urHr0FsS5DHJH8BSb07nH_tFGHq8X4XenTU2g=" alt="Taekwondo competition" className="w-full h-full object-cover" loading="eager" />
              </div>
              
              {/* Slide 3: Video */}
              <div className="min-w-full h-full relative flex-shrink-0">
                <video ref={videoRef2} className="w-full h-full object-cover" muted loop playsInline preload="auto">
                  <source src="https://media.istockphoto.com/id/1678315078/fr/vid%C3%A9o/entra%C3%AEnement-de-karat%C3%A9-enfants-de-diff%C3%A9rents-%C3%A2ges-en-kimono.mp4?s=mp4-640x640-is&k=20&c=S5zd5lPP4JolioCMevu_v1FvXVGGiKCtX3moKQcK3EQ=" type="video/mp4" />
                </video>
              </div>
              
              {/* Slide 4: Image */}
              <div className="min-w-full h-full relative flex-shrink-0">
                <img src="https://images.pexels.com/photos/30788999/pexels-photo-30788999.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Taekwondo belt ceremony" className="w-full h-full object-cover" loading="eager" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-primary/20"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1 className="text-4xl md:text-6xl font-display font-bold mb-4" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>Académie de Taekwondo Pluriel</motion.h1>
        
        <motion.div className="overflow-hidden h-12 md:h-16 mb-8" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 1
      }}>
          <motion.p className="text-xl md:text-2xl font-light" animate={{
          y: [50, 0, 0, -50]
        }} transition={{
          times: [0, 0.1, 0.9, 1],
          duration: 8,
          repeat: Infinity,
          repeatDelay: 1
        }}>
            Développez force et discipline
          </motion.p>
          <motion.p className="text-xl md:text-2xl font-light" animate={{
          y: [50, 0, 0, -50]
        }} transition={{
          times: [0, 0.1, 0.9, 1],
          duration: 8,
          repeat: Infinity,
          repeatDelay: 1,
          delay: 2
        }}>
            Grandissez en confiance
          </motion.p>
          <motion.p className="text-xl md:text-2xl font-light" animate={{
          y: [50, 0, 0, -50]
        }} transition={{
          times: [0, 0.1, 0.9, 1],
          duration: 8,
          repeat: Infinity,
          repeatDelay: 1,
          delay: 4
        }}>
            Rejoignez notre communauté
          </motion.p>
        </motion.div>
        
        <motion.div className="flex flex-col md:flex-row gap-4 justify-center mt-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8,
        duration: 0.5
      }}>
          <button className="bg-enfants hover:bg-enfants/90 text-white px-6 py-3 rounded-full font-medium transition-colors" onClick={() => scrollToSection(refs.coursesRef)}>
            Nos Cours
          </button>
          
          <button className="bg-ados hover:bg-ados/90 text-white px-6 py-3 rounded-full font-medium transition-colors" onClick={() => scrollToSection(refs.clubsRef)}>
            Nos Clubs
          </button>
          
          <button className="bg-adultes hover:bg-adultes/90 text-white px-6 py-3 rounded-full font-medium transition-colors" onClick={() => scrollToSection(refs.registrationRef)}>
            Inscription
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer text-white" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.5,
      duration: 0.5
    }} onClick={() => scrollToSection(refs.coursesRef)}>
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <FaArrowDown className="text-2xl" />
        </motion.div>
      </motion.div>
    </div>;
};
export default HeroSection;