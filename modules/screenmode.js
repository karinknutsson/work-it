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


export { leaveFullscreen };
export { goFullscreen };
