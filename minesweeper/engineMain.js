const containerCells = document.createElement('div');
const containerField = document.createElement('div');
const bodyHTML = document.getElementById('body');
let permisSpreadBomb = true;
const bombs = [];
const displayTime = document.createElement('div');
displayTime.classList.add('displayTime');

containerField.append(containerCells);
containerField.append(displayTime);
containerField.classList.add('containerField');
containerCells.classList.add('field');
bodyHTML.append(containerField);

function cellCreating(cellCount) {
  for (let i = 0; cellCount > i; i += 1) {
    const cellUnit = document.createElement('p');
    cellUnit.classList.add('cell');
    containerCells.append(cellUnit);
  }
}

function bombRandoming(arr, bmbsCount, ammountPiles, indexFirstStep) {
  console.log(indexFirstStep, ' - indexFirstStep');
  while (arr.length < bmbsCount) {
    const randomNumber = Math.floor(Math.random() * ammountPiles) + 1;
    if (!arr.includes(randomNumber) && randomNumber !== indexFirstStep) {
      arr.push(randomNumber);
    }
  }
}

function timeDisplaying(hour, minute, second) {
  if (minute < 10 && second < 10) {
    displayTime.innerHTML = `${hour} :  0${minute} : 0${second}`;
  } else if (minute < 10 && second > 10) {
    displayTime.innerHTML = `${hour} :  0${minute} : ${second}`;
  } else if (minute > 10 && second < 10) {
    displayTime.innerHTML = `${hour} :  ${minute} : 0${second}`;
  } else if (minute > 10 && second > 10) {
    displayTime.innerHTML = `${hour} :  ${minute} : ${second}`;
  }
}
timeDisplaying();

class Time {
  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 1;
  }

  timeCounting() {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 1;
      this.minutes += 1;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours += 1;
    }
    timeDisplaying(this.hours, this.minutes, this.seconds);
  }
}

const time = new Time();

setInterval(() => {
  time.timeCounting();
}, 1000);

function gameStarting(width, height, ammountsBomb) {
  //const field = document.querySelector('.field');
  const cellsCount = width * height;
  cellCreating(cellsCount);
  const cells = document.querySelectorAll('.cell');
  const arrCells = [...cells];

  function bombChecking(row, column) {
    const index = row * width + column;

    return bombs.includes(index);
  }

  function cellOpening(row, column) {
    const index = row * width + column;
    const cell = cells[index];

    cell.disabled = true;

    if (bombChecking(row, column)) {
      const imageBomb = document.createElement('img');
      imageBomb.src = 'bomb.png';
      cell.appendChild(imageBomb);
      const explSound = new Audio('explosion.wav');
      explSound.play();
    } else {
      const clickSound = new Audio('notification.wav');
      clickSound.play();
    }
  }

  bodyHTML.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      const index = arrCells.indexOf(event.target);
      if (permisSpreadBomb === true) {
        console.log('permission', index);
        bombRandoming(bombs, ammountsBomb, cellsCount, index);
        permisSpreadBomb = false;
      }
      cells[index].classList.add('check');
      const column = index % width;
      const row = (index - column) / width;
      cellOpening(row, column);
    }
  });
}

gameStarting(8, 8, 55);
