import Robot from './Robot';
import Simulator from './Simulator'

document.addEventListener("DOMContentLoaded", () => {
  const commandList = document.getElementById('command-list')
  const board = document.getElementById('board');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const ul = document.createElement('ul');
    ul.id = i;

    for (let j = 0; j < 5; j++) {
      const li = document.createElement('li');
      li.classList.add(`${j}`);
      ul.append(li);
    }

    fragment.append(ul);
  }

  board.append(fragment);

  const run = document.getElementById('run');
  run.addEventListener('click', () => {
    const commandList = document.getElementById('command-list').value
    const Simulation = new Simulator(commandList);
  })

  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    location.reload();
  })
})
