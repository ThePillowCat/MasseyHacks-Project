var ballx = 300;
var bally= 300;
var ballSize = 40;
var score = 0
var lose = false
var orix = ballx
var oriy = bally
var screen = 1

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
}

function draw() {
  
  if (screen == 1){
    background(220);
    level1();
  }else if (screen == 2){
    background(213);
    level2();
  }else if (screen ==3){
    background(223);
    level3();
  }else if (screen == 4){
    
    text("YOU LOSE! TRY AGAIN! Click on Try Again", width/2, height/2);
  }
  text("Click the Circle")
  text(("Score: " + score), width/2,40);
}

function level1(){
  text("Level 1", width/2, height-20)
  var distToBall = dist(ballx, bally, mouseX, mouseY);
  var distToPrevBall = dist(orix, oriy, mouseX, mouseY)

  if (distToBall < ballSize/2 && mouseIsPressed){
    orix = ballx;
    oriy = bally;
    ballx = random(width);
    bally = random(height);
    score += 1;
    ballSize-=0.25;
    if (score == 10){
      screen +=1;
    }
  }
  if (distToBall >= ballSize && mouseIsPressed && distToPrevBall >= ballSize+0.25){
    screen = 4;
  }
  
  line(ballx, bally, mouseX, mouseY);
  ellipse(ballx, bally, ballSize, ballSize);;
}

function level2(){
  text("Level 2", width/2, height-20)
  var distToBall = dist(ballx, bally, mouseX, mouseY);
  var distToPrevBall = dist(orix, oriy, mouseX, mouseY)

  if (distToBall < ballSize/2 && mouseIsPressed){
    orix = ballx;
    oriy = bally;
    ballx = random(width);
    bally = random(height);
    score += 1
    ballSize-=1;
    if (score == 20){
      screen +=1;
    }
  }
  if (distToBall >= ballSize && mouseIsPressed && distToPrevBall >= ballSize+1){
    screen = 4;
  }

  ellipse(ballx, bally, ballSize, ballSize);
}

function level3(){
  text("Level 3", width/2, height-20)
  var distToBall = dist(ballx, bally, mouseX, mouseY);
  var distToPrevBall = dist(orix, oriy, mouseX, mouseY)

  if (distToBall < ballSize/2 && mouseIsPressed){
    orix = ballx;
    oriy = bally;
    ballx = random(width);
    bally = random(height);
    score += 1
    ballSize-=2;
  }
  if (distToBall >= ballSize && mouseIsPressed && distToPrevBall >= ballSize+2){
    screen = 4;
  }

  ellipse(ballx, bally, ballSize, ballSize);
}