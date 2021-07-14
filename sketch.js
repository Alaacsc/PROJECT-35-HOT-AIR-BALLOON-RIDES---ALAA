var balloon
var balloonImage1,balloonImage2;
var hotAirBalloon,database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();

  createCanvas(1500,700);

  hotAirBalloon=createSprite(250,450,150,150);
  hotAirBalloon.addAnimation("hotAirBalloon",balloonImage1);
  hotAirBalloon.scale=0.5;

  var hotAirBalloonPosition = database.ref('balloon/height');
  hotAirBalloonPosition.on("value",readPosition,writePosition);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    // code to move air balloon in left direction
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    // code to move air balloon in right direction
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    // code to move air balloon in up direction
    hotAirBalloon.scale = hotAirBalloon.scale+0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    // code to move air balloon in down direction
    hotAirBalloon.scale = hotAirBalloon.scale-0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use the arrow keys to move the Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('balloon/height').set({
      'x': position.x+x,
      'y': position.y+y,
  })
}

function readPosition(data){
  position = data.val();
  hotAirBalloon.x = position.x;
  hotAirBalloon.y = position.y;
}
