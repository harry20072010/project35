var balloon, database;
var height;
var bgimg;

function preload() {
  bgimg = loadImage("Hot Air Ballon-01.png");
  balloonimg = loadImage("Hot Air Ballon-02.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  balloon = createSprite(250,250,50,50);
  balloon.addImage(balloonimg);
  balloon.scale = 0.4;

  var hypnoticBallPosition = database.ref('balloon/height');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(bgimg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
