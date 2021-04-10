const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let sprintTimeouts = [];

function drawSegment(angle, reverse) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(300, 300);
  context.lineTo(300, 100);
  context.arc(300, 300, 300, -Math.PI/2, angle, reverse);
  context.lineTo(300, 300);
  context.fillStyle = 'rgba(255, 255, 255, 0.3)';
  context.fill();
}

function sprintSegments(stepCount, step, initStep, reverse) {
  if (stepCount > -1) {
    // while stepcount is non-negative, draw segment with angle increasing with each step
    drawSegment(-(0.5 - step) * Math.PI, reverse);
    step += initStep;
    stepCount--;
    sprintTimeouts.push(setTimeout(sprintSegments, 47, stepCount, step, initStep, reverse));
  } else {
    // clear timeouts when stepCount is negative
    sprintTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    sprintTimeouts = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function calcSprintSegments(ms, reverse = false) {
  // calculate how many steps circle segments will be drawn in
  let stepCount = ms / 50;
  // calculate size of each step
  let step = 2 / stepCount;
  sprintSegments(stepCount, step, step, reverse);
}

export { calcSprintSegments, sprintTimeouts, context };
