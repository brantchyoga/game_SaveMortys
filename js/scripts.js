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

// function shuffleObject(array) {
//   var temp;
// 		for(var i = array.length-1;i>=0;i--) {
// 			var randomNUm = Math.floor(Math.random() * (i + 1));
// 			temp = array[i];
// 			array[i] = array[randomNUm];
// 			array[randomNUm] = temp;
// 		}
// }


$(document).ready(function(){
  $.get('js/genknow_easy.json').done(function(data) {
    genKnowEasy = data.results;
    let randomQuest = Math.floor((Math.random() * genKnowEasy.length)-1);
    $('#accordion1 .question1').html(genKnowEasy[randomQuest].question);
  });

  $.get('js/genknow_med.json').done(function(data) {
    genKnowMed = data.results;
    let randomQuest = Math.floor((Math.random() * genKnowMed.length)-1);
    $('#accordion1 .question2').html(genKnowMed[randomQuest].question);
  });

  $.get('js/genknow_hard.json').done(function(data) {
    genKnowHard = data.results;
    let randomQuest = Math.floor((Math.random() * genKnowHard.length)-1);
    $('#accordion1 .question3').html(genKnowHard[randomQuest].question)
  });

  $.get('js/genknow_easy.json').done(function(data) {
    entFilmEasy = data.results;
    let randomQuest = Math.floor((Math.random() * entFilmEasy.length)-1);
    $('#accordion2 .question1').html(entFilmEasy[randomQuest].question)
  });

  $.get('js/genknow_med.json').done(function(data) {
    entFilmMed = data.results;
    let randomQuest = Math.floor((Math.random() * entFilmMed.length)-1);
    $('#accordion2 .question2').html(entFilmMed[randomQuest].question)
  });

  $.get('js/genknow_hard.json').done(function(data) {
    entFilmHard = data.results;
    let randomQuest = Math.floor((Math.random() * entFilmHard.length)-1);
    $('#accordion2 .question3').html(entFilmHard[randomQuest].question)
  });

  $.get('js/genknow_easy.json').done(function(data) {
    mythEasy = data.results;
    let randomQuest = Math.floor((Math.random() * mythEasy.length)-1);
    $('#accordion3 .question1').html(mythEasy[randomQuest].question)
  });

  $.get('js/genknow_med.json').done(function(data) {
    mythMed = data.results;
    let randomQuest = Math.floor((Math.random() * mythMed.length)-1);
    $('#accordion3 .question2').html(mythMed[randomQuest].question)
  });

  $.get('js/genknow_hard.json').done(function(data) {
    mythHard = data.results;
    let randomQuest = Math.floor((Math.random() * mythHard.length)-1);
    $('#accordion3 .question3').html(mythHard[randomQuest].question)
  });

});
