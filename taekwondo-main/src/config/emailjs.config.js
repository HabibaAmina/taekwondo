// Configuration EmailJS
export const emailjsConfig = {
    publicKey: 'QccHq6PD1Uo3jsZHm',
    adminEmail: 'zineb2019achraf@gmail.com',
    serviceId: 'service_id_gmail',
    templates: {
        user: 'user',
        admin: 'admin'
    }
};

// Initialisation d'EmailJS
import emailjs from '@emailjs/browser';
emailjs.init(emailjsConfig.publicKey);