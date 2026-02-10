// Gestion de la navigation entre les écrans
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const screens = document.querySelectorAll('.screen');
    const mainButtons = document.querySelectorAll('.main-btn');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const voirProfileBtn = document.getElementById('voir-profile-btn');
    
    // Au chargement, on s'assure que seul l'écran d'accueil est visible
    screens.forEach(screen => {
        if (!screen.classList.contains('active')) {
            screen.style.display = 'none';
        }
    });
    
    // Fonction pour basculer entre les écrans
    function switchScreen(targetId) {
        // Masquer tous les écrans
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        // Afficher l'écran cible
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            // Petit délai pour permettre l'affichage avant l'animation
            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 10);
            
            // Faire défiler vers le haut
            window.scrollTo(0, 0);
        }
    }
    
    // Gestion des clics sur les boutons principaux
    mainButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetScreenId = this.getAttribute('data-target');
            switchScreen(targetScreenId);
            
            // Fermer tous les détails de projet qui pourraient être ouverts
            document.querySelectorAll('.project-details').forEach(detail => {
                detail.classList.remove('active');
            });
        });
    });
    
    // Gestion des boutons "Cancel" pour revenir à l'écran d'accueil
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchScreen('home-screen');
        });
    });
    
    // Gestion du bouton "VOIR LE PROFILE" (scroll vers la section profil)
    if (voirProfileBtn) {
        voirProfileBtn.addEventListener('click', function() {
            // Si on est déjà sur l'écran d'accueil, on scroll vers le profil
            if (document.getElementById('home-screen').classList.contains('active')) {
                const profileSection = document.querySelector('.profile-section');
                if (profileSection) {
                    profileSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Ajout d'un effet visuel temporaire
                    profileSection.style.boxShadow = '0 0 0 4px rgba(26, 115, 232, 0.3)';
                    setTimeout(() => {
                        profileSection.style.boxShadow = '';
                    }, 1500);
                }
            } else {
                // Si on est sur un autre écran, revenir à l'accueil
                switchScreen('home-screen');
                
                // Puis scroll vers le profil
                setTimeout(() => {
                    const profileSection = document.querySelector('.profile-section');
                    if (profileSection) {
                        profileSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        });
    }
    
    // Gestion des boutons "Voir plus de détails" pour les projets
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const detailsElement = document.getElementById(`project-details-${projectId}`);
            
            // Fermer tous les autres détails
            document.querySelectorAll('.project-details').forEach(detail => {
                if (detail.id !== `project-details-${projectId}`) {
                    detail.classList.remove('active');
                }
            });
            
            // Basculer l'affichage des détails du projet cliqué
            if (detailsElement) {
                detailsElement.classList.toggle('active');
                
                // Si on ouvre les détails, scroll vers eux
                if (detailsElement.classList.contains('active')) {
                    setTimeout(() => {
                        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            }
        });
    });
    
    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simulation d'envoi (dans un cas réel, on utiliserait fetch() pour envoyer à un serveur)
            console.log('Formulaire envoyé:', { name, email, subject, message });
            
            // Message de confirmation
            alert(`Merci ${name} ! Votre message "${subject}" a été envoyé avec succès. Je vous répondrai dès que possible à ${email}.`);
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Retour à l'écran d'accueil après 2 secondes
            setTimeout(() => {
                switchScreen('home-screen');
            }, 2000);
        });
    }
    
    // Gestion du formulaire de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const email = document.getElementById('newsletter-email').value;
            const options = {
                projects: document.getElementById('option-projects').checked,
                veille: document.getElementById('option-veille').checked,
                formations: document.getElementById('option-formations').checked
            };
            
            // Simulation d'envoi (dans un cas réel, on utiliserait fetch() pour envoyer à un serveur)
            console.log('Inscription newsletter:', { email, options });
            
            // Message de confirmation
            alert(`Merci pour votre inscription à la newsletter ! Un email de confirmation a été envoyé à ${email}.`);
            
            // Réinitialisation du formulaire
            newsletterForm.reset();
            
            // Cocher les premières options par défaut
            document.getElementById('option-projects').checked = true;
            document.getElementById('option-veille').checked = true;
            
            // Retour à l'écran d'accueil après 2 secondes
            setTimeout(() => {
                switchScreen('home-screen');
            }, 2000);
        });
    }
    
    // Animation des boutons principaux au chargement
    setTimeout(() => {
        mainButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }, 500);
    
    // Effet de survol amélioré pour les boutons principaux
    mainButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gestion de l'accessibilité au clavier
    document.addEventListener('keydown', function(e) {
        // Échap pour revenir à l'écran d'accueil
        if (e.key === 'Escape' && !document.getElementById('home-screen').classList.contains('active')) {
            switchScreen('home-screen');
        }
    });
    
    // Initialisation des images (dans un cas réel, on aurait des images réelles)
    console.log('Portfolio de Tiavina Rakotovao chargé avec succès!');
});