export default class Robot {
  constructor(x, y, f) {
      this.x = x;
      this.y = y;
      this.f = f;

      this.moveInstructions = {
        0: [0, 1],
        90: [1, 0],
        180: [0, -1],
        270: [-1, 0]
      }
      this.toyRobot = document.getElementById('robotToy');
    }

  interpretMove() {
    const posChange = this.moveInstructions[this.f]
    const newX = this.x + posChange[0]
    const newY = this.y + posChange[1]
    this.updatePosition(newX, newY, this.f)
  }

  rotate(degrees){
    let newF = this.f + degrees
    this.updatePosition(this.x, this.y, newF)
  }

  updatePosition(newX, newY, newF){
    if (this._validMove(newX, newY, newF)){
      this.x = newX;
      this.y = newY;
      this.f = newF;
      this.render()
    }
  }

  report(){
    console.log(`I am at ${this.x}, ${this.y}, facing ${this.f % 360}`);
  }

  render(){
    this._unHideRobot();
    document.getElementById('robotToy').style.left = `${this.x * 30 + 1}px`;
    document.getElementById('robotToy').style.bottom = `${this.y * 30}px`;
    document.getElementById('robotToy').style.transform = `rotate(${this.f}deg)`
  }

  static _hideRobot(){
    document.getElementById('robotToy').style.visibility = 'hidden'
  }

  _unHideRobot(){
    document.getElementById('robotToy').style.visibility = 'visible'
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
}
