let loose = false;
let minesAmmount = 10;
let difficult;
let arrClicks = [];
let arrTimes = [];

function gameStarting(width, height, ammountsBomb) {
  const containerCells = document.createElement('div');
  const containerField = document.createElement('div');
  const bodyHTML = document.getElementById('body');
  const scoreFlagMode = document.createElement('div');
  scoreFlagMode.classList.add('scoreFlagMode');
  const scoreButton = document.createElement('button');
  scoreButton.innerText = 'Score';
  scoreButton.classList.add('buttonStyle');
  const buttonFlag = document.createElement('button');
  buttonFlag.classList.add('buttonStyle');
  buttonFlag.innerText = 'Mode flag';
  scoreFlagMode.append(scoreButton);
  scoreFlagMode.append(buttonFlag);

  const buttonRestart = document.createElement('button');
  buttonRestart.classList.add('buttonStyle');
  buttonRestart.innerText = 'Restart';
  const buttonDifficult = document.createElement('button');
  buttonDifficult.classList.add('buttonStyle');
  buttonDifficult.innerText = 'Difficult';
  const optionMode = document.createElement('div');
  optionMode.classList.add('optionMode');
  optionMode.prepend(buttonRestart);
  optionMode.prepend(buttonDifficult);

  let permisSpreadBomb = true;
  const bombs = [];

  const timeDisplay = document.createElement('div');
  timeDisplay.classList.add('displayClickContainer');
  const clickDisplay = document.createElement('div');
  clickDisplay.classList.add('displayClickContainer');
  clickDisplay.innerText = 'Clicks: 0';
  const timeClickContainer = document.createElement('div');
  let permisBonusSound = true;
  let permisStepSound = true;
  let countClick = 0;
  let flagMode = false;

  const saveLoadMuteContainer = document.createElement('div');
  saveLoadMuteContainer.classList.add('saveLoadContainer');
  const buttonSave = document.createElement('button');
  buttonSave.classList.add('buttonSave');
  buttonSave.innerText = 'Save';
  const buttonLoad = document.createElement('button');
  buttonLoad.classList.add('buttonLoad');
  buttonLoad.innerText = 'Load';
  const buttonMute = document.createElement('button');
  buttonMute.classList.add('buttonMute');
  buttonLoad.innerText = 'Mute';

  timeClickContainer.classList.add('timeClickContainer');
  timeClickContainer.append(clickDisplay);
  timeClickContainer.append(timeDisplay);

  containerField.prepend(containerCells);
  containerField.prepend(optionMode);
  containerField.prepend(scoreFlagMode);
  containerField.prepend(timeClickContainer);
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
    if (difficult === 'easy') {
      bodyHTML.innerHTML = '';
      gameStarting(10, 10, minesAmmount);
    } else if (difficult === 'medium') {
      bodyHTML.innerHTML = '';
      gameStarting(15, 15, minesAmmount);
    } else if (difficult === 'hard') {
      bodyHTML.innerHTML = '';
      gameStarting(25, 25, minesAmmount);
    } else {
      bodyHTML.innerHTML = '';
      gameStarting(10, 10, minesAmmount);
    }
    const restartSound = new Audio('sounds/restart.mp3');
    restartSound.play();
  });

  function localStorageSaving() {
    localStorage.setItem('arrClicks', JSON.stringify(arrClicks));
    localStorage.setItem('arrTimes', JSON.stringify(arrTimes));
  }

  function windowWinnig() {
    const windowWinner = document.createElement('div');
    windowWinner.classList.add('windowWinner');
    windowWinner.innerText = `Hooray! You found all mines in ${timeDisplay.textContent} and ${countClick} moves!`;
    if (arrClicks.length === 10 && arrTimes.length === 10) {
      arrClicks.unshift(countClick);
      arrClicks.splice(9, 1);
      arrTimes.unshift(timeDisplay.textContent);
      arrTimes.splice(9, 1);
    } else {
      arrClicks.unshift(countClick);
      arrTimes.unshift(timeDisplay.textContent);
    }
    localStorageSaving();
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
    const choiseAmmountMines = document.createElement('label');
    choiseAmmountMines.classList.add('choiseAmmountMines');
    choiseAmmountMines.innerText = 'Ammount mines';
    choiseAmmountMines.htmlFor = 'ammount';
    const selectAmmount = document.createElement('select');
    selectAmmount.classList.add('selectAmmount');
    selectAmmount.id = 'ammount';
    selectAmmount.name = 'ammount';
    for (let i = 10; i <= 99; i += 1) {
      const optionTag = document.createElement('option');
      optionTag.value = i;
      optionTag.innerText = `${i}`;
      selectAmmount.append(optionTag);
    }
    choiseAmmountMines.append(selectAmmount);
    const containerButttons = document.createElement('div');
    containerButttons.classList.add('containerButttons');
    const buttonEasy = document.createElement('button');
    buttonEasy.classList.add('buttonEasy');
    buttonEasy.innerText = '10x10 cells';
    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('buttonMedium');
    buttonMedium.innerText = '15x15 cells';
    const buttonHard = document.createElement('button');
    buttonHard.classList.add('buttonHard');
    buttonHard.innerText = '25x25 cells';

    containerButttons.append(buttonEasy);
    containerButttons.append(buttonMedium);
    containerButttons.append(buttonHard);
    windDifficult.append(containerButttons);
    windDifficult.append(choiseAmmountMines);
    bodyHTML.prepend(windDifficult);

    const choseDifficultSound = new Audio('sounds/difficultChose.mp3');

    buttonEasy.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(10, 10, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'easy';
    });
    buttonMedium.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(15, 15, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'medium';
    });
    buttonHard.addEventListener('click', () => {
      choseDifficultSound.play();
      bodyHTML.innerHTML = '';
      gameStarting(25, 25, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'hard';
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

  scoreButton.addEventListener('click', () => {
    const scoreSound = new Audio('sounds/score.mp3');
    scoreSound.play();
    const windowScore = document.createElement('div');
    windowScore.classList.add('windowScore');
    const buttonCloseScore = document.createElement('button');
    buttonCloseScore.classList.add('buttonCloseScore');
    buttonCloseScore.innerText = 'Close';
    windowScore.append(buttonCloseScore);
    if (JSON.parse(localStorage.getItem('arrClicks')) !== null) {
      arrClicks = JSON.parse(localStorage.getItem('arrClicks'));
    }
    if (JSON.parse(localStorage.getItem('arrTimes')) !== null) {
      arrTimes = JSON.parse(localStorage.getItem('arrTimes'));
    }
    for (let i = 0; i < arrClicks.length; i += 1) {
      const lineScore = document.createElement('div');
      lineScore.classList.add('lineScore');
      windowScore.append(lineScore);
      lineScore.innerText = `${i + 1}. ${arrClicks[i]} clicks for ${arrTimes[i]}`;
    }
    bodyHTML.append(windowScore);
    buttonCloseScore.addEventListener('click', () => {
      const closeScoreSound = new Audio('sounds/closeScore.mp3');
      closeScoreSound.play();
      windowScore.remove();
    });
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
      timeDisplay.innerHTML = `${hour} :  0${minute} : 0${second}`;
    } else if (minute < 10 && second > 10) {
      timeDisplay.innerHTML = `${hour} :  0${minute} : ${second}`;
    } else if (minute > 10 && second < 10) {
      timeDisplay.innerHTML = `${hour} :  ${minute} : 0${second}`;
    } else if (minute > 10 && second > 10) {
      timeDisplay.innerHTML = `${hour} :  ${minute} : ${second}`;
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
        countClick += 1;
        clickDisplay.innerText = `Clicks: ${countClick}`;
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
