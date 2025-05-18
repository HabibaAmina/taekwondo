import { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaIdCard, FaFileMedical, FaHome, FaMoneyBillWave } from 'react-icons/fa';

const RegistrationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    club: '',
    courseType: '',
    acceptTerms: false,
  });

  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      const selectedClubObj = clubs.find(club => club.id === formState.club);
      const selectedCourseObj = courseTypes.find(course => course.id === formState.courseType);
      
      try {
        // Envoi du message à l'administrateur
        await emailjs.send('gmail_id',
          'contact_id_admin',
          {
            from_name: `${formState.firstName} ${formState.lastName}`,
            from_email: formState.email,
            to_email: 'rafiachraf91@gmail.com',
            phone: formState.phone,
            birth_date: formState.birthDate,
            club: selectedClubObj ? selectedClubObj.name : formState.club,
            course_type: selectedCourseObj ? selectedCourseObj.name : formState.courseType,
            type_demande: 'Inscription'
          },
          'nDkQJ_atL4fh-A2KP'
        );
        
        // Envoi de la confirmation au client
        await emailjs.send('gmail_id',
          'contact_id_user',
          {
            to_name: `${formState.firstName} ${formState.lastName}`,
            to_email: formState.email,
            club: selectedClubObj ? selectedClubObj.name : formState.club,
            course_type: selectedCourseObj ? selectedCourseObj.name : formState.courseType
          },
          'nDkQJ_atL4fh-A2KP'
        );
        
        setSubmitted(true);
      } catch (error) {
        console.error('Failed to send email:', error);
        setSubmitted(true);
      }
    }
};

  // Go back to previous step
  const handleBack = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  // Club options
  const clubs = [
    { id: 'villebon', name: 'ATP Villebon-sur-Yvette' },
    { id: 'palaiseau', name: 'ATP Palaiseau' },
    { id: 'longjumeau', name: 'ATP Longjumeau' },
    { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse' },
    { id: 'magny', name: 'ATP Magny-les-Hameaux' },
    { id: 'ulis', name: 'ATP Les Ulis' },
  ];

  // Course type options
  const courseTypes = [
    { id: 'baby', name: 'Baby Taekwondo (3-6 ans)', color: 'baby' },
    { id: 'enfants', name: 'Enfants (7-12 ans)', color: 'enfants' },
    { id: 'ados', name: 'Adolescents (13-17 ans)', color: 'ados' },
    { id: 'adultes', name: 'Adultes (18 ans et +)', color: 'adultes' },
  ];

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
    <section className="py-20 bg-primary text-white" id="registration">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Inscription</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Rejoignez l'Académie de Taekwondo Pluriel et commencez votre parcours vers l'excellence. 
            Remplissez le formulaire ci-dessous pour vous inscrire à nos cours.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!submitted ? (
                <motion.div
                  className="bg-white text-primary rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 h-2">
                    <div 
                      className="bg-secondary h-2 transition-all duration-300"
                      style={{ width: `${(formStep + 1) * 33.33}%` }}
                    ></div>
                  </div>
                  
                  {/* Form header */}
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">
                      {formStep === 0 && "Informations personnelles"}
                      {formStep === 1 && "Choix du club"}
                      {formStep === 2 && "Type de cours"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Étape {formStep + 1} sur 3
                    </p>
                  </div>
                  
                  {/* Form content */}
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      {/* Step 1: Personal Information */}
                      {formStep === 0 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  <FaUserAlt />
                                </span>
                                <input
                                  type="text"
                                  id="firstName"
                                  name="firstName"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                  placeholder="Votre prénom"
                                  value={formState.firstName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  <FaUserAlt />
                                </span>
                                <input
                                  type="text"
                                  id="lastName"
                                  name="lastName"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                  placeholder="Votre nom"
                                  value={formState.lastName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaEnvelope />
                              </span>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                placeholder="votre.email@exemple.com"
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaPhone />
                              </span>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                placeholder="Votre numéro de téléphone"
                                value={formState.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaCalendarAlt />
                              </span>
                              <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                value={formState.birthDate}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                      
                      {/* Step 2: Club Selection */}
                      {formStep === 1 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
                            Sélectionnez le club que vous souhaitez rejoindre:
                          </motion.p>
                          
                          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clubs.map((club) => (
                              <div 
                                key={club.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formState.club === club.id 
                                    ? 'border-secondary bg-secondary/10' 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => setFormState({...formState, club: club.id})}
                              >
                                <div className="flex items-center">
                                  <div className={`mr-3 ${formState.club === club.id ? 'text-secondary' : 'text-gray-400'}`}>
                                    <FaMapMarkerAlt className="text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{club.name}</h4>
                                  </div>
                                  {formState.club === club.id && (
                                    <FaCheckCircle className="ml-auto text-secondary" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                      
                      {/* Step 3: Course Type */}
                      {formStep === 2 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
                            Choisissez le type de cours qui vous convient:
                          </motion.p>
                          
                          <motion.div variants={itemVariants} className="space-y-3">
                            {courseTypes.map((course) => (
                              <div 
                                key={course.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formState.courseType === course.id 
                                    ? `border-${course.color} bg-${course.color}/10` 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => setFormState({...formState, courseType: course.id})}
                              >
                                <div className="flex items-center">
                                  <div className={`w-4 h-4 rounded-full mr-3 bg-${course.color}`}></div>
                                  <div>
                                    <h4 className="font-medium">{course.name}</h4>
                                  </div>
                                  {formState.courseType === course.id && (
                                    <FaCheckCircle className={`ml-auto text-${course.color}`} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                          
                          <motion.div variants={itemVariants} className="mt-6">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="acceptTerms"
                                className="rounded border-gray-300 text-secondary focus:ring-secondary h-5 w-5"
                                checked={formState.acceptTerms}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                J'accepte les termes et conditions et la politique de confidentialité
                              </span>
                            </label>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Form footer */}
                    <div className="px-6 py-4 bg-gray-50 flex justify-between">
                      {formStep > 0 ? (
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={handleBack}
                        >
                          Retour
                        </button>
                      ) : (
                        <div></div>
                      )}
                      
                      <button
                        type="submit"
                        className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                      >
                        {formStep < 2 ? "Continuer" : "S'inscrire"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center bg-white text-primary rounded-lg shadow-lg p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Inscription réussie!</h3>
                  <p className="text-gray-600 mb-4">
                    Merci {formState.firstName} pour votre inscription. Nous avons envoyé un email de confirmation à {formState.email}.
                    Notre équipe vous contactera prochainement pour finaliser votre inscription.
                  </p>
                  <div className="text-sm text-secondary mb-6 p-3 bg-secondary/10 rounded-lg">
                    Vérifiez votre boîte de réception (et éventuellement vos spams) pour retrouver l'email de confirmation avec tous les détails sur votre inscription.
                  </div>
                  <button
                    className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                    onClick={() => {
                      setSubmitted(false);
                      setFormStep(0);
                      setFormState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        birthDate: '',
                        club: '',
                        courseType: '',
                        acceptTerms: false,
                      });
                    }}
                  >
                    Nouvelle inscription
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Required Documents Information Block */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gradient-to-br from-secondary/90 to-secondary rounded-lg shadow-lg p-6 text-white h-full"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">À l'issue de votre cours d'essai</h3>
                <p className="mb-6 text-white/90">
                  Pour finaliser votre inscription après votre cours d'essai, merci de préparer les documents suivants:
                </p>
                
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaIdCard className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pièce d'identité</h4>
                      <p className="text-sm text-white/80">Carte d'identité, passeport ou livret de famille pour les mineurs</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaFileMedical className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Certificat médical</h4>
                      <p className="text-sm text-white/80">De moins de 3 mois mentionnant l'aptitude à la pratique du Taekwondo</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaHome className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Justificatif de domicile</h4>
                      <p className="text-sm text-white/80">Facture d'électricité, de gaz ou quittance de loyer</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaMoneyBillWave className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Règlement</h4>
                      <p className="text-sm text-white/80">Par chèque, espèces ou carte bancaire</p>
                    </div>
                  </motion.li>
                </motion.ul>
                
                <motion.div 
                  className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20"
                  variants={itemVariants}
                >
                  <p className="text-sm font-medium">
                    ⚠️ Important: Pour les mineurs, la présence d'un parent ou tuteur légal est obligatoire lors de l'inscription.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
