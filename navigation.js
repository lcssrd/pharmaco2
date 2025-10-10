// navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) {
        console.error("L'élément #sidebar-container est introuvable.");
        return;
    }

    // 1. Charger le contenu de la barre latérale
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement de la sidebar');
            }
            return response.text();
        })
        .then(html => {
            sidebarContainer.innerHTML = html;

            // 2. Mettre en surbrillance le lien actif
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = sidebarContainer.querySelectorAll('a');

            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('bg-sky-700', 'text-white', 'font-bold');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.add('text-slate-300'); // Couleur par défaut pour les liens
                }
            });
        })
        .catch(error => {
            sidebarContainer.innerHTML = "<p class='p-4 text-red-400'>Impossible de charger la navigation.</p>";
            console.error('Erreur:', error);
        });
});