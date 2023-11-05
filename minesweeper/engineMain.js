let loose = false;
let minesAmmount = 10;
let difficult;
let arrClicks = [];
let arrTimes = [];
let mutting = false;
let flagCount = 0;

let timeSave = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

let copyCells = '';

function gameStarting(width, height, ammountsBomb) {
  let containerCells = document.createElement('div');
  const containerField = document.createElement('div');
  const bodyHTML = document.getElementById('body');
  const scoreFlagMode = document.createElement('div');
  scoreFlagMode.classList.add('scoreFlagMode');
  const scoreButton = document.createElement('button');
  scoreButton.innerText = 'Score';
  scoreButton.classList.add('buttonStyle');
  const buttonFlag = document.createElement('button');
  buttonFlag.classList.add('buttonStyle');
  buttonFlag.innerText = `Mode flag: ${flagCount}`;
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
  saveLoadMuteContainer.classList.add('saveLoadMuteContainer');
  const buttonSave = document.createElement('button');
  buttonSave.classList.add('buttonStyle');
  buttonSave.innerText = 'Save';
  const buttonLoad = document.createElement('button');
  buttonLoad.classList.add('buttonStyle');
  buttonLoad.innerText = 'Load';
  const buttonMute = document.createElement('button');
  buttonMute.classList.add('buttonStyle');
  const buttonColorTheme = document.createElement('button');
  buttonColorTheme.classList.add('buttonStyle');
  buttonColorTheme.innerText = 'Dark Theme';

  if (mutting === true) {
    buttonMute.classList.add('buttonRestyle');
  }
  buttonMute.innerText = 'Mute';
  saveLoadMuteContainer.append(buttonSave);
  saveLoadMuteContainer.append(buttonLoad);
  saveLoadMuteContainer.append(buttonMute);

  timeClickContainer.classList.add('timeClickContainer');
  timeClickContainer.append(clickDisplay);
  timeClickContainer.append(timeDisplay);

  containerField.prepend(containerCells);
  containerField.prepend(optionMode);
  containerField.prepend(scoreFlagMode);
  containerField.prepend(saveLoadMuteContainer);
  containerField.prepend(timeClickContainer);
  containerField.prepend(buttonColorTheme);
  containerField.classList.add('containerField');
  containerCells.classList.add('containerCells');
  bodyHTML.prepend(containerField);

  function cellCreating(cellCount) {
    for (let i = 0; cellCount > i; i += 1) {
      const cellUnit = document.createElement('p');
      cellUnit.classList.add('cell');
      containerCells.append(cellUnit);
    }
  }

  containerCells.style.setProperty('--columnAmmount', height);

  const cellsCount = width * height;
  cellCreating(cellsCount);
  let countCellOpen = cellsCount - ammountsBomb;
  
  let cells;
  let arrCells;

  function cellsReturn() {
    cells = document.querySelectorAll('.cell');
    arrCells = [...cells];
    return arrCells
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

  class Time {
    constructor() {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
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

  function localStorageSaving() {
    localStorage.setItem('arrClicks', JSON.stringify(arrClicks));
    localStorage.setItem('arrTimes', JSON.stringify(arrTimes));
    localStorage.setItem('timeSave', JSON.stringify(timeSave));
    localStorage.setItem('mutting', JSON.stringify(mutting));
    localStorage.setItem('difficult', JSON.stringify(difficult));
    localStorage.setItem('countClick', JSON.stringify(countClick));
    localStorage.setItem('flagMode', JSON.stringify(flagMode));
    localStorage.setItem('flagCount', JSON.stringify(flagCount));
    localStorage.setItem('minesAmmount', JSON.stringify(minesAmmount));
    // localStorage.setItem('cells', JSON.stringify(cells));
    localStorage.setItem('cells', JSON.stringify(copyCells));
  }

  function progressLoading() {
    if (JSON.parse(localStorage.getItem('arrClicks')) !== null) {
      arrClicks = JSON.parse(localStorage.getItem('arrClicks'));
    }
    if (JSON.parse(localStorage.getItem('arrTimes')) !== null) {
      arrTimes = JSON.parse(localStorage.getItem('arrTimes'));
    }
    // if (JSON.parse(localStorage.getItem('mutting')) !== null) {
    //   mutting = JSON.parse(localStorage.getItem('mutting'));
    // }
    // if (JSON.parse(localStorage.getItem('difficult')) !== null) {
    //   difficult = JSON.parse(localStorage.getItem('difficult'));
    // }
    if (JSON.parse(localStorage.getItem('countClick')) !== null) {
      countClick = JSON.parse(localStorage.getItem('countClick'));
    }
    if (JSON.parse(localStorage.getItem('timeSave')) !== null) {
      timeSave = JSON.parse(localStorage.getItem('timeSave'));
    }
    // if (JSON.parse(localStorage.getItem('flagMode')) !== null) {
    //   flagMode = JSON.parse(localStorage.getItem('flagMode'));
    // }
    // if (JSON.parse(localStorage.getItem('arrCells')) !== null) {
    //   arrCells = JSON.parse(localStorage.getItem('arrCells'));
    // }
    // if (JSON.parse(localStorage.getItem('minesAmmount')) !== null) {
    //   minesAmmount = JSON.parse(localStorage.getItem('minesAmmount'));
    // }
  }

  buttonMute.addEventListener('click', () => {
    buttonMute.classList.toggle('buttonRestyle');
    if (mutting === false) {
      mutting = true;
    } else if (mutting === true) {
      mutting = false;
    }
  });

  function restart() {
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
    if (mutting === false) {
      const restartSound = new Audio('sounds/restart.mp3');
      restartSound.play();
    }
  }

  buttonRestart.addEventListener('click', () => {
    restart()
  });

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
    localStorage.setItem('arrClicks', JSON.stringify(arrClicks));
    localStorage.setItem('arrTimes', JSON.stringify(arrTimes));
    const buttonWinner = document.createElement('button');
    buttonWinner.classList.add('buttonWinner');
    buttonWinner.innerText = 'OK';
    windowWinner.append(buttonWinner);
    bodyHTML.appendChild(windowWinner);

    buttonWinner.addEventListener('click', () => {
      bodyHTML.innerHTML = '';
      if (mutting === false) {
        const bleepSound = new Audio('sounds/bleep-sound.mp3');
        bleepSound.play();
      }
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
    for (let i = 1; i <= 99; i += 1) {
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
      if (mutting === false) {
        choseDifficultSound.play();
      }
      bodyHTML.innerHTML = '';
      gameStarting(10, 10, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'easy';
      if (bodyHTML.offsetWidth > 320) {
        bodyHTML.style.justifyContent = 'center';
      }
    });
    buttonMedium.addEventListener('click', () => {
      if (mutting === false) {
        choseDifficultSound.play();
      }
      bodyHTML.innerHTML = '';
      gameStarting(15, 15, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'medium';
      if (bodyHTML.offsetWidth < 645) {
        bodyHTML.style.justifyContent = 'start';
      }
    });
    buttonHard.addEventListener('click', () => {
      if (mutting === false) {
        choseDifficultSound.play();
      }
      bodyHTML.innerHTML = '';
      gameStarting(25, 25, selectAmmount.value);
      minesAmmount = selectAmmount.value;
      difficult = 'hard';
      console.log(bodyHTML.offsetWidth);
      if (bodyHTML.offsetWidth < 1040) {
        bodyHTML.style.justifyContent = 'start';
      }
    });

    const diffcultSound = new Audio('sounds/difficult.mp3');
    if (mutting === false) {
      diffcultSound.play();
    }
  });

  function flagBtnRecoloring() {
    buttonFlag.classList.toggle('buttonRestyle');
    const soundModeFlag = new Audio('sounds/modeFlag.mp3');
    if (mutting === false) {
      soundModeFlag.play();
    }
  }

  buttonFlag.addEventListener('click', () => {
    flagBtnRecoloring();
    if (flagMode === true) flagMode = false;
    else if (flagMode === false) flagMode = true;
  });

  scoreButton.addEventListener('click', () => {
    const scoreSound = new Audio('sounds/score.mp3');
    if (mutting === false) {
      scoreSound.play();
    }
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
      if (mutting === false) {
        closeScoreSound.play();
      }
      windowScore.remove();
    });
  });

  function openCellChecking(countCellOpen) {
    if (countCellOpen === 1) {
      const winnerSound = new Audio('sounds/win.mp3');
      if (mutting === false) {
        winnerSound.play();
      }
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
      if (mutting === false) {
        explSound.play();
      }
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
        if (mutting === false) {
          clickSound.play();
        }
        permisStepSound = false;
      }
      return;
    }
    if (count === 0) {
      if (permisBonusSound === true) {
        const bonusSound = new Audio('sounds/bonus.wav');
        if (mutting === false) {
          bonusSound.play();
        }
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

  function clickCellsListening(node, arrCellsArg) {
    node.addEventListener('click', (event) => {
      if (event.target.tagName === 'P') {
        const index = arrCellsArg.indexOf(event.target);
        console.log(index, ' - index')
        if (cells[index].disabled !== true) {
          countClick += 1;
        }
        if (permisSpreadBomb === true) {
          bombRandoming(bombs, ammountsBomb, cellsCount, index);
          permisSpreadBomb = false;
          console.log(bombs,'- arr', ammountsBomb,'- bmbsCount', cellsCount,'- ammountPiles', index,'- indexFirstStep')
        }
        const column = index % width;
        const row = (index - column) / width;
        if (flagMode === true) {
          if (cells[index].disabled !== true) {
            const imageFlag = document.createElement('img');
            imageFlag.src = 'flag.png';
            arrCellsArg[index].appendChild(imageFlag);
            flagCount += 1;
            buttonFlag.innerText = `Mode flag: ${flagCount}`;
            imageFlag.addEventListener('click', (evnt) => {
              flagCount -= 1;
              buttonFlag.innerText = `Mode flag: ${flagCount}`;
              evnt.target.remove();
              if (mutting === false) {
                const removeFlagSound = new Audio('sounds/removeFlag.mp3');
                removeFlagSound.play();
              }
            });
            if (mutting === false) {
              const flagSound = new Audio('sounds/flag.mp3');
              flagSound.play();
            }
          }
        } else if (flagMode === false) {
          clickDisplay.innerText = `Clicks: ${countClick}`;
          cellOpening(row, column);
        }
        permisBonusSound = true;
        permisStepSound = true;
      }
    });
  }
  clickCellsListening(containerCells, cellsReturn());

  // let copyField = containerCells.cloneNode(true);
  
  

  buttonSave.addEventListener('click', () => {
    timeSave.seconds = time.seconds;
    timeSave.minutes = time.minutes;
    timeSave.hours = time.hours;
    copyCells = containerCells.innerHTML;
    localStorageSaving();
    // copyField = containerCells.cloneNode(true);
    console.log(copyCells)
    if (mutting === false) {
      const saveSound = new Audio('sounds/save.mp3');
      saveSound.play();
    }
  });

let countRestart = 0;

function createCells() {
  containerCells = document.createElement('div');
  containerCells.classList.add('containerCells')
  containerCells.style.setProperty('--columnAmmount', height);
  // cellCreating(cellsCount);
  containerCells.innerHTML = JSON.parse(localStorage.getItem('cells'));
  containerField.appendChild(containerCells);
    // containerCells.appendChild(containerCells)
    clickCellsListening(containerCells, cellsReturn());
}

  buttonLoad.addEventListener('click', () => {
   
      progressLoading();
      time.seconds = timeSave.seconds;
      time.minutes = timeSave.minutes;
      time.hours = timeSave.hours;
      clickDisplay.innerText = `Clicks: ${countClick}`;
      containerCells.removeEventListener('click', clickCellsListening);
      containerCells.remove();
      // const copyFragment = document.createElement('div');
      // copyFragment.classList.add('containerCells')
      // copyFragment.style.setProperty('--columnAmmount', height);
      // copyFragment.innerHTML = JSON.parse(localStorage.getItem('cells'));
      // containerField.appendChild(copyFragment)
      // clickCellsListening(copyFragment, cellsReturn());

      createCells()
      if (mutting === false) {
        const loadSound = new Audio('sounds/load.mp3');
        loadSound.play();
      }
      countRestart++;

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
        if (mutting === false) {
          bleepSound.play();
        }
        gameStarting(10, 10, 10);
      });
    }
  }

  function themeChanging() {
    scoreButton.classList.toggle('buttonDark');
    buttonFlag.classList.toggle('buttonDark');
    buttonRestart.classList.toggle('buttonDark');
    buttonDifficult.classList.toggle('buttonDark');
    buttonSave.classList.toggle('buttonDark');
    buttonLoad.classList.toggle('buttonDark');
    buttonMute.classList.toggle('buttonDark');
    buttonColorTheme.classList.toggle('buttonDark');

    containerCells.classList.toggle('containerFieldDark');

    timeDisplay.classList.toggle('displayClickContainerDark');
    clickDisplay.classList.toggle('displayClickContainerDark');

    bodyHTML.classList.toggle('bodyDark');

    const cellCopyes = document.querySelectorAll('.cell');
    cellCopyes.forEach((element) => {
      if (element.className.slice(0, -1) !== 'cell colorCode') {
        element.classList.toggle('cellDark');
      }
    });
  }

  buttonColorTheme.addEventListener('click', () => {
    themeChanging();
    if (mutting === false) {
      const colorThemeSound = new Audio('sounds/theme.mp3');
      colorThemeSound.play();
    }
  });

  setInterval(() => {
    time.timeCounting();
    if (loose === true) {
      setTimeout(() => {
        windowLoosing();
        loose = false;
      }, 1400);
    }
  }, 1000);
}

gameStarting(10, 10, 10);
