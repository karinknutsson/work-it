import {
  leaveFullscreen, goFullscreen
} from './modules/screenmode.js';

import {
  incrementTimer, countSeconds, pauseTimer, startTimer, resetTimer
} from './modules/stopwatch.js';

import {
  openIntervals
} from './modules/intervals.js'

window.addEventListener('load', (event) => {
  document.addEventListener('keyup', startTimer);
  document.addEventListener('keyup', goFullscreen);
  document.addEventListener('keyup', openIntervals);
  document.addEventListener('keyup', resetTimer);
});
