let overlay;
let mask;

/**
 * assigns elements to the global variables and renders the startscreen, adds a warning to turn mobile devices
 */
function renderStartScreen() {
  overlay = document.getElementById("overlay");
  mask = document.getElementById("mask");

  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/ `
    <div style="display: none;" class="warning" id="warning">For the best experience, please rotate your device to landscape mode</div>
    <div class="gameMenu">
        <button onclick="startGame()">START GAME</button>
        <button onclick="renderDifficulty()">DIFFICULTY</button>
        <button onclick="renderInstructions()">INSTRUCTIONS</button>
    </div>
    `;
    displayOrientationWarning()
    window.addEventListener("orientationchange", function() {displayOrientationWarning();});
}


/**
 * checks for mobile devices that are not in landscape mode and renders a warning if the phone is vertical
 */
function displayOrientationWarning() {
  if(isMobileDevice() && !isLandscapeOrientation()) {
    document.getElementById('warning').style.display = "flex"
  } else {
    document.getElementById('warning').style.display = "none"
  }
}

/**
 * renders the difficulty menu
 */
function renderDifficulty() {
  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/ `
  <button class="backButton" onclick="renderStartScreen()">BACK</button>

    <div class="difficultySettings">
        <button id="difficultyButton1" onclick="setDifficulty(1)">Game-Jounalist</button>
        <button id="difficultyButton5" onclick="setDifficulty(5)">River-Pike</button>
        <button id="difficultyButton10" onclick="setDifficulty(10)">Barracuda</button>
        <button id="difficultyButton18" onclick="setDifficulty(18)">Great-White</button>
    </div>
    `;
  colorSelectedDifficulty();
}

/**
 * renders instructions
 */
function renderInstructions() {
  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/ `
    <button class="backButton" onclick="renderStartScreen()">BACK</button>

    <img class="instructions" src="./img/6.Botones/Instructions 2.png" alt="">
    `;
}

/**
 * renders a backstory and start button
 */
function startGame() {
  overlay.innerHTML = "";
  overlay.innerHTML = renderBackstory();
}

/**
 * renders the mask that replaces the overlay when the game begins.
 * Checks for mobile devices to render touch buttons if needed
 */
function renderMask() {
  mask.innerHTML = "";
  //This is supposed to check for mobile devices, only renders touchbtn when on mobile
  if(isMobileDevice()) {
      mask.innerHTML = /*html*/ `
    <div id="audio" class="audioButton" onclick="toggleMute()">
      <img src="./img/music.webp" alt="">
      <!-- <button onclick="fullscreen()" class="fullscreenButton">FULLSCREEN</button> -->
    </div>
    <div class="panel">
      <div class="panelLeft">
        <button class="touchbtn" id="left">&lArr;</button>
        <button class="touchbtn" id="up">&uArr;</button>
        <button class="touchbtn" id="down">&dArr;</button>
        <button class="touchbtn" id="right">&rArr;</button>
      </div>
      <button class="touchbtn" id="space">&times;</button>
    </div>
    `;
    touchButtonEvents()
  } else {
    mask.innerHTML = /*html*/ `
    <div id="audio" class="audioButton" onclick="toggleMute()">
      <img src="./img/music.webp" alt="">
      <!-- <button onclick="fullscreen()" class="fullscreenButton">FULLSCREEN</button> -->
    </div>`;
  }
}

/**
 * renders gameOver sreen on the overlay
 */
function renderGameOver() {
  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/`
    <img class="gameOver" src="./img/6.Botones/Tittles/Game Over/Recurso 13.png" alt="">
    <img onclick="restart()" class="tryAgain" src="./img/6.Botones/Try again/Recurso 17.png" alt="">
  `
}

/**
 * renders game won sreen on the overlay
 */
function renderYouWin() {
  overlay.innerHTML = "";
  overlay.innerHTML = /*html*/`
    <img class="youWin" src="./img/6.Botones/Try again/Mesa de trabajo 1.png" alt="">
    <img onclick="restart()" class="tryAgain" src="./img/6.Botones/Try again/Recurso 17.png" alt="">
  `
}

/**
 * 
 * @returns HTML for startGame() function
 */
function renderBackstory() {
  return /*html*/ `
  <div class ="loadingScreen">
        <p class="scroll">
            Deep down in the Pacific Ocean, lording over hundreds of acres of free Reef-Estate lives the little Sharkie.
            Tough he might look like the Bambi of the Seas, the little bugger packs a punch. Not just that, but he is fiercely territorial.
            As such he is shocked to see scores of rent-avoiding critters polluting his reef. 
            After all he hates squatters almost as much as he hates inheretence taxes, or skimmed milk. Armed with righteous fury, (or rather, mild annoyance)
            he takes to evicting these squatters from his reef (and their life). But he better whats out for the Alphasquatter, occupier of a thousand reefs.
            <br>
            <br>
            Hey... Do you also feel like thats a lot of text? 
            No? Keep reading. No there is nothing going on the background.
            What do you mean? Theres no distraction...
            <br>
            OH LOOK! GOLD!
        </p>
        <button onclick="beginGame()" class="startbutton" id="startButton">Start</button>
    </div>
    `;
}
