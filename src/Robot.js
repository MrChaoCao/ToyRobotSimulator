export default class Robot {
  constructor(x, y, f) {
      this.x = x;
      this.y = y;
      this.f = f;
    }

  move(){
    this.x += 1;
    console.log('moving');
  }

  report(){
    console.log(this.x);
  }
}
