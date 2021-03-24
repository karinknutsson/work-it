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


function incrementTimer(count, div) {

  // if value is less than 10, increment second digit only
  if (count < 10) {
    div.innerHTML = `
      <div class="digit-container">0</div>
      <div class="digit-container">${count}</div>
    `;
  } else {

    // if value is 10 or higher, increment both digits
    div.innerHTML = `
      <div class="digit-container">${Math.floor(count/10)}</div>
      <div class="digit-container">${count%10}</div>
    `;
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

      // call incrementTimer function to update values in interface
      incrementTimer(secCount, secDigits);

      countSeconds();
    }, 1000)
  );

}


function pauseTimer(e) {

  // stop timer if spacebar is pressed and clear timeouts array
  if (e.keyCode == 32) {
    timeouts.forEach(function(t) {
      clearTimeout(t);
    })
    timeouts = [];
  }
  console.log('timer pauses');

  // remove event listener for pause and add event listener to start timer again
  document.removeEventListener('keyup', pauseTimer);
  document.addEventListener('keyup', startTimer);

}


function startTimer(e) {

  // start timer if spacebar is pressed
  if (e.keyCode == 32) {
    countSeconds();
    console.log('timer starts');
    document.removeEventListener('keyup', startTimer);
    document.addEventListener('keyup', pauseTimer);
  }

}


function leaveFullscreen(e) {
  if (e.keyCode == 70) {
    document.exitFullscreen();
    document.removeEventListener('keyup', leaveFullscreen);
    document.addEventListener('keyup', goFullscreen);
  }
}


function goFullscreen(e) {
  if (e.keyCode == 70) {
    document.documentElement.requestFullscreen();
    document.removeEventListener('keyup', goFullscreen);
    document.addEventListener('keyup', leaveFullscreen);
  }
}


window.addEventListener('load', (event) => {
  document.addEventListener('keyup', startTimer);
  document.addEventListener('keyup', goFullscreen);
});

