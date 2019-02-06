var numSquares = 6;
var colors = [];
var correctColor;
var squares = document.querySelectorAll(".square");
var colorOfBackground = "#232323"; //I don't like this but couldn't find a way to grab backgroundColor of body
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
    for(var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected"); //Hacky way of making sure no two buttons are selected
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setUpSquares(){
    for(var i = 0; i< squares.length; i++){
        //Add click listeners to all squares
        squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === correctColor){
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
        }
        else{
            this.style.backgroundColor = colorOfBackground;
            messageDisplay.textContent = "Try Again";
        }
        });
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    correctColor = randomColor();
    colorDisplay.textContent = correctColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    for(var i=0; i<squares.length; i++){
        if(colors[i]){ //If a square exists for the selected number of squares
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}


resetButton.addEventListener("click",function(){
    reset();
});

function changeColors(color){
    //loop through all squares
    for(var i=0; i<colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function randomColor(){
    var randomNumber = Math.floor(Math.random() * colors.length);
    console.log(randomNumber);
    return colors[randomNumber];
}

function generateRandomColors(num){
    //Create an array
    arr = [];
    //Add 'num' random colors to Array
    for(var i=0; i<num; i++){
        arr.push(randomRGBColor());
    }
    //Return this array
    return arr;
}

function randomRGBColor(){
    //Pick 3 values from 0-255
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}