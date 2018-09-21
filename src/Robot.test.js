import Robot from './Robot';

describe('Robot initializes properly', () => {
  const testRobot = new Robot(2,1,0)

  test('Robot initializes with input position', () => {
    expect(testRobot.xCo).toBe(2);
    expect(testRobot.yCo).toBe(1);
    expect(testRobot.fCo).toBe(0);
  });
});

describe('Robot movement commands move the robot', () =>  {
  describe('Rotate method updates f and updates robot position', () => {
    const testRobot = new Robot(0,0,0);
    test('Rotate method updates f with negative degrees', () => {
      const testRobot = new Robot(0,0,0);
      testRobot.rotate(-90);
      expect(testRobot.fCo).toBe(-90)
    });
    test('Rotate method updates f with positive degrees', () => {
      const testRobot = new Robot(0,0,360);
      testRobot.rotate(90);
      expect(testRobot.fCo).toBe(450)
    });
    test('Rotate does not update x or y', () => {
      const testRobot = new Robot(0,0,0);
      testRobot.rotate(90);
      testRobot.rotate(-90);
      expect(testRobot.xCo).toBe(0);
      expect(testRobot.yCo).toBe(0);
    });
    test('Rotate calls updatePosition with new coordinates', () => {
      const testRobot = new Robot(0,0,0);
      const spy = jest.spyOn(Robot.prototype, 'updatePosition')
      testRobot.rotate(90);
      expect(spy).toHaveBeenCalledWith(0,0,90);
    });
  });

  describe('interpretMove method updates x or y and updates robot position', () => {
    describe('interpretMove method updates the correct value', () => {
      test('Robot increments x:0 y:1 f:0 when facing North', () => {
        const testRobot = new Robot(2,2,0);
        testRobot.interpretMove();
        expect(testRobot.xCo).toBe(2)
        expect(testRobot.yCo).toBe(3)
        expect(testRobot.fCo).toBe(0)
      });
      test('Robot increments x:1 y:0 f:0 when facing East', () => {
        const testRobot = new Robot(2,2,90);
        testRobot.interpretMove();
        expect(testRobot.xCo).toBe(3)
        expect(testRobot.yCo).toBe(2)
        expect(testRobot.fCo).toBe(90)
      });
      test('Robot increments x:0 y:-1 f:0 when facing South', () => {
        const testRobot = new Robot(2,2,180);
        testRobot.interpretMove();
        expect(testRobot.xCo).toBe(2)
        expect(testRobot.yCo).toBe(1)
        expect(testRobot.fCo).toBe(180)
      });
      test('Robot increments x:-1 y:0 f:0 when facing West', () => {
        const testRobot = new Robot(2,2,270);
        testRobot.interpretMove();
        expect(testRobot.xCo).toBe(1)
        expect(testRobot.yCo).toBe(2)
        expect(testRobot.fCo).toBe(270)
      });
    });

    test('interpretMove calls updatePosition with new coordinates', () => {
      const testRobot = new Robot(2,2,180);
      const spy = jest.spyOn(Robot.prototype, 'updatePosition')
      testRobot.interpretMove();
      expect(spy).toHaveBeenCalledWith(2,1,180);
    });
  });
});

describe('_validMove method approves valid moves and rejects invalid moves', () => {
  const testRobot = new Robot(0,0,0);
  describe('_validMove makes the correct calls', () => {
    test('calls _validInput and _inBounds methods', () => {
      testRobot._inBounds = jest.fn( (newX, newY) => {    return (
            newX >= 0
              && newX <= 4
              && newY >= 0
              && newY <= 4
          )});
      testRobot._validInput = jest.fn( (newX, newY, newF) => {     return (
            typeof(newX) === 'number'
              && typeof(newY) === 'number'
              && newF % 90 === 0
          ) });
      testRobot._validMove(2,2,180);
      expect(testRobot._inBounds).toHaveBeenCalled();
      expect(testRobot._validInput).toHaveBeenCalled();
    });
  })
  describe('_validInput returns false for invalid input types', () => {
    test('_validInput returns true for numbers', () => {
      expect(testRobot._validInput(1,1,90)).toBe(true)
    });
    test('_validInput returns false for non-numbers', () => {
      expect(testRobot._validInput('chicken',true,180)).toBe(false)
      expect(testRobot._validInput(1,null,180)).toBe(false)
    });
    test('_validInput returns false if f is not a multiple of 90', () => {
      expect(testRobot._validInput(1,2,4)).toBe(false)
    });
  });

  describe('_inBounds returns false for an invalid position', () => {
    test('_inBounds returns false if x is less than 0', () => {
      expect(testRobot._inBounds(-1,2)).toBe(false)
    });
    test('_inBounds returns false if y is less than 0', () => {
      expect(testRobot._inBounds(1,-2)).toBe(false)
    });
    test('_inBounds returns false if x is greater than 4', () => {
      expect(testRobot._inBounds(5,2)).toBe(false)
    });
    test('_inBounds returns false if y is greater than 4', () => {
      expect(testRobot._inBounds(1,5)).toBe(false)
    });
    test('_inBounds returns true if x and y are between 0 and 4', () => {
      expect(testRobot._inBounds(3,2)).toBe(true)
    });
  });
});

describe('updatePosition method functions properly', () => {
  const testRobot = new Robot(0,0,0);
  test('updatePosition calls _validMove before updating position', () => {
    const spy = jest.spyOn(Robot.prototype, '_validMove')
    testRobot.updatePosition(1,5,90)
    expect(spy).toHaveBeenCalled();
  });
  test('updatePosition does not update position if position is invalid', () => {
    testRobot.updatePosition(1,5,90)
    expect(testRobot.xCo).toBe(0)
    expect(testRobot.yCo).toBe(0)
    expect(testRobot.fCo).toBe(0)
  });
  test('updatePosition updates position if position is valid', () => {
    testRobot.updatePosition(2,2,270)
    expect(testRobot.xCo).toBe(2)
    expect(testRobot.yCo).toBe(2)
    expect(testRobot.fCo).toBe(270)
  });
});

describe('report method returns object with Robot coordinates', () => {
  const testRobot = new Robot(3,3,180);
  test('report method returns correct x,f,f values', () => {
    expect(testRobot.report()).toEqual({
      xCoord: 3,
      yCoord: 3,
      facing: 180,
    })
  });
});
