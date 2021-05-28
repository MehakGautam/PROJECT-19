var PLAY = 1;
var END = 0;
gameState = PLAY;
var score = 0;

var background, backgroundImage;
var ground;
var obstacle, obstacleImage, obstacleGroup;
var objects, objectsImage,objectsGroup;
var body, bodyImage;
var jumpSound, gameoverSound,playSound;
var gameOver,gameOverImage;


function preload(){
  backgroundImage=loadImage("background.png");
  objectsImage = loadImage ("creature_05.png");
  bodyImage = loadImage ("ship03.png");
  obstacleImage = loadImage ("retroship_12.png");
  
  playSound=loadSound("Luke Bergs - Bliss Free Sax House Background Music No Copyright Music Heart R8 Music.mp3");
  
  jumpSound = loadSound ("salamisound-5603731-sfx-collect-gather-5.mp3");
  gameoverSound = loadSound ("Game Over sound effect.mp3");
   gameOverImage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(500,500);
  
  ground = createSprite(600,280,100,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=true;
  ground.addImage (backgroundImage);
  
  body = createSprite (150,110,10,10);
  body.addImage (bodyImage);
  body.scale = 0.20;
  
  gameOver = createSprite (250,200,25,25);
gameOver.addImage (gameOverImage);
  gameOver.scale = 0.90;
  gameOver.visible=false;
    
  obstacleGroup = new Group;
  objectsGroup = new Group;
  
  
}

function draw() {
  
  if (gameState === PLAY){
  if(ground.x < 0) {
    ground.x=ground.width/2;
    playSound.play();
  }
  
    
   
    
  if (objectsGroup.isTouching(body)){
      objectsGroup.destroyEach ();
      score = score + 1;
      jumpSound.play();    
  }
  
  if (keyWentDown (UP_ARROW)){
    body.velocityY = - 5;
  }
  
   if (keyWentDown (DOWN_ARROW)){
    body.velocityY = 5;
         
  }

   if (obstacleGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
     }
    
  }  
  
 if (gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    objectsGroup.setVelocityXEach (0);
    obstacleGroup.destroyEach();
    objectsGroup.destroyEach();
    body.velocityY = 0;
    gameoverSound.play ();
    gameOver.visible=true;
    
   
 }
   
  spawnObjects();
  spawnObstacles();
    
  drawSprites();
 
  textSize(20);
  fill("white");
  text("Score: "+ score, 380,50);
}


function spawnObjects(){
 if (frameCount%100===0){
     objects = createSprite (600,250,10,20);
     objects.addImage (objectsImage);
     objects.scale = 0.1;
     objects.y = Math.round (random(100,490));
     objects.lifetime = 800;
     objects.velocityX = -8;
     objectsGroup.add (objects) ;     
   }
}

function spawnObstacles(){
  if (frameCount%150===0){
      obstacle = createSprite (700,220,10,10);
      obstacle.addImage (obstacleImage);
      obstacle.y = Math.round(random(100,490));
      obstacle.scale = 0.2;
      obstacle.lifetime = 800;
      obstacle.velocityX = -6;
      obstacleGroup.add (obstacle);
  }
}