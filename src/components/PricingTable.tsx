import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PricingData {
  club: string;
  groups: Array<{
    age: string;
    schedule: string[];
    location: string;
    price: number;
    isExtra?: boolean;  // Ajout de la propriété optionnelle isExtra
  }>;
}

const pricingData: PricingData[] = [
  {
    club: 'ATP Villebon-sur-Yvette',
    groups: [
      {
        age: 'Baby TKD (3-5 ans)',
        schedule: ['Lundi 17h-18h'],
        location: '12 Rue des Sports, 91140 Villebon-sur-Yvette',
        price: 185
      },
      {
        age: 'Enfants (6-9 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 17h-19h'],
        location: '12 Rue des Sports, 91140 Villebon-sur-Yvette',
        price: 225
      },
      {
        age: 'Ados (10-17 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 18h-19h'],
        location: '12 Rue des Sports, 91140 Villebon-sur-Yvette',
        price: 245
      },
      {
        age: 'Compétiteurs',
        schedule: ['Uniquement sur sélection (Samedi 18h-20h)'],
        location: '12 Rue des Sports, 91140 Villebon-sur-Yvette',
        price: 95,
        isExtra: true
      }
    ]
  },
  {
    club: 'ATP Longjumeau',
    groups: [
      {
        age: 'Baby TKD (3-5 ans)',
        schedule: ['Lundi 17h-18h'],
        location: '78 Boulevard du Taekwondo, 91160 Longjumeau',
        price: 185
      },
      {
        age: 'Enfants (6-9 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 17h-19h'],
        location: '78 Boulevard du Taekwondo, 91160 Longjumeau',
        price: 225
      },
      {
        age: 'Ados (10-17 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 18h-19h'],
        location: '78 Boulevard du Taekwondo, 91160 Longjumeau',
        price: 245
      },
      {
        age: 'Compétiteurs',
        schedule: ['Uniquement sur sélection (Samedi 18h-20h)'],
        location: '78 Boulevard du Taekwondo, 91160 Longjumeau',
        price: 95,
        isExtra: true
      }
    ]
  },
  {
    club: 'ATP Saint-Rémy-lès-Chevreuse',
    groups: [
      {
        age: 'Baby TKD (3-5 ans)',
        schedule: ['Lundi 17h-18h'],
        location: '23 Rue du Combat, 78470 Saint-Rémy-lès-Chevreuse',
        price: 185
      },
      {
        age: 'Enfants (6-9 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 17h-19h'],
        location: '23 Rue du Combat, 78470 Saint-Rémy-lès-Chevreuse',
        price: 225
      },
      {
        age: 'Ados (10-17 ans)',
        schedule: ['Lundi 18h-19h', 'Jeudi 18h-19h'],
        location: '23 Rue du Combat, 78470 Saint-Rémy-lès-Chevreuse',
        price: 245
      },
      {
        age: 'Compétiteurs',
        schedule: ['Uniquement sur sélection (Samedi 18h-20h)'],
        location: '23 Rue du Combat, 78470 Saint-Rémy-lès-Chevreuse',
        price: 95,
        isExtra: true
      }
    ]
  },
  {
    club: 'ATP Les Ulis',
    groups: [
      {
        age: 'Baby TKD 3 ans',
        schedule: ['Samedi 09h30-10h20'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 185
      },
      {
        age: 'Baby TKD 4 ans',
        schedule: ['Samedi 10h25-11h20'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 185
      },
      {
        age: 'Enfants 5/6 ans',
        schedule: ['Mercredi 17h15-18h15', 'Samedi 11h25-12h25'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 225
      },
      {
        age: 'Enfants 7/8 ans',
        schedule: ['Mercredi 18h15-19h15', 'Samedi 14h00-15h00'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 225
      },
      {
        age: 'Enfants 9/10 ans',
        schedule: ['Mardi 18h15-19h15', 'Samedi 15h00-16h00'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 225
      },
      {
        age: 'Ados 11/16 ans',
        schedule: ['Mercredi 19h15-20h15', 'Samedi 15h-16h'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 245
      },
      {
        age: 'Adulte +16 ans',
        schedule: ['Mardi 20h30-22h00', 'Jeudi 20h30-22h00'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 265
      },
      {
        age: 'Compétiteurs',
        schedule: ['Uniquement sur sélection (Dimanche 14h30-17h30)'],
        location: '34 Rue des Champions, 91940 Les Ulis',
        price: 95,
        isExtra: true
      }
    ]
  }
];

const PricingTable = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="space-y-8"
    >
      {pricingData.map((club, clubIndex) => (
        <motion.div
          key={clubIndex}
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-primary text-white p-4">
            <h3 className="text-xl font-bold">{club.club}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Âge</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Horaires</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Lieu</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tarifs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {club.groups.map((group, groupIndex) => (
                  <motion.tr
                    key={groupIndex}
                    variants={itemVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">{group.age}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {group.schedule.map((time, index) => (
                        <div key={index}>{time}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{group.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {group.isExtra ? `+${group.price} €` : `${group.price} €`}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PricingTable;