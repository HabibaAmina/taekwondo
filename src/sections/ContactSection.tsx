import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
        // Envoi du message à l'administrateur avec le template générique
        await emailjs.send('gmail_id',
          'contact_id_admin',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'rafiachraf91@gmail.com',
            type_demande: 'Contact',
            // Champs additionnels pour le template générique
            phone: '', // Champ vide pour le contact
            birth_date: '', // Champ vide pour le contact
            club: '', // Champ vide pour le contact
            course_type: '' // Champ vide pour le contact
          },
          'nDkQJ_atL4fh-A2KP'
        );
        
        // Envoi de la confirmation au client avec le template générique
        await emailjs.send('gmail_id',
          'contact_id_user',
          {
            to_name: formData.name,
            to_email: formData.email,
            subject: `Re: ${formData.subject}`,
            message: `Cher(e) ${formData.name},

Nous avons bien reçu votre message et nous vous en remercions.

Notre équipe va traiter votre demande dans les plus brefs délais et vous répondra rapidement.

Rappel de votre message :
${formData.message}

Cordialement,
L'équipe de l'Académie de Taekwondo Pluriel`
          },
          'nDkQJ_atL4fh-A2KP'
        );

      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        message: 'Votre message a été envoyé avec succès !'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      });
    }
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Contactez-nous</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une question ? Un besoin d'information ? N'hésitez pas à nous contacter. Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre Nom et Votre Prénom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Votre message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${status.submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
              >
                {status.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status.submitted && (
                <div className={`mt-4 p-4 rounded-lg flex items-center ${status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.success ? (
                    <FaCheckCircle className="flex-shrink-0 mr-2" />
                  ) : (
                    <FaExclamationCircle className="flex-shrink-0 mr-2" />
                  )}
                  <p>{status.message}</p>
                </div>
              )}
            </form>
          </motion.div>

          <motion.div
            className="bg-primary text-white rounded-lg shadow-md p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FaEnvelope className="text-2xl text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-300">videoiaticktock@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FaPhone className="text-2xl text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Téléphone</h4>
                  <p className="text-gray-300">+33 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Adresse</h4>
                  <p className="text-gray-300">
                    123 Rue du Taekwondo<br />
                    75000 Paris, France
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/10 rounded-lg">
              <h4 className="font-medium mb-4">Horaires d'ouverture</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Lundi - Vendredi: 9h00 - 20h00</li>
                <li>Samedi: 10h00 - 18h00</li>
                <li>Dimanche: Fermé</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;