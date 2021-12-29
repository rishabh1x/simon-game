var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keydown", function () {
    if (started === false) {
        started = true;
        nextSequence();
    }
});

$(".btn").click(function () {
    if (started) {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);

        console.log(userClickedPattern);
    }
});

function nextSequence() {
    level = level + 1;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var colorButtonToFlash = $("#" + randomChosenColour);    
    colorButtonToFlash.fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    console.log(gamePattern);
}

function playSound(name) {
    let colorAudio = new Audio("sounds/" + name + ".mp3");
    colorAudio.play();
}

function animatePress(colour) {
    var buttonClicked = $("#" + colour);
    buttonClicked.addClass("pressed");

    setTimeout(() => {
        buttonClicked.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}