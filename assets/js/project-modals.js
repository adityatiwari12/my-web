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

    // Add click event to project items (excluding video elements)
    projectItems.forEach(item => {
        // Prevent modal opening when clicking on videos
        const videos = item.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('click', function (e) {
                e.stopPropagation(); // Stop the click from bubbling up
            });
        });

        item.addEventListener('click', function (e) {
            // Don't open modal if clicking on video or its container
            if (e.target.tagName === 'VIDEO' ||
                e.target.closest('video') ||
                e.target.closest('figure.project-img')) {
                return;
            }

            const modalId = this.getAttribute('data-project-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
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
