/*
Created By Syed Shah
Last Update: 10/10/2017
*/

let toBeStarted = true; //This will allow the start button to run once
let win = true; //Keep playin while winning (default is win, so run on default)
let success = 0; //number of successful wins
let timer = 3;
let colors = ["#EFC94C", "#FF9047", "#FF7772", "#C5EFF7"];
let myInterval;

function Minigame(name) {
  this.name = name;
  this.playGame = function() {}
  this.endGame = function() {}
}

function playRandomGame() {
  let randomGameIndex = getRandomIntInclusive(0,0);
  gamesArr[randomGameIndex].playGame();
  // if (win == true){return playRandomGame();}
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
    if(timer >= 0) {
      $("#timer").text(`Timer: ${timer}`);
      timer = timer - 1;
    }
    else{
      console.log("Out of time");
      clearInterval(myInterval);

    }
  }, 1000);
}

//-------------- OOP ---------------------------
let rps = new Minigame('rps'); //Rock, Papers, Scissors
let gamesArr = [rps];

rps.playGame = function() {
  if(toBeStarted == true){
    let i = getRandomIntInclusive(0,2); //get random value from [0,2]
    let playerTurn = true; //give player chance to do something
    $(`#rps${i}`).clone().appendTo('#ai'); //prints out random computer move
    console.log("play_rps worked");
    $("#ai .hide").show(); //reveals computer move (after using .clone() )

    // Timer handling:
    countdown(timer); //Game runs while timer not at zero

    $(document).keydown(function playerMoveRPS(e) {
      while (playerTurn) {
        if (e.which == 65) {
          console.log("A pressed");
          $("#rps0").clone().appendTo('#player');
          $("#player .hide").show();
        }
        else if (e.which == 83) {
          console.log("S pressed");
          $("#rps1").clone().appendTo('#player');
          $("#player .hide").show();
        }
        else if (e.which == 68) {
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

        //Game Logic:
        //If Player chose ROCK
        if ($("#player i").first().text() == "ROCK") {
          console.log("ROCK");
          //Computer Options Below:
          if ($("#ai i").first().text() == "ROCK") {
            console.log("Draw");
            $("#report").text("DRAW");
            // stopInterval();
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("You Lose");
            $("#report").text("LOSE");
            // stopInterval();
            win = false;
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("You Win");
            success++; //Increment success
            console.log("Success: " + success);
            // stopInterval();
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
            // stopInterval();
            win = false;
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("Draw");
            $("#report").text("DRAW");
            // stopInterval();
          }
          else if ($("#ai i").first().text() == "ROCK"){
            console.log("You Win");
            console.log("Success: " + success);
            success++;
            // stopInterval();
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
            // stopInterval();
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("You Win");
            success++;
            console.log("Success: " + success);
            winScreen();
            // stopInterval();
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("Draw");
            $("#report").text("DRAW");
            // stopInterval();
          }
        }
      }
    });

    this.endGame(2);

    toBeStarted = false; //prevent START button from creating anything
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
    //Call playRandomGame() here
    if (win == true) {
        playRandomGame();
      }
  }, runAfterThisManyMs);
}
// ------------------- End of RPS ---------------------


//----------------- Game essentially starts here-----------------------//
$(document).ready(function() {
  //hide game(s) and content:
  $(".rps .hide").hide();



  //User clicks START to begin
  //Unhide necessary content game
  //select game based on id and random value
  $('#start').click(function() {
      $('#sidebtn1').addClass('moveUp');
      $('#sidebtn2').addClass('moveUp')
      $(this).addClass('changeStart');
      $(this).text('S');
      $("button").css({"left": "25%"});
      removeBg();

      //Play random game, if won, play another, else lose screen:
      playRandomGame();

   });




  //Now Start Game:
  //if started = true;
  //while win = true: keep playing minigame(s), else go to lose screen

});
