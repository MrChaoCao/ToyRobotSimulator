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
    console.log('I HEAR YOU');
    const Simulation = new Simulator();
  })

  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    // document.getElementById('robotToy').style.visibility = 'hidden'
    console.log('hiding');
    // Robot._hideRobot();
    // commandList.value = '';
    // const Simulation = new Simulator();
    location.reload();
  })
})
