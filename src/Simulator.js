import Robot from './Robot'

export default class Simulator {
  constructor(){
    this.commands = document.getElementById('command-list').value.split('\n');
    this.toyRobot = new Robot(0, 0, 0);
    this.placed = false;
    this.executeCommands();
  }

  executeCommands(){
    setInterval( () => {
      if (this.commands.length > 0) {
        let nextLine = this.commands.shift();
        let nextCommand = this.inputToCommand(nextLine)
      }
    }, 500);
  }

  inputToCommand(userInput){
    const simpleCommands = {
      'MOVE': () => this.toyRobot.interpretMove(),
      'LEFT': () => this.toyRobot.interpretRotate('LEFT'),
      'RIGHT': () => this.toyRobot.interpretRotate('RIGHT'),
      'REPORT': () => this.toyRobot.report()
    }

    if (this.placed && simpleCommands.hasOwnProperty(userInput)) {
      simpleCommands[userInput]()
    } else if (this.validPlaceCommand(userInput)) {
      this.makePlaceCommand(userInput)
      if (!this.placed) {
        this.placed = true;
        this.toyRobot._unHideRobot();
      }
    }
  }

  validPlaceCommand(placeCommand){
    if (!placeCommand.includes('PLACE ')){
      return false
    }

    const inputCommand = placeCommand.split(' ')
    const placeLocation = inputCommand[1].split(',')

    this.placeX = parseInt(placeLocation[0])
    this.placeY = parseInt(placeLocation[1])
    this.placeF = parseInt(placeLocation[2])

    return (
      inputCommand[0] === 'PLACE'
        && placeLocation.length === 3
        && this.toyRobot.cardinalDirections.hasOwnProperty(this.placeF)
    )
  }

  makePlaceCommand(){
    this.toyRobot.updatePosition(this.placeX,this.placeY,this.placeF)
  }

}
