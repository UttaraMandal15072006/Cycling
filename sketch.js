var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var obstacle1;
var obs1,obs2,obs3;
var song,amplitude;

var pinkCG, yellowCG,redCG,obsG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  song=loadSound("cycle.m4a");
  gameOverImg = loadImage("images/gameOver.png");
  obs1=loadImage("images/obstacle1.png");
  obs2=loadImage("images/obstacle2.png");
  obs3=loadImage("images/obstacle3.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.scale=0.07;
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
   
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 
  
amplitude= new p5.Amplitude();
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obsG= new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  //song.play();
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
   
   mainCyclist.y = World.mouseY;
   //set collider for mainCyclist
   mainCyclist.setCollider("circle",0,0,30);
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2; 
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1)
    {
      pinkCyclists();
    } 
    else if (select_oppPlayer == 2) 
    {
      yellowCyclists();
    }
    else if(select_oppPlayer==3)
    {
      redCyclists();
    }
  }
    ComingObstacles();
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if(obsG.isTouching(mainCyclist))
    {
      gameState = END;
      obsG.setVelocityXEach(0);
    }  
    
}
  else if (gameState === END) {
    gameOver.visible = true;
    obsG.destroyEach();
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    //Add code to show restart game instrution in text here
    textSize(20);
    stroke("blue");
    fill("navy");
    text("Press the Up arrow to Restart the Game",500,250);
  
    //write condition for calling reset( )
    if(keyWentDown(UP_ARROW))
    {
      reset();
    }  
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function ComingObstacles()
{
  if(frameCount%100===0)
  {
    obstacle=createSprite(1270,150);
    obstacle.y=Math.round(random(50,250));
    obstacle.velocityX=-(6 + 2*distance/150);
    obstacle.depth=mainCyclist.depth-1;
    obstacle.setLifetime=170;
    obstacle.scale =0.06;
    obsG.add(obstacle);
    
    var swi=Math.round(random(1,3))
    switch(swi)
    {
        case 1: obstacle.addAnimation("obstacles",obs1);
        
        break;
        case 2:obstacle.addAnimation("obstacles2",obs2);
        break;
        case 3:obstacle.addAnimation("obstacles3",obs3);
    }  
  }  
}
//create reset function here
function reset()
{
    gameState=PLAY;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    gameOver.visible=false;
    mainCyclist.x=70;
    mainCyclist.y=World.mouseX;
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    distance=0;
}