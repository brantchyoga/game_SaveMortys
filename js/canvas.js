
  var canvas = document.getElementById('canvas');
  canvas.height = 500;
  canvas.width = 800;
  var ctx = canvas.getContext('2d');
  var savedPersons = 0;
  var gameLoop = null;
  //Establishes img variables so that the variable can instantiate new images
  var rickShip = new Image();
  rickShip.src = 'images/Rick-Spaceship.png';
  //Src keys help trim the image down so collision dectection is better
  var ricksShip = {img: rickShip, srcX:180, srcY:18, srcWid:750, srcHe:550, x:10, y:250, width:60, height:45};

  var alienShip1 = new Image();
  alienShip1.src = 'images/alienspace1.png';

  var alienShip2 = new Image();
  alienShip2.src = 'images/alien2.png';

  var morty = new Image();
  morty.src = 'images/fallingmorty.png';

  var explosion = new Image();
  explosion.src = 'images/explosion.png';
  //Arrays hold img objects starting off points
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

  function resetCanvas() {
    resetQuiz();
    //hides canvas
    $('.container3').hide();
    $('#startgame').show();
    $('#resetcanvas').hide();
    //re-establishes images starting off points
    ricksShip = {img: rickShip, x:10, y:250, width:60, height:45};
    mortys = [{img: morty, x:20, y:370, width:35, height:35, dy:0},
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

    alienShips1 = [
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

    alienShips2 = [
      {img: alienShip2, x:10, y:400, width:35, height:35, dy:-1},
      {img: alienShip2, x:180, y:200, width:35, height:35, dy:-1.5},
      {img: alienShip2, x:456, y:400, width:35, height:35, dy:-1},
      {img: alienShip2, x:550, y:300, width:35, height:35, dy:-3},
      {img: alienShip2, x:10, y:100, width:35, height:35, dy:-1},
      {img: alienShip2, x:50, y:600, width:35, height:35, dy:-1},
      {img: alienShip2, x:350, y:400, width:35, height:35, dy:-2.5},
      {img: alienShip2, x:20, y:500, width:35, height:35, dy:-4}
    ];
  };
  var movePlane = function(event) {
    //UP
    if (event.keyCode === 38){
      //prevents screen scolling uses arrow keys
      event.preventDefault();
      ricksShip.y -= 7;
    }
    //DOWN
    if (event.keyCode === 40) {
      event.preventDefault();
      ricksShip.y += 7;
    }
    //LEFT
    if (event.keyCode === 37){
      event.preventDefault();
      ricksShip.x -= 7;
    }
    //RIGHT
    if (event.keyCode === 39) {
      event.preventDefault();
      ricksShip.x += 7;
    }
  };

  function gameLost() {
    //clears interval with losing message and reset button
    clearInterval(gameLoop);
    $('#score').show();
    $('#winner').text("You must be doofus Rick to let an alien destroy you "+ultimateWinner+"!");
    $('#resetcanvas').show();
  }

  var dectPlaneCrash = function(x1, y1, x2, y2, alienShip) {
    //x2 and y2 are the rickShip. Add half the width to the x and half the height to the y to help the collision dectection start from the middle of the image
    var xDistance = (x2+30) - (x1+17);
    var yDistance = (y2+23) - (y1+17);
    var crashZone = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    var distanceCrash = (ricksShip.width + alienShip.width)/2;
    if (crashZone < (distanceCrash-10)) {
      alienShip.img = explosion;
      ctx.drawImage(alienShip.img, alienShip.x, alienShip.y, alienShip.width, alienShip.height);
      gameLost();
    }
  };

  function gameWon() {
    //clears interval with wining message and reset button
    $('#score').show();
    $('#winner').text("You are the most intelligent Rick "+ultimateWinner+"!");
    clearInterval(gameLoop);
    $('#resetcanvas').show();
  }

  var dectPlanePickUp = function(x1, y1, x2, y2, morty) {
    var xDistance = (x2+30)- (x1+(morty.width/2));
    var yDistance = (y2+23)- (y1+(morty.height/2));
    var crashZone = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    var distancePickUp = (ricksShip.width + morty.width)/2;
    if(crashZone < (distancePickUp-10)) {
      //Splices out the morty the ship hits so it isn't redrawn
      var savedPersonIndex = mortys.indexOf(morty);
      mortys.splice(savedPersonIndex, 1);
      //Game won if all mortys are spliced out
      if(mortys.length === 0) {
        //calls on draw 1 more time so the last morty isn't drawn
        draw();
        gameWon();
      }
    }
  };

  var draw = function() {
    //clears canvas to it can be redrawn with changing img coordinates
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(ricksShip.img, 180, 18, 750, 550, ricksShip.x, ricksShip.y, ricksShip.width, ricksShip.height);
    //for loops draw all imgs at there own coordinates
    for(var i = 0; i < alienShips1.length; i++) {
      ctx.drawImage(alienShips1[i].img, alienShips1[i].x, alienShips1[i].y, alienShips1[i].width, alienShips1[i].height);
      //the y coordinate is changing
      alienShips1[i].y += alienShips1[i].dy;
      //once the ships have eached the top of the canvas the are redrawn at the bottom again
      if(alienShips1[i].y < 0) {
        alienShips1[i].y = 520;
      }
      //collisin dectection has to be in for loop for every ship
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
      //sorta of a time limit since game lost if a morty eachs the bottom of the canvas but gives a little room for off canvas morty catch
      if(mortys[i].y > 525) {
        gameLost()
      }
      dectPlanePickUp(mortys[i].x, mortys[i].y, ricksShip.x, ricksShip.y, mortys[i]);
    }
  };
  //Starts canvas game when the button with the id of game is clicked
  function startCanvas() {
    window.addEventListener('keydown', movePlane);
    gameLoop = setInterval(draw, 50);
    $('#startgame').hide();
    $('#scoreboard').hide();
    $('#score').hide();
  };
