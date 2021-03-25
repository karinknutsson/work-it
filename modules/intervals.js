const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

function intervalRep(sprintLength, pauseLength, repCount) {

  console.log("interval starts:");
  document.body.style.background = '#FB2843';

  setTimeout(function() {
    document.body.style.background = '#CB4dFF';

    setTimeout(function() {
      document.body.style.background = '#FB2843';
      repCount--;
      if (repCount > 0) {
        intervalRep(sprintLength, pauseLength, repCount);
      } else {
        document.body.style.background = '#4A3DF9';
      }
    }, pauseLength * 1000);

  }, sprintLength * 1000);
}

function intervalsForm() {
  const form = document.getElementById('interval-form');
  const sprintLength = document.getElementById('sprint-input');
  const pauseLength = document.getElementById('pause-input');
  const repCount = document.getElementById('rep-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    intervalRep(sprintLength.value, pauseLength.value, repCount.value);
  });
}


function openIntervals(e) {
  if (e.keyCode == 83) {
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
