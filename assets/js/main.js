document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap !== 'undefined' &&
        typeof ScrollTrigger !== 'undefined' &&
        typeof ScrollSmoother !== 'undefined') {

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        let smootherInstance = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            normalizeScroll: true,
            effects: true,
            snap: {
                snapTo: 'section',
                duration: { min: 0.2, max: 0.5 },
                delay: 0.1,
                ease: 'power1.inOut'
            }
        });
        window.smoother = smootherInstance;

        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
            smootherInstance.refresh();
        });
    }
});
