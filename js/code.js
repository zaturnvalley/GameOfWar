
//all cards
var fullDeck = [3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15];

var player1 = [];
var player2 = [];

//shuffle the cards
function shuffle(){
  fullDeck.sort(function() { return 0.5 - Math.random() });
}
//deals half to player 1 half to player 2 after shuffle
function deal(){
  fullDeck = [3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15];
  player1 = fullDeck.splice(0,27);
  player2 = fullDeck;
  fullDeck = [];
  console.log('dealing p1 ',player1)
  console.log('dealing p2', player2)
}

//invokes deal and shuffle
$('#shuffle').click(function(){
  shuffle();
  deal();
  $('#shuffle').html('Re-Shuffle');
});

$('#reset').click(function(){
  fullDeck = [3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15];
  player1 = [];
  player2 = [];
});

function remClass(player, i){
  $('"' + '#' + '"' + player).removeClass('"' + '.' + i + '"');
}
function adClass(player, i){
  $('"' + '#' + '"' + player).addClass('"' + '.' + i + '"');
}
//Turn function
$('#player1').click(function(){
  if(fullDeck[0]!==undefined){
    alert('Please Shuffle the Deck');
    return;
  }
  //Winner scenario
  if(player1.length === 54){
  console.log('Player 1 Wins!');
  }
  if(player2.length === 54){
  console.log('Player 2 Wins!');
  }
  console.log("player1", player1[0]);
  console.log("player2", player2[0]);

  if(player1[0] > player2[0]){
    player1.push(player2.shift());
    player1.push(player1.shift());
    $('p').val('Player 1 Takes');
    console.log('p1');
  } else if (player2[0] > player1[0]){
    player2.push(player2.shift());
    player2.push(player1.shift());
    $('p').val('Player 2 Takes');
    console.log('p2');
  } else {
    $('p').val('War has begun');
    war(3);
  }
});

//if cards are tied, war is invoked
function war(indexNum){
  console.log('warring');
  if(player1[indexNum] > player2[indexNum]){
    var spliced2 = player2.splice(0,4);
    player1.push(spliced2[indexNum - 3], spliced2[indexNum - 2], spliced2[indexNum - 1], spliced2[indexNum]);
    $('p').val('Player 1 Wins War Round');
  } else if(player2[indexNum] > player1[indexNum]){
    var spliced1 = player1.splice(0,4);
    $('p').val('Player 2 Wins War Round');
    player2.push(spliced1[indexNum - 3], spliced1[indexNum - 2], spliced1[indexNum - 1], spliced1[indexNum]);
  } else if (player2[indexNum]===player1[indexNum]){
    console.log('rewar');
    $('p').val('Tie! Re-war!');
    war(indexNum + 4);
  }
}



//rand divies all cards: 26 to p1, 26 to p2
//first card in new array flip p1 & p2
//compare: if p1 higher, add to p1 bottom, if p2 higher, add to p2 bottom
//if same = war, p1 p2 flip 3 upsidedown, both flip 4th card up, compare
//winner take all. if same, repeat another war
//game ends when p1 or p2 has all the cards

//bonus* if mad, press mad button. start 52 card pick up function
//player must click all 52 scattered cards in 52 seconds. game resets
