$(document).ready(function() {
  //User clicks START to begin
  $('#start').click(function(){
      $('#sidebtn1').addClass('moveUp');
      $('#sidebtn2').addClass('moveUp')
      $(this).addClass('changeStart');
      $(this).text('S');

      $("button").css({"left": "25%"});
   });

  //Now Start Game
});

