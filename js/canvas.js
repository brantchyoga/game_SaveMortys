$(document).ready(function(){
  var sheetWidth = 1368;
  var sheetHeight = 1065;
  var cols = 12;
  var rows = 13;
  var widthOfFrame = sheetWidth/cols;
  var heightOfFrame = sheetHeight/rows;
  var canWidth = widthOfFrame;
  var canHeight = heightOfFrame;
  var canvas = document.getElementById('canvas');
  canvas.width =canWidth;
  canvas.height =canHeight;
  var ctx = canvas.getContext('2d');

  var srcX = 0;
  var srcY = 0;
  var x = 0;
  var y = 0;

  var currentFrame = 0;
  var alex = new Image();
  alex.src = 'images/Alextrebek.png';
  var canvas = document.getElementById('canvas');
  canvas.width =canWidth;
  canvas.height =canHeight;
  var ctx = canvas.getContext('2d');
  var rowCount = 0;
  function updateFrame() {
    if(srcY>1064){
      rowCount = 0;
      currentFrame = 0;
      clearInterval(alexTre);
    }
    currentFrame= ++currentFrame%cols;
    srcX = currentFrame * widthOfFrame;
    srcY = rowCount * heightOfFrame;
    //console.log(srcX);
    if(srcX>=(sheetWidth-1)){
      rowCount++
      console.log(rowCount);
    }
  }
  function drawImage() {
    updateFrame();
    ctx.clearRect(x,y,widthOfFrame,heightOfFrame);
    ctx.drawImage(alex, srcX, srcY, widthOfFrame, heightOfFrame, 0, 0, widthOfFrame, heightOfFrame);
  }
  var alexTre= setInterval(function(){
    drawImage();
  },100);
});
