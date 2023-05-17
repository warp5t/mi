let loose = false;

function gameStarting(width, height, ammountsBomb) {
  const containerCells = document.createElement('div');
  const containerField = document.createElement('div');
  const bodyHTML = document.getElementById('body');
  const buttonFlag = document.createElement('button');
  buttonFlag.classList.add('buttonFlag');
  buttonFlag.innerText = 'Push for mode flag';

  const buttonRestart = document.createElement('button');
  buttonRestart.classList.add('buttonRestart');
  buttonRestart.innerText = 'Restart';
  const buttonDifficult = document.createElement('button');
  buttonDifficult.classList.add('buttonDifficult');
  buttonDifficult.innerText = 'Difficult';
  const optionMode = document.createElement('div');
  optionMode.classList.add('optionMode');
  optionMode.prepend(buttonRestart);
  optionMode.prepend(buttonDifficult);

  let permisSpreadBomb = true;
  const bombs = [];
  const displayTime = document.createElement('div');
  let permisBonusSound = true;
  let permisStepSound = true;
  let coutClick = 0;
  let flagMode = false;
  displayTime.classList.add('displayTime');

  containerField.prepend(containerCells);
  containerField.prepend(optionMode);
  containerField.prepend(buttonFlag);
  containerField.prepend(displayTime);
  containerField.classList.add('containerField');
  containerCells.classList.add('field');
  bodyHTML.prepend(containerField);

  function cellCreating(cellCount) {
    for (let i = 0; cellCount > i; i += 1) {
      const cellUnit = document.createElement('p');
      cellUnit.classList.add('cell');
      containerCells.append(cellUnit);
    }
  }

  buttonRestart.addEventListener('click', () => {
    bodyHTML.innerHTML = '';
    gameStarting(10, 10, 10);
    const restartSound = new Audio('sounds/restart.mp3');
    restartSound.play();
  });

  function windowWinnig() {
    const windowWinner = document.createElement('div');
    windowWinner.classList.add('windowWinner');
    windowWinner.innerText = `Hooray! You found all mines in ${displayTime.textContent} and ${coutClick} moves!`;
    const buttonWinner = document.createElement('button');
    buttonWinner.classList.add('buttonWinner');
    buttonWinner.innerText = 'OK';
    windowWinner.append(buttonWinner);
    bodyHTML.appendChild(windowWinner);

    buttonWinner.addEventListener('click', () => {
      bodyHTML.innerHTML = '';
      const bleepSound = new Audio('sounds/bleep-sound.mp3');
      bleepSound.play();
      gameStarting(10, 10, 10);
    });
  }

  buttonDifficult.addEventListener('click', () => {
    const windDifficult = document.createElement('div');
    windDifficult.classList.add('windDifficult');
    windDifficult.innerText = 'Chose your destiny';
    const containerButttons = document.createElement('div');
    containerButttons.classList.add('containerButttons');
    const buttonEasy = document.createElement('button');
    buttonEasy.classList.add('buttonEasy');
    buttonEasy.innerText = 'Easy';
    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('buttonMedium');
    buttonMedium.innerText = 'Medium';
    const buttonHard = document.createElement('button');
    buttonHard.classList.add('buttonHard');
    buttonHard.innerText = 'Hard';

    containerButttons.append(buttonEasy);
    containerButttons.append(buttonMedium);
    containerButttons.append(buttonHard);
    windDifficult.append(containerButttons);
    bodyHTML.prepend(windDifficult);

    const choseDifficultSound = new Audio('sounds/difficultChose.mp3');

    buttonEasy.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(10, 10, 10);
    });
    buttonMedium.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(12, 12, 18);
    });
    buttonHard.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(14, 14, 31);
    });

    const diffcultSound = new Audio('sounds/difficult.mp3');
    diffcultSound.play();
  });

  function flagBtnRecoloring() {
    buttonFlag.classList.toggle('activFlagMode');
    const soundModeFlag = new Audio('sounds/modeFlag.mp3');
    soundModeFlag.play();
  }

  buttonFlag.addEventListener('click', () => {
    flagBtnRecoloring();
    if (flagMode === true) flagMode = false;
    else if (flagMode === false) flagMode = true;
  });

  function openCellChecking(countCellOpen) {
    if (countCellOpen === 1) {
      const winnerSound = new Audio('sounds/win.mp3');
      winnerSound.play();
      windowWinnig();
    }
  }

  function bombRandoming(arr, bmbsCount, ammountPiles, indexFirstStep) {
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

  containerCells.style.setProperty('--columnAmmount', height);
  const cellsCount = width * height;
  cellCreating(cellsCount);
  let countCellOpen = cellsCount - ammountsBomb;
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
      const explSound = new Audio('sounds/explosion.wav');
      explSound.play();
      loose = true;
      return;
    }
    const count = probabilityNumber(row, column);
    openCellChecking(countCellOpen);
    countCellOpen -= 1;

    cellColoring(count, index);
    if (count !== 0) {
      cell.textContent = count;
      cellColoring(count, index);
      if (permisStepSound === true) {
        const clickSound = new Audio('sounds/notification.wav');
        clickSound.play();
        permisStepSound = false;
      }
      return;
    }
    if (count === 0) {
      if (permisBonusSound === true) {
        const bonusSound = new Audio('sounds/bonus.wav');
        bonusSound.play();
        permisBonusSound = false;
        permisStepSound = false;
      }
    }

    cell.classList.add('colorCode0');
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        cellOpening(row + y, column + x);
      }
    }
  }

  bodyHTML.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      coutClick += 1;
      const index = arrCells.indexOf(event.target);
      if (permisSpreadBomb === true) {
        bombRandoming(bombs, ammountsBomb, cellsCount, index);
        permisSpreadBomb = false;
      }
      const column = index % width;
      const row = (index - column) / width;
      if (flagMode === true) {
        const imageFlag = document.createElement('img');
        imageFlag.src = 'flag.png';
        arrCells[index].appendChild(imageFlag);
        const flagSound = new Audio('sounds/flag.mp3');
        flagSound.play();
      } else if (flagMode === false) {
        cellOpening(row, column);
      }
      permisBonusSound = true;
      permisStepSound = true;
    }
  });

  function windowLoosing() {
    if (loose === true) {
      const windowBox = document.createElement('div');
      windowBox.classList.add('windowOver');
      bodyHTML.appendChild(windowBox);
      windowBox.textContent = 'Game over. Try again';

      const buttonRepeat = document.createElement('button');
      buttonRepeat.classList.add('buttonRepeat');
      buttonRepeat.textContent = 'OK';
      windowBox.append(buttonRepeat);
      buttonRepeat.addEventListener('click', () => {
        bodyHTML.innerHTML = '';
        const bleepSound = new Audio('sounds/bleep-sound.mp3');
        bleepSound.play();
        gameStarting(10, 10, 10);
      });
    }
  }

  setInterval(() => {
    time.timeCounting();
    if (loose === true) {
      windowLoosing();
      loose = false;
    }
  }, 1000);
}

gameStarting(10, 10, 3);
