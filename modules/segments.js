const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let stepCount = 0;
let sprintTimeouts = [];
let reverse = false;

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

function sprintSegments(step, initStep) {
  stepCount--;
  if (stepCount > -2) {
    sprintTimeouts.push(setTimeout(function() {
        // while stepcount is larger than -2, draw segment with angle increasing with each step
        drawSegment(-(0.5 - step) * Math.PI, reverse);
        step += initStep;
        sprintSegments(step, initStep);
      }, 48)
    );
  } else {
    // clear timeouts when stepCount is smaller than -2
    sprintTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    sprintTimeouts = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function calcSprintSegments(ms) {
  // calculate how many steps circle segments will be drawn in
  stepCount = ms / 50;
  // calculate size of each step
  const step = 2 / stepCount;
  sprintSegments(step, step);
}


export { calcSprintSegments, sprintTimeouts, context, reverse };
