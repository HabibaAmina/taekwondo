// Service de gestion des emails avec EmailJS
class EmailService {
    constructor() {
        // Configuration des templates EmailJS
        this.templates = {
            contact: {
                user: 'template_user_unified', // ID du template unifié utilisateur
                admin: 'template_admin_unified', // ID du template unifié admin
                fields: ['from_name', 'from_email', 'subject', 'message'],
                emailParams: (params) => ({
                    ...params,
                    to_name: params.from_name,
                    to_email: params.from_email,
                    type_contact: true
                })
            },
            trial: {
                user: 'template_user_unified', // ID du template unifié utilisateur
                admin: 'template_admin_unified', // ID du template unifié admin
                fields: ['from_name', 'from_email', 'phone', 'birth_date', 'club', 'course_type', 'date', 'time'],
                emailParams: (params) => ({
                    ...params,
                    to_name: params.from_name,
                    to_email: params.from_email,
                    type_cours_essai: true
                })
            },
            registration: {
                user: 'template_user_unified', // ID du template unifié utilisateur
                admin: 'template_admin_unified', // ID du template unifié admin
                fields: ['from_name', 'from_email', 'phone', 'birth_date', 'club', 'course_type'],
                emailParams: (params) => ({
                    ...params,
                    to_name: params.from_name,
                    to_email: params.from_email,
                    type_inscription: true
                })
            }
        };
    }

    // Méthode pour construire les paramètres du template en fonction du type de formulaire
    buildTemplateParams(formData, formType) {
        const template = this.templates[formType];
        if (!template) {
            throw new Error(`Type de formulaire non reconnu: ${formType}`);
        }

        const params = {};
        template.fields.forEach(field => {
            params[field] = formData.get(field);
        });

        // Utilisation de la fonction emailParams spécifique au template
        return template.emailParams(params);
    }

    // Méthode pour envoyer les emails (utilisateur et admin)
    async sendEmails(formData, formType) {
        try {
            const template = this.templates[formType];
            if (!template) {
                throw new Error(`Type de formulaire non reconnu: ${formType}`);
            }

            const params = this.buildTemplateParams(formData, formType);

            // Envoi de l'email à l'utilisateur
            await emailjs.send(
                'gmail_id', // Remplacer par votre Service ID
                template.user,
                params
            );

            // Envoi de l'email à l'admin
            await emailjs.send(
                'gmail_id', // Remplacer par votre Service ID
                template.admin,
                params
            );

            return {
                success: true,
                message: 'Les emails ont été envoyés avec succès.'
            };
        } catch (error) {
            console.error('Erreur lors de l\'envoi des emails:', error);
            return {
                success: false,
                message: 'Une erreur est survenue lors de l\'envoi des emails.'
            };
        }
    }
}

// Gestionnaire d'événements pour les formulaires
document.addEventListener('DOMContentLoaded', () => {
    const emailService = new EmailService();

    // Gestion de la soumission des formulaires
    document.querySelectorAll('form[data-type]').forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formType = form.dataset.type; // 'contact', 'trial', ou 'registration'
            const formData = new FormData(form);

            // Affichage d'un message de chargement
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';

            try {
                const result = await emailService.sendEmails(formData, formType);

                // Affichage du message de succès ou d'erreur
                alert(result.message);

                if (result.success) {
                    form.reset(); // Réinitialisation du formulaire en cas de succès
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'envoi du formulaire.');
            } finally {
                // Restauration du bouton
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    });
});