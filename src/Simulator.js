import Robot from './Robot'

export default class Simulator {
  constructor(){
    this.commands = document.getElementById('command-list').value.split('\n');
    this.toyRobot = new Robot(0, 0, 0);
    this.placed = false;
    this.executeCommands();

    this.cardinalDirections = {
      'north': 0,
      'east': 90,
      'south': 180,
      'west': 270
    }

    this.rotation = {
      'right': 90,
      'left': -90
    }
  }

  executeCommands(){
    setInterval( () => {
      if (this.commands.length > 0) {
        let nextLine = this.commands.shift();
        let nextCommand = this.commandRouter(nextLine)
      }
    }, 500);
  }

  commandRouter(command){
    const simpleCommandArray = /(move|left|right|report)/i.exec(command);
    const placeCommandArray = /(place) ([0-4]),([0-4]),(north|east|south|west)/i.exec(command);

    if (!this.placed) {
      if (placeCommandArray) {
        this.placeCommandCenter(placeCommandArray);
      }
    } else {
      if (simpleCommandArray) {
        this.simpleCommandCenter(simpleCommandArray[1].toLowerCase())
      } else if (placeCommandArray) {
        this.placeCommandCenter(placeCommandArray);
      }
    }
  }

  simpleCommandCenter(simpleCommand){
    const simpleCommands = {
      'move': () => this.toyRobot.interpretMove(),
      'left': () => this.rotateCommand(this.rotation[simpleCommand]),
      'right': () => this.rotateCommand(this.rotation[simpleCommand]),
      'report': () => this.reportCommand()
    }
    simpleCommands[simpleCommand]()
  }

  rotateCommand(degrees){
    this.toyRobot.rotate(degrees)
  }

  reportCommand(){
    const reportObject = this.toyRobot.report()
    const reportF = this.degreeToCardinal(reportObject.facing)
    const reportedText = `I am at ${reportObject.xCoord}, ${reportObject.yCoord}, facing ${reportF}`;
    document.getElementById('robo-report').innerHTML = reportedText;
  }

  degreeToCardinal(degrees){
    let facing;
    if (degrees > 0) {
      facing = degrees % 360
    } else {
      facing = degrees % 360 + 360
    }
    return this.getKeyByValue(this.cardinalDirections, facing);
  }

  getKeyByValue(object, value){
    return Object.keys(object).find(
      key => object[key] === value
    );
  }

  placeCommandCenter(placeCommandArray){
    const newX = parseInt(placeCommandArray[2]);
    const newY = parseInt(placeCommandArray[3]);
    const newF = parseInt(this.cardinalDirections[ placeCommandArray[4].toLowerCase() ]);

    if (this.placed) {
      this.toyRobot.updatePosition(newX, newY, newF)
    } else {
      this.animationsOff();
      this.placed = true
      this.toyRobot.updatePosition(newX, newY, newF)
      this.animationsOn();
    }
  }

  animationsOn(){
    document.getElementById('robotToy').style.transition = '0.5s'
  }
  animationsOff(){
    document.getElementById('robotToy').style.transition = '0s'
  }

}
