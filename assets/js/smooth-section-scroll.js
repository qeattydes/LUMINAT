document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('section'));
    let currentIdx = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    const projectsSection = document.getElementById('projects-section');

    currentIdx = sections.findIndex(sec => {
        const rect = sec.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });

    if (currentIdx === -1) currentIdx = 0;

    function scrollToSection(idx) {
        if (idx < 0 || idx >= sections.length || isScrolling) return;

        isScrolling = true;
        clearTimeout(scrollTimeout);

        sections[idx].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        currentIdx = idx;

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    window.addEventListener('wheel', e => {
        const inProjectsSection = projectsSection &&
            (projectsSection.contains(e.target) ||
                projectsSection.matches(':hover'));

        if (isScrolling || inProjectsSection) {
            return;
        }

        e.preventDefault();

        const delta = e.deltaY;
        if (delta > 0) {
            scrollToSection(currentIdx + 1);
        } else if (delta < 0) {
            scrollToSection(currentIdx - 1);
        }
    }, { passive: false });

    let touchStartY = 0;
    window.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', e => {
        const inProjectsSection = projectsSection &&
            projectsSection.contains(e.target);

        if (isScrolling || inProjectsSection) {
            return;
        }

        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (diff > 50) {
            scrollToSection(currentIdx + 1);
        } else if (diff < -50) {
            scrollToSection(currentIdx - 1);
        }
    }, { passive: false });

    document.body.style.overflow = 'hidden';

    window.scrollToNextSection = () => scrollToSection(currentIdx + 1);
    window.scrollToPrevSection = () => scrollToSection(currentIdx - 1);
});
