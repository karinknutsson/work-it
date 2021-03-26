// set variables for digit containers
const hourDigits = document.getElementById('hour-digits');
const minDigits = document.getElementById('min-digits');
const secDigits = document.getElementById('sec-digits');

// set counter variables for hours, minutes and seconds
let hourCount = 0;
let minCount = 0;
let secCount = 0;

// set timer array to store setTimeout values
let timeouts = [];

// set variable to check if stopwatch is running
let timerRunning = false;

function updateInterface(div, firstDigit, secondDigit) {
  // change digits in user interface
  div.innerHTML = `
    <div class="digit-container">${firstDigit}</div>
    <div class="digit-container">${secondDigit}</div>
  `;
}

function incrementTimer(count, div) {
  // if value is less than 10, increment second digit only
  if (count < 10) {
    updateInterface(div, 0, count);
  } else {
    // if value is 10 or higher, increment both digits
    updateInterface(div, Math.floor(count/10), count%10);
  }
}

function countSeconds() {
  // start setTimeout and store values in timeouts array
  timeouts.push(setTimeout(function() {
      // if second counter is less than 60, increment seconds
      if (secCount < 59) {
        secCount++;
      } else {
        // when second counter reaches 60, increment minutes and reset second counter
        if (minCount < 59) {
          minCount++;
          incrementTimer(minCount, minDigits);
        } else {
          // when minute counter reaches 60, increment hours and reset minute counter
          hourCount++;
          incrementTimer(hourCount, hourDigits);
        }
        secCount = 0;
      }
      // call incrementTimer to update values in interface and countSeconds to keep loop going
      incrementTimer(secCount, secDigits);
      countSeconds();
    }, 1000)
  );

}

function stopTimer() {
  // checks if timer is running and stops it by clearing timeout array
  if (timerRunning == true) {
    timerRunning = false;
    timeouts.forEach(function(t) {
      clearTimeout(t);
    })
    timeouts = [];
  }
}

function pauseTimer(event) {
  // stop timer if spacebar is pressed
  if (event.keyCode == 32) {
    stopTimer();
  }
  // remove event listener for pause and add event listener to start timer again
  document.removeEventListener('keyup', pauseTimer);
  document.addEventListener('keyup', startTimer);
}

function startTimer(event) {
  // start timer if spacebar is pressed
  if (event.keyCode == 32 && timerRunning == false) {
    timerRunning = true;
    countSeconds();
    document.removeEventListener('keyup', startTimer);
    document.addEventListener('keyup', pauseTimer);
  }
}

function resetTimer(event) {
  // stop and reset timer if r key is pressed
  if (event.keyCode == 82) {
    stopTimer();
    updateInterface(hourDigits, 0, 0);
    updateInterface(minDigits, 0, 0);
    updateInterface(secDigits, 0, 0);
    hourCount = 0;
    minCount = 0;
    secCount = 0;
  }
}

export { incrementTimer };
export { countSeconds };
export { pauseTimer };
export { startTimer };
export { resetTimer };
