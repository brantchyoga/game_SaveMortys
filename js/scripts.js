//Global variables hold JSON file data
var genKnowEasy = [];
var genKnowMed =[];
var genKnowHard =[];
var entFilmEasy =[];
var entFilmMed =[];
var entFilmHard =[];
var mythEasy =[];
var mythMed =[];
var mythHard=[];
//Global variable correctAnswer to be used in different functions
var correctAnswer = "";
//Player object
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
//turn starts at 0 for player 1
var turn = 0;
//Questions to be clicked on
var valuesToClick = [$('#category1 .100'), $('#category1 .200'), $('#category1 .300'), $('#category2 .100'), $('#category2 .200'), $('#category2 .300'), $('#category3 .100'), $('#category3 .200'), $('#category3 .300')];
//
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
  //Grabs to values of players names and also empties the input fields
  var nameOne = $('#name1').val();
  var nameTwo = $('#name2').val();
  $('#name2').val('');
  $('#name1').val('');
  //If either name input field is empty users are show the dialog box
  if (nameOne === '' || nameTwo === '') {
    $("#fillout").dialog();
  }
  //Established name fields have been filled out and randomly assigns one of the names to player 1
  if (nameOne && nameTwo) {
    let randomNumber = Math.floor(Math.random()*2);
    if(randomNumber === 1) {
      players.player1.player = nameOne;
      players.player2.player = nameTwo;
    } else {
      players.player1.player = nameTwo;
      players.player2.player = nameOne;
    }
    $('#names').hide();
    $('#instructions').hide();
    $('main').show();
    $('#scoreboard').show();
    $('.player1').text(players.player1.player);
    $('.player2').text(players.player2.player);
    $('#resetquiz').show();
    $('#player1name').addClass('playerturn');
  }
}

function resetQuiz() {
  //restores player object and scores
  players.player1.score = 0;
  players.player2.score = 0;
  players.player1.player = '';
  players.player2.player = '';
  $('.score1').text('$0');
  $('.score2').text('$0');
  //resets board to starting position
  $('#player2name').removeClass('playerturn');
  $('#scoreboard').hide();
  $('main').hide();
  $('#names').show();
  $('#winner').text('');
  $('#score').hide();
  $('#resetquiz').hide();
  //Turns off previous click events so they can be restarted and removes questions not answered
  $('.col').off();
  $('.questions').remove();
  correctAnswer = '';
  //turn back to player 1
  turn = 0;
  //restores the valuesToClick array so all questions can be clicked on
  valuesToClick = [$('#category1 .100'), $('#category1 .200'), $('#category1 .300'), $('#category2 .100'), $('#category2 .200'), $('#category2 .300'), $('#category3 .100'), $('#category3 .200'), $('#category3 .300')];
  valuesToClick.forEach(function(question) {
    //removes the background so users can see the questions
    question.removeClass('questionanswered');
  });
  valuesToClick.forEach(function(value) {
    value.on('click', showQuestion);
  });
};

function nextGame() {
  //Shows canvas game and hides the buttons that shouldn't show
  $('.container3').show();
  $('#resetquiz').hide();
  $('#next').hide();
}
//Function to be run when questions are all answered
function quizOver() {
  //Checks to see who won then hides the quiz game and show the winners name and passes that name to be used in the canvas game
  if(players.player1.score > players.player2.score) {
    $('main').hide();
    $('#score').show();
    $('#winner').text(players.player1.player);
    ultimateWinner = players.player1.player;
  }
  if(players.player2.score > players.player1.score) {
    $('main').hide();
    $('#score').show();
    $('#winner').text(players.player2.player);
    ultimateWinner = players.player2.player;
  }
}
//checks to see if all the questions have been answered
function noMoreQuestions() {
  if (valuesToClick.length === 0) {
    return true;
  }
}
//switches turns by changing turns value to 1 or 0
function changeTurn() {
  if(turn === 0){
    $('#player1name').removeClass('playerturn');
    $('#player2name').addClass('playerturn');
    turn = 1;
  } else {
    $('#player2name').removeClass('playerturn');
    $('#player1name').addClass('playerturn');
    turn = 0;
  }
}
//Functions for dialog boxes to let users know the correct answer and how that effects there score
function wrongAnswer(rightAnswer, values) {
  $('#wrong p').html("Wrong you lose $"+values+". The correct answer is "+rightAnswer+"!");
  $('#wrong').dialog();
}
function correct(rightAnswer, values) {
  $('#correct p').html("Right! You gain $"+values+". The correct answer was "+rightAnswer+"!");
  $('#correct').dialog();
}

