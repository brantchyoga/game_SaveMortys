
var genKnowEasy = [];
var genKnowMed =[];
var genKnowHard =[];
var entFilmEasy =[];
var entFilmMed =[];
var entFilmHard =[];
var mythEasy =[];
var mythMed =[];
var mythHard=[];

var correctAnswer;

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
  $('#names').hide();
  $('main').show();
  $('#scoreboard').show();
  $('.player1').text(players.player1.player);
  $('.player2').text(players.player2.player);
}

function reset(obj) {
  //Going to need to change the random number to another random number
}

function addScore(){
  console.log('working');
  
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
  $('.col').off();
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
  console.log(div);
  $(this).append(div);
  $('.questions').append($('<form class="answers"><button type="button" class="submit">Final Answer!</button></form>'));
  incorrectAnswers.forEach(function(answer){
    $('.answers').prepend($('<div class="radio"><input type="radio" value="'+answer+'"><label>'+answer+'</label></div>'));
  });
  $('.submit').on('click', addScore);
}

$(document).ready(function(){
  $('#scoreboard').hide();
  $('main').hide();
  $('form[name=names] button').on('click', names);
  $('#category1 .100').on('click', showQuestion);
  $('#category1 .200').on('click', showQuestion);
  $('#category1 .300').on('click', showQuestion);
  $('#category2 .100').on('click', showQuestion);
  $('#category2 .200').on('click', showQuestion);
  $('#category2 .300').on('click', showQuestion);
  $('#category3 .100').on('click', showQuestion);
  $('#category3 .200').on('click', showQuestion);
  $('#category3 .300').on('click', showQuestion);

  // $('button #1100').on('click', function(){});
  // $('button #1200').on('click', function(){});
  // $('button #1300').on('click', function(){});
  // $('button #2100').on('click', function(){});
  // $('button #2200').on('click', function(){});
  // $('button #2300').on('click', function(){});
  // $('button #3100').on('click', function(){});
  // $('button #3200').on('click', function(){});
  // $('button #3300').on('click', function(){});

});
