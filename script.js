'use strict';

const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const COLORS = ['yellow', 'blue', 'red', 'green', 'brown', 'wheat'];

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = +e.target.dataset.time;
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}
function finishGame() {
  board.innerHTML = `<h1>Your score : ${score}`;
  timeEl.classList.add('hide');
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    setTime(current);
  }
}
function setTime(value) {
  if (value >= 60) {
    let minutes = Math.trunc(value / 60);
    let seconds = value % 60;
    timeEl.innerHTML = `0${minutes}:${seconds}`;
    if (seconds < 10) {
      timeEl.innerHTML = `0${minutes}:0${seconds}`;
    }
  } else {
    timeEl.innerHTML = `00:${value}`;
    if (value < 10) {
      timeEl.innerHTML = `00:0${value}`;
    }
  }
}

function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getColor() {
  const index = Math.round(Math.random() * COLORS.length);
  return COLORS[index];
}
