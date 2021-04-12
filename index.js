import {
  leaveFullscreen, goFullscreen
} from './modules/screenmode.js';

import {
  timer, resetTimer, timerRunning
} from './modules/stopwatch.js';

import {
  openIntervals, clearIntervals
} from './modules/intervals.js';

import {
  addHintListener
} from './modules/hints.js';

window.addEventListener('load', (event) => {
  document.addEventListener('keyup', timer);
  document.addEventListener('keyup', resetTimer);
  document.addEventListener('keyup', goFullscreen);
  document.addEventListener('keyup', openIntervals);
  document.addEventListener('keyup', clearIntervals);
  addHintListener('intro');
  addHintListener('sprint');
  addHintListener('pause');
  addHintListener('rep');
});
