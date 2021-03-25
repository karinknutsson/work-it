const modal = document.getElementById('intervalModal');
const span = document.getElementsByClassName('close')[0];

function openIntervals(e) {
  if (e.keyCode == 83) {
    modal.style.display = 'block';

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
