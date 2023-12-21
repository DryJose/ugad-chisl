class GuessNumberGame {
  // Инициализация элементов игры
  constructor() {
    this.elements = {
      guessContainer: document.querySelector('.guessContainer'),
      initialContainer: document.querySelector('.initialContainer'),
      guessInputZone: document.querySelector('.guessInput'),
      guessBtn: document.getElementById('guessBtn'),
      startBtn: document.getElementById("startBtn"),
      restartBtn: document.getElementById('restartBtn'),
      errorText: document.getElementById('errorText'),
      resultText: document.getElementById('resultText'),
      hintText: document.getElementById('hintText'),
      counterText: document.getElementById('counter'),
    };

 // Инициализация переменных игры
    this.minValue = null;
    this.maxValue = null;
    this.secretNumber = null;
    this.counter = 0;
    this.isEven = null;
 
     // Добавление обработчиков событий на кнопки
    this.elements.startBtn.addEventListener('click', () => this.makeNumber());
    this.elements.guessBtn.addEventListener('click', () => this.guessNumber());
    this.elements.restartBtn.addEventListener('click', () => this.restartGame());
  }
 
  makeNumber() {
    // Получение минимального и максимального значений для загаданного числа
    this.minValue = parseInt(document.getElementById("minValue").value);
    this.maxValue = parseInt(document.getElementById("maxValue").value);
 
    // Проверка введенных значений
    if ((this.maxValue <= this.minValue) || (this.minValue < 1) || (this.maxValue > 1000)) {
      this.elements.errorText.textContent = "Введите правильный диапазон от 1 до 1000";
      return;
    }
 
    // Генерация загаданного числа
    this.secretNumber = Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) + this.minValue;
    this.isEven = (this.secretNumber % 2 === 0);
 
    this.elements.errorText.textContent = "";
    this.showGuessContainer();
  }
 
  guessNumber() {
    // Очистка подсказки
    this.elements.hintText.textContent = "";
    // Получение введенного числа
    const inputNumber = parseInt(document.getElementById('inputNumber').value);
 
     // Проверка введенного числа
    if (inputNumber < this.minValue || inputNumber > this.maxValue || !(Number.isInteger(inputNumber))) {
      this.elements.resultText.textContent = `Введите число внутри указанного диапазона: ${this.minValue}-${this.maxValue}`;
      return;
    }
 
    // Увеличение счетчика попыток
    this.counter++;
    this.elements.counterText.textContent = `Попытка № ${this.counter}`;
 
    // Проверка, является ли введенное число загаданным числом
    if (inputNumber === this.secretNumber) {
      this.showSuccessResult();
      return;
    }
 
    // Если это третья попытка, выводится подсказка
    if (this.counter % 3 === 0) {
      this.elements.hintText.textContent = `Загаданное число ${this.isEven ? 'четное' : 'нечетное'}`;
    }
 
    // Вывод результата угадывания
    this.elements.resultText.textContent = inputNumber < this.secretNumber
      ? `Число должно быть больше`
      : `Число должно быть меньше`;
  }
 
   // Скрытие контейнера для угадывания числа и сброс результатов
  restartGame() {
    this.hideGuessContainer();
    this.resetResultStyles();

  // Очистка полей ввода и счетчика попыток
    document.getElementById('inputNumber').value = '';
    this.elements.counterText.textContent = '';
    this.counter = 0;
  }
 
  // Отображение контейнера для угадывания числа
  showGuessContainer() {
    this.elements.guessContainer.style.opacity = "1";
    this.elements.initialContainer.style.pointerEvents = "none";
    this.elements.initialContainer.style.opacity = "0.6";
  }
 
   // Скрытие контейнера для угадывания числа
  hideGuessContainer() {
    this.elements.guessContainer.style.opacity = "0";
    this.elements.initialContainer.style.opacity = "1";
    this.elements.initialContainer.style.pointerEvents = "auto";
  }
 
  // Отображение успешного результата
  showSuccessResult() {
    this.elements.resultText.style.color = '#ff8800';
    this.elements.resultText.style.fontSize = '28px';
    this.elements.guessInputZone.style.pointerEvents = 'none';
    this.elements.guessInputZone.style.opacity = '0.6';
    this.elements.resultText.textContent = `Верно!`;
  }
 
  // Сброс стилей результата
  resetResultStyles() {
    this.elements.resultText.style.color = '#000000';
    this.elements.resultText.style.fontSize = '16px';
    this.elements.guessInputZone.style.pointerEvents = 'auto';
    this.elements.guessInputZone.style.opacity = '1';
    this.elements.resultText.textContent = '';
  }
 }
 
 const game = new GuessNumberGame();
 
 