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
    console.log(genKnowEasy[randomQuest].question);
    $('#accordion1 .question1').html(genKnowEasy[randomQuest].question)

  });
  $.get('js/genknow_med.json').done(function(data) {
    genKnowMed = data.results;
    let randomQuest = Math.floor((Math.random() * genKnowMed.length)-1);
    console.log(genKnowMed[randomQuest].question);
    $('#accordion1 .question1').html(genKnowMed[randomQuest].question)
  });
  $.get('js/genknow_hard.json').done(function(data) {
    genKnowHard = data.results;
    let randomQuest = Math.floor((Math.random() * genKnowHard.length)-1);
    console.log(genKnowHard[randomQuest].question);
    $('#accordion1 .question1').html(genKnowHard[randomQuest].question)
  });
  $.get('js/genknow_easy.json').done(function(data) {
    entFilmEasy = data.results;
  });
  $.get('js/genknow_med.json').done(function(data) {
    entFilmMed = data.results;
  });
  $.get('js/genknow_hard.json').done(function(data) {
    entFilmHard = data.results;
  });
  $.get('js/genknow_easy.json').done(function(data) {
    mythEasy = data.results;
  });
  $.get('js/genknow_med.json').done(function(data) {
    mythMed = data.results;
  });
  $.get('js/genknow_hard.json').done(function(data) {
    mythHard = data.results;
  });

});
