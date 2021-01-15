var monkey, monkeyAni, monkeyColl;
var banana, bananaimg;
var stone, stoneimg;
var ground, groundAni, inviGround;
var bananaGrp, ObstaclesGrp;
var gameState, PLAY, END;
var score;

function preload() {
  monkeyAni = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyColl = loadAnimation("Monkey_02.png");
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("stone.png");
  groundAni = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(500, 400);
  PLAY = 1;
  END = 0;
  gameState = PLAY;

  bananaGrp = createGroup();
  obstaclesGrp = createGroup();

  ground = createSprite(200, 170, 400, 10);
  ground.depth=0
  ground.addAnimation("animate", groundAni);
  ground.scale=0.75;
  inviGround = createSprite(300, 390, 600, 10);
  inviGround.visible = false;
  monkey = createSprite(50, 330, 50, 50);
  monkey.addAnimation("aa", monkeyAni);
  monkey.addAnimation("collide", monkeyColl);
  monkey.scale = 0.15;

  score = 0;

}

function draw() {
 background("brown");


  monkey.collide(inviGround);     


  if (gameState === PLAY) {


    ground.velocityX = -5;
    if (ground.x <= 150) {
      ground.x =width / 2
    }

    spawnBananas();
    spawnObstacles();

    if (keyDown("space") && monkey.y >= 320) {
      monkey.setVelocity(0, -16);
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    if (monkey.isTouching(bananaGrp)) {
      score = score + 1;
      bananaGrp.destroyEach();
    }

    if (obstaclesGrp.isTouching(monkey)) {

      gameState = END;
    }
  } else if (gameState === END) {
    monkey.changeAnimation("collide", monkeyColl);
    monkey.velocityX = 0;
    ground.setVelocity(0, 0);
    bananaGrp.destroyEach();
    obstaclesGrp.setVelocityEach(0, 0);
    score = 0;

  }


  drawSprites();
  textSize=40;
  
  fill("white");
  
text("SCORE IS="+score, 400,50);

}

function spawnBananas() {
  if (frameCount % 100 === 0 && frameCount !== 0) {
    banana = createSprite(600, random(150, 300), 20, 20);
    banana.addImage("aa", bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    bananaGrp.add(banana);
    bananaGrp.setLifetimeEach(130);

  }


}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    stone = createSprite(600, 350, 50, 50);
    stone.addImage("aa", stoneimg);
    stone.scale = 0.2;
    stone.velocityX = -5;
    stone.depth = monkey.depth;

    obstaclesGrp.add(stone);
  }
}