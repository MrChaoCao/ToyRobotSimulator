export default class Robot {
  constructor(xCoordinate, yCoordinate, facing) {
      this.xCo = xCoordinate;
      this.yCo = yCoordinate;
      this.fCo = facing;

      this.moveInstructions = {
        0: [0, 1],
        90: [1, 0],
        180: [0, -1],
        270: [-1, 0]
      }
      this.toyRobot = document.getElementById('robotToy');
    }

  interpretMove() {
    const posChange = this.moveInstructions[this.fCo]
    const newX = this.xCo + posChange[0]
    const newY = this.yCo + posChange[1]
    this.updatePosition(newX, newY, this.fCo)
  }

  rotate(degrees){
    let newF = this.fCo + degrees
    this.updatePosition(this.xCo, this.yCo, newF)
  }

  updatePosition(newX, newY, newF){
    if (this._validMove(newX, newY, newF)){
      this.xCo = newX;
      this.yCo = newY;
      this.fCo = newF;
    }
  }

  report(){
    return(
      {
        xCoord: this.xCoCo,
        yCoord: this.yCo,
        facing: this.fCo
      }
    )
  }

  _validMove(newX, newY, newF){
    return (
      this._inBounds(newX, newY) && this._validInput(newX, newY, newF)
    )
  }

  _validInput(newX, newY, newF){
    return (
      typeof(newX) === 'number'
        && typeof(newY) === 'number'
        && newF % 90 === 0
    )
  }

  _inBounds(newX, newY){
    return (
      newX >= 0
        && newX <= 4
        && newY >= 0
        && newY <= 4
    )
  }

  static _hideRobot(){
    document.getElementById('robotToy').style.visibility = 'hidden'
  }

  _unHideRobot(){
    document.getElementById('robotToy').style.visibility = 'visible'
  }
}
