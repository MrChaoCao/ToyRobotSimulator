export default class Robot {
  constructor(x, y, f) {
      this.x = x;
      this.y = y;
      this.f = f;
    }

  report(){
    console.log('hey, what is up?');
  }
}
