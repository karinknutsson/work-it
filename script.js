// set variables for digit containers
const minDigits = document.getElementById('min-digits');
const secDigits = document.getElementById('sec-digits');

// set counter variables for minutes and seconds
let minCount = 0;
let secCount = 1;

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

      // call function to update values in interface
      incrementTimer(secCount, secDigits);

      // increment seconds
      secCount++;

      // when second counter reaches 60, increment minutes and reset second counter
      if (secCount >= 60) {
        incrementTimer(minCount, minDigits);
        minCount++;
        secCount = 0;
      }
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

  // remove event listener for pause and add event listener to start timer again
  document.removeEventListener('keyup', pauseTimer);
  document.addEventListener('keyup', startTimer);

}


function startTimer(e) {

  // start timer if spacebar is pressed
  if (e.keyCode == 32) {
    countSeconds();
    document.removeEventListener('keyup', startTimer);
    document.addEventListener('keyup', pauseTimer);
  }

}


// add event listener to start timer
document.addEventListener('keyup', startTimer);


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


// add event listener for fullscreen mode
document.addEventListener('keyup', goFullscreen);



