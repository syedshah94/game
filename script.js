/*
Created By Syed Shah
Last Update: 10/10/2017
*/

let toBeStarted = true; //This will allow the start button to run once
let win = true;
let success = 0; //number of successful wins
let timer = 5;
let colors = ["#EFC94C", "#FF9047", "#FF7772", "#C5EFF7"];

function Minigame(name) {
  this.name = name;
  this.playGame = function() {}
  this.endGame = function() {}
}

function removeBg() {
  $(".window").css({
    "background-image": "url()",
    "background": "#fafafa",
    "animation": "fadeIn 1s linear"
  });
}

function winScreen() {
  $(".window").css({
    "background": colors[getRandomIntInclusive(0, colors.length - 1)]
  });
  $("#result").text(`Success: ${success}`);
  $("#report").text("WIN"); //Add win/draw/lose response where appropriate.

  //Restart Screen and game:
}

//Will use this to randomly cycle through games based on their id
function getRandomIntInclusive(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function countdown(timer) {
  let myTimer = setInterval(function () {
    if(timer >= 0) {
      $("#timer").text(`Timer: ${timer}`);
      timer = timer - 1;
    }
    else{
      console.log("Out of time");
    }
  }, 1000);
  // if (timer < 1) {clearInterval(myTimer);}
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
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("You Lose");
            $("#report").text("LOSE");
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
          if ($("#ai i").first().text() == "ROCK") {
            console.log("You Win");
            success++;
            console.log("Success: " + success);
            winScreen();
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("Draw");
            $("#report").text("DRAW");
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("You Lose");
            $("#report").text("LOSE");
          }
        }
         //If Player chose SCISSORS
        if ($("#player i").first().text() == "SCISSORS") {
          console.log("SCISSORS");
          //Computer Options Below:
          if ($("#ai i").first().text() == "ROCK") {
            console.log("You Lose");
            $("#report").text("LOSE");
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
      }
    });
    toBeStarted = false; //prevent START button from creating anything *Need this as last line for each game*
  }
};

function rps.endGame() {}



//-------- Code essentiall starts here------------
$(document).ready(function() {
  //hide game(s) and content:
  $(".rps .hide").hide();
  // $(".rpsDisplay").hide();
  //^Might be uneccessary (remove? --Update: 10/10/2017 10:27am Syed)



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
      countdown(timer);

      //Future plan: Call a function to randomly select which minigame to play
      gamesArr[getRandomIntInclusive(0,0)].playGame(); //play rps

   });




  //Now Start Game:
  //if started = true;
  //while win = true: keep playing minigame(s), else go to lose screen

});
