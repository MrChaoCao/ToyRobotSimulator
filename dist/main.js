!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);class n{constructor(t,e,o){this.xCo=t,this.yCo=e,this.fCo=o,this.moveInstructions={0:[0,1],90:[1,0],180:[0,-1],270:[-1,0]},this.toyRobot=document.getElementById("robotToy")}interpretMove(){const t=this.moveInstructions[this.fCo],e=this.xCo+t[0],o=this.yCo+t[1];this.updatePosition(e,o,this.fCo)}rotate(t){let e=this.fCo+t;this.updatePosition(this.xCo,this.yCo,e)}updatePosition(t,e,o){this._validMove(t,e,o)&&(this.xCo=t,this.yCo=e,this.fCo=o)}report(){return{xCoord:this.xCoCo,yCoord:this.yCo,facing:this.fCo}}_validMove(t,e,o){return this._inBounds(t,e)&&this._validInput(t,e,o)}_validInput(t,e,o){return"number"==typeof t&&"number"==typeof e&&o%90==0}_inBounds(t,e){return t>=0&&t<=4&&e>=0&&e<=4}static _hideRobot(){document.getElementById("robotToy").style.visibility="hidden"}_unHideRobot(){document.getElementById("robotToy").style.visibility="visible"}}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("command-list");const t=document.getElementById("board"),e=document.createDocumentFragment();for(let t=0;t<5;t++){const o=document.createElement("ul");o.id=t;for(let t=0;t<5;t++){const e=document.createElement("li");e.classList.add(`${t}`),o.append(e)}e.append(o)}t.append(e),document.getElementById("run").addEventListener("click",()=>{n._hideRobot();new class{constructor(){this.commands=document.getElementById("command-list").value.split("\n"),this.toyRobot=new n(0,0,0),this.placed=!1,this.executeCommands(),this.cardinalDirections={north:0,east:90,south:180,west:270},this.rotation={right:90,left:-90},this.robotSprite=document.getElementById("robotToy")}executeCommands(){setInterval(()=>{this.commands.length>0&&(this.commandRouter(this.commands.shift()),this.render())},500)}render(){this.toyRobot._unHideRobot(),this.robotSprite.style.left=`${30*this.toyRobot.xCo+1}px`,this.robotSprite.style.bottom=`${30*this.toyRobot.yCo}px`,this.robotSprite.style.transform=`rotate(${this.toyRobot.fCo}deg)`}commandRouter(t){const e=/(move|left|right|report)/i.exec(t),o=/(place) ([0-4]),([0-4]),(north|east|south|west)/i.exec(t);this.placed&&e?this.simpleCommandCenter(e[1].toLowerCase()):o&&this.placeCommandCenter(o)}placeCommandCenter(t){const e=parseInt(t[2]),o=parseInt(t[3]),n=parseInt(this.cardinalDirections[t[4].toLowerCase()]);this.placed?this.toyRobot.updatePosition(e,o,n):(this.animationsOff(),this.placed=!0,this.toyRobot.updatePosition(e,o,n),this.animationsOn())}simpleCommandCenter(t){({move:()=>this.toyRobot.interpretMove(),left:()=>this.rotateCommand(this.rotation[t]),right:()=>this.rotateCommand(this.rotation[t]),report:()=>this.reportCommand()})[t]()}rotateCommand(t){this.toyRobot.rotate(t)}reportCommand(){const t=this.toyRobot.report(),e=this._degreeToCardinal(t.facing),o=`I am at ${t.xCoord}, ${t.yCoord}, facing ${e}`;document.getElementById("robo-report").innerHTML=o}animationsOn(){this.robotSprite.style.transition="0.5s"}animationsOff(){this.robotSprite.style.transition="0s"}_degreeToCardinal(t){let e;return e=t>=0?t%360:t%360+360,this._getKeyByValue(this.cardinalDirections,e)}_getKeyByValue(t,e){return Object.keys(t).find(o=>t[o]===e)}}}),document.getElementById("reset").addEventListener("click",()=>{location.reload()})})}]);