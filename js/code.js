
//global variables
var fullDeck = [];
var player1 = [];
var player2 = [];
var bounty = [];
var p1Play;
var p2Play;
var WAR_BOUNTY = 3;

//shuffles the cards
function shuffle(){
  player1 = [];
  player2 = [];
  fullDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15];
  fullDeck.sort(function() { return 0.5 - Math.random() });
}
//deals half to player 1 half to player 2 after shuffle
function deal(){
  player1 = fullDeck.splice(0,27);
  player2 = fullDeck;
  console.log('dealing p1 ',player1)
  console.log('dealing p2 ', player2)
}

//invokes deal and shuffle on button click
$('#shuffle').click(function(){
  console.log('clicked');
  shuffle();
  deal();
  $('#shuffle').html('Re-Shuffle');
  $('#player1').bind('click', clicker);
  $('#p1ReaderBoard').html('Player 1 Cards In Deck: ' + player1.length);
  $('#p2ReaderBoard').html('Player 2 Cards In Deck: ' + player2.length);
  $('#p1InPlayCard').removeClass();
  $('#p2InPlayCard').removeClass();
});
//turn function, checks winning scenario, calls round
var clicker = function(){
  //Winner scenario
  if(player1.length === 54){
    declareWinner("Player 1");
    return;
  }
  if(player2.length === 54){
    declareWinner("Player 2");
    return;
  }
  round();
};
//activates each round
function round(){
  if(player1.length === 0){
    declareWinner("Player 2");
    return;
  }
  if(player2.length === 0){
    declareWinner("Player 1");
    return;
  }
  p1Play = player1.shift();
  p2Play = player2.shift();
    bounty.push(p1Play);
    bounty.push(p2Play);
  displayCard(p1Play, p2Play);
  if(p1Play > p2Play){
    player1 = player1.concat(bounty);
    bounty = [];
    $('#infoBox').html('Player 1 Takes');
    $('#p1ReaderBoard').html('Player 1 Cards In Deck: ' + player1.length);
    $('#p2ReaderBoard').html('Player 2 Cards In Deck: ' + player2.length);
    console.log('p1');
  } else if (p1Play < p2Play){
    player2 = player2.concat(bounty);
    bounty = [];
    $('#infoBox').html('Player 2 Takes');
    $('#p1ReaderBoard').html('Player 1 Cards In Deck: ' + player1.length);
    $('#p2ReaderBoard').html('Player 2 Cards In Deck: ' + player2.length);
    console.log('p2');
  } else {
    $('#player1').unbind('click', clicker);
    $('#infoBox').html('<button id="warButton" class="btn btn-danger" type="button">WAR! Click to goto WAR!</button>');
    $('#warButton').bind('click', warClick);
  }
}
//button only appears if war, runs war function, deletes button
var warClick = function(){
  war();
  $('#infoBox').remove('button');
  $('#player1').bind('click', clicker);
};
//if cards are tied, war is invoked, calls round
function war(){
  console.log('warring');
  if (player1.length < WAR_BOUNTY){
    declareWinner("Player 2");
    return;
  }
  if (player2.length < WAR_BOUNTY){
    declareWinner("Player 1");
    return;
  }
  for (var i = 0; i < WAR_BOUNTY; i++){
    bounty.push(player1.shift());
    bounty.push(player2.shift());
  }
  round();
}
//Declare winner
function declareWinner(playerThatWon){
  $('#player1').unbind('click', clicker);
  console.log(playerThatWon + " is the Winner!");
  $('#infoBox').html(playerThatWon + " is the Winner!");
}
//switches classes to display card
function displayCard(cardNum1, cardNum2){
  $('#p1InPlayCard').removeClass();
  $('#p1InPlayCard').addClass("c" + cardNum1);
  $('#p2InPlayCard').removeClass();
  $('#p2InPlayCard').addClass("c" + cardNum2);
}