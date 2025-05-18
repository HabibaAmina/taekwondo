import { motion } from 'framer-motion';
import { FaShoppingBag, FaUserPlus, FaCalendarCheck } from 'react-icons/fa';

interface SocialProofNotificationProps {
  name: string;
  action: string;
  location: string;
}

const SocialProofNotification = ({ name, action, location }: SocialProofNotificationProps) => {
  // Choose icon based on action type
  const getIcon = () => {
    if (action.includes('acheter')) {
      return <FaShoppingBag className="text-white" />;
    } else if (action.includes('inscrire')) {
      return <FaUserPlus className="text-white" />;
    } else {
      return <FaCalendarCheck className="text-white" />;
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden z-40 flex items-center max-w-sm"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-secondary p-3">
        {getIcon()}
      </div>
      <div className="p-3">
        <p className="text-sm">
          <span className="font-medium">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{location} • à l'instant</p>
      </div>
    </motion.div>
  );
};

export default SocialProofNotification;
