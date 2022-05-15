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
let paused = false
let paused2 = false
let winner

function setup() {
  createCanvas(800, 600);
  frameRate(60)
}

function draw() {
  if (!paused) {
    clear()
    background(0);
    if (screen=="game") {
      UI()
      moveBall()
      movePaddle()
    }
    else if (screen == "title") {
      startScreen()
    }
    else if (screen == "end") {
      gameOver()
    }
  }
  if (keyIsDown(49)) {
    paused = true
  }
  if (paused && keyIsDown(50)) {
    paused = false
  }
}


function startScreen() {
  textSize(100)
  fill(255)
  text("PONG", 250, 150)
  textSize(40)
  textFont("helvetica")
  fill(255)
  text("Player two (right) moves with the arrow\nkeys and player one (left) moves with\n  the w and s keys. First one to three\n points wins! Press 1 to pause and 2 to\n                       resume", 65, 250)
  textSize(20)
  text("Press the enter key to start", 280, 550)
  if(keyIsDown(13)) {
    screen = "game"
  }
}

function gameOver() {
  textSize(100)
  fill(255)
  if (winner == 1) {
    text("Player 1 Wins!", 100, 150)
  }
  else {
    text("Player 2 Wins!", 100, 150)
  }
  textSize(40)
  textFont("helvetica")
  fill(255)
  text("Press enter to play again", 200, 250)
  if(keyIsDown(13)) {
    screen = "game"
    ballX = 400
    ballY = 300
    player1Score = 0
    player2Score = 0
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
  if(keyIsDown(DOWN_ARROW) && paddleY2+100<600) {
    paddleY2+=5
  }
  if(keyIsDown(UP_ARROW) && paddleY2>0) {
    paddleY2-=5
  }
  if(keyIsDown(87) && paddleY>0)/*w*/ {
    paddleY-=5
  }
  if(keyIsDown(83) && paddleY+100<600) {
    paddleY+=5
  }
}

function moveBall() {
  ballX+=vX
  ballY+=vY
  circle(ballX, ballY, 20)
  if (ballX-10 < 0) {
    player2Score++
    if (player2Score == 3) {
      winner = 2
      screen = "end"
      return
    }
    ballX = 400
    ballY = 300
  }
  else if (ballX+10>800) {
    player1Score++
    if (player1Score == 3) {
      winner = 1
      screen = "end"
      return
    }
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