
function removeBg() {
  $(".window").css({
    "background-image": "url()",
    "background": "#fafafa",
    "animation": "fadeIn 1s linear"
  });
}

function Minigame(name, id) {
  this.name = name;
  this.id = id;
}

//Will use this to randomly cycle through games based on their id
function getRandomIntInclusive(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

let win = true;
let rps = Minigame('rps', 0); //Rock, Papers, Scissors
let success = 0; //number of successful wins


$(document).ready(function() {
  //hide game(s) and content
  // $(".rps").hide();
  // $("#timer").hide();

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
   });

  //Now Start Game:
  //while win = true: keep playing minigame(s), else go to lose screen

});

