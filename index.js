const answerElement = document.querySelector('.answer__body'); //вывод 
const inputSelect = document.querySelector('.questions__select'); //выбор  
const inputNumber = document.querySelector('.questions__number'); //номер
const button = document.querySelector('.questions__btn'); //кнопка
const loader = document.querySelector('.loader');
const API_URL = 'https://swapi.nomoreparties.co/';

// скрываем лоадер по умолчанию
loader.hidden = true;

//функция вывода информации
function addAnswer() {
    loader.hidden = false;
    fetch(API_URL + inputSelect.value + '/' + inputNumber.value)

    .then((response) => {
        if (!response.ok) {
            answerElement.classList.add('error');    
            loader.hidden = true;              
            throw new Error('Упс...В вашем запросе ошибка, данные не найдены');             
        }
        return response.json()
    })
    .then((data) => {
        console.log(data);
        loader.hidden = true; 
        answerElement.classList.remove('error');

        if (inputSelect.value === 'films') {
            answerElement.textContent = `Title: ${data.title}`
        } else {
            answerElement.textContent = `Name: ${data.name}`
        }
    })
    .catch((error) => {
        answerElement.textContent = `Error: ${error.message}`;
        console.error('Ошибка:', error.message);
    });
}

//вешаем обработчик событий на кнопку
button.addEventListener('click', addAnswer);


