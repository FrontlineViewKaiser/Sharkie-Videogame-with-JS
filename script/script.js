let canvas;
let world;
let keyboard = new KEYBOARD();
let difficulty = 5;
let mute = false;
let ukuleleMusic = document.getElementById("ukulele");
let underwaterMusic = document.getElementById("underwater");

/**
 * sets canvas element to global variable and creates new world
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

}

/**
 * Initializes the game and loads all movable objects if the level is loaded
 */
function beginGame() {
  init();
  if (level1) {
    level1.loadDynamicElements();
    overlay.style.display = "none";
    mask.style.display = "flex";
    renderMask();
    ukuleleMusic.play()
    underwaterMusic.play()
    ukuleleMusic.loop = true
    underwaterMusic.loop = true
    ukuleleMusic.volume = 0.15
    underwaterMusic.volume = 0.8
  }
}

/**
 * sets damage multuiplier and displays it
 *
 * @param {number} x damage multiplier
 */
function setDifficulty(x) {
  difficulty = x;
  renderDifficulty();
}

/**
 * colours the button corresponding to the difficulty selected.
 */
function colorSelectedDifficulty() {
  let x = difficulty;
  document.getElementById(`difficultyButton${x}`).classList.add("selected");
}

/**
 * changes appearance of the button and disables music (Not implemented yet)
 */
function toggleMute() {
  if (!mute) {
    document.getElementById("audio").classList.add("greyed");
    mute = true;
    ukuleleMusic.volume = 0.0
    underwaterMusic.volume = 0.0
  } else if (mute) {
    document.getElementById("audio").classList.remove("greyed");
    mute = false;
    ukuleleMusic.volume = 0.15
    underwaterMusic.volume = 0.8
  }
}

/**
 * makes the canvas fullscreen (not implmented yet)
 */
function fullscreen() {
  let canvas = document.getElementById("canvas");

  // Check for various Fullscreen APIs and use whichever is available
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    /* IE/Edge */
    canvas.msRequestFullscreen();
  }
}

/**
 * stop all intervals, hides mask and displays game over screen on the overlay
 */
function gameOver() {
  mask.style.display = "none";
  overlay.style.display = "flex";
  ukuleleMusic.pause()
  renderGameOver();
  clearAllIntervals();
}

/**
 * stop all intervals, hides mask and displays game won screen on the overlay
 */
function youWin() {
  mask.style.display = "none";
  overlay.style.display = "flex";
  ukuleleMusic.pause()
  renderYouWin();
  clearAllIntervals();
}

/**
 * hides the mask and displays the start screen on the ovwerlay
 */
function restart() {
  underwaterMusic.pause()
  mask.style.display = "none";
  overlay.style.display = "flex";
  renderStartScreen();
}

/**
 *
 * @returns true if phone usage is detected (to render touch buttons)
 */
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  return (
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ); // Windows Phone detection
}

/**
 * 
 * @returns true if window orientation is 90 (indicating that landcscape modus is active)
 */
function isLandscapeOrientation() {
  return Math.abs(window.orientation) === 90;
}

/**
 * Assigns events to each touch button
 */
function touchButtonEvents() {
  document.getElementById("up").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById("up").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
  document.getElementById("left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById("down").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });
  document.getElementById("down").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });
  document.getElementById("right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("space").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("space").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * Assigns events to WASD SPACE buttons
 */
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
});

/**
 * Assigns events to WASD SPACE buttons.
 */
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
});

/**
 * clears all intervals in the window with an extremely long loop
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