function addScore(){
  //Because the question was answered this classes fills in the background so the user knows it has been answered
  $(this).parent().parent().parent().addClass('questionanswered');
  //The button that was created holds the value of the question in its id
  var value = parseInt($(this).attr('id'));
  //finds the checked answer which is a string
  var checkedAnswer = $('input[name='+value+']:checked').val();
  //compares the string of the checked answer to the current correctAnswer
  if(checkedAnswer === correctAnswer) {
    //Adds score to whoevers turn it is
    if (turn === 0) {
      players.player1.score += value;
      //shows current players score
      $('.score1').text('$'+players.player1.score+'');
      // switches turn to either 0 or 1
      changeTurn();
      correct(correctAnswer, value);
    } else {
      players.player2.score += value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn();
      //Correct function activates the dialog jquery ui function
      correct(correctAnswer, value);
    }
  }
  if(checkedAnswer !== correctAnswer) {
    //subtracts score to whoevers turn it is
    if(turn === 0) {
      players.player1.score -= value;
      $('.score1').text('$'+players.player1.score+'');
      changeTurn();
      //activates dialog jquery ui function
      wrongAnswer(correctAnswer, value);
    } else {
      players.player2.score -= value;
      $('.score2').text('$'+players.player2.score+'');
      changeTurn();
      wrongAnswer(correctAnswer, value);
    }
  }
  //Since the question has been answered the div with the class of questions needs to be removed
  $('.questions').remove();
  //Restores click events to the remaining valuesToClick after the splice in showQuestions function
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
  //If the is no more questions declares a tie or runs the function quizOver for the quiz portion
  if(noMoreQuestions()) {
    if(players.player1.score === players.player2.score) {
      $('#winner').text("It's a tie click Reset to play agian!")
      $('main').hide();
    }
    if(players.player1.score !== players.player2.score) {
      quizOver();
      $('#next').show();
      $('#resetquiz').hide();
    }
  }
}

function showQuestion() {
  //mapQuestions makes the object that holds the questions and answers available in this function.
  mapQuestions();
  //Switchs clicks events off because user shouldn't be able to click on anyother questions
  $(".col").off();
  //Each value that is clicked on has a class of that value whick is stored in the variable level
  var level = parseInt(this.classList[1]);
  //The parent div holds the cagetory of the question they clicked on in the id
  var category = $(this).parent().attr('id');
  //map is the object coming from the mapQuestions function to find the cagetory and level of question to store in the variable objects
  var objects = map[category][level];
  //Gets a random number to help randomly choose a question from the objects array.
  let randomQuestion = Math.floor(Math.random() * objects.length);
  //Picks a random random question with the answers to be stored in object.
  var object = objects[randomQuestion];
  //correctAnswer is a string
  correctAnswer = object.correct_answer;
  //incorrectAnswers is an array
  var incorrectAnswers = object.incorrect_answers;
  //random number to be used to splice the correctAnswer into incorrectAnswers
  let randomNumber = Math.floor(Math.random() * 4);
  incorrectAnswers.splice(randomNumber, 0, correctAnswer);
  var div = $('<div class="questions">');
  //Uses the div above to put the random question inside
  div.html(object.question);
  //then appends the div to the value that was clicked on.
  $(this).append(div);
  $('.questions').append($('<form class="answers"><button type="button" id="'+level+'">Final Answer!</button></form>'));
  //Adds the answers to the the div in the form with the button which has the id of that value
  incorrectAnswers.forEach(function(answer){
    $('.answers').prepend($('<div class="radio"><input id="'+answer+'" name="'+level+'" type="radio" value="'+answer+'"><label for="'+answer+'">'+answer+'</label></div>'));
  });
  //Adds the click event to the button in the form
  $('#'+level+'').on('click', addScore);
  //Functions to find the what was clciked on in the valuesToClick array and then splice it out so that value can't be clicked on again
  for (var i = 0; i < valuesToClick.length; i++) {
    if ($(this).is(valuesToClick[i])) {
      valuesToClick.splice(i, 1);
    }
  }
};
$(document).ready(function(){
  //Hide div containing parts or the game to be shown later.
  $('#scoreboard').hide();
  $('main').hide();
  $('#resetcanvas').hide();
  $('#next').hide();
  $('.container3').hide();
  $('#fillout').hide();
  $('#resetquiz').hide();
  //Next is the button that shows after up after the quiz is won and shows container3 which is the canvas game!
  $('#next').on('click', nextGame);
  //Runs the names function that takes the players names and randomly makes one of them player 1 or 2.
  $('form[name=names] button').on('click', names);
  // Resets quiz game only in case of tie or do-overs.
  $('#resetquiz').on('click', resetQuiz);
  //Resets canvas game and also runs the function of resetQuiz
  $('#resetcanvas').on('click', resetCanvas);
  //Shows the questions and answers for the user depending on the click.
  valuesToClick.forEach(function(click) {
    click.on('click', showQuestion);
  });
  //Starts the canvas game loop.
  $('#game').on('click', startCanvas);
});
