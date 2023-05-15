const containerCells = document.createElement('div');
const containerField = document.createElement('div');
const bodyHTML = document.getElementById('body');
let permisSpreadBomb = true;
const bombs = [];
const displayTime = document.createElement('div');
let permisBonusSound = true;
let permisStepSound = true;
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
  containerCells.style.setProperty('--columnAmmount', height);
  const cellsCount = width * height;
  cellCreating(cellsCount);
  const cells = document.querySelectorAll('.cell');
  const arrCells = [...cells];

  function verificating(row, column) {
    return row >= 0
         && row < height
         && column >= 0
         && column < width;
  }

  function bombChecking(row, column) {
    if (!verificating(row, column)) return 0;
    const index = row * width + column;

    return bombs.includes(index);
  }

  function probabilityNumber(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (bombChecking(row + y, column + x)) {
          count += 1;
        }
      }
    }
    return count;
  }

  function cellColoring(count, index) {
    if (count === 0) {
      cells[index].classList.add('colorCode0');
      cells[index].textContent = ' ';
    } else if (count === 1) {
      cells[index].classList.add('colorCode1');
      cells[index].textContent = count;
    } else if (count === 2) {
      cells[index].classList.add('colorCode2');
      cells[index].textContent = count;
    } else if (count === 3) {
      cells[index].classList.add('colorCode3');
      cells[index].textContent = count;
    } else if (count === 4) {
      cells[index].classList.add('colorCode4');
      cells[index].textContent = count;
    } else if (count === 5) {
      cells[index].classList.add('colorCode5');
      cells[index].textContent = count;
    } else if (count === 6) {
      cells[index].classList.add('colorCode6');
      cells[index].textContent = count;
    } else if (count === 7) {
      cells[index].classList.add('colorCode7');
      cells[index].textContent = count;
    } else if (count === 8) {
      cells[index].classList.add('colorCode8');
      cells[index].textContent = count;
    } else {
      cells[index].textContent = count;
    }
  }

  function cellOpening(row, column) {
    if (!verificating(row, column)) return;
    const index = row * width + column;
    const cell = cells[index];

    if (cell.disabled === true) return;
    cell.disabled = true;

    if (bombChecking(row, column)) {
      const imageBomb = document.createElement('img');
      imageBomb.src = 'bomb.png';
      cell.appendChild(imageBomb);
      const explSound = new Audio('explosion.wav');
      explSound.play();
      return;
    }
    const count = probabilityNumber(row, column);

    cellColoring(count, index);
    if (count !== 0) {
      cell.textContent = count;
      cellColoring(count, index);
      if (permisStepSound === true) {
        const clickSound = new Audio('notification.wav');
        clickSound.play();
        permisStepSound = false;
      }
      return;
    }
    if (count === 0) {
      if (permisBonusSound === true) {
        const bonusSound = new Audio('bonus.wav');
        bonusSound.play();
        permisBonusSound = false;
        permisStepSound = false;
      }
    }

    cells[index].classList.add('colorCode0');
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        cellOpening(row + y, column + x);
      }
    }
  }

  bodyHTML.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      const index = arrCells.indexOf(event.target);
      if (permisSpreadBomb === true) {
        bombRandoming(bombs, ammountsBomb, cellsCount, index);
        permisSpreadBomb = false;
      }
      const column = index % width;
      const row = (index - column) / width;
      cellOpening(row, column);
      permisBonusSound = true;
      permisStepSound = true;
    }
  });
}

gameStarting(10, 10, 10);
