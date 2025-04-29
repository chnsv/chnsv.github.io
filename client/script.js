function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('nav-visible');
}

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
    const questions = [
        { question: "Сколько будет 2 + 2?", answers: [3, 4, 5], correct: 4 },
        { question: "Сколько будет 3 * 3?", answers: [6, 9, 8], correct: 9 },
        { question: "Сколько будет 10 - 4?", answers: [5, 6, 7], correct: 6 }
    ];

    const modal = document.getElementById('modal');
    const questionsDiv = document.getElementById('questions');
    const startTestButton = document.getElementById('startTest');
    const closeButton = document.getElementsByClassName('close')[0];
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        questionsDiv.innerHTML = ''; // Очистка предыдущего вопроса
        const question = questions[index];
        const questionElement = document.createElement('p');
        questionElement.textContent = question.question;
        questionsDiv.appendChild(questionElement);

        question.answers.forEach(answer => {
            const answerElement = document.createElement('input');
            answerElement.type = 'radio';
            answerElement.name = 'answer';
            answerElement.value = answer;
            questionsDiv.appendChild(answerElement);
            questionsDiv.appendChild(document.createTextNode(answer));
            questionsDiv.appendChild(document.createElement('br'));
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Следующий';
        nextButton.onclick = function() {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                if (parseInt(selectedAnswer.value) === question.correct) {
                    score++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    showResult();
                }
            } else {
                alert('Пожалуйста, выберите ответ!');
            }
        };
        questionsDiv.appendChild(nextButton);
    }

    function showResult() {
        questionsDiv.innerHTML = `Ваш результат: ${score} из ${questions.length}`;
    }

    startTestButton.onclick = function() {
        modal.style.display = "block";
        currentQuestionIndex = 0;
        score = 0; // Сброс счета
        showQuestion(currentQuestionIndex);
    };

    closeButton.onclick = function() {
        modal.style.display = "none";
        questionsDiv.innerHTML = ''; // Очистка вопросов
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            questionsDiv.innerHTML = ''; // Очистка вопросов
        }
    };
});
