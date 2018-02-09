
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
var map;
var ultimateWinner = "";
function mapQuestions() {
  map = {
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
}

function names() {
  var nameOne = $('#name1').val();
  var nameTwo = $('#name2').val();
  $('#name2').val('');
  $('#name1').val('');
  if (nameOne === '' || nameTwo === '') {
    $("#fillout").dialog();
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
    $('#instructions').hide();
    $('main').show();
    $('#scoreboard').show();
    $('.player1').text(players.player1.player);
    $('.player2').text(players.player2.player);
  }
  $('#resetquiz').show();
}

function resetQuiz() {
  players.player1.score = 0;
  players.player2.score = 0;
  players.player1.player = '';
  players.player2.player = '';
  $('.score1').text('$0');
  $('.score2').text('$0');
  $('#scoreboard').hide();
  $('main').hide();
  $('#names').show();
  $('#winner').text('');
  $('#winner').hide();
  valuesToClick = [$('#category1 .100'), $('#category1 .200'), $('#category1 .300'), $('#category2 .100'), $('#category2 .200'), $('#category2 .300'), $('#category3 .100'), $('#category3 .200'), $('#category3 .300')];
  valuesToClick.forEach(function(question) {
    question.removeClass('questionanswered');
  });
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
};

function nextGame() {
  $('.container3').show();
  $('#resetquiz').hide();
  $('#next').hide();
}

function gameOver() {
  if(players.player1.score > players.player2.score) {
    $('main').hide();
    console.log("player 1");
    $('#winner').text(players.player1.player);
    ultimateWinner = players.player1.player;
  }

  if(players.player2.score > players.player1.score) {
    $('main').hide();
    console.log("player 2");
    $('#winner').text(players.player2.player);
    ultimateWinner = players.player2.player;
  }
}

function noMoreQuestions() {
  if (valuesToClick.length === 0) {
    return true;
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

function wrongAnswer(rightAnswer, values) {
  $('#wrong p').html("Wrong you lose $"+values+". The correct answer is "+rightAnswer+"!");
  $('#wrong').dialog();
}
function correct(rightAnswer, values) {
  $('#correct p').html("Right! You gain $"+values+". The correct answer was "+rightAnswer+"!");
  $('#correct').dialog();
}

function addScore(){
  $(this).parent().parent().parent().addClass('questionanswered');
  var value = parseInt($(this).attr('id'));
  var checkedAnswer = $('input[name='+value+']:checked').val();
  if(checkedAnswer === correctAnswer) {
    if (turn === 0) {
      players.player1.score += value;
      $('.score1').text('$'+players.player1.score+'');
      changeTurn();
      correct(correctAnswer, value);
    } else {
      players.player2.score += value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn();
      correct(correctAnswer, value);
    }
  }
  if(checkedAnswer !== correctAnswer) {
    if(turn === 0) {
      players.player1.score -= value;
      $('.score1').text('$'+players.player1.score+'');
      changeTurn();
      wrongAnswer(correctAnswer, value);
    } else {
      players.player2.score -= value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn();
      wrongAnswer(correctAnswer, value);
    }
  }
  $('.questions').remove();
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
  if(noMoreQuestions()) {
    if(players.player1.score === players.player2.score) {
      $('#winner').text("It's a tie click Reset to play agian!")
      $('main').hide();
    }
    if(players.player1.score !== players.player2.score) {
      gameOver();
      $('#next').show();
      $('#resetquiz').hide();
    }
  }
}

function showQuestion() {
  mapQuestions();
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
  $(this).append(div);
  $('.questions').append($('<form class="answers"><button type="button" id="'+level+'">Final Answer!</button></form>'));
  incorrectAnswers.forEach(function(answer){
    $('.answers').prepend($('<div class="radio"><input id="'+answer+'" name="'+level+'" type="radio" value="'+answer+'"><label for="'+answer+'">'+answer+'</label></div>'));
  });
  $('#'+level+'').on('click', addScore);
  for (var i = 0; i < valuesToClick.length; i++) {
    if ($(this).is(valuesToClick[i])) {
      valuesToClick.splice(i, 1);
    }
  }
  console.log(correctAnswer);
};
$(document).ready(function(){
  $('#scoreboard').hide();
  $('main').hide();
  $('#resetcanvas').hide();
  $('#next').hide();
  $('.container3').hide();
  $('#fillout').hide();
  $('#resetquiz').hide();

  $('#next').on('click', nextGame);
  $('form[name=names] button').on('click', names);
  $('#resetquiz').on('click', resetQuiz);
  $('#resetcanvas').on('click', resetCanvas);
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
  $('#game').on('click', startCanvas);
});
