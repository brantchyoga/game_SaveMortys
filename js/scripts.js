
var genKnowEasy = [];
var genKnowMed =[];
var genKnowHard =[];
var entFilmEasy =[];
var entFilmMed =[];
var entFilmHard =[];
var mythEasy =[];
var mythMed =[];
var mythHard=[];

var players = {
  player1: {
		player:'',
		score: "score"
	},
	player2: {
		player:'',
		score: "score"
	}
}
var turn = 0;

function names() {
  var nameOne = $('#name1').val();
  var nameTwo = $('#name2').val();
  $('#name2').val('');
  $('#name1').val('');
  let randomNumber = Math.floor(Math.random()*2);
  if(randomNumber === 1) {
    players.player1.player = nameOne;
    players.player2.player = nameTwo;
  } else {
    players.player1.player = nameTwo;
    players.player2.player = nameOne;
  }
  console.log(players.player1.player, players.player2.player);
}

function reset(obj) {
  //Going to need to change the random number to another random number
}

function score(category, value){
  //button click (#category+value) find correct answer and add that score to players turn
  //if incorrect_answers minus
}

$(document).ready(function(){
  $('form[name=names] button').on('click', names)

  $('button #1100').on('click', function(){});
  $('button #1200').on('click', function(){});
  $('button #1300').on('click', function(){});
  $('button #2100').on('click', function(){});
  $('button #2200').on('click', function(){});
  $('button #2300').on('click', function(){});
  $('button #3100').on('click', function(){});
  $('button #3200').on('click', function(){});
  $('button #3300').on('click', function(){});

});
