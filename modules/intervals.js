import {
  continueTimer, stopTimer
} from './stopwatch.js';

import {
  calcSprintSegments, sprintTimeouts, context
} from './segments.js';

// set variables for interval modal
const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

// set variables for sounds
const shortBeep = new Audio('sounds/short_beep.mp3');
const longBeep = new Audio('sounds/long_beep.mp3');
const lowBeep = new Audio('sounds/low_beep.mp3');
const cheering = new Audio('sounds/cheering.mp3');

// set array for interval timeouts
let intervalTimeouts = [];

// set boolean to check if intervals are running
let intervalsRunning = false;

function intervalRep(sprint, pause, rep, sound) {
  if (intervalsRunning === true) {
    rep--;
    // change background, draw segment graphic and play beep on each sprint interval
    document.body.style.background = '#FB2843';
    calcSprintSegments(sprint * 1000);
    if (sound === true) {
      longBeep.play();
    }
    intervalTimeouts.push(setTimeout(function() {
        if (rep > 0) {
          // change background and  play lower beep on each pause
          document.body.style.background = '#BB39F0';
          if (sound === true) {
            lowBeep.play();
          }
          setTimeout(intervalRep, pause * 1000, sprint, pause, rep, sound);
        } else {
          // clear intervals and reset background after the last sprint
          intervalsRunning = false;
          intervalTimeouts.forEach(function(t) {
            clearTimeout(t);
          });
          intervalTimeouts = [];
          document.body.style.background = '#4A3DF9';
          if (sound === true) {
            cheering.play();
          }
        }
      }, sprint * 1000)
    );
  }
}

function countDown(sprint, pause, rep, sound) {
  // countdown of 3 beeps & background changes before intervals start
  let countDownCount = 0;
  let countDownInterval = window.setInterval(function() {
    document.body.style.background = '#FB2843';
    setTimeout(function() {
      if (sound === true) {
        shortBeep.play();
      }
      document.body.style.background = '#4A3DF9';
    }, 500);
    if (++countDownCount === 3) {
      window.clearInterval(countDownInterval);
      setTimeout(intervalRep, 1000, sprint, pause, rep, sound);
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

    const sprint = document.getElementById('sprint-input').value;
    const pause = document.getElementById('pause-input').value;
    const rep = document.getElementById('rep-input').value;
    const sound = document.getElementById('sound-input').checked;

    continueTimer();
    intervalsRunning = true;
    setTimeout(countDown, intro.value * 1000, sprint, pause, rep, sound);
  });
}

function openIntervals(event) {
  // stop timer and open interval modal if S key is pressed
  if (event.keyCode === 83) {
    stopTimer();
    modal.style.display = 'block';
    intervalsForm();

    // close modal and continue timer if user clicks on close button or window outside modal
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
    // reset intervals and graphic if C key is pressed
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
  }
}


export { openIntervals, clearIntervals };
