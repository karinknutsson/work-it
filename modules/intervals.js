import {
  continueTimer, stopTimer
} from './stopwatch.js';

import {
  calcSprintSegments, sprintTimeouts, context, reverse
} from './segments.js';

// set variables for interval modal
const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

// set variables for sounds
const shortBeep = new Audio('sounds/short_beep.mp3');
const longBeep = new Audio('sounds/long_beep.mp3');
const lowBeep = new Audio('sounds/low_beep.mp3');
const cheering = new Audio('sounds/cheering.mp3');

// set variable for interval countdown
let countdownCount = 0;

// set array for interval timeouts
let intervalTimeouts = [];

// set variable to check if intervals are running
let intervalsRunning = false;

function intervalRep(sprint, pause, rep) {
  if (intervalsRunning == true) {
    // change background and play sound to indicate sprint has started
    document.body.style.background = '#FB2843';
    intervalTimeouts.push(setTimeout(function() {
        calcSprintSegments(sprint * 1000);
        longBeep.play();
      }, 500)
    );
    // set timeout to repeat sprints
    intervalTimeouts.push(setTimeout(function() {
        rep--;
        if (rep > 0) {
          document.body.style.background = '#BB39F0';
          setTimeout(function() {
            lowBeep.play();
          }, 500);
          setTimeout(function() {
            intervalRep(sprint, pause, rep);
          }, pause * 1000);
        } else {
          intervalsRunning = false;
          intervalTimeouts.forEach(function(t) {
            clearTimeout(t);
          });
          intervalTimeouts = [];
          countdownCount = 0;
          document.body.style.background = '#4A3DF9';
          cheering.play();
        }
      }, sprint * 1000)
    );
  }
}

function countDown() {
  // change background quickly 3 times and play sound as countdown
  document.body.style.background = '#FB2843';
  setTimeout(function() {
    shortBeep.play();
    document.body.style.background = '#4A3DF9';
    if (countdownCount < 2) {
      countdownCount++;
      intervalTimeouts.push(setTimeout(function() {
          countDown();
        }, 500)
      );
    }
  }, 500);
}

function intervalsForm() {
  // set variables for form and inputs
  const form = document.getElementById('interval-form');
  const sprintLength = document.getElementById('sprint-input');
  const pauseLength = document.getElementById('pause-input');
  const repCount = document.getElementById('rep-input');

  // start countdown and intervals when form is submitted
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    continueTimer();
    countDown();
    intervalsRunning = true;
    intervalTimeouts.push(setTimeout(function() {
        intervalRep(sprintLength.value, pauseLength.value, repCount.value);
      }, 3100)
    );
  });
}

function openIntervals(event) {
  // stop timer and open interval modal if s key is pressed
  if (event.keyCode == 83) {
    stopTimer();
    modal.style.display = 'block';
    intervalsForm();

    // close modal and continue timer if user clicks on x or window outside modal
    span.onclick = function() {
      modal.style.display = 'none';
      continueTimer();
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        continueTimer();
      }
    }
  }
}

function clearIntervals(event) {
  if (event.keyCode == 67) {
    document.body.style.background = '#4A3DF9';
    context.clearRect(0, 0, canvas.width, canvas.height);
    intervalsRunning == false;
    intervalTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    intervalTimeouts = [];
    sprintTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    sprintTimeouts = [];
  }
}


export { openIntervals, clearIntervals };
