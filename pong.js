let ballX = 400
let ballY = 300
let vX = 5
let vY = 5
let paddleX = 50
let paddleY = 200
let paddleX2= 725
let paddleY2= 200
let player1Score = 0
let player2Score = 0
let screen = 'title'

function setup() {
  createCanvas(800, 600);
  frameRate(60)
}

function draw() {
  clear()
  background(0);
  if (screen=="game") {
    UI()
    moveBall()
    movePaddle()
  }
  else {
    textSize(50)
    fill(255)
    text("Press enter to play...", 100, 100)
    if (keyIsDown(13)) {
      screen = "game"
    }
  }
}

function UI() {
  for(i=10; i<600; i+=40) {
    rect(375, i, 25, 20)
  }
  fill(255)
  textSize(50)
  text(player1Score, 175, 50)
  text(player2Score, 625, 50)
}

function movePaddle() {
  rect(50, paddleY, 25, 100)
  rect(725, paddleY2, 25, 100)
  if(keyIsDown(DOWN_ARROW)) {
    paddleY2+=5
  }
  if(keyIsDown(UP_ARROW)) {
    paddleY2-=5
  }
  if(keyIsDown(87)) {
    paddleY-=5
  }
  if(keyIsDown(83)) {
    paddleY+=5
  }
}

function moveBall() {
  ballX+=vX
  ballY+=vY
  circle(ballX, ballY, 20)
  if (ballX-10 < 0) {
    player2Score++
    ballX = 400
    ballY = 300
  }
  else if (ballX+10>800) {
    player1Score++
    ballX = 400
    ballY = 300
  }
  if (ballY-10<0 || ballY+10>600) {
    vY*=-1
  }
  if (ballY >= paddleY && ballY <= paddleY+100 && ballX-10<=paddleX+25 && ballX-10>=paddleX) {
    vX*=-1
  }
  if (ballY >= paddleY2 && ballY <= paddleY2+100 && ballX+10>=paddleX2 && ballX+10<=paddleX2+25) {
    vX*=-1
  }
}