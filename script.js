let toBeStarted = true; //This will allow the start button to run once
let win = true;
let rps = Minigame('rps', 0); //Rock, Papers, Scissors
let success = 0; //number of successful wins
let timer = 5;
let colors = ["#EFC94C", "#FF9047", "#FF7772", "#C5EFF7"]

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
  // ^Use setInterval which will run so long a variable is true
  $("#report").text("WIN"); //Add lose response
}

//Will use this to randomly cycle through games based on their id
function getRandomIntInclusive(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function Minigame(name, id) {
  this.name = name;
  this.id = id;
}

function countdown(timer) {
  setInterval(function() {
    if(timer >= 0) {
      $("#timer").text(`Timer: ${timer}`);
      timer = timer - 1;
    }
  }, 1000);
}

function play_rps(){
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
        //If Computer chose ROCK
        if ($("#player i").first().text() == "ROCK") {
          console.log("ROCK");
          if ($("#ai i").first().text() == "ROCK") {
            console.log("Draw");
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("You Lose");
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("You Win");
            success++; //Increment success
            console.log("Success: " + success);
            winScreen();
          }
        }
         //If Computer chose PAPER
        if ($("#player i").first().text() == "PAPER") {
          console.log("PAPER");
          if ($("#ai i").first().text() == "ROCK") {
            console.log("You Win");
            success++;
            console.log("Success: " + success);
            winScreen();
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("Draw");
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("You Lose");
          }
        }
         //If Computer chose SCISSORS
        if ($("#player i").first().text() == "SCISSORS") {
          console.log("SCISSORS");
          if ($("#ai i").first().text() == "ROCK") {
            console.log("You Lose");
          }
          else if ($("#ai i").first().text() == "PAPER"){
            console.log("You Win");
            success++;
            console.log("Success: " + success);
            winScreen();
          }
          else if ($("#ai i").first().text() == "SCISSORS"){
            console.log("Draw");
          }
        }
      }
    });
    toBeStarted = false; //prevent START button from creating anything *Need this as last line for each game*
  }
};



//-------- Code essentiall starts here------------
$(document).ready(function() {
  //hide game(s) and content:
  $(".rps .hide").hide();
  $(".rpsDisplay").hide();



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

      //RPS Test:
      play_rps();

   });




  //Now Start Game:
  //if started = true;
  //while win = true: keep playing minigame(s), else go to lose screen

});
