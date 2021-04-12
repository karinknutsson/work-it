function addHintListener(element) {
  const hintBtn = document.getElementById(`${element}-hint-btn`);
  const hint = document.getElementById(`${element}-hint`);
  hintBtn.addEventListener('mouseenter', function(event) {
    hint.style.left = `${event.clientX + 20}px`;
    hint.style.top = `${event.clientY - 32}px`;
    hint.style.display = 'block';
  });
  hintBtn.addEventListener('mouseout', function(event) {
    hint.style.display = 'none';
  });
}

export { addHintListener };
