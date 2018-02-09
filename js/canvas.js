
  var canvas = document.getElementById('canvas');
  canvas.height = 500;
  canvas.width = 800;
  var ctx = canvas.getContext('2d');
  var boundariesX = [0, 600];
  var boundariesY = [0, 400];
  var savedPersons = 0;
  var gameLoop = null;

  var rickShip = new Image();
  rickShip.src = 'images/Rick-Spaceship.png';
  var ricksShip = {img: rickShip, x:10, y:250, width:60, height:45};

  var alienShip1 = new Image();
  alienShip1.src = 'images/alienspace1.png';

  var alienShip2 = new Image();
  alienShip2.src = 'images/alien2.png';

  var morty = new Image();
  morty.src = 'images/fallingmorty.png';

  var explosion = new Image();
  explosion.src = 'images/explosion.png';

  var mortys = [
    {img: morty, x:20, y:370, width:35, height:35, dy:0},
    {img: morty, x:330, y:25, width:35, height:35, dy:.5},
    {img: morty, x:420, y:30, width:35, height:35, dy:1},
    {img: morty, x:10, y:10, width:35, height:35, dy:.5},
    {img: morty, x:250, y:70, width:35, height:35, dy:0},
    {img: morty, x:570, y:200, width:35, height:35, dy:0},
    {img: morty, x:650, y:0, width:35, height:35, dy:.5},
    {img: morty, x:80, y:70, width:35, height:35, dy:.5},
    {img: morty, x:750, y:0, width:35, height:35, dy:0},
    {img: morty, x:330, y:0, width:35, height:35, dy:1},
    {img: morty, x:50, y:0, width:35, height:35, dy:.5}
  ];

  var alienShips1 = [
    {img: alienShip1, x:550, y:500, width:35, height:35, dy:-3},
    {img: alienShip1, x:180, y:500, width:35, height:35, dy:-1.5},
    {img: alienShip1, x:456, y:500, width:35, height:35, dy:-1},
    {img: alienShip1, x:550, y:600, width:35, height:35, dy:-3},
    {img: alienShip1, x:10, y:500, width:35, height:35, dy:-1},
    {img: alienShip1, x:70, y:500, width:35, height:35, dy:-1},
    {img: alienShip1, x:750, y:500, width:35, height:35, dy:-2.5},
    {img: alienShip1, x:110, y:400, width:35, height:35, dy:-1},
    {img: alienShip1, x:250, y:400, width:35, height:35, dy:-.5},
    {img: alienShip1, x:300, y:400, width:35, height:35, dy:-2},
    {img: alienShip1, x:200, y:400, width:35, height:35, dy:-5}
  ];

  var alienShips2 = [
    {img: alienShip2, x:10, y:400, width:35, height:35, dy:-1},
    {img: alienShip2, x:180, y:200, width:35, height:35, dy:-1.5},
    {img: alienShip2, x:456, y:400, width:35, height:35, dy:-1},
    {img: alienShip2, x:550, y:300, width:35, height:35, dy:-3},
    {img: alienShip2, x:10, y:100, width:35, height:35, dy:-1},
    {img: alienShip2, x:50, y:600, width:35, height:35, dy:-1},
    {img: alienShip2, x:350, y:400, width:35, height:35, dy:-2.5},
    {img: alienShip2, x:20, y:500, width:35, height:35, dy:-4}
  ];

  var movePlane = function(event) {
    event.preventDefault()
    //UP
    if (event.keyCode === 38){
      ricksShip.y -= 7;
    }
    //DOWN
    if (event.keyCode === 40) {
      ricksShip.y += 7;
    }
    //LEFT
    if (event.keyCode === 37){
      ricksShip.x -= 7;
    }
    //RIGHT
    if (event.keyCode === 39) {
      ricksShip.x += 7;
    }
  };

  function gameLost() {
    clearInterval(gameLoop);

  }

  var dectPlaneCrash = function(x1, y1, x2, y2, alienShip) {
    var xDistance = x2/2 - x1/2;
    var yDistance = y2/2 - y1/2;
    var crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    var distanceCrash = (ricksShip.width + alienShip.width)/4;
    if (crashZone < (distanceCrash-5)) {
      alienShip.img = explosion;
      alienShip.width = 60;
      alienShip.height = 50;
      ctx.drawImage(alienShip.img, alienShip.x, alienShip.y, alienShip.width, alienShip.height);
      gameLost();
    }
  };

  function gameWon() {
    $('#score').show();
    $('#winner').text("You are the ULTIMATE Winner "+ultimateWinner+"!");
    clearInterval(gameLoop);
  }

  var dectPlanePickUp = function(x1, y1, x2, y2, morty) {
    var xDistance = x2/2 - x1/2;
    var yDistance = y2/2 - y1/2;
    var crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    var distancePickUp = (ricksShip.width + morty.width)/4;
    if(crashZone < (distancePickUp-4)) {
      // if(morty.length === 1) {
      //   ctx.clearRect(mortys[0].x, mortys[0].y, mortys[0].width, mortys[0].height);
      // }
      var savedPersonIndex = mortys.indexOf(morty);
      mortys.splice(savedPersonIndex, 1);
      if(mortys.length === 0) {
        draw();
        gameWon();
      }
    }
  };

  var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(ricksShip.img, ricksShip.x, ricksShip.y, ricksShip.width, ricksShip.height);

    for(var i = 0; i < alienShips1.length; i++) {
      ctx.drawImage(alienShips1[i].img, alienShips1[i].x, alienShips1[i].y, alienShips1[i].width, alienShips1[i].height);
      alienShips1[i].y += alienShips1[i].dy;
      if(alienShips1[i].y < 0) {
        alienShips1[i].y = 520;
      }
      dectPlaneCrash(alienShips1[i].x, alienShips1[i].y, ricksShip.x, ricksShip.y, alienShips1[i]);
    };

    for(var i = 0; i < alienShips2.length; i++) {
      ctx.drawImage(alienShips2[i].img, alienShips2[i].x, alienShips2[i].y, alienShips2[i].width, alienShips2[i].height);
      alienShips2[i].y += alienShips2[i].dy;
      if(alienShips2[i].y < 0) {
        alienShips2[i].y = 520;
      }
      dectPlaneCrash(alienShips2[i].x, alienShips2[i].y, ricksShip.x, ricksShip.y, alienShips2[i]);
    };

    for(var i = 0; i < mortys.length; i++) {
      ctx.drawImage(mortys[i].img, mortys[i].x, mortys[i].y, mortys[i].width, mortys[i].height);
      mortys[i].y += mortys[i].dy;
      if(mortys[i].y > 525) {
        gameLost()
      }
      dectPlanePickUp(mortys[i].x, mortys[i].y, ricksShip.x, ricksShip.y, mortys[i]);
    }
  };
  function startCanvas() {
    gameLoop = setInterval(draw, 50);
    $('#startgame').hide();
    $('#scoreboard').hide();
    $('#score').hide();
  }

$(document).ready(function(){
  window.addEventListener('keydown', movePlane);
  $('#game').on('click', startCanvas);
});
