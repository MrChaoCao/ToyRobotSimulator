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

  // Update these methods once we restructure our commands, we should be
  // making sure the robot refreshes intuitively.
  const run = document.getElementById('run');
  run.addEventListener('click', () => {
    Robot._hideRobot();
    const commandList = document.getElementById('command-list')
    const Simulation = new Simulator(commandList);
  })

  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    // document.getElementById('robotToy').style.visibility = 'hidden'
    // console.log('hiding');
    // Robot._hideRobot();
    // commandList.value = '';
    // const Simulation = new Simulator();
    location.reload();
  })
})
