//INITIALIZATIONS

let quizMainpage = {
    quizTitle: "Welcome to Quiz Machine!",
    quizID: "mainpage",
    timeAllowance: null, //seconds
    timeSubtracted: null,
    quizInfo: null,

    question1Title: "Pick any quiz:",
    //question1Answers: find a way to point to the id of the quizes stored in local memeory ["Coding Quiz"],
}

let quizCoding123 = {
    quizTitle: "Coding Quiz 1-2-3",
    quizID: "Coding Quiz",
    timeAllowance: 10, //seconds
    timeSubtracted: 1,
    quizInfo: "R A P I D F I R E ~~ Has 10 questions in 10 seconds!",

    question1Title: "Pick any quiz:",
    question1Answers: ["Coding Quiz"],
}

// import * as X from "Y";
var quizAsset = quizCoding123;

//ACCESS HTML BY DOM

// Stuff:

var logo = document.getElementById("logo");
var timerUI = document.getElementById("timerUI");
var quizContainer = document.getElementById("quizContainer");
var quizTitle = document.getElementById("quizTitle");
var questionBox = document.getElementById("questionBox");
var answerBox = document.getElementById("answerBox");
var buttonBox = document.getElementById("buttonBox");

//EVENT LISTENERS

//FUNCTIONS

//onload, this function changes the UI to whatever quiz 'quizAsset' is set to
function loadQuiz() {
    quizTitle.innerHTML = quizAsset.quizTitle;

}

//a bs function to make sure timer is functional
function displayMessage() {
    alert('timer is done');
}

//TIMER CODE
function countdown() {

    // var timeLeft = 5; Commented out because we're using 'timeAllowance' which I've abstracted into being part of the 'quiz object'
    var timeInterval = setInterval(function () {

        if (quizAsset.timeAllowance > 1) {
            timerUI.innerHTML = quizAsset.timeAllowance
            quizAsset.timeAllowance--;
      } else {
        // Once `timeLeft` gets to 0, set `timerUI` to DONE mssg
        timerUI.innerHTML = ' Done! ';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000); // Makes `setInterval()` method to call a function to be executed every 1000 milliseconds. Basically determines how long the app considers a second.
  }
  



