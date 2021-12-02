import { update as upadateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js"
import {update as updateFood,draw as drawFood}from "./food.js";
import {outsideGrid } from "./grid.js"
let lastRenderTime = 0;
let gameOver =false;
const gameBoard = document.querySelector(".game-board")

function main(currentTime) {
    if(gameOver){
        if(confirm('You lost. Press ok to restart.')){
            window.location = "/";
        }
        return;
    }
    window.requestAnimationFrame(main)
    // controling how fast the game updates based on the snake-speed
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    console.log("Render");
    lastRenderTime = currentTime;
    update()
    draw()
}

window.requestAnimationFrame(main);
function update() {
    upadateSnake();
    updateFood();
    checkDeath();
}
function draw() {
    //clear ole body and draw new
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
    
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead())||snakeIntersection()
}
    