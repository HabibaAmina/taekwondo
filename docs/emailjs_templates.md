# Guide d'implémentation des Templates EmailJS avec Rendu Conditionnel

## Introduction

Ce document explique comment structurer les templates EmailJS pour le site de Taekwondo en utilisant le rendu conditionnel. Cette approche permet d'avoir un seul template par destinataire (administrateur/utilisateur) tout en affichant uniquement le contenu pertinent selon le type de formulaire soumis.

## Structure des Templates

### Template Administrateur Unifié (`template_admin_unified`)

Ce template doit être configuré dans le tableau de bord EmailJS avec les sections conditionnelles suivantes :

```html
<!-- Section commune à tous les types de messages -->
<h2>Nouvelle demande reçue</h2>
<p>Nom: {{from_name}}</p>
<p>Email: {{from_email}}</p>

<!-- Section pour les demandes de contact -->
{{#type_contact}}
<h3>Demande de contact</h3>
<p>Sujet: {{subject}}</p>
<p>Message:</p>
<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
  {{{message}}}
</div>
{{/type_contact}}

<!-- Section pour les demandes de cours d'essai -->
{{#type_cours_essai}}
<h3>Demande de cours d'essai</h3>
<p>Téléphone: {{phone}}</p>
<p>Date de naissance: {{birth_date}}</p>
<p>Club choisi: {{club}}</p>
<p>Type de cours: {{course_type}}</p>
<p>Date souhaitée: {{date}}</p>
<p>Horaire: {{time}}</p>
{{/type_cours_essai}}

<!-- Section pour les demandes d'inscription -->
{{#type_inscription}}
<h3>Demande d'inscription</h3>
<p>Téléphone: {{phone}}</p>
<p>Date de naissance: {{birth_date}}</p>
<p>Club choisi: {{club}}</p>
<p>Type de cours: {{course_type}}</p>
{{/type_inscription}}
```

### Template Utilisateur Unifié (`template_user_unified`)

Ce template doit être configuré dans le tableau de bord EmailJS avec les sections conditionnelles suivantes :

```html
<!-- Section commune à tous les types de messages -->
<h2>Confirmation de votre demande</h2>
<p>Bonjour {{to_name}},</p>

<!-- Section pour les demandes de contact -->
{{#type_contact}}
<p>Nous avons bien reçu votre message concernant "{{subject}}".</p>
<p>Notre équipe va l'examiner et vous répondra dans les plus brefs délais.</p>

<p>Pour rappel, voici votre message :</p>
<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0; background-color: #f9f9f9;">
  {{{original_message}}}
</div>
{{/type_contact}}

<!-- Section pour les demandes de cours d'essai -->
{{#type_cours_essai}}
<p>Nous avons bien enregistré votre demande de cours d'essai.</p>
<p>Voici les détails de votre réservation :</p>
<ul>
  <li><strong>Club :</strong> {{club}}</li>
  <li><strong>Type de cours :</strong> {{course_type}}</li>
  <li><strong>Date :</strong> {{date}}</li>
  <li><strong>Horaire :</strong> {{time}}</li>
</ul>
<p>Un instructeur vous contactera prochainement pour confirmer votre réservation.</p>
{{/type_cours_essai}}

<!-- Section pour les demandes d'inscription -->
{{#type_inscription}}
<p>Nous avons bien reçu votre demande d'inscription.</p>
<p>Voici les détails de votre inscription :</p>
<ul>
  <li><strong>Club :</strong> {{club}}</li>
  <li><strong>Type de cours :</strong> {{course_type}}</li>
</ul>
<p>Un responsable du club vous contactera prochainement pour finaliser votre inscription et vous communiquer les modalités de paiement.</p>
{{/type_inscription}}

<!-- Section commune de fin -->
<p>Merci de votre intérêt pour l'Académie de Taekwondo Pluriel.</p>
<p>Cordialement,<br>L'équipe ATP</p>
```

## Variables à envoyer

Pour chaque type de formulaire, vous devez envoyer les variables booléennes suivantes pour activer le rendu conditionnel :

### Contact
```javascript
{
  // Variables communes
  from_name: "Nom de l'utilisateur",
  from_email: "email@utilisateur.com",
  to_name: "Nom de l'utilisateur",
  to_email: "email@utilisateur.com",
  
  // Variables spécifiques au contact
  subject: "Sujet du message",
  message: "Contenu du message",
  original_message: "Contenu du message",
  
  // Flags de type de formulaire
  type_contact: true,
  type_cours_essai: false,
  type_inscription: false
}
```

### Cours d'essai
```javascript
{
  // Variables communes
  from_name: "Nom de l'utilisateur",
  from_email: "email@utilisateur.com",
  to_name: "Nom de l'utilisateur",
  to_email: "email@utilisateur.com",
  
  // Variables spécifiques au cours d'essai
  phone: "0123456789",
  birth_date: "2000-01-01",
  club: "Nom du club",
  course_type: "Type de cours",
  date: "2023-01-01",
  time: "10h00-11h00",
  
  // Flags de type de formulaire
  type_contact: false,
  type_cours_essai: true,
  type_inscription: false
}
```

### Inscription
```javascript
{
  // Variables communes
  from_name: "Nom de l'utilisateur",
  from_email: "email@utilisateur.com",
  to_name: "Nom de l'utilisateur",
  to_email: "email@utilisateur.com",
  
  // Variables spécifiques à l'inscription
  phone: "0123456789",
  birth_date: "2000-01-01",
  club: "Nom du club",
  course_type: "Type de cours",
  
  // Flags de type de formulaire
  type_contact: false,
  type_cours_essai: false,
  type_inscription: true
}
```

## Configuration dans EmailJS

1. Connectez-vous à votre compte EmailJS
2. Créez deux nouveaux templates :
   - `template_admin_unified` (pour les notifications administrateur)
   - `template_user_unified` (pour les confirmations utilisateur)
3. Copiez-collez le code HTML correspondant dans chaque template
4. Sauvegardez les templates
5. Testez chaque type de formulaire pour vérifier que le rendu conditionnel fonctionne correctement

## Avantages de cette approche

- Maintenance simplifiée : un seul template à gérer par destinataire
- Cohérence visuelle entre les différents types de messages
- Facilité d'ajout de nouveaux types de formulaires à l'avenir
- Réduction du nombre de templates à gérer dans EmailJS