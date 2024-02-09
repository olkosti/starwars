const answerElement = document.querySelector('.answer__body'); //вывод 
const inputSelect = document.querySelector('.questions__select'); //выбор  
const inputNumber = document.querySelector('.questions__number'); //номер
const button = document.querySelector('.questions__btn'); //кнопка
const loader = document.querySelector('.loader');

// скрываем лоадер по умолчанию
loader.hidden = true;

//функция вывода информации
function addAnswer() {
    loader.hidden = false;
    fetch(`https://swapi.nomoreparties.co/${inputSelect.value}/${inputNumber.value}`)

    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        loader.hidden = true;

        if (data.detail === 'Not Found' || inputNumber.value === '' || inputNumber.value > 10) {
            answerElement.classList.add('error');
            Promise.reject(data);
            throw new Error('Not Found')
        }
        answerElement.classList.remove('error');

        if (inputSelect.value === 'films') {
            answerElement.textContent = `Title: ${data.title}`
        } else {
            answerElement.textContent = `Name: ${data.name}`
        }
    })
    .catch((error) => {
        answerElement.textContent = `Возникла ошибка: ${error.message}`;
        console.error('Ошибка:', error.message);
    });
}

//вешаем обработчик событий на кнопку
button.addEventListener('click', addAnswer);


