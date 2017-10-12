/*
Created By Syed Shah
Last Update: 10/10/2017
*/

let titanic = new Audio();
titanic.src = "titanic.mp3";

// let rnm = new Audio();
// rnm.src = = "r&m.mp3";


let win = true; //Keep playin while winning (default is win, so run on default)
let success = 0; //number of successful wins
let timer = 3;
let colors = ["#EFC94C", "#FF9047", "#FF7772", "#C5EFF7"];
let myInterval;
let gamesArr = new Array();

function Minigame(name) {
  this.name = name;
  this.playGame = function() {}
  this.endGame = function() {}
}

function playRandomGame() {
  let randomGameIndex = getRandomIntInclusive(0, gamesArr.length-1);
  gamesArr[randomGameIndex].playGame();
}

function removeBg() {
  $(".window").css({
    "background-image": "url()",
    "background": "#FFC898",
    "transition": "background 1s"
  });
}

function winScreen() {
  $(".window").css({
    "background": colors[getRandomIntInclusive(0, colors.length - 1)]
  });
  $("#result").text(`Success: ${success}`);
  $("#report").text("WIN"); //Add draw/lose response where appropriate.
}

function loseScreen() {
  $("#loseScreen").addClass('loseImg');
  $(".window").css({"background-color": "rgba(9,18,35,1)"});
  $("#loseScreen .scoreboard").text(`Score: ${success}`);
  titanic.play();
}

//Will use this to randomly cycle through games based on their id
function getRandomIntInclusive(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function stopInterval(){
  clearInterval(myInterval);
}

function countdown(timer) {
  myInterval = setInterval(function () {
    if(timer >= 1) {
      $("#timer").text(`Timer: ${timer - 1}`);
      timer = timer - 1; //Timer will get to zero, but due to 1s delay, it will display 1
      console.log(timer);
    }
    else {
      clearInterval(myInterval);
      //If player has no input
      console.log(" no input timer:" + timer);
      if ($("#player i").first().text() == "" && timer == 0){
        win = false;
      }
    }
  }, 1000);
}

//-------------- OOP ---------------------------
let rps = new Minigame('rps'); //Rock, Papers, Scissors
let dontPress = new Minigame('dontPress'); //Dont Press Button game
gamesArr.push(rps);
gamesArr.push(dontPress);

// ----------------------- Dont Press ------------------
dontPress.playGame = function () {
  $(".dontTouch .hide").show();

  $(".dontTouch .hide").click(function(event) {
    win = false;
    console.log("You lost because you pressed the button");
    loseScreen();
    $(".dontTouch .hide").hide();
  });

  myInterval = setInterval(function(){
    console.log("after some time...");
    stopInterval();
    dontPress.endGame();
  }, (timer * 1000));
}

dontPress.endGame = function () {
  $(".dontTouch .hide").hide();
  success++;
  console.log("timer is 0 and win is true");
  playRandomGame();
}
// ----------------------- End - Dont Press ------------------

rps.playGame = function() {
  {
    let i = getRandomIntInclusive(0,2); //get random value from [0,2]
    let playerTurn = true; //give player chance to do something
    $(`#rps${i}`).clone().appendTo('#ai'); //prints out random computer move
    console.log("play_rps worked");
    $("#ai .hide").show(); //reveals computer move (after using .clone() )

    // Timer handling:
    countdown(timer); //Game runs while timer not at zero


    //button clicks:
    //Left button on click
    $("#sidebtn1").click(function(event) {
      $("#rps0").clone().appendTo('#player');
      $("#player .hide").show();
    });

    $(document).keydown(function playerMoveRPS(e) {
      //Keyboard input:
      if (playerTurn) { //Condition prevents from keydown() being used more than once
        if (e.which == 65) { //A Key
          console.log("A pressed");
          $("#rps0").clone().appendTo('#player');
          $("#player .hide").show();
        }
        else if (e.which == 83) { //W Key
          console.log("S pressed");
          $("#rps1").clone().appendTo('#player');
          $("#player .hide").show();
        }
        else if (e.which == 68) { //D Key
          console.log("D pressed");
          $("#rps2").clone().appendTo('#player');
          $("#player .hide").show();
        }
        else {
          playerMoveRPS(); /*Without this recursion,
            an unexpected input will take place of
            A, S, or D and therefore make this keydown() obsolete*/
        }
        playerTurn = false; //end of player turn
      }
      //Game Logic:
      //If Player chose ROCK
      if ($("#player i").first().text() == "ROCK") {
        console.log("ROCK");
        //Computer Options Below:
        if ($("#ai i").first().text() == "ROCK") {
          console.log("Draw");
          $("#report").text("DRAW");
        }
        else if ($("#ai i").first().text() == "PAPER"){
          console.log("You Lose");
          $("#report").text("LOSE");
          win = false;
        }
        else if ($("#ai i").first().text() == "SCISSORS"){
          console.log("You Win");
          success++; //Increment success
          console.log("Success: " + success);
          winScreen();
        }
      }
       //If Player chose PAPER
      if ($("#player i").first().text() == "PAPER") {
        console.log("PAPER");
        //Computer Options Below:
        if ($("#ai i").first().text() == "SCISSORS") {
          console.log("You Lose");
          $("#report").text("LOSE");
          win = false;
        }
        else if ($("#ai i").first().text() == "PAPER"){
          console.log("Draw");
          $("#report").text("DRAW");
        }
        else if ($("#ai i").first().text() == "ROCK"){
          console.log("You Win");
          console.log("Success: " + success);
          success++;
          winScreen();
        }
      }
       //If Player chose SCISSORS
      if ($("#player i").first().text() == "SCISSORS") {
        console.log("SCISSORS");
        //Computer Options Below:
        if ($("#ai i").first().text() == "ROCK") {
          console.log("You Lose");
          $("#report").text("LOSE");
          win = false;
        }
        else if ($("#ai i").first().text() == "PAPER"){
          console.log("You Win");
          success++;
          console.log("Success: " + success);
          winScreen();
        }
        else if ($("#ai i").first().text() == "SCISSORS"){
          console.log("Draw");
          $("#report").text("DRAW");
        }
      }
    });
    this.endGame(1);
  }
};

//Clear up screen from RPS game (after an interval):
rps.endGame = function (interval) {
  let runAfterThisManyMs = (timer + interval) * 1000;
  let removeContent = setInterval(function (interval) {
    if(interval > 0) {
      console.log(interval);
      interval = interval - 1;
    }
    else{
      $("#ai .hide").remove();
      $("#player .hide").remove();
      $("#report").text("");
      clearInterval(removeContent);
    }

    if (win == true) {
      playRandomGame();
    }
    else if(win == false) {
      loseScreen();
    }
  }, runAfterThisManyMs);
}
// ------------------- End of RPS ---------------------





//----------------- Game essentially starts here-----------------------//
$(document).ready(function() {
  //hide game(s) and content:
  $(".rps .hide").hide();
  $(".dontTouch .hide").hide();


  //User clicks START to begin
  //Unhide necessary content game
  //select game based on id and random value
  $('#start').click(function() {
    $("#start").off("click");

    $('#sidebtn1').addClass('moveUp');
    $('#sidebtn2').addClass('moveUp')
    $(this).addClass('changeStart');
    $(this).text('S');
    removeBg();

    //Play random game, if won, play another, else lose screen:
    playRandomGame();
  });

});
