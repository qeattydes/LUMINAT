const faqItems = document.querySelectorAll('.faq .q');
faqItems.forEach(item => {
    const toggle = item.querySelector('img');
    const answer = item.parentElement.querySelector('.answer');

    item.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
            e.preventDefault();
        }

        if (!this.classList.contains('active')) {
            document.querySelectorAll('.faq .q.active').forEach(activeItem => {
                activeItem.classList.remove('active');
                activeItem.nextElementSibling.style.maxHeight = '0';
                activeItem.nextElementSibling.style.paddingTop = '0';
                activeItem.nextElementSibling.style.paddingBottom = '0';
            });
        }

        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.paddingTop = '16px';
            answer.style.paddingBottom = '16px';
        } else {
            answer.style.maxHeight = '0';
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
        }
    });
});
