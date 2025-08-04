const header = document.querySelector('header');
if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('header-hidden');
        } else if (currentScroll > lastScroll) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScroll = currentScroll;

        if (currentScroll > 100) {
            header.classList.add('header-solid');
            header.classList.remove('header-transparent');
        } else {
            header.classList.add('header-transparent');
            header.classList.remove('header-solid');
        }
    });
}
