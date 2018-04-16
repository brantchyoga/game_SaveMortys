$(document).ready(function(){
  //Jquery ui tabs so that they are all closed
  $("#tabs").tabs({
    active: false,
    collapsible: true
  });
  //ajax .get functions to grab the appropriate JSON files and store the data in the right global variables
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
