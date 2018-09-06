import Robot from './Robot'

export default class Simulator {
  constructor(){
    this.commands = document.getElementById('command-list').value.split('\n');
    this.toyRobot = new Robot(undefined, undefined, undefined);
    console.log(this.toyRobot);
    this.executeCommands();
  }

  executeCommands(){
    while (this.commands.length > 0) {
      let nextCommand = this.commands.shift();
      this.roboCommander(nextCommand)
    }
  }

  roboCommander(command){
    if (command === 'shout') {
      this.toyRobot.report();
    } else {
      console.log('nah');
    }
  }

  speak(){
    console.log('chao');
  }
}
