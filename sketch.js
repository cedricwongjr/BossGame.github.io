var player;
var playerImg;
var boss, bossImg
var bossHP, playerHP, playerHPImg;
var leftBullet;
var rightBullet;
var topBullet;
var downBullet;
var bulletImg;
var gameState;
var homingBullet, homingBulletImg;
var bossMusic;
var allBullets;
var randomTimeSpawn;


bossHP = 1000


function preload(){
  playerImg=loadImage("player.png");
  bossImg = loadImage("boss.png");
  bulletImg = loadImage("bullet.png");
  bossMusic = loadSound("boss music.mp3");
  homingBulletImg = loadImage("mob.png")
}



function setup() {
  createCanvas(400, 400);

  gameState = 1
  playerHP = 5

  boss = createSprite(200, 100, 10, 10);
  boss.addImage(bossImg);
  boss.scale = 0.1;

  player = createSprite(50,350,20,50);
  player.addImage(playerImg);
  player.scale = 0.03;
  player.x = 200;
  
  topwall = createSprite(200,10,400,20);
  bottomwall = createSprite(200, 390, 400, 20);
  leftwall = createSprite(10, 200, 20, 400);
  rightwall = createSprite(390, 200, 20, 400);
};
  


function draw() {
  background(220);
  
  if(gameState === 1 && keyDown("i")){
    bossMusic.play();
    bossMusic.setVolume(30)
    gameState = 2

  }

  console.log(gameState)

  if(gameState === 2){



    if(keyDown("esc")){
      gameState = 1
      bossMusic.stop()
    };

    randomTimeSpawn = Math.round(random(1,100))
    console.log("random number = ", randomTimeSpawn)
    if(randomTimeSpawn === 50){
      homingBulletSpawn()
    }
    
  
  if(keyDown("w")) {
    player.y += -5;
  };
  if(keyDown("d")) {
    player.x += +5;
  };
  if(keyDown("a")) {
    player.x += -5;
  };
  if(keyDown("s")) {
    player.y += 5;
  };


  phase1()
  shoot();

  };

  if(gameState === 3){
    GAMEOVER()
    bossMusic.stop()
  }


  playerDMG();
  drawSprites();
};

function shoot(){
  if(keyDown("LEFT_ARROW") && !keyDown("DOWN_ARROW") && !keyDown("RIGHT_ARROW") && !keyDown("UP_ARROW")){
    leftBullet = createSprite(player.x, player.y, 10, 10)
    leftBullet.velocityX = -8
    leftBullet.addImage(bulletImg)
    leftBullet.scale = 0.01
  };
  if(keyDown("RIGHT_ARROW") && !keyDown("DOWN_ARROW") && !keyDown("LEFT_ARROW") && !keyDown("UP_ARROW")){
    rightBullet = createSprite(player.x, player.y, 10, 10)
    rightBullet.velocityX = 8
    rightBullet.addImage(bulletImg)
    rightBullet.scale = 0.01
  };
  if(keyDown("DOWN_ARROW") && !keyDown("LEFT_ARROW") && !keyDown("RIGHT_ARROW") && !keyDown("UP_ARROW")){
    downBullet = createSprite(player.x, player.y, 10, 10)
    downBullet.velocityY = 8
    downBullet.addImage(bulletImg)
    downBullet.scale = 0.01
  };
  if(keyDown("UP_ARROW") && !keyDown("DOWN_ARROW") && !keyDown("RIGHT_ARROW") && !keyDown("LEFT_ARROW")){
    topBullet = createSprite(player.x, player.y, 10, 10)
    topBullet.velocityY = -8
    topBullet.addImage(bulletImg)
    topBullet.scale = 0.01
  };

  //allBullets = new Group();
  //allBullets.add(topBullet);
}

function playerDMG(){
  if(player.collide(boss) || player.collide(bottomwall) || player.collide(rightwall) || player.collide(leftwall) || player.collide(topwall)){
    player.destroy()
    gameState = 3
  }
}

function bossDMG(){
  if(boss.collide(allBullets)){
    boss.hp -=1
    allBullets.destroyEach()
  }
  console.log("BOSS HP:",bossHP)
}

function phase1(){
  if(boss.y<player.y){
    boss.y +=1
  }else{
    boss.y -=1
  };
  if(boss.x<player.x){
    boss.x +=1
  }else{
    boss.x -=1
  };
  //if(homingBullet.y<player.y){
  //  homingBullet.y +=1
  //}else{
  //  homingBullet.y -=1
  //};
  //if(homingBullet.x<player.x){
  //  homingBullet.x +=1
  //}else{
  //  homingBullet.x -=1
  //};
};

function phase2(){
};

function homingBulletSpawn(){
  homingBullet = createSprite(Math.round(random(100,300)), Math.round(random(100,300)), 10, 10);
  homingBullet.addImage(homingBulletImg);
  homingBullet.scale = 0.01
  
};




function GAMEOVER(){

  text("GAME OVER", 150, 200)

}


