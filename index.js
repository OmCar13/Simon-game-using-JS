var buttonOrder = [];
var counter = 0;
var userClickIndex = 0;

let audioFiles = {
    "green": "sounds/green.mp3",    
    "red": "sounds/red.mp3",
    "yellow": "sounds/yellow.mp3",
    "blue": "sounds/blue.mp3",
    "wrong": "sounds/wrong.mp3",
}

var gameStarted = false;

$(document).keypress(function(){
    if (!gameStarted){
        gameStarted = true;
        startGame();
    }
});

function startGame() {
    counter++;
    $("h1").text("Level " + counter);
    
    userClickIndex = 0;
    
    let randomButton = getRandomButton();
    let randomButtonColor = $(randomButton).attr("id");
    
    setTimeout(() => {
        $(randomButton).addClass("highlight");
        setTimeout(() => {
            $(randomButton).removeClass("highlight");
        }, 200);
        
        var audio = new Audio(audioFiles[randomButtonColor]);
        audio.play();
    }, 200);

    buttonOrder.push(randomButtonColor);
    // console.log(buttonOrder); 

    setTimeout(waitForUserClick, 100);
}

function getRandomButton() {        
    let buttons = $(".btn").toArray();
    let randomIndex = Math.floor(Math.random() * buttons.length);
    return buttons[randomIndex];
}

function waitForUserClick() {
    $(".btn").off("click").on("click", function(){
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);

        let clickedColor = $(this).attr("id");
        checkButtonOrder(clickedColor);
    });
}

function checkButtonOrder(clickedColor) {
    if (clickedColor !== buttonOrder[userClickIndex]) {
        var wrongButton = new Audio(audioFiles["wrong"]);
        wrongButton.play();

        $(document).addClass("wrongButton");
        $("h1").text("Game Over! Press any key to restart");

        gameStarted = false;
        counter = 0;
        buttonOrder = [];
        userClickIndex = 0;
    } else {
        var audio = new Audio(audioFiles[clickedColor]);
        audio.play();
        
        userClickIndex++;

        if (userClickIndex === buttonOrder.length) {
            setTimeout(startGame, 1000);
        }
    }
}