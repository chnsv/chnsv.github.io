const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const questions = {
        "Сколько будет 2 + 2?": [3, 4, 5],
        "Сколько будет 3 * 3?": [6, 9, 8],
        "Сколько будет 10 - 4?": [5, 6, 7]
    };

    const questionsDiv = document.getElementById('questions');

    for (const [question, answers] of Object.entries(questions)) {
        const questionElement = document.createElement('p');
        questionElement.textContent = question;
        questionsDiv.appendChild(questionElement);

        answers.forEach(answer => {
            const answerElement = document.createElement('input');
            answerElement.type = 'radio';
            answerElement.name = question;
            answerElement.value = answer;
            questionsDiv.appendChild(answerElement);
            questionsDiv.appendChild(document.createTextNode(answer));
            questionsDiv.appendChild(document.createElement('br'));
        });
    }

    document.getElementById('submitTest').addEventListener('click', function() {
        let score = 0;
        if (document.querySelector('input[name="Сколько будет 2 + 2?"]:checked')?.value == 4) score++;
        if (document.querySelector('input[name="Сколько будет 3 * 3?"]:checked')?.value == 9) score++;
        if (document.querySelector('input[name="Сколько будет 10 - 4?"]:checked')?.value == 6) score++;

        document.getElementById('result').textContent = `Ваш результат: ${score} из 3`;
    });
});
