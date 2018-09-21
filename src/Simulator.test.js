import Simulator from './Simulator'
import Robot from './Robot'

const testRobot = new Robot(0,0,0);
const testSim = new Simulator();

describe('', () => {
  test('reportCommand method calls Robot report function and receives robot\'s location data', () => {

  });
  test('left command calls rotateCommand function with -90', () => {

  });
  test('right command calls rotateCommand function with 90', () => {

  });
  test('move command calls Robot rotateCommand function with "right" ', () => {

  });
});


describe('', () => {
  test('placeCommandCenter calls Robot.updatePosition with user input arguments', () => {

  });
});

describe('', () => {
  const listOfCommands = [
    ''
  ]
  test('Commmand router ignores all commands until a valid place command is made', () => {

  });
  test('Commmand router sends simple commands to the simple command router', () => {

  });
  test('Commmand router sends place commands to the place command router', () => {

  });
  test('Command router ignores all strings that do not match', () => {

  });
});
describe.skip('', () => {
  test.skip('', () => {

  });
});
