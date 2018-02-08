
  var canvas = document.getElementById('canvas');
  canvas.height = 400;
  canvas.width = 600;
  var ctx = canvas.getContext('2d');
  // var boundariesX = [0, 400];
  // var boundariesY = [0, 600];

  //
  // var planeX = 10;
  // var planeY = 267;
  // var planeWid = 35;
  // var planeHe = 35;
  // var ballX = 50;
  // var ballY = 0;
  // var ballWid = 35;
  // var ballHe = 35;

  var planeImg = document.getElementById('plane');
  var plane = {img: planeImg, x:10, y:250, width:35, height:35};
  var balloon = new Image();
  balloon.src = 'images/hotair.png';
  var person = new Image();
  person.src = 'images/person.png';
  var persons = [
    {img: person, x:20, y:370, width:25, height:25, dy:0},
    {img: person, x:330, y:25, width:25, height:25, dy:.5},
    {img: person, x:420, y:30, width:25, height:25, dy:1},
    {img: person, x:10, y:10, width:25, height:25, dy:.5},
    {img: person, x:250, y:70, width:25, height:25, dy:0},
    {img: person, x:570, y:200, width:25, height:25, dy:0},
    {img: person, x:550, y:0, width:25, height:25, dy:.25},
    {img: person, x:80, y:70, width:25, height:25, dy:.5}
  ];
  var balloons = [
    {img: balloon, x:10, y:400, width:35, height:35, dy:-1},
    {img: balloon, x:180, y:400, width:35, height:35, dy:-1.5},
    {img: balloon, x:456, y:400, width:35, height:35, dy:-1},
    {img: balloon, x:550, y:400, width:35, height:35, dy:-3},
    {img: balloon, x:10, y:400, width:35, height:35, dy:-1},
    {img: balloon, x:50, y:400, width:35, height:35, dy:-1},
    {img: balloon, x:350, y:400, width:35, height:35, dy:-2.5},
    {img: balloon, x:110, y:400, width:35, height:35, dy:-1},
    {img: balloon, x:250, y:400, width:35, height:35, dy:-.5},
    {img: balloon, x:300, y:400, width:35, height:35, dy:-2},
    {img: balloon, x:200, y:400, width:35, height:35, dy:-5}
  ];

  var movePlane = function(event) {
    //UP
    if (event.keyCode === 38){
      plane.y -= 10;
    }
    //DOWN
    if (event.keyCode === 40) {
      plane.y += 10;
    }
    //LEFT
    if (event.keyCode === 37){
      plane.x -= 10;
    }
    //RIGHT
    if (event.keyCode === 39) {
      plane.x += 10;
    }
  };

  var collisionDetection = function (x1, y1, x2, y2) {
    var xDistance = x2/2 - x1/2;
    var yDistance = y2/2 - y1/2;
    var crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
      if (crashZone < 35) {
        console.log("crash!")
      }
    }

  var loop = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(plane.img, plane.x, plane.y, plane.width, plane.height);
    for(var i = 0; i < balloons.length; i++) {
      ctx.drawImage(balloons[i].img, balloons[i].x, balloons[i].y, balloons[i].width, balloons[i].height);
      balloons[i].y += balloons[i].dy;
      if(balloons[i].y < 0) {
        balloons[i].y = 410;
      }
    }
    for(var i = 0; i < persons.length; i++) {
      ctx.drawImage(persons[i].img, persons[i].x, persons[i].y, persons[i].width, persons[i].height);
      persons[i].y += persons[i].dy;
      if(persons[i].y > 425) {
        // gameOver()
      }
    }
  }
  setInterval(loop, 50);

$(document).ready(function(){
  window.addEventListener('keydown', movePlane);
  $('#canvas').focus();

});
