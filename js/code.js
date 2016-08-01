console.log('hi');

var fullDeck = ["2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "jh", "qh", "kh", "ah", 
"2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "js", "qs", "ks", "as", 
"2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "jd", "qd", "kd", "ad",
"2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "jc", "qc", "kc", "ac", "j1", "j2"];

var player1 = [];
var player2 = [];

function shuffle(){
  fullDeck.sort(function() { return 0.5 - Math.random() });
}
function deal(){
  player1.push(fullDeck.splice(0,27))
  player2 = fullDeck;
}

// var shuffle = function(){
//   Math.floor(Math.random()*52);
// }

//rand divies all cards: 26 to p1, 26 to p2
//first card in new array flip p1 & p2
//compare: if p1 higher, add to p1 bottom, if p2 higher, add to p2 bottom
//if same = war, p1 p2 flip 3 upsidedown, both flip 4th card up, compare
//winner take all. if same, repeat another war
//game ends when p1 or p2 has all the cards

//bonus* if mad, press mad button. start 52 card pick up function
//player must click all 52 scattered cards in 52 seconds. game resets
