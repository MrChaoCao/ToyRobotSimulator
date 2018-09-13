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
  }

  executeCommands(){
    setInterval( () => {
      if (this.commands.length > 0) {
        let nextLine = this.commands.shift();
        // let nextCommand = this.inputToCommand(nextLine)
        let nextCommand = this.commandRouter(nextLine)
      }
    }, 500);
  }

  commandRouter(command){
    const simpleCommandArray = /(move|left|right|report)/i.exec(command);
    const placeCommandArray = /(place) ([0-4]),([0-4]),(north|east|south|west)/i.exec(command);

    if (!this.placed) {
      if (placeCommandArray) {
        this.placeCommandCenter(placeCommandArray)
      }
    } else {
      if (simpleCommandArray) {
        this.simpleCommandCenter(simpleCommandArray[1])
      } else if (placeCommandArray) {
        this.placeCommandCenter(placeCommandArray)
      }
    }
  }

  simpleCommandCenter(simpleCommand){
    const simpleCommands = {
      'move': () => this.toyRobot.interpretMove(),
      'left': () => this.toyRobot.interpretRotate('LEFT'),
      'right': () => this.toyRobot.interpretRotate('RIGHT'),
      'report': () => this.toyRobot.report()
    }
    console.log('here');
    simpleCommands[simpleCommand]()
  }

  placeCommandCenter(placeCommandArray){
    const newX = parseInt(placeCommandArray[2]);
    const newY = parseInt(placeCommandArray[3]);
    console.log(placeCommandArray[4]);
    const newF = parseInt(this.cardinalDirections[placeCommandArray[4]]);
    console.log(newF);
    this.toyRobot.updatePosition(newX, newY, newF);
    this.placed = true
  }

  commandParser(input){
    // const moveCommand = /\s+?move\s+?/i;
    // const leftCommand = /\s+?left\s+?/i;
    // const rightCommand = /\s+?right\s+?/i;
    // const reportCommand = /\s+?report\s+?/i;
    // const simpleCommand = /(move|left|right|report)/i;
    // const placeCommand = /(place) ([0-4]),([0-4]),(north|east|south|west)/i;
    //   // const newX = parseInt(placeCommand.exec(input)[2]);
    //   // const newY = parseInt(placeCommand.exec(input)[3]);
    //   // const newF = this.cardinalDirections[placeCommand.exec(input)[4]]
    //
    // console.log(simpleCommand.exec(input)[1]);
    // // console.log('chao', newX, newY, newF);
    //
    // if (!this.placed) {
    //   if (placeCommand.exec(input)) {
    //     // console.log('first');
    //     // console.log(newX, newY, newF);
    //     this.noTransitionPlaceCommand(newX, newY, newF);
    //   }
    // } else {
    //   // if it's a legal command, make that command
    //   console.log('second');
    //   if (moveCommand.test(input)) {
    //     this.toyRobot.interpretMove();
    //   } else if (leftCommand.test(input)) {
    //     this.toyRobot.interpretRotate('LEFT');
    //   } else if (rightCommand.test(input)) {
    //     this.toyRobot.interpretRotate('RIGHT');
    //   } else if (reportCommand.test(input)) {
    //     this.toyRobot.report();
    //   } else if (placeCommand.exec(input)) {
    //     // console.log(newX, newY, newF);
    //     this.makePlaceCommand(newX, newY, newF);
    //   }
    }
    // let simpleRegex = /move|left|right|report/i
    // let simpleCommands = simpleRegex.test(input)
    // console.log(simpleCommands);
    //
    // let commandInputs = placeRegex.exec(input)
    // console.log(commandInputs);

    // if (commandInputs) {
    //   this.toyRobot.updatePosition(commandInputs[2], commandInputs[3], commandInputs[4]);
    // }
    //
    // if (simpleCommands) {
    //   console.log('simple!');
    // }
  // }

//gut this, replace it with a different call for each command case
  // inputToCommand(userInput){
  //   const simpleCommands = {
  //     'MOVE': () => this.toyRobot.interpretMove(),
  //     'LEFT': () => this.toyRobot.interpretRotate('LEFT'),
  //     'RIGHT': () => this.toyRobot.interpretRotate('RIGHT'),
  //     'REPORT': () => this.toyRobot.report()
  //   }
  //
  //   if (this.placed && simpleCommands.hasOwnProperty(userInput)) {
  //     simpleCommands[userInput]()
  //   } else if (this.validPlaceCommand(userInput)) {
  //     if (!this.placed) {
  //       this.placed = true;
  //       this.noTransitionPlaceCommand(userInput)
  //     } else {
  //       this.makePlaceCommand(userInput)
  //     }
  //   }
  // }

//gut this and entirely replace it with regex
  // validPlaceCommand(command){
  //   // if (!this._isPlaceCommand(command)){
  //   //   return false
  //   // }
  //   if (!command.includes('PLACE ')){
  //     return false
  //   }
  //
  //   const inputCommand = command.split(' ')
  //   const placeLocation = inputCommand[1].split(',')
  //
  //   this.placeX = parseInt(placeLocation[0])
  //   this.placeY = parseInt(placeLocation[1])
  //   this.placeF = parseInt(this._directionParser(placeLocation[2]))
  //
  //   return (
  //     inputCommand[0] === 'PLACE'
  //       && placeLocation.length === 3
  //       && this.placeX <= 4
  //       && this.placeY <= 4
  //       && this.toyRobot.cardinalDirections.hasOwnProperty(this.placeF)
  //   )
  // }

//add this as part of the place case
  // intialPlaceCommand(newX, newY, newF){
  //   //toggle animation
  //   this.makePlaceCommand(newX, newF, newY);
  //   //toggle animation
  //   this.placed = true;
  // }

  // makePlaceCommand(newX, newY, newF){
  //   // console.log('third');
  //   // console.log(newX, newY, newF);
  //   this.toyRobot.updatePosition(newX, newY, newF);
  // }

  // makePlaceCommand(){
  //   this.toyRobot.updatePosition(this.placeX,this.placeY,this.placeF)
  // }

//change the transition monitoring to the robot
  // noTransitionPlaceCommand(newX, newY, newF){
  //   // console.log('third minus 0.5');
  //   document.getElementById('robotToy').style.transition = '0s'
  //   this.makePlaceCommand(newX, newY, newF)
  //   document.getElementById('robotToy').style.transition = '0.5s'
  //   this.placed = true;
  // }

  // _directionParser(directionCommand){
  //   return(
  //     Object.keys(this.toyRobot.cardinalDirections).find(
  //       key => this.toyRobot.cardinalDirections[key][2] === directionCommand
  //     )
  //   )
  // }
}

/* ----- GRAVEYARD -------

  // gutted in favor of regex
    _directionParser(directionCommand){
      return(
        Object.keys(this.toyRobot.cardinalDirections).find(
          key => this.toyRobot.cardinalDirections[key][2] === directionCommand
        )
      )
    }

  _isPlaceCommand(command){
    if (command.includes('PLACE ')){
      return true
    }
  }

  _validPlaceParameters(command){
    const inputCommand = command.split(' ')
    const placeLocation = inputCommand[1].split(',')

    this.placeX = parseInt(placeLocation[0])
    this.placeY = parseInt(placeLocation[1])
    this.placeF = parseInt(this._directionParser(placeLocation[2]))

    return (
      inputCommand[0] === 'PLACE'
        && placeLocation.length === 3
        && this.placeX <= 4
        && this.placeY <= 4
        && this.toyRobot.cardinalDirections.hasOwnProperty(this.placeF)
    )
  }
*/
