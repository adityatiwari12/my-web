// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all project items with modal data attribute
    const projectItems = document.querySelectorAll('[data-project-modal]');
    const modalContainers = document.querySelectorAll('.modal-container');
    const closeButtons = document.querySelectorAll('[data-modal-close-btn]');
    const overlays = document.querySelectorAll('[data-overlay]');

    // Open modal function
    function openModal(modalId) {
        const modalContainer = document.querySelector(`[data-modal-container="${modalId}-modal"]`);
        if (modalContainer) {
            modalContainer.classList.add('active');
            const modal = modalContainer.querySelector('.project-modal');
            if (modal) modal.classList.add('active');
        }
    }

    // Close modal function
    function closeModal(modalContainer) {
        modalContainer.classList.remove('active');
        const modal = modalContainer.querySelector('.project-modal');
        if (modal) modal.classList.remove('active');
    }

    // Add click event to project items (including images)
    projectItems.forEach(item => {
        // Get the parent project item element that has the data attribute
        const projectItem = item.closest('.project-item');
        
        // Add click handler to the entire project item
        if (projectItem) {
            projectItem.addEventListener('click', function(e) {
                // Only proceed if the click is not on a video element
                if (!e.target.closest('video')) {
                    const modalId = projectItem.getAttribute('data-project-modal');
                    if (modalId) {
                        e.preventDefault();
                        openModal(modalId);
                    }
                }
            });
            
            // Make sure links inside the project item still work
            const links = projectItem.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        }
    });

    // Close modal on close button click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalContainer = this.closest('.modal-container');
            if (modalContainer) closeModal(modalContainer);
        });
    });

    // Close modal on overlay click
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function () {
            const modalContainer = this.closest('.modal-container');
            if (modalContainer) closeModal(modalContainer);
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modalContainers.forEach(container => {
                if (container.classList.contains('active')) {
                    closeModal(container);
                }
            });
        }
    });
});
