var randomQuestion = null;

function answersInField(obj, category, value) {
  var cA = obj.correct_answer;
  var iA = obj.incorrect_answers;
  let randomNumber = Math.floor(Math.random() * 4);
  iA.splice(randomNumber, 0, cA);

  $('#'+category+' .'+value+'').append('<form name="'+category+value+'"></form>');
  $('form[name='+category+value+']').append('<button id="'+category+value+'">Final Answer!</button>');

  for(var i = 0;i < iA.length;i++) {
    var radioBtn = $('<div class="radio"><input type="radio" value="'+value+'" name="question0" class="input"><label class="label'+category+value+'" for="'+category+value+[i]+'"></label></div>');
    $('form[name='+category+value+']').prepend(radioBtn);
    $('label[for='+category+value+[i]+']').html(iA[i]);
  }
}

$(document).ready(function(){

  $("#tabs").tabs({
    active: false,
    collapsible: true
  });

  $.get('js/genknow_easy.json').done(function(data) {
    genKnowEasy = data.results;
  });

  $.get('js/genknow_med.json').done(function(data) {
    genKnowMed = data.results;
  });

  $.get('js/genknow_hard.json').done(function(data) {
    genKnowHard = data.results;
  });

  $.get('js/entfilm_easy.json').done(function(data) {
    entFilmEasy = data.results;
  });

  $.get('js/entfilm_med.json').done(function(data) {
    entFilmMed = data.results;
  });

  $.get('js/entfilm_hard.json').done(function(data) {
    entFilmHard = data.results;
  });

  $.get('js/myth_easy.json').done(function(data) {
    mythEasy = data.results;
  });

  $.get('js/myth_med.json').done(function(data) {
    mythMed = data.results;
  });

  $.get('js/myth_hard.json').done(function(data) {
    mythHard = data.results;
  });

});
