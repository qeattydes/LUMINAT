document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const projectsSection = document.getElementById('projects-section');

    if (header && projectsSection) {
        let lastScroll = 0;
        let isProjectsActive = false;

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isProjectsActive = entry.isIntersecting;
                    if (isProjectsActive) {
                        header.classList.add('header-hidden');
                    } else {
                        // Восстанавливаем нормальное поведение шапки
                        const currentScroll = window.pageYOffset;
                        if (currentScroll <= 0) {
                            header.classList.remove('header-hidden');
                        } else if (currentScroll < lastScroll) {
                            header.classList.remove('header-hidden');
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );
        sectionObserver.observe(projectsSection);

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (!isProjectsActive) {
                // Нормальное поведение шапки, если не в секции проектов
                if (currentScroll <= 0) {
                    header.classList.remove('header-hidden');
                } else if (currentScroll > lastScroll) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            } else {
                // Секция проектов активна, шапка остаётся скрытой
                header.classList.add('header-hidden');
            }

            // Управление прозрачностью шапки
            if (currentScroll > 100) {
                header.classList.add('header-solid');
                header.classList.remove('header-transparent');
            } else {
                header.classList.add('header-transparent');
                header.classList.remove('header-solid');
            }

            lastScroll = currentScroll;
        });
    }
});