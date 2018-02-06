$("#accordion1, #accordion2, #accordion3").accordion({
  active: true,
  collapsible: true});
$("#tabs").tabs({
  active: false,
  collapsible: true
});
var genKnowEasy = [];
var genKnowMed =[];
var genKnowHard =[];
var entFilmEasy =[];
var entFilmMed =[];
var entFilmHard =[];
var mythEasy =[];
var mythMed =[];
var mythHard=[];

function answersInField(obj) {
  var cA = obj.correct_answer;
  var iA = obj.incorrect_answers;
  iA.splice()
  let randomNumber = Math.floor(Math.random() * 4);
  iA.splice(randomNumber, 0, cA);
  console.log(cA);
  console.log(iA);
  var radioBtn = $('<input type="radio" name="question0" class="input"><label for="question0">Toggle this custom radio</label>');
  for()
}
function reset(obj) {
  //Going to need to change the random number to another random number
    randomQuestion = Math.floor((Math.random() * obj.length)-1);
}


$(document).ready(function(){
  $.get('js/genknow_easy.json').done(function(data) {
    genKnowEasy = data.results;
    console.log(genKnowEasy);
    let randomQuestion = Math.floor((Math.random() * genKnowEasy.length)-1);
    $('#accordion1 .question1').html(genKnowEasy[randomQuestion].question);
    answersInField(genKnowEasy[randomQuestion]);
  });

  $.get('js/genknow_med.json').done(function(data) {
    genKnowMed = data.results;
    let randomQuestion = Math.floor((Math.random() * genKnowMed.length)-1);
    $('#accordion1 .question2').html(genKnowMed[randomQuestion].question);
  });

  $.get('js/genknow_hard.json').done(function(data) {
    genKnowHard = data.results;
    let randomQuestion = Math.floor((Math.random() * genKnowHard.length)-1);
    $('#accordion1 .question3').html(genKnowHard[randomQuestion].question)
  });

  $.get('js/genknow_easy.json').done(function(data) {
    entFilmEasy = data.results;
    let randomQuestion = Math.floor((Math.random() * entFilmEasy.length)-1);
    $('#accordion2 .question1').html(entFilmEasy[randomQuestion].question)
  });

  $.get('js/genknow_med.json').done(function(data) {
    entFilmMed = data.results;
    let randomQuestion = Math.floor((Math.random() * entFilmMed.length)-1);
    $('#accordion2 .question2').html(entFilmMed[randomQuestion].question)
  });

  $.get('js/genknow_hard.json').done(function(data) {
    entFilmHard = data.results;
    let randomQuestion = Math.floor((Math.random() * entFilmHard.length)-1);
    $('#accordion2 .question3').html(entFilmHard[randomQuestion].question)
  });

  $.get('js/genknow_easy.json').done(function(data) {
    mythEasy = data.results;
    let randomQuestion = Math.floor((Math.random() * mythEasy.length)-1);
    $('#accordion3 .question1').html(mythEasy[randomQuestion].question)
  });

  $.get('js/genknow_med.json').done(function(data) {
    mythMed = data.results;
    let randomQuestion = Math.floor((Math.random() * mythMed.length)-1);
    $('#accordion3 .question2').html(mythMed[randomQuestion].question)
  });

  $.get('js/genknow_hard.json').done(function(data) {
    mythHard = data.results;
    let randomQuestion = Math.floor((Math.random() * mythHard.length)-1);
    $('#accordion3 .question3').html(mythHard[randomQuestion].question)
  });

});
