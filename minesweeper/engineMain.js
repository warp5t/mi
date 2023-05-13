const cellElement = document.createElement('div');
const bodyHTML = document.getElementById('body');
cellElement.classList.add('field');
bodyHTML.append(cellElement);

function cellCreating(cellCount) {
  for (let i = 0; cellCount > i; i += 1) {
    const cellUnit = document.createElement('p');
    cellUnit.classList.add('cell');
    cellElement.append(cellUnit);
  }
}

function bombRandoming(arr, bmbsCount, ammountPiles) {
  while (arr.length < bmbsCount) {
    const randomNumber = Math.floor(Math.random() * ammountPiles) + 1;
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  }
}

function gameStarting(width, height, ammountsBomb) {
  //const field = document.querySelector('.field');
  const cellsCount = width * height;
  cellCreating(cellsCount);
  const cells = document.querySelectorAll('.cell');
  const arrCells = [...cells];

  const bombs = [];
  bombRandoming(bombs, ammountsBomb, cellsCount);

  function isBomb(row, column) {
    const index = row * width + column;

    return bombs.includes(index);
  }

  function open(row, column) {
    const index = row * width + column;
    const cell = cells[index];

    cell.disabled = true;

    if (isBomb(row, column)) {
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
      cells[index].classList.add('check');
      const column = index % width;
      const row = (index - column) / width;
      open(row, column);
    }
  });
}

gameStarting(8, 8, 15);
