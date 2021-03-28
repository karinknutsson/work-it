import {
  continueTimer, stopTimer
} from './stopwatch.js';

// set variables for interval modal
const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

// set variables for sounds
const shortBeep = new Audio('sounds/short_beep.mp3');
const longBeep = new Audio('sounds/long_beep.mp3');
const lowBeep = new Audio('sounds/low_beep.mp3');

// set variable for interval countdown
let countdownCount = 0;

function intervalRep(sprint, pause, rep) {
  // change background and play sound to indicate sprint has started
  document.body.style.background = '#FB2843';
  setTimeout(function() {
    longBeep.play();
  }, 500);
  // set timeout to repeat sprints
  setTimeout(function() {
    document.body.style.background = '#BB39F0';
    setTimeout(function() {
      lowBeep.play();
    }, 500);
    setTimeout(function() {
      document.body.style.background = '#FB2843';
      rep--;
      if (rep > 0) {
        intervalRep(sprint, pause, rep);
      } else {
        document.body.style.background = '#4A3DF9';
        countdownCount = 0;
      }
    }, pause * 1000);

  }, sprint * 1000);
}

function countDown() {
  // change background quickly 3 times and play sound as countdown
  document.body.style.background = '#FB2843';
  setTimeout(function() {
    shortBeep.play();
    document.body.style.background = '#4A3DF9';
    if (countdownCount < 2) {
      countdownCount++;
      setTimeout(function() {
        countDown();
      }, 500);
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
    setTimeout(function() {
      intervalRep(sprintLength.value, pauseLength.value, repCount.value);
    }, 3100);
  });
}

function openIntervals(event) {
  // open interval modal if s key is pressed
  if (event.keyCode == 83) {
    stopTimer();
    modal.style.display = 'block';
    intervalsForm();
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


export { openIntervals };
