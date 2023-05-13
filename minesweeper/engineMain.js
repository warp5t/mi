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

function gameStarting(width, height, ammountsBomb) {
  //const field = document.querySelector('.field');
  const cellsCount = width * height;
  cellCreating(cellsCount);
  const cells = document.querySelectorAll('.cell');
  const arrCells = [...cells];
  console.log(cells);

  bodyHTML.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      const index = arrCells.indexOf(event.target);
      console.log(index, 'indexOf');
      const clickSound = new Audio('notification.wav');
      clickSound.play();
    }
  });
}

gameStarting(8, 8, 10);
