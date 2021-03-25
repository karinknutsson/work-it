const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];


function intervalsForm() {
  const form = document.getElementById('interval-form');
  const sprintLength = document.getElementById('sprint-input');
  const pauseLength = document.getElementById('pause-input');
  const repCount = document.getElementById('rep-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();




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
