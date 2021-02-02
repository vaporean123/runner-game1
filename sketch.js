var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;
var distance=0;
var player1;
var player1Image;
var player2Image;
var gameover;
var gameoverImage;
var playerGroup;
var mainRacerImage3;
var sound;
var obstacle;
var obstacleImage;
var restartb;
var restartImg;
var obstacleGroup;
function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  player1Image=loadAnimation("opponent7.png","opponent8.png");
  player2Image = loadAnimation("opponent1.png","opponent2.png");
  gameoverImage = loadImage("gameOver.png");
  mainRacerImage3 = loadAnimation("images/mainPlayer2.png");
   sound = loadSound("sound/bell.mp3");
  restartImg = loadImage("140cb743558768ccd18cc6ee99ebe8d6.png");
  obstacleImage = loadImage("obstacle1.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(5+distance/100);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

  
gameover = createSprite(240,150);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  player1 = createSprite(200,500,10,10);
   playerGroup= createGroup();
  
  obstacleGroup=createGroup();
  
  restartb = createSprite(260,260,10,10);
  restartb.addImage(restartImg);
  restartb.scale = 0.2;
  restartb.visible = false;
  
  
  
}

function draw() {
  background(0);
  
 if(gameState===PLAY){
  
   if(keyDown("space")){
    sound.play(); 
   }
   
   mainCyclist.y = World.mouseY;
   
   distance = distance+Math.round(getFrameRate()/60);
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
 players(); 
    createobstacle();
 }
  if(gameState===END){
    playerGroup.velocityX=0;
    restartb.visible = true;
    }
  
  if(mainCyclist.isTouching(playerGroup)){
    playerGroup.destroyEach();
    gameover.visible=true;
     mainCyclist.visible= false;
    restartb.visble = true;
    gameState=END;
    path.velocityX=0;
    obstacleGroup.destroyEach();
    obstacleGroup.velocityX=0;
  }
  
  
  if(mainCyclist.isTouching(obstacleGroup)){
   playerGroup.destroyEach();
    gameover.visible=true;
     mainCyclist.visible= false;
    restartb.visble = true;
    gameState=END;
    path.velocityX=0;
    obstacleGroup.destroyEach();
    obstacleGroup.velocityX=0;
  }
  if(mousePressedOver(restartb)){
    restart();
    distance = 0;
    restartb.visible= false;
    path.velocityX=-4;
    
  }
  
 
  mainCyclist.setCollider("rectangle",0,0,20,20);
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
}

function players(){
if(frameCount%150===0){
  player1 = createSprite(1100,Math.round(random(50,250)),10,10);
  player1.velocityX=-3;
  player1.scale=0.07;
  playerGroup.add(player1);
  
  var rand  = Math.round(random(1,2));
  switch(rand){
  case 1: player1.addAnimation("player1",player1Image);
                   break;
  case 2 : player1.addAnimation("player1",player2Image);
                   break;
                   default: break;
}
}
}

function restart(){
  mainCyclist.visible=true;
 playerGroup.velocityX=-4;
  gameState=1;
  gameover.visible= false;
  playerGroup.destroyEach();
}

function createobstacle(){
  if(frameCount%180===0){
    obstacle = createSprite(1200,Math.round(random(20,250)),10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX=-2;
    obstacleGroup.add(obstacle);
  }



}