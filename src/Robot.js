export default class Robot {
  constructor(x, y, f) {
      this.x = x;
      this.y = y;
      this.f = f;

      this.cardinalDirections = {
        'North': [0, 1],
        'South': [0, -1],
        'East': [1, 0],
        'West': [-1, 0]
      }
    }

  interpretMove() {
    const posChange = this.cardinalDirections[this.f]
    const newX = this.x + posChange[0]
    const newY = this.y + posChange[1]
    this.updatePosition(newX, newY, this.f)
  }

  updatePosition(newX, newY, newF){
      this.x = newX;
      this.y = newY;
      this.f = newF;
  }

  report(){
    console.log(this.x, this.y, this.f);
  }
}
