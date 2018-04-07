# Memory Game Project

## Table of Contents

* [Introductions](#introductions)
* [How the game works](#how_the_game_works)
* [How to play](#how_to_play)

## Introductions

The starter project had some HTML and CSS styling to display a static version of the Memory Game project. I needed to convert this project from a static project to an interactive one. This required modifying the HTML and CSS files, but primarily the JavaScript file.

## How the game works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down.

The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it displays 3 stars. After 10 moves, it changes to a 2 star rating. After a 10 more moves (in total after 20 moves), it changes to a 1 star rating.

After wining the game a popup appears that shows the time spend, star rating and ask the player if he want to play again.

## How to play

You can play game [here](https://htmlpreview.github.io/?https://github.com/Artur83/fend-project-memory-game/blob/master/index.html)

The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:
* The player flips one card over to reveal its underlying symbol.
* (The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game ends once all cards have been correctly matched.
