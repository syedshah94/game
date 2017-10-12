# game

*** Syed W Shah // 10/6/2017 ***

# [W.Ware] Proposal

## What is [W.Ware]?

Brief description of the game:
This is a game inspired by WarioWare, a series of comedy-based party games published by Nintendo and featuring Wario. For this particular game, I don't own the rights to Wario, so this is just a game inspired by the overall concept.

The game focus on a series of fast paced, simple to play, minigames which will test your reaction, but will leave you charmed by comedy and joy in playing it. 

This project will be more intricate based on time available.
Low Goal: Create 1 minigame
Mid Goal: Create 2 minigames which alternate upon completion until you "lose"
High Goal: Create 3 minigames

## Wireframe

(Your wireframes go here. Preferably two or more)

minigame(name, id) will be used to create each mini game, which will obviously each have a name, but also an id to randomly flip through them as you go along. 


Create a Minigame object to create each mini game. Each minigame should
have a name and a method to play the game and also clean up the screen/end the game.
To play each game, they should be randomly chosen, played, if won go to next game,
otherwise go to the lose screen.

Winning a game scores you one point, and also restarts any timers or misc. elements
on the screen that may not be necessary for the next game.

RPS (Rock Paper Scissors):
Play the simple, well known game, under a timer which should decrease as you successfully 
keep winning minigames (Yet to be implemented timer reduction based on success to increase 
difficulty). 

Use A, S, D keys to respectively choose between Rock, Paper, and Scissors.

Don't Press:
Very simple game where you simply, do not press a button. The idea here is that,
this is a quick and simple game made to demonstrate the randomly flipping between games
upon winning. 



## Initial thoughts on game structure

I think the most difficult part will be, effectively alternating between games upon completing one. It's almost like creating a slideshow, only instead of pictures, it's interaction.

## Phases of Completion
Need:
1. Game Window (Start button)
2. Minigame(s) (obv)
3. Timer (Seconds reducing per mini game, timer gets shorter upon player succession btw challenges)
4. Scoreboard (Counts number of successful wins)
5. Lose screen and chance to "Play Again"
If time permits:
6. Maybe background music when games start 
7. Music Swapped with more suspensful tracks upon higher scores

## Links and Resources

(Anything you've looked up so far or are thinking about using.)

## Skills Used:
HTML/CSS/JS and JQuery

-Recursion

-Intervals

-Objects (May remove)

-Good coding practices (Comments, good names, function explanations)

## Future Plans (Updated 10/12/2017):
1. Implement responsive design so that this may be played on mobile.
2. The obvious, add more mini games. I may want to remove RPS, since I 
feel it's a game too boring for any electronic device (unless I can somehow
make it flashy and fun.)
3. Add button click features so that game play for RPS is not specifically
keyboard reliant. This should be a quick fix.
