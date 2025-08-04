document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    const contentContainer = document.getElementById('project-content');
    const projectsSection = document.getElementById('projects-section');
    let isProjectsActive = false;
    let isScrolling = false;
    let currentProject = 0;

    if (projectItems.length > 0) {
        projectItems[0].classList.add('active');
        loadProjectContent(1);
    }

    function loadProjectContent(projectNumber) {
        const template = document.getElementById(`project-${projectNumber}-template`);
        if (template) {
            contentContainer.classList.add('fade-out');

            setTimeout(() => {
                contentContainer.innerHTML = '';
                const clone = template.content.cloneNode(true);
                contentContainer.appendChild(clone);

                contentContainer.classList.remove('fade-out');
                contentContainer.classList.add('fade-in');

                setTimeout(() => {
                    contentContainer.classList.remove('fade-in');
                }, 800);
            }, 500);
        }
    }

    if (projectsSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isProjectsActive = entry.isIntersecting;
                if (!isProjectsActive && currentProject > 0) {
                    resetProjects();
                }
            });
        }, { threshold: 0.9 });

        sectionObserver.observe(projectsSection);
    }

    function resetProjects() {
        projectItems.forEach((item, index) => {
            item.classList.remove('active', 'past');
            if (index < currentProject) {
                item.classList.add('past');
            }
        });
        currentProject = 0;
    }

    function activateProject(index) {
        if (index < 0 || index >= projectItems.length) return;

        for (let i = 0; i < index; i++) {
            projectItems[i].classList.add('past');
            projectItems[i].classList.remove('active');
        }

        projectItems[index].classList.add('active');
        projectItems[index].classList.remove('past');

        for (let i = index + 1; i < projectItems.length; i++) {
            projectItems[i].classList.remove('active', 'past');
        }

        currentProject = index;
        loadProjectContent(currentProject + 1);
        updateParallax();
    }

    function updateParallax() {
        projectItems.forEach((item, i) => {
            const img = item.querySelector('img');
            if (img) {
                const depth = Math.abs(i - currentProject) * 0.1;
                img.style.transform = `scale(${1 + depth})`;
            }
        });
    }

    if (projectsSection) {
        projectsSection.addEventListener('wheel', function(e) {
            if (!isProjectsActive || isScrolling) return;

            const delta = e.deltaY;
            let nextProject = currentProject;

            if (delta > 0) {
                nextProject = Math.min(currentProject + 1, projectItems.length - 1);
            } else if (delta < 0) {
                nextProject = Math.max(currentProject - 1, 0);
            }

            if (nextProject === currentProject) return;

            e.preventDefault();
            isScrolling = true;

            activateProject(nextProject);

            setTimeout(() => {
                isScrolling = false;

                if (nextProject === projectItems.length - 1 && delta > 0) {
                    setTimeout(() => {
                        if (window.scrollToNextSection) {
                            window.scrollToNextSection();
                        }
                    }, 300);
                }
                else if (nextProject === 0 && delta < 0) {
                    setTimeout(() => {
                        if (window.scrollToPrevSection) {
                            window.scrollToPrevSection();
                        }
                    }, 300);
                }
            }, 1000);
        }, { passive: false });

        // Touch события
        let touchStartY = 0;
        projectsSection.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        projectsSection.addEventListener('touchend', function(e) {
            if (!isProjectsActive || isScrolling) return;

            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            let nextProject = currentProject;

            if (diff > 50) {
                nextProject = Math.min(currentProject + 1, projectItems.length - 1);
            } else if (diff < -50) {
                nextProject = Math.max(currentProject - 1, 0);
            }

            if (nextProject === currentProject) return;

            e.preventDefault();
            isScrolling = true;

            activateProject(nextProject);

            setTimeout(() => {
                isScrolling = false;

                if (nextProject === projectItems.length - 1 && diff > 50) {
                    setTimeout(() => {
                        if (window.scrollToNextSection) {
                            window.scrollToNextSection();
                        }
                    }, 300);
                }
                else if (nextProject === 0 && diff < -50) {
                    setTimeout(() => {
                        if (window.scrollToPrevSection) {
                            window.scrollToPrevSection();
                        }
                    }, 300);
                }
            }, 1000);
        }, { passive: false });

        // Parallax эффекты
        projectsSection.addEventListener('mousemove', function(e) {
            if (!isProjectsActive) return;

            const activeItem = document.querySelector('.project-item.active');
            if (!activeItem) return;

            const img = activeItem.querySelector('img');
            if (!img) return;

            const rect = projectsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / centerX * 15;
            const moveY = (y - centerY) / centerY * 15;

            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        projectsSection.addEventListener('mouseleave', function() {
            const activeItem = document.querySelector('.project-item.active');
            if (activeItem) {
                const img = activeItem.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            }
        });
    }
});
