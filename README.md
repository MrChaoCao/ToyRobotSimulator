[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Toy Robot Simulator
For live demo click [here!](https://hardcore-ritchie-61f3da.netlify.com/)

The toy robot simulator is a game where the user may move around a toy robot on a tabletop through commands on a webpage.

## Rules
+ The robot moves on a zero-indexed grid of 5 units by 5 units.
+ The robot may move freely on the board but will ignore any commands that cause it to fall off the board.

+ There robot will respond to any of one the following five commands.
  1. PLACE X,Y,F
  2. MOVE
  3. LEFT
  4. RIGHT
  5. REPORT

+ Place commands will put the robot on the table at any legal position (X, Y) facing F.
+ Until the Robot is given a valid place command it will ignore all other commands.
+ After the robot has been placed, it will respond to any valid command given to it as long as the command does not cause it to fall off the board. This includes subsequent place commands.
+ Move commands will move the robot one unit forward in the direction it is facing.
+ Left and Right commands will rotate the robot 90 degrees in the appropriate direction while keeping X,Y position fixed.
+ Report will announce the X,Y,F of the robot at the current time.

## Technologies
This toy robot simulator was built with JavaScript, HTML5, CSS3, Webpack, and is tested with Jest.

The aim of this challenge was to showcase my coding abilities in JavaScript so I elected to use as few frameworks as I could to implement it. Webpack and Jest selected to implement file bundling and testing respectively.

The live version of this app is hosted on Netlify and continuously deployed from GitHub.
