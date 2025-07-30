const randomNumber = Math.floor(Math.random() * 100) + 1;
const guessBtn = document.getElementById('guessBtn');
const input = document.getElementById('guessInput');
const message = document.getElementById('message');

guessBtn.addEventListener('click', () => {
  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = 'Invalid input. Enter a number between 1 and 100.';
    message.style.color = 'orange';
    return;
  }

  if (guess === randomNumber) {
    message.textContent = 'Correct! You guessed the number.';
    message.style.color = 'lime';
  } else if (guess < randomNumber) {
    message.textContent = 'Too low. Try again.';
    message.style.color = 'red';
  } else {
    message.textContent = 'Too high. Try again.';
    message.style.color = 'red';
  }
});
