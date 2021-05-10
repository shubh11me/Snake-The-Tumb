//Constatnts and variable
let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const music = new Audio('music.mp3');

let speed_snake = 4;
let speed = speed_snake;

setInterval(() => {
    if ((speed_snake < 12) && (!isCollide(snakeArr))) {
        speed_snake += 1;
    }
    speed = speed_snake;
    console.log(speed);
    return speed_snake, speed;
}, 15000);



let lastPaintTime = 0;
let snakeArr = [{
    x: 13,
    y: 15
}]
let food = { x: 6, y: 7 }
let board = document.getElementById('board');
let score = 0;
let score_div = document.getElementById('score');
let his_div = document.getElementById('highscore');


//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if u pump in ur self

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y) {
            console.log("smashed")
            return true;
        }
    }

    //if u pump in wall 
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }


}

function gameEngine() {
    music.play()
        //part 1:update the snake array and food

    if (isCollide(snakeArr)) {
        gameOver.play();
        music.pause();
        inputDir = {
            x: 0,
            y: 0
        };
        alert("Game Over Press Any Key to play again!!");
        snakeArr = [{
            x: 13,
            y: 15
        }]
        music.play();
        score = 0;
        score_div.innerHTML = "The Score is : " + score;
        speed_snake = 4;
    }

    // If u have eaten food ,increament the score and generate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            his_div.innerHTML = "Hiscore is : " + highscoreval;
        }
        score_div.innerHTML = "The Score is : " + score;
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = {...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // moving the snake
    //part 2:Render(display) the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



















//Main logic starts here
window.requestAnimationFrame(main);

let highscore = localStorage.getItem("highscore");
// console.log(highscore);
if (highscore === null) {
    highscoreval = 0
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(highscore)
    his_div.innerHTML = "Hiscore is : " + highscoreval;
}



window.addEventListener('keydown', e => {
    inputDir = {
        x: 0,
        y: 1
    }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":

            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
 
            break;


        case "ArrowDown":

            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
          
            break;



        case "ArrowLeft":

            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;

            break;


        case "ArrowRight":

            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
       
            break;


        default:
            break;

    }

})