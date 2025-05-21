import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FaqSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // FAQ questions and answers
  const faqs = [
    {
      id: 1,
      question: "À partir de quel âge peut-on pratiquer le taekwondo ?",
      answer: "Nous accueillons les enfants à partir de 3 ans dans notre programme Baby Taekwondo, spécialement conçu pour développer la motricité et la coordination de façon ludique. Nous proposons ensuite des cours adaptés à chaque tranche d'âge, avec des méthodes pédagogiques appropriées au développement physique et mental de l'élève."
    },
    {
      id: 2,
      question: "Faut-il être souple ou sportif pour commencer le taekwondo ?",
      answer: "Absolument pas ! Le taekwondo est accessible à tous, quel que soit votre niveau de forme physique initial. La souplesse et la condition physique s'acquièrent progressivement avec la pratique. Nos instructeurs adaptent les exercices en fonction de vos capacités pour vous permettre de progresser à votre rythme."
    },
    {
      id: 3,
      question: "Quelle est la différence entre le taekwondo et les autres arts martiaux ?",
      answer: "Le taekwondo se distingue par l'importance accordée aux techniques de jambes, avec des coups de pied spectaculaires et dynamiques. C'est un art martial coréen reconnu aux Jeux Olympiques depuis 2000. Il combine aspects sportifs, self-défense et développement personnel dans une pratique complète qui sollicite l'ensemble du corps."
    },
    {
      id: 4,
      question: "Combien de temps faut-il pour obtenir une ceinture noire ?",
      answer: "En moyenne, il faut entre 3 et 5 ans d'entraînement régulier pour atteindre le niveau de ceinture noire (1er dan). Cela dépend de votre assiduité, de votre capacité d'apprentissage et de votre engagement dans la pratique. Chaque passage de grade est validé par un examen qui évalue les techniques, les formes (poomsae) et éventuellement le combat."
    },
    {
      id: 5,
      question: "Quels équipements sont nécessaires pour pratiquer ?",
      answer: "Pour débuter, vous aurez besoin d'un dobok (tenue de taekwondo) avec ceinture. Pour les cours avec combat, des protections sont nécessaires : protège-dents, protège-tibias, protège-avant-bras, protège-pieds, coquille, plastron et casque. Notre académie propose ces équipements à l'achat dans notre boutique, et certaines protections sont prêtées lors des premiers mois de pratique."
    },
    {
      id: 6,
      question: "Le taekwondo est-il dangereux ?",
      answer: "Comme tout sport, le taekwondo comporte un risque de blessure, mais nos instructeurs mettent l'accent sur la sécurité et le contrôle. Les débutants apprennent d'abord les techniques sans contact avant de progresser vers des exercices avec partenaire. L'utilisation de protections adaptées et le respect des consignes de sécurité permettent une pratique sereine pour tous les âges."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Questions Fréquentes</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur la pratique du taekwondo ou sur notre académie ? 
            Consultez nos réponses aux questions les plus fréquentes.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-secondary" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              
              <motion.div
                className="px-6 overflow-hidden bg-gray-50"
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="py-4 text-gray-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
