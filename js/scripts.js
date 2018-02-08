
var genKnowEasy = [];
var genKnowMed =[];
var genKnowHard =[];
var entFilmEasy =[];
var entFilmMed =[];
var entFilmHard =[];
var mythEasy =[];
var mythMed =[];
var mythHard=[];

var correctAnswer = "";

var players = {
  player1: {
		player:'',
		score: 0
	},
	player2: {
		player:'',
		score: 0
	}
}
var turn = 0;

var valuesToClick = [$('#category1 .100'), $('#category1 .200'), $('#category1 .300'), $('#category2 .100'), $('#category2 .200'), $('#category2 .300'), $('#category3 .100'), $('#category3 .200'), $('#category3 .300')];

function names() {
  var nameOne = $('#name1').val();
  var nameTwo = $('#name2').val();
  $('#name2').val('');
  $('#name1').val('');
  if (nameOne === '' || nameTwo === '') {
    $(function() {
      $("#dialog").dialog();
    });
  }
  if (nameOne && nameTwo) {
    let randomNumber = Math.floor(Math.random()*2);
    if(randomNumber === 1) {
      players.player1.player = nameOne;
      players.player2.player = nameTwo;
    } else {
      players.player1.player = nameTwo;
      players.player2.player = nameOne;
    }
    console.log(players.player1.player, players.player2.player);
    $('#names').hide();
    $('main').show();
    $('#scoreboard').show();
    $('.player1').text(players.player1.player);
    $('.player2').text(players.player2.player);
    console.log(players.player1.score);
    console.log(players.player2.score);
  }
}

function reset(obj) {
  //Going to need to change the random number to another random number
}

function gameOver() {
  if(players.player1.score > players.player2.score) {
    $('main').hide();
    $('#winner').text(players.player1.player);
  }

  if(players.player1.score > players.player2.score) {
    $('main').hide();
    $('#winner').text(players.player1.player);
  }
}

function noMoreQuestions() {
  if (valuesToClick.length === 0) {
    gameOver();
  }
}

function changeTurn() {
  console.log(turn);
  if(turn === 0){
    turn = 1;
  } else {
    turn = 0;
  }
}

function addScore(){
  var value = parseInt($(this).attr('id'));
  var checkedAnswer = $('input[name='+value+']:checked').val();
  if(checkedAnswer === correctAnswer) {
    if (turn === 0) {
      players.player1.score += value;
      $('.score1').text('$'+players.player1.score+'');
      changeTurn()
    } else {
      players.player2.score += value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn()
    }
  }
  if(checkedAnswer !== correctAnswer) {
    if(turn === 0) {
      players.player1.score -= value;
      $('.score1').text('$'+players.player1.score+'');
      changeTurn()
    } else {
      players.player2.score -= value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn()
    }
  }
  $('.questions').remove();
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
  noMoreQuestions();
}

function showQuestion() {
  var map = {
    category1: {
      100: genKnowEasy,
      200: genKnowMed,
      300: genKnowHard
    },
    category2: {
      100: entFilmEasy,
      200: entFilmMed,
      300: entFilmHard
    },
    category3: {
      100: mythEasy,
      200: mythMed,
      300: mythHard
    }
  };
  $(".col").off();
  var level = parseInt(this.classList[1]);
  var category = $(this).parent().attr('id');
  var objects = map[category][level];

  let randomQuestion = Math.floor(Math.random() * objects.length);
  let randomNumber = Math.floor(Math.random() * 2);

  var object = objects[randomQuestion];

  correctAnswer = object.correct_answer;
  var incorrectAnswers = object.incorrect_answers;
  incorrectAnswers.splice(randomNumber, 0, correctAnswer);
  var div = $('<div class="questions">');
  div.html(object.question);
  //console.log(div);
  $(this).append(div);
  $('.questions').append($('<form class="answers"><button type="button" id="'+level+'">Final Answer!</button></form>'));
  incorrectAnswers.forEach(function(answer){
    $('.answers').prepend($('<div class="radio"><input id="'+answer+'" name="'+level+'" type="radio" value="'+answer+'"><label for="'+answer+'">'+answer+'</label></div>'));
  });
  $('#'+level+'').on('click', addScore);
  // $(this).removeClass("col "+level+" border").addClass("col border");
  for (var i = 0; i < valuesToClick.length; i++) {
    if ($(this).is(valuesToClick[i])) {
      valuesToClick.splice(i, 1);
    }
  }
}
$(document).ready(function(){
  $('#scoreboard').hide();
  $('main').hide();
  $('form[name=names] button').on('click', names);

  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
});
