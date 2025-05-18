import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShoppingCart } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  category: string;
  rating: number;
  description: string;
  badge?: string;
}

const ShopSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Product data
  const products: Product[] = [
    {
      id: 1,
      name: "Dobok Taekwondo Adidas",
      image: "https://www.daedo.com/3643-thickbox_default/peto-electr%C3%B3nico-gen2-sin-transmisor.jpg",
      price: 79.99,
      category: "uniforms",
      rating: 4.5,
      description: "Dobok officiel Adidas pour la pratique du taekwondo. Col en V. Tissu léger et respirant.",
      badge: "Populaire"
    },
    {
      id: 2,
      name: "Protège-tibias et pieds",
      image: "https://www.ipponstar.com/boutique/2475-large_default/dobok-adidas-contest-col-noir-rouge.jpg",
      price: 45.99,
      discountPrice: 39.99,
      category: "protections",
      rating: 4,
      description: "Protections complètes pour tibias et pieds. Mousse haute densité. Fermeture par velcro.",
      badge: "Promo"
    },
    {
      id: 3,
      name: "Ceinture noire brodée",
      image: "https://contents.mediadecathlon.com/m13382240/k$27e1289a1053c2d2151e19680899c2a9/sq/mitaines-de-combat-taekwondo.jpg?format=auto&f=1200x1200",
      price: 24.99,
      category: "accessories",
      rating: 5,
      description: "Ceinture noire de qualité supérieure. Broderie personnalisée avec votre nom et celui du club."
    },
    {
      id: 4,
      name: "Mitaines de combat",
      image: "https://m.media-amazon.com/images/I/61+wKE4L-zL._AC_SL1001_.jpg",
      price: 29.99,
      category: "protections",
      rating: 4.5,
      description: "Mitaines rembourrées pour la pratique du combat. Protection des articulations. Légères et confortables."
    },
    {
      id: 5,
      name: "Sac de frappe",
      image: "https://www.ipponstar.com/boutique/2475-large_default/dobok-adidas-contest-col-noir-rouge.jpg",
      price: 129.99,
      discountPrice: 99.99,
      category: "accessories",
      rating: 4,
      description: "Sac de frappe robuste pour l'entraînement à domicile. Hauteur 120cm. Livré avec support.",
      badge: "Promo"
    },
    {
      id: 6,
      name: "Casque de protection",
      image: "https://www.dragonsports.eu/361301-verylarge_default/ceinture-noire-largeur-4-et-5cm-brodee-taekwondo.jpg",
      price: 54.99,
      category: "protections",
      rating: 3.5,
      description: "Casque de protection homologué pour les compétitions. Protection complète de la tête."
    },
    {
      id: 7,
      name: "Dobok enfant",
      image: "https://www.dragonsports.eu/440084-verylarge_default/sac-de-sport-90l-evolution-kwon.jpg",
      price: 59.99,
      category: "uniforms",
      rating: 4,
      description: "Dobok pour enfants de 4 à 12 ans. Tissu résistant et confortable. Col en V blanc."
    },
    {
      id: 8,
      name: "Plastron électronique",
      image: "https://www.daedo.com/3643-thickbox_default/peto-electr%C3%B3nico-gen2-sin-transmisor.jpg",
      price: 199.99,
      category: "protections",
      rating: 5,
      description: "Plastron électronique pour compétition. Conforme aux normes internationales. Bluetooth intégré.",
      badge: "Nouveau"
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'uniforms', name: 'Doboks' },
    { id: 'protections', name: 'Protections' },
    { id: 'accessories', name: 'Accessoires' }
  ];

  // Filtered products
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Add to cart function
  const addToCart = (product: Product) => {
    // Create cart item from product
    const cartItem = {
      id: String(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.image
    };
    
    // Create and dispatch a custom event for adding to cart
    const addToCartEvent = new CustomEvent('add-to-cart', { 
      detail: cartItem
    });
    
    window.dispatchEvent(addToCartEvent);
    
    // Visual feedback
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('bg-green-500');
      button.textContent = 'Ajouté ✓';
      setTimeout(() => {
        button.classList.remove('bg-green-500');
        button.innerHTML = '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>Ajouter';
      }, 1500);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="py-20 bg-background" id="shop">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Notre Boutique</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection d'équipements et accessoires de taekwondo de qualité pour tous les niveaux. 
            Livraison gratuite dans nos clubs.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-secondary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div 
                className="relative cursor-pointer" 
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">Voir le produit</span>
                </div>
                {product.badge && (
                  <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${
                    product.badge === 'Promo' ? 'bg-adultes' : 
                    product.badge === 'Nouveau' ? 'bg-ados' : 'bg-secondary'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                
                <div className="mt-2 mb-4">
                  {product.discountPrice ? (
                    <div className="flex items-center">
                      <span className="text-adultes font-bold text-lg">{product.discountPrice.toFixed(2)} €</span>
                      <span className="ml-2 text-gray-400 line-through text-sm">{product.price.toFixed(2)} €</span>
                    </div>
                  ) : (
                    <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    id={`add-to-cart-${product.id}`}
                    className="flex-1 bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition-colors flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <FaShoppingCart className="mr-2" />
                    Ajouter
                  </button>
                  <button
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Product modal */}
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.badge && (
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${
                      selectedProduct.badge === 'Promo' ? 'bg-adultes' : 
                      selectedProduct.badge === 'Nouveau' ? 'bg-ados' : 'bg-secondary'
                    }`}>
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h3>
                  
                  <div className="my-4">
                    {selectedProduct.discountPrice ? (
                      <div className="flex items-center">
                        <span className="text-adultes font-bold text-2xl">{selectedProduct.discountPrice.toFixed(2)} €</span>
                        <span className="ml-2 text-gray-400 line-through">{selectedProduct.price.toFixed(2)} €</span>
                      </div>
                    ) : (
                      <span className="font-bold text-2xl">{selectedProduct.price.toFixed(2)} €</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  
                  <button
                    className="w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center hover:bg-secondary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    <FaShoppingCart className="mr-2" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
