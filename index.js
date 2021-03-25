import {
  leaveFullscreen, goFullscreen
} from './modules/screenmode.js';

import {
  incrementTimer, countSeconds, pauseTimer, startTimer
} from './modules/stopwatch.js';


window.addEventListener('load', (event) => {
  document.addEventListener('keyup', startTimer);
  document.addEventListener('keyup', goFullscreen);
});
