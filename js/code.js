$(document).ready(function() {
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
    winnerScenario();
    round($('#p1InPlayCard')[0], $('#p2InPlayCard')[0]);

  };
  //activates each round
  function round(yours, theirs, yourBounty, theirBounty){
    if(checkForWinnerThenFlip()){
      return;
    }
    displayCard(yours, theirs, p1Play, p2Play, yourBounty, theirBounty);
    whoWinsThisRound();
  }
  //checks if there's a winner each turn, turn divys up cards
  function checkForWinnerThenFlip(){
    if(player1.length === 0){
      declareWinner("Player 2");
      return true;
    }
    if(player2.length === 0){
      declareWinner("Player 1");
      return true;
    }
    p1Play = player1.shift();
    p2Play = player2.shift();
    bounty.push(p1Play);
    bounty.push(p2Play);
    return false;
  }
  //this checks to see who won each round. if tied, it goes to war
  function whoWinsThisRound(){
    if(p1Play > p2Play){
      player1 = player1.concat(bounty);
      bounty = [];
      $('#p1ReaderBoard').html('Player 1 Cards In  Pile: ' + player1.length);
      $('#p2ReaderBoard').html('Player 2 Cards In Pile: ' + player2.length);
      $('#infoBox').html('Player 1 Wins Round & Takes Card').removeClass('player2Text').addClass('player1Text');
      // if(!($('#war-container').is(':empty'))){
      //   setTimeout(clearWarCards, 5000);
      // }
      console.log('p1');
    } else if (p1Play < p2Play){
      player2 = player2.concat(bounty);
      bounty = [];
      $('#p1ReaderBoard').html('Player 1 Cards In Pile: ' + player1.length);
      $('#p2ReaderBoard').html('Player 2 Cards In Pile: ' + player2.length);
      $('#infoBox').html('Player 2 Wins Round & Takes Card').removeClass('player1Text').addClass('player2Text');
      // if(!($('#war-container').is(':empty'))){
      //   setTimeout(clearWarCards, 5000);
      // }
      console.log('p2');
    } else {
      $('#infoBox').removeClass('player1Text');
      $('#infoBox').removeClass('player2Text');
      $('#player1').unbind('click', clicker);
      $('#infoBox').html('<button id="warButton" class="btn btn-danger" type="button">WAR! Click to goto WAR!</button>');
      $('#warButton').bind('click', warClick);
    }
  }
  //if this is fulfilled, there will be a winner
  function winnerScenario(){
    if(player1.length === 54){
      declareWinner("Player 1");
      $('#war-container').html('');
      return;
    }
    if(player2.length === 54){
      declareWinner("Player 2");
      $('#war-container').html('');
      return;
    }
  }
  //button only appears if war, runs war function, deletes button
  var warClick = function(){
    $('#infoBox').html('');
    war();
  };
  //if cards are tied, war is invoked, calls round
  function war(){
    if (player1.length < WAR_BOUNTY){
      declareWinner("Player 2");
      $('#war-container').html('');
      return;
    }
    if (player2.length < WAR_BOUNTY){
      declareWinner("Player 1");
      $('#war-container').html('');
      return;
    }
    for (var i = 0; i < WAR_BOUNTY; i++){
      bounty.push(player1.shift());
      bounty.push(player2.shift());
    }
    var newDiv = displayWarCards();
    round('#' + newDiv[0].children[1].id, '#' + newDiv[0].children[2].id, '#' + newDiv[0].children[0].id, '#' + newDiv[0].children[3].id);
    var newButton = $('<button class=\'btn btn-danger\'>Clear Out War Cards</button>');
    newButton.bind('click', clearWarCards);
    $('#war-container').append(newButton);
  }
  //Declare winner
  function declareWinner(playerThatWon){
    $('#player1').unbind('click', clicker);
    console.log(playerThatWon + " is the Winner!");
    $('#infoBox').html(playerThatWon + " is the Winner!");
  }
  //switches classes to display card
  function displayCard(select1, select2, cardNum1, cardNum2, yourBounty, theirBounty){
    $(select1).removeClass();
    if(yourBounty!==null){
      $(yourBounty).addClass('col-md-3 col-md-offset-3');
    }
    $(select1).addClass("c" + cardNum1 + ' col-md-3');
    $(select2).removeClass();
    if(theirBounty!==null){
      $(theirBounty).addClass('col-md-3');
    }
    $(select2).addClass("c" + cardNum2 + " col-md-3");
  }
  //creates war cards div to display
  function displayWarCards(){
    var newDiv = $('<div class="row"></div>');
    newDiv.append($('<div style="background-image: url(\'./img/warCards.jpg\'); border: 1px solid black; background-size: cover; width:150px; height:214.5px; border-radius:8%" id="' + generateID('yourBounty') + '"></div>'));
    newDiv.append($('<div style="border: 1px solid black; width:150px; height:214.5px; background-size: cover; border-radius:8%" id="' + generateID('p1InPlayCard') + '"></div>'));
    newDiv.append($('<div style="border: 1px solid black; width:150px; height:214.5px; background-size: cover; border-radius:8%" id="' + generateID('p2InPlayCard') + '"></div>'));
    newDiv.append($('<div style="background-image: url(\'./img/warCards.jpg\'); border: 1px solid black; background-size: cover; width:150px; height:214.5px; border-radius:8%" id="' + generateID('theirBounty') + '"></div>'));
    $('#war-container').append(newDiv);
    return newDiv;
  }
  //creates new IDs for war divs
  function generateID(player){
    var i = 0;
    var elem = document.getElementById(player + i);
    while(elem){
      i++;
      elem = document.getElementById(player + i);
    } 
    return player + i;
  }
  //clears out war card rows in container
  function clearWarCards(){
    console.log('clearing war cards');
    $('#war-container').html('');
    $('#player1').bind('click', clicker);
  }
  $("#scatter").click(function(){
    var messy = (Math.floor(Math.random()*100));
    for (var j = 0; j <=4; j++) {
      for (var i = 2; i< 14; i++){
        var scatterCard = $('<div class="card clickToDelete c' + i + '" style="display:inline-block; z-index:1; position: absolute; left:' + (Math.floor(Math.random()*1000)) + 'px; top:' + (Math.floor(Math.random()*1000)) + 'px; transform:rotate(' + (Math.floor(Math.random()*360)) + 'deg)"></div>');
        scatterCard.bind('click', destroySelf);
        $('.container-fluid').append(scatterCard);
      }
    }
  });
  var destroySelf = function(){
    console.log('I exist');
    this.remove();
  }
});