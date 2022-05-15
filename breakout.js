let paddleX = 300
let paddleY = 530
let ballX = 300
let ballY = 400
let vX = 3
let vY = 4
let screen = "start"
let lives = 3
let score = 0
let ballsHit = 0
let scores = [500, 400, 300, 200]

function setup() {
  createCanvas(800, 600);
  frameRate(60)
}

function preload() {
  coolFont = loadFont("PressStart2P-Regular.ttf")
}

colours = ["red", "orange", "yellow", "green"]

grid = []
for(i=0;i<4;i++) {
  grid.push([])
  for(j=0;j<16;j++) {
    grid[i].push([(j)*50, true])
  }
}

function draw() {
  clear()
  background(0);
  if (screen == "start") {
    startScreen()
  }
  else if (screen == "game") {
    UI()
    drawGrid()
    movePaddle()
    moveBall()
  }
  else if (screen == "gameover") {
    gameOver()
  }
  else if (screen == "win") {
    winScreen()
  }
}

function startScreen() {
  textSize(80)
  textFont(coolFont)
  fill(255)
  text("BREAKOUT", 100, 150)
  textSize(40)
  textFont("helvetica")
  fill(255)
  text("Move the paddle with the arrow keys\n   and press enter to start playing\n(make sure the screen is selected)", 90, 250)
  textSize(20)
  text("Note: Press the spacebar at any point to pause. Remember that different\n                  colour bricks give different amount of points!", 90, 450)
  ballX+=vX
  ballY+=vY
  checkIfHitSides()
  fill("red")
  circle(ballX, ballY, 20)
  if(keyIsDown(13)) {
    ballsHit = 0
    lives = 3
    ballX = 300
    ballY = 400
    vY = -Math.abs(vY)
    screen = "game"
  }
}

function winScreen() {
  textSize(80)
  textFont(coolFont)
  fill(255)
  text("YOU WIN!", 40, 130)
  textSize(50)
  text("SCORE: " + score, 175, 300)
  textSize(40)
  textFont("helvetica")
  text("Press the enter key to play again.", 90, 450)
  if(keyIsDown(13)) {
    ballsHit = 0
    lives = 3
    ballX = 300
    ballY = 400
    vY = -Math.abs(vY)
    screen = "game"
  }
}

function gameOver() {
  textSize(80)
  textFont(coolFont)
  fill(255)
  text("GAME OVER", 40, 130)
  textSize(50)
  text("SCORE: " + score, 175, 300)
  textSize(40)
  textFont("helvetica")
  text("Press the enter key to play again.", 90, 450)
  if(keyIsDown(13)) {
    grid = []
    for(i=0;i<4;i++) {
      grid.push([])
      for(j=0;j<16;j++) {
        grid[i].push([(j)*50, true])
      }
    }
    ballsHit = 0
    lives = 3
    ballX = 300
    ballY = 400
    vY = -Math.abs(vY)
    screen = "game"
    score = 0
  }
}

function UI() {
  textSize(30)
  text("Lives: " + lives, 50, 50)
  text("Score: " + score, 600, 50)
}

function drawGrid() {
  for(i=0;i<4;i++) {
    fill(colours[i])
    for(j=0;j<16;j++) {
      if(grid[i][j][1]) {
        rect(grid[i][j][0], ((i+1)*30)+60, 50, 30)
      }
    }
  }
}

function movePaddle() {
  //paddleX = ballX-50
  if(keyIsDown(LEFT_ARROW) && paddleX > 0) {
    paddleX-=5
  }
  else if (keyIsDown(RIGHT_ARROW) && paddleX+100 < 800) {
    paddleX+=5
  }
  fill(255)
  rect(paddleX, paddleY, 100, 20)
}

function moveBall() {
  ballX+=vX
  ballY+=vY
  checkIfHitSides()
  checkIfHitPaddle()
  fill(255)
  circle(ballX, ballY, 20)
  for(i=0;i<4;i++) {
    for(j=0;j<16;j++) {
      if(grid[i][j][1]) {
        if(checkifhitRectangle(ballX, ballY, grid[i][j][0], ((i+1)*30)+60)) {
          grid[i][j][1] = false
          score += scores[i]
          ballsHit++
        }
      }
    }
  }
  if (lives == 0) {
    screen = "gameover"
  }
  if (ballsHit > 63) {
    screen = "win"
  }
}

function checkifhitRectangle(ballX, ballY, paddleX, paddleY) {
  if(ballX > paddleX && ballX < paddleX+50) {
     if ((ballY-10<paddleY+30 && ballY-10>paddleY) || (ballY+10>paddleY && ballY+10<paddleY+30)) {
      vY*=-1
      return true
    }
  }
  if(ballY > paddleY && ballY < paddleY+30) {
     if ((ballX-10<paddleX+50 && ballX-10>paddleX) || (ballX+10>paddleX && ballX+10<paddleX+50)) {
      vX*=-1
      return true
    }
  }
}

function checkIfHitSides()  {
  if (ballY+10>600) {
    if(screen == "game") {
      lives--
      ballX = 400
      ballY = 300
    }
    vY*=-1
  }
  if (ballY-10<0) {
    vY*=-1
    ballY=10
  }
  else if (ballX+10>800) {
    ballX = 790
    vX*=-1
  }
  else if (ballX-10<0) {
    ballX = 10
    vX*=-1
  }
}

function checkIfHitPaddle() {
  if (ballX>paddleX && ballX<paddleX+100 && ballY+10>paddleY && ballY+10< paddleY+20) {
    ballY=paddleY-10
    vY*=-1
    return
  }
  if (ballY>paddleY && ballY<paddleY+20 && ballX+10>paddleX && ballX+10 < paddleX+100) {
    ballX = paddleX-10
    vX*=-1
    return
  }
  if (ballY>paddleY && ballY<paddleY+20 && ballX-10<paddleX+100 && ballX-10 > paddleX) {
    ballX = paddleX+100+10
    vX*=-1
    return
  }
}