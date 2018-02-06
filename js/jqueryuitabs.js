var randomQuestion = null;

function answersInField(obj, category, value) {
  var cA = obj.correct_answer;
  var iA = obj.incorrect_answers;
  let randomNumber = Math.floor(Math.random() * 4);
  iA.splice(randomNumber, 0, cA);

  $('#accordion'+category+' .'+value+'').append('<form name="'+category+value+'"></form>');
  $('form[name='+category+value+']').append('<button id="'+category+value+'">Final Answer!</button>');

  for(var i = 0;i < iA.length;i++) {
    var radioBtn = $('<div class="radio"><input type="radio" value="'+value+'" name="question0" class="input"><label class="label'+category+value+'" for="'+category+value+[i]+'"></label></div>');
    $('form[name='+category+value+']').prepend(radioBtn);
    $('label[for='+category+value+[i]+']').html(iA[i]);
  }
}

$(document).ready(function(){
  $("#accordion1").accordion({
    active: true,
    collapsible: true});
  $("#accordion2").accordion({
      active: true,
      collapsible: true});
  $("#accordion3").accordion({
        active: true,
        collapsible: true});
  $("#tabs").tabs({
    active: false,
    collapsible: true
  });

  $.get('js/genknow_easy.json').done(function(data) {
    genKnowEasy = data.results;
    let value = 100;
    let category = 1;
    randomQuestion = Math.floor(Math.random() * genKnowEasy.length);
    $('#accordion1 .'+value+'').html(genKnowEasy[randomQuestion].question);
    answersInField(genKnowEasy[randomQuestion], category, value);
  });

  $.get('js/genknow_med.json').done(function(data) {
    genKnowMed = data.results;
    let value = 200;
    let category = 1;
    randomQuestion = Math.floor(Math.random() * genKnowMed.length);
    $('#accordion1 .'+value+'').html(genKnowMed[randomQuestion].question);
    answersInField(genKnowMed[randomQuestion], category, value);
  });

  $.get('js/genknow_hard.json').done(function(data) {
    genKnowHard = data.results;
    let value = 300;
    let category = 1;
    randomQuestion = Math.floor(Math.random() * genKnowHard.length);
    $('#accordion1 .'+value+'').html(genKnowHard[randomQuestion].question);
    answersInField(genKnowHard[randomQuestion], category, value);
  });

  $.get('js/entfilm_easy.json').done(function(data) {
    entFilmEasy = data.results;
    let value = 100;
    let category = 2;
    randomQuestion = Math.floor(Math.random() * entFilmEasy.length);
    $('#accordion2 .'+value+'').html(entFilmEasy[randomQuestion].question);
    answersInField(entFilmEasy[randomQuestion], category, value);
  });

  $.get('js/entfilm_med.json').done(function(data) {
    entFilmMed = data.results;
    let value = 200;
    let category = 2;
    randomQuestion = Math.floor(Math.random() * entFilmMed.length);
    $('#accordion2 .'+value+'').html(entFilmMed[randomQuestion].question);
    answersInField(entFilmMed[randomQuestion], category, value);
  });

  $.get('js/entfilm_hard.json').done(function(data) {
    entFilmHard = data.results;
    let value = 300;
    let category = 2;
    randomQuestion = Math.floor(Math.random() * entFilmHard.length);
    $('#accordion2 .'+value+'').html(entFilmHard[randomQuestion].question);
    answersInField(entFilmHard[randomQuestion], category, value);
  });

  $.get('js/myth_easy.json').done(function(data) {
    mythEasy = data.results;
    let value = 100;
    let category = 3;
    randomQuestion = Math.floor(Math.random() * mythEasy.length);
    $('#accordion3 .'+value+'').html(mythEasy[randomQuestion].question);
    answersInField(mythEasy[randomQuestion], category, value);
  });

  $.get('js/myth_med.json').done(function(data) {
    mythMed = data.results;
    let value = 200;
    let category = 3;
    randomQuestion = Math.floor(Math.random() * mythMed.length);
    $('#accordion3 .'+value+'').html(mythMed[randomQuestion].question);
    answersInField(mythMed[randomQuestion], category, value);
  });

  $.get('js/myth_hard.json').done(function(data) {
    mythHard = data.results;
    let value = 300;
    let category = 3;
    randomQuestion = Math.floor(Math.random() * mythHard.length);
    $('#accordion3 .'+value+'').html(mythHard[randomQuestion].question);
    answersInField(mythHard[randomQuestion], category, value);
  });

});
