const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

let initCount = 0;

const shortBeep = new Audio('sounds/short_beep.mp3');
const longBeep = new Audio('sounds/long_beep.mp3');
const lowBeep = new Audio('sounds/low_beep.mp3');


function intervalRep(sprint, pause, rep) {

  console.log("interval starts:");
  document.body.style.background = '#FB2843';

  setTimeout(function() {
    longBeep.play();
  }, 500);

  setTimeout(function() {
    document.body.style.background = '#CB4dFF';

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
        initCount = 0;
      }
    }, pause * 1000);

  }, sprint * 1000);
}


function countDown() {
  document.body.style.background = '#FB2843';
  setTimeout(function() {
    shortBeep.play();
    initCount++;
    console.log(initCount);
    document.body.style.background = '#4A3DF9';
    if (initCount < 3) {
      console.log("black bg");
      setTimeout(function() {
        countDown();
      }, 500);
    }
  }, 500);
}


function intervalsForm() {
  const form = document.getElementById('interval-form');
  const sprintLength = document.getElementById('sprint-input');
  const pauseLength = document.getElementById('pause-input');
  const repCount = document.getElementById('rep-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    countDown();
    setTimeout(function() {
      intervalRep(sprintLength.value, pauseLength.value, repCount.value);
    }, 3000);
  });
}


function openIntervals(event) {
  if (event.keyCode == 83) {
    modal.style.display = 'block';

    intervalsForm();

    span.onclick = function() {
      modal.style.display = 'none';
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }
}

export { openIntervals };
