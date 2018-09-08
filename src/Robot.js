export default class Robot {
  constructor(x, y, f) {
      this.x = x;
      this.y = y;
      this.f = f;

      this.cardinalDirections = {
        0: [0, 1],
        90: [1, 0],
        180: [0, -1],
        270: [-1, 0]
      }

      this.relativeDirections = {
        'RIGHT': 90,
        'LEFT': -90
      }

      this.toyRobot = document.getElementById('robotToy');
    }

  interpretMove() {
    const posChange = this.cardinalDirections[this.f]
    const newX = this.x + posChange[0]
    const newY = this.y + posChange[1]
    this.updatePosition(newX, newY, this.f)
  }

  interpretRotate(leftright) {
    let newF = this.f + this.relativeDirections[leftright]

    if (newF >= 360) {
      newF -= 360
    } else if (newF < 0) {
      newF += 360
    }

    this.updatePosition(this.x, this.y, newF)
  }

  updatePosition(newX, newY, newF){
    if (this._validMove(newX, newY, newF)){
      this.x = newX;
      this.y = newY;
      this.f = newF;
      console.log('moving!');
      this.render()
    }
  }

  report(){
    console.log(this.x, this.y, this.f);
  }

  render(){
    this.bodyMarginY = 8;
    this.bodyMarginX
    document.getElementById('robotToy').style.left = `${this.x * 30 + 1}px`;
    document.getElementById('robotToy').style.bottom = `${this.y * 30}px`;
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
        // && this.cardinalDirections.hasOwnProperty(newF)
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
