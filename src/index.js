document.addEventListener("DOMContentLoaded", () => {
  const commandList = document.getElementById('command-list')
  const board = document.getElementById('board');
  const fragment = document.createDocumentFragment();
  // const sim = new Simulator();

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
    Test1.speak();
  })

  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    commandList.value = '';
  })
})
