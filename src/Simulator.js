import Robot from './Robot'

export default class Simulator {
  constructor(commandList){
    this.commands = commandList.split('\n');
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

    this.robotSprite = document.getElementById('robotToy')
  }

  executeCommands(){
    setInterval( () => {
      if (this.commands.length > 0) {
        this.commandRouter(this.commands.shift());
        this.render();
      }
    }, 500);
  }

  render(){
    this.robotSprite.style.left = `${this.toyRobot.xCo * 8}vmin`;
    this.robotSprite.style.bottom = `${this.toyRobot.yCo * 8}vmin`;
    this.robotSprite.style.transform = `rotate(${this.toyRobot.fCo}deg)`
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

  placeParser(placeCommandArray){
    const newX = parseInt(placeCommandArray[2]);
    const newY = parseInt(placeCommandArray[3]);
    const newF = parseInt(this.cardinalDirections[ placeCommandArray[4].toLowerCase() ]);
    return [newX, newY, newF]
  }

  placeCommandCenter(placeCommandArray){
    const location = this.placeParser(placeCommandArray)
    if (this.placed) {
      this.toyRobot.updatePosition(...location)
    } else {
      this._unHideRobot();
      this.toyRobot.updatePosition(...location)
      this.animationsOn();
      this.placed = true
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
    const robotF = this.toyRobot._normalizeAngle(reportObject.facing)
    const reportF = this._getKeyByValue(this.cardinalDirections, robotF)
    const reportText = `I am at ${reportObject.xCoord}, ${reportObject.yCoord}, facing ${reportF}`;
    this._renderReport(reportText)
  }

  _renderReport(reportText){
    document.getElementById('robo-report').innerHTML = reportText;
  }


  _getKeyByValue(object, value){
    return Object.keys(object).find(
      key => object[key] === value
    );
  }

  _unHideRobot(){
    document.getElementById('robotToy').style.visibility = 'visible'
  }

  animationsOn(){
    this.robotSprite.style.transition = '0.5s'
  }
}
