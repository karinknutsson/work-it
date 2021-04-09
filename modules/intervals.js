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
const shortBeep = new Audio('/sounds/short_beep.mp3');
const longBeep = new Audio('/sounds/long_beep.mp3');
const lowBeep = new Audio('/sounds/low_beep.mp3');
const cheering = new Audio('/sounds/cheering.mp3');

// set array for interval timeouts
let intervalTimeouts = [];
let pauseTimeouts = [];

// set variable to check if intervals are running
let intervalsRunning = false;


let sprint;
let pause;
let rep;


function intervalRep() {
  if (intervalsRunning === true) {
    rep--;
    document.body.style.background = '#FB2843';
    calcSprintSegments(sprint * 1000);
    longBeep.play();
    intervalTimeouts.push(setTimeout(function() {
        if (rep > 0) {
          document.body.style.background = '#BB39F0';
          lowBeep.play();
          setTimeout(intervalRep, pause * 1000);
        } else {
          intervalsRunning = false;
          intervalTimeouts.forEach(function(t) {
            clearTimeout(t);
          });
          intervalTimeouts = [];
          document.body.style.background = '#4A3DF9';
          cheering.play();
        }
      }, sprint * 1000)
    );
  }
}

function countDown() {
  let countDownCount = 0;
  let countDownInterval = window.setInterval(function() {
    document.body.style.background = '#FB2843';
    setTimeout(function() {
      shortBeep.play();
      document.body.style.background = '#4A3DF9';
    }, 500);
    if (++countDownCount === 3) {
      window.clearInterval(countDownInterval);
      setTimeout(intervalRep, 1000);
    }
  }, 1000);
}

function intervalsForm() {
  // set variables for form and inputs
  const form = document.getElementById('interval-form');
  const intro = document.getElementById('intro-input');

  // start countdown and intervals when form is submitted
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    sprint = document.getElementById('sprint-input').value;
    pause = document.getElementById('pause-input').value;
    rep = document.getElementById('rep-input').value;

    continueTimer();
    intervalsRunning = true;
    setTimeout(countDown, intro.value * 1000);

    //  intervalRep(sprintLength.value, pauseLength.value, repCount.value);

  });
}

function openIntervals(event) {
  // stop timer and open interval modal if s key is pressed
  if (event.keyCode === 83) {
    stopTimer();
    modal.style.display = 'block';
    intervalsForm();

    // close modal and continue timer if user clicks on x or window outside modal
    span.onclick = function() {
      modal.style.display = 'none';
      continueTimer();
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        continueTimer();
      }
    }
  }
}

function clearIntervals(event) {
  if (event.keyCode === 67) {
    document.body.style.background = '#4A3DF9';
    context.clearRect(0, 0, canvas.width, canvas.height);
    intervalsRunning = false;
    intervalTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    sprintTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
    intervalTimeouts = [];
    sprintTimeouts = [];
  }
}


export { openIntervals, clearIntervals };
