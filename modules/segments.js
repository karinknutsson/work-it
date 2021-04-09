const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let stepCount = 0;
let sprintTimeouts = [];
let reverse = false;

function drawSegment(angle) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(300, 300);
  context.lineTo(300, 100);
  context.arc(300, 300, 300, -Math.PI/2, angle);
  context.lineTo(300, 300);
  context.fillStyle = 'rgba(255, 255, 255, 0.3)';
  context.fill();
}

function sprintSegments(step, initStep) {
  if (stepCount > -1) {
    // while stepcount is non-negative, draw segment with angle increasing with each step
    drawSegment(-(0.5 - step) * Math.PI);
    step += initStep;
    stepCount--;
    sprintTimeouts.push(setTimeout(sprintSegments, 47, step, initStep));
  } else {
    // clear timeouts when stepCount is smaller than -2
    // console.log('CLEAR');
    sprintTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    sprintTimeouts = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function calcSprintSegments(ms) {
  // console.log('sprint segments initiated');
  // calculate how many steps circle segments will be drawn in
  stepCount = ms / 50;
  // calculate size of each step
  const step = 2 / stepCount;
  // console.log('stepCount: ' + stepCount + ', step: ' + step);
  sprintSegments(step, step);
}

export { calcSprintSegments, sprintTimeouts, context, reverse };
