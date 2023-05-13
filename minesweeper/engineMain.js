const cellElement = document.createElement('div');
const bodyHTML = document.getElementById('body');
cellElement.classList.add('field');
bodyHTML.append(cellElement);

function cellCreating(cellCount) {
  for (let i = 0; cellCount > i; i += 1) {
    const cellUnit = document.createElement('div');
    cellUnit.classList.add('cell');
    cellElement.append(cellUnit);
  }
}

function gameStarting(width, height, ammountsBomb) {
  //const field = document.querySelector('.field');
  const cellsCount = width * height;
  cellCreating(cellsCount);
}

gameStarting(8, 8, 10);
