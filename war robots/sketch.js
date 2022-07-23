


var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletImg
var zombieImg, zombiesGroup
var createBullet;
var score;
var invisBlock;


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  
  shooterImg = loadImage("assets/robot.png")


  bgImg = loadImage("assets/bg.jpg")
bulletImg = loadImage("assets/bullet.png")
zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   player.debug=false
//bullet 


invisBlock = createSprite(displayWidth-1150, displayHeight-300, 220, 220);
invisBlock.visible=false;

 
zombiesGroup = new Group();
bulletGroup= new Group()

score = 0;
}

function draw() {
  background(bgImg); 
fill("red");
textSize(50) 
  text("Score: "+ score, windowWidth-1500,windowHeight-1600);

  drawSprites();

  if(gameState===PLAY){
     

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30;
  invisBlock.y = player.y;
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30;
 invisBlock.y = player.y;
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
    
  
  createBullet();
}






spawnZombies();
if(bulletGroup.isTouching(zombiesGroup)){
  zombiesGroup.destroyEach()
  bulletGroup.destroyEach()
  score=score+1
  }

 
  if(invisBlock.isTouching(zombiesGroup)){
  
   gameState = END;
    }
  }else if (gameState === END) {
    text("Game Over You Died",windowWidth-2000,windowHeight-1600)
    zombiesGroup.setVelocityXEach(0);
    player.destroy()
    bulletGroup.destroyEach()
   
  }

  
  
   
  }

function spawnZombies(){
 //write code here to spawn the clouds
 if (frameCount % 120 === 0) {
  var zombie = createSprite(1200,400,40,10);
  zombie.y = Math.round(random(200,600));
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -10;
  
   //assign lifetime to the variable
  zombie.lifetime = 600;
    
  //add each cloud to the group
  zombiesGroup.add(zombie);
}

}


function createBullet() {
  bullet = createSprite(300,300,10,10);
bullet.addImage(bulletImg);
bullet.scale=0.12;
//bullet.visible=false;

  bullet.y=player.y;
  bullet.velocityX = 10;
  bullet.lifetime = 150;
  bullet.scale = 0.09;
  bulletGroup.add(bullet)
  return bullet;
   
}

