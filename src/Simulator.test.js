import Robot from './Robot'
import Simulator from './Simulator'

const testRobot = new Robot(0,0,0);
const testSim = new Simulator('place 0,0,north\n move');

// const jestFn = jest.fn()

describe('simpleCommandCenter properly routes simple commands', () => {
  const rotateSpy = jest.spyOn(Robot.prototype, 'rotate')
  test("reportCommand method calls Robot report function and receives robot's location data", () => {
    // const reportSpy = jest.spyOn(Robot.prototype, 'report')
    // const Robot.report = jest.fn();
    // console.log(testRobot.report);
    // testSim.reportCommand();
    // expect(testRobot.report).toHaveBeenCalled();
  });
  test('left command calls rotateCommand function with -90', () => {
    testSim.simpleCommandCenter('left');
    expect(rotateSpy).toHaveBeenCalledWith(-90);
  });
  test('right command calls rotateCommand function with 90', () => {
    testSim.simpleCommandCenter('right');
    expect(rotateSpy).toHaveBeenCalledWith(90);
  });
  test('move command calls Robot interpretMove function', () => {
    const moveSpy = jest.spyOn(Robot.prototype, 'interpretMove')
    testSim.simpleCommandCenter('move');
    expect(rotateSpy).toHaveBeenCalled();
  });
});


// describe('placeCommandCenter functions properly', () => {
//   test('placeCommandCenter calls Robot.updatePosition with user input arguments', () => {
//     const placeTestSim = new Simulator('place 2,2,west')
//     const placeCommandSpy = jest.spyOn(Simulator.prototype, 'placeCommandCenter')
//     // placeTestSim.commandRouter('place 2,2,west')
//     placeTestSim.executeCommands();
//     expect(placeCommandSpy).toHaveBeenCalledWith(2,2,'west')
//   });
// });

describe('commandRouter functions properly', () => {
  const simpleTestSim = new Simulator('move\nleft\nrigfht\nplace 0,0,west')
  describe('Commmand router ignores all commands until a valid place command is made', () => {
    const simpleCommandSpy = jest.spyOn(Simulator.prototype, 'simpleCommandCenter')
    simpleTestSim.executeCommands()
    expect(simpleCommandSpy).toHaveBeenCalledTimes(0)
  });
  // describe('Commmand router sends simple commands to the simple command router', () => {
  //   const simpleCommandSpy = jest.spyOn(Simulator.prototype, 'simpleCommandCenter')
  //   // const commandRouterTestSim = new Simulator('place 0,0,west\nmove\nmove\nleft\nright\nplace 1,1,east')
  //   // commandRouterTestSim.executeCommands();
  //   commandRouter('left')
  //   expect(simpleCommandSpy).toHaveBeenCalledTimes(4)
  // });
  test('Commmand router sends place commands to the place command router', () => {

  });
  test('Command router ignores all strings that do not match', () => {

  });
});
