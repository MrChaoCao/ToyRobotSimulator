import Robot from './Robot'

export default class Simulator {
  constructor(){
    this.commands = document.getElementById('command-list').value.split('\n');
    this.toyRobot = new Robot(0, 0, 0);
    this.placed = false;
    this.executeCommands();
  }

  executeCommands(){
    while (this.commands.length > 0) {
      let nextLine = this.commands.shift();
      let nextCommand = this.inputToCommand(nextLine)
    }
  }

  inputToCommand(userInput){
    const simpleCommands = {
      'MOVE': () => this.toyRobot.interpretMove(),
      'LEFT': () => this.toyRobot.interpretRotate('LEFT'),
      'RIGHT': () => this.toyRobot.interpretRotate('RIGHT'),
      'REPORT': () => this.toyRobot.report()
    }

    if (simpleCommands.hasOwnProperty(userInput)) {
      simpleCommands[userInput]()
    }
  }
}
