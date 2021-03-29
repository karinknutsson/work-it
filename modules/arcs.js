const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let stepCount = 0;

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

function timeSegments(step, initStep) {
  stepCount--;
  if (stepCount > -2) {
    setTimeout(function() {
      drawSegment(-(0.5 - step) * Math.PI);
      step += initStep;
      timeSegments(step, initStep);
    }, 48);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function calculateSegments(ms) {
  stepCount = ms / 50;
  const step = 2 / stepCount;
  timeSegments(step, step);
}

export { calculateSegments, context };
