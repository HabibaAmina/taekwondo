import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCheck, FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import emailjs from 'emailjs-com';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerInfo {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  club: string;
}

// Club options
const CLUBS = [
  { id: 'villebon', name: 'ATP Villebon-sur-Yvette' },
  { id: 'palaiseau', name: 'ATP Palaiseau' },
  { id: 'longjumeau', name: 'ATP Longjumeau' },
  { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse' },
  { id: 'magny', name: 'ATP Magny-les-Hameaux' },
  { id: 'ulis', name: 'ATP Les Ulis' },
];

const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Customer Info, 3: Summary
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    club: '',
  });
  const [orderCompleted, setOrderCompleted] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        
        // Calculate total count
        const count = parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
        setCartCount(count);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);
  
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);
  
  // Handle clicks outside cart to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Add item to cart (event listener)
  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent;
      const item = customEvent.detail;
      
      if (item && item.id) {
        addToCart(item);
        setIsOpen(true); // Open cart when item is added
      }
    };
    
    window.addEventListener('add-to-cart', handleAddToCart);
    return () => {
      window.removeEventListener('add-to-cart', handleAddToCart);
    };
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Update item quantity
  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalPrice = calculateTotal();
  
  // Toggle cart visibility
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // Handle customer info input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Go to next step
  const goToNextStep = () => {
    setCheckoutStep(prev => prev + 1);
  };

  // Go to previous step
  const goToPreviousStep = () => {
    setCheckoutStep(prev => Math.max(1, prev - 1));
  };

  // Validate customer info form
  const validateCustomerInfo = () => {
    return (
      customerInfo.fullName.trim() !== '' &&
      customerInfo.birthDate.trim() !== '' &&
      customerInfo.phone.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      customerInfo.club.trim() !== ''
    );
  };

  // Complete order and send email
  const completeOrder = async () => {
    // Get selected club name
    const selectedClub = CLUBS.find(club => club.id === customerInfo.club);
    const clubName = selectedClub ? selectedClub.name : customerInfo.club;
    
    // Prepare email template parameters
    const orderItemsDetailed = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    // const orderItemsText = orderItemsDetailed.map(item => 
    //   `${item.name}\n- Quantité : ${item.quantity}\n- Prix unitaire : ${item.price.toFixed(2)}€\n- Total : ${item.total.toFixed(2)}€`
    // ).join('\n\n');

    // const orderItemsTable = orderItemsDetailed.map(item => 
    //   `| ${item.name} | ${item.quantity} | ${item.price.toFixed(2)}€ | ${item.total.toFixed(2)}€ |`
    // ).join('\n');
    
    const commonParams = {
      // Informations client
      from_name: customerInfo.fullName,
      from_email: customerInfo.email,
      to_name: customerInfo.fullName,
      to_email: customerInfo.email,
      phone: customerInfo.phone,
      birth_date: customerInfo.birthDate,
      club: clubName,

      // Détails de la commande
      order_total: totalPrice.toFixed(2),
      products: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
        total: (item.price * item.quantity).toFixed(2),
        image: item.image || ''
      })),
      
      // Autres paramètres
      type_demande: 'Commande',
      subject: `Confirmation de commande - ${clubName}`,
      pickup_location: clubName, // Using clubName as pickup location
      payment_method: 'À régler au club',
      payment_status: 'En attente',
      
      // Flags
      isContact: false,
      isTrialClass: false,
      isRegistration: false,
      isShop: true,
      order_number: 'N/A', // Placeholder, replace with actual order number if available
      current_year: new Date().getFullYear()
    };

    try {
      // Envoi du message à l'administrateur
      await emailjs.send('gmail_id',
                'template_registration_admin',
        { ...commonParams, to_email: 'rafiachraf91@gmail.com' },
        'nDkQJ_atL4fh-A2KP'
      );
      
      // Envoi de la confirmation au client
      await emailjs.send('gmail_id',
                'template_registration_user',
        { ...commonParams, to_name: customerInfo.fullName, to_email: customerInfo.email },
        'nDkQJ_atL4fh-A2KP'
      );

      console.log('Emails sent successfully!');
      setOrderCompleted(true);
      
      // Clear cart after successful order
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to send email:', error);
      // For demo, still mark as completed
      setOrderCompleted(true);
      
      // Clear cart
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  // Reset checkout process
  const resetCheckout = () => {
    setCheckoutStep(1);
    setOrderCompleted(false);
    setCustomerInfo({
      fullName: '',
      birthDate: '',
      phone: '',
      email: '',
      club: '',
    });
    setIsOpen(false);
  };

  // Render cart items
  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FaShoppingCart className="text-4xl mb-2" />
          <p>Votre panier est vide</p>
        </div>
      );
    }
    
    return (
      <ul className="space-y-4">
        {cartItems.map(item => (
          <li key={item.id} className="flex border-b pb-4">
            {item.image && (
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="mx-2 text-sm">{item.quantity}</span>
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
                
                <button
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Render customer info form
  const renderCustomerInfoForm = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Vos informations</h3>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUser />
            </span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={customerInfo.fullName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              placeholder="Votre nom complet"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              placeholder="votre@email.com"
              required
            />
          </div>

        </div>
        
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaCalendarAlt />
            </span>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={customerInfo.birthDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaPhone />
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              placeholder="01 23 45 67 89"
              value={customerInfo.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="club" className="block text-sm font-medium text-gray-700 mb-1">
            Club
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaMapMarkerAlt />
            </span>
            <select
              id="club"
              name="club"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={customerInfo.club}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un club</option>
              {CLUBS.map(club => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  // Render order summary
  const renderOrderSummary = () => {
    const selectedClub = CLUBS.find(club => club.id === customerInfo.club);
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Récapitulatif de votre commande</h3>
        
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Articles</h4>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2 pt-2 border-t">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Vos informations</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Nom:</span>
              <div>{customerInfo.fullName}</div>
            </div>
            <div>
              <span className="text-gray-600">Date de naissance:</span>
              <div>{customerInfo.birthDate}</div>
            </div>
            <div>
              <span className="text-gray-600">Téléphone:</span>
              <div>{customerInfo.phone}</div>
            </div>
            <div>
              <span className="text-gray-600">Club:</span>
              <div>{selectedClub?.name}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          <h4 className="font-medium mb-2 flex items-center">
            <FaCheck className="mr-2" /> Instructions de paiement
          </h4>
          <p>
            ✅ Pour valider votre commande, merci de procéder au paiement au Club (espèces, chèque, ou ANCV).
          </p>
        </div>
      </div>
    );
  };

  // Render order complete confirmation
  const renderOrderComplete = () => {
    return (
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-green-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2">Commande envoyée !</h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre commande. Un email de confirmation a été envoyé avec les détails de votre commande et les instructions de paiement.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 mb-6">
          <p>
            ✅ Pour valider votre commande, merci de procéder au paiement au Club (espèces, chèque, ou ANCV).
          </p>
        </div>
        <button
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          onClick={resetCheckout}
        >
          Retour à la boutique
        </button>
      </div>
    );
  };
  
  return (
    <div className="fixed z-50">
      {/* Cart Icon */}
      <button 
        className="fixed bottom-6 right-6 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-secondary/90 transition-colors"
        onClick={toggleCart}
        aria-label="Shopping Cart"
      >
        <FaShoppingCart className="text-xl" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-adultes text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Cart panel */}
            <motion.div
              ref={cartRef}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Progress Bar (only show during checkout) */}
              {checkoutStep > 1 && !orderCompleted && (
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-secondary h-2 transition-all duration-300"
                    style={{ width: `${(checkoutStep - 1) * 50}%` }}
                  ></div>
                </div>
              )}
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold flex items-center">
                  {checkoutStep === 1 && (
                    <>
                      <FaShoppingCart className="mr-2" /> Panier
                    </>
                  )}
                  {checkoutStep === 2 && "Informations client"}
                  {checkoutStep === 3 && "Récapitulatif"}
                  {orderCompleted && "Commande confirmée"}
                </h2>
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {orderCompleted ? (
                  renderOrderComplete()
                ) : (
                  <>
                    {checkoutStep === 1 && renderCartItems()}
                    {checkoutStep === 2 && renderCustomerInfoForm()}
                    {checkoutStep === 3 && renderOrderSummary()}
                  </>
                )}
              </div>
              
              {/* Footer with action buttons */}
              {!orderCompleted && (
                <div className="p-4 border-t bg-gray-50">
                  {checkoutStep === 1 && (
                    <>
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">{totalPrice.toFixed(2)} €</span>
                      </div>
                      
                      <button
                        className="w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={goToNextStep}
                        disabled={cartItems.length === 0}
                      >
                        Continuer
                      </button>
                      
                      <button
                        className="w-full text-gray-500 py-2 mt-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Continuer mes achats
                      </button>
                    </>
                  )}
                  
                  {checkoutStep === 2 && (
                    <div className="flex gap-2">
                      <button
                        className="flex-1 border border-gray-300 py-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        onClick={goToPreviousStep}
                      >
                        <FaArrowLeft className="mr-2" /> Retour
                      </button>
                      
                      <button
                        className="flex-1 bg-secondary text-white py-3 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={goToNextStep}
                        disabled={!validateCustomerInfo()}
                      >
                        Continuer
                      </button>
                    </div>
                  )}
                  
                  {checkoutStep === 3 && (
                    <div className="flex gap-2">
                      <button
                        className="flex-1 border border-gray-300 py-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        onClick={goToPreviousStep}
                      >
                        <FaArrowLeft className="mr-2" /> Retour
                      </button>
                      
                      <button
                        className="flex-1 bg-secondary text-white py-3 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors"
                        onClick={completeOrder}
                      >
                        Confirmer la commande
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCart;
