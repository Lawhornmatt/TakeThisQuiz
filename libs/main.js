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
    timeAllowance: 5, //seconds
    timeSubtracted: 1,
    quizInfo: "R A P I D F I R E ~~ Has 10 questions in 10 seconds!",

    questions: [
        ['DEBUG'],
        [1, "1)", "What's your name?", [3, 'Thom', 'Jim', 'Matty', 'Robert'], 3], 
        [2, "2)", "Your city?", ['San Antonio', 'Austin', 'Dallas', 'Houston'], 2]
        [3, "3)", "Fav Color?", ['Red', 'Yellow', 'Purple', 'Blue-Green'], 4]
    ],
}



import * as countdown from "./timer.js";

// var timer = require('./timer');

var quizAsset = quizCoding123;

//ACCESS HTML BY DOM

// Stuff:

var logo = document.getElementById("logo");
var timerUI = document.getElementById("timerUI");
var quizContainer = document.getElementById("quizContainer");
var quizTitle = document.getElementById("quizTitle");
var questionBox = document.getElementById("questionBox");
var questionNumber = document.getElementById("questionNumber");
var questionText = document.getElementById("questionText");
var answerBox = document.getElementById("answerBox");
var buttonBox = document.getElementById("buttonBox");

//EVENT LISTENERS

//FUNCTIONS

//onload, this function changes the UI to whatever quiz 'quizAsset' is set to
window.onload = loadQuiz();

//make a button
function makeButton(currentAnswerIndex, currentAnswerText) {
    // let freshBtnValue = ('#'+value);
    // let freshBtnID = ('answer'+value);
    // let freshBtnValue = 2;
    // let freshBtnID = 2;
    // let labelNode = 'Jim';

    let freshBtn = document.createElement('input');
    freshBtn.type = 'button';
    freshBtn.value = '#'+currentAnswerIndex;
    freshBtn.id = 'answer'+currentAnswerIndex;

    let freshLabel = document.createElement('label');
    freshLabel.for = 'answer'+currentAnswerIndex;
    freshLabel.innerHTML = currentAnswerText;
    
    
    return buttonBox.appendChild(freshBtn) + buttonBox.appendChild(freshLabel);
}

//callign this loads a quiz
function loadQuiz() {
    logo.innerHTML = quizAsset.quizTitle;
    quizTitle.innerHTML = quizAsset.quizInfo;
    
    let currentQuestion = 1;
    loadtheQuestion(currentQuestion);

    countdown.countdown(quizAsset.timeAllowance);
}

function loadtheQuestion(currentQuestion) {
    var currentQuestionArray = quizAsset.questions[currentQuestion];
    var currentAnswerArray = currentQuestionArray[3]; //answers are always the third element in the array

    questionNumber.innerHTML = currentQuestionArray[0];
    questionText.innerHTML = currentQuestionArray[1];

    console.log(currentQuestionArray[3].length);

    // let freshBtn = document.createElement('input'); //.setAttribute('type', 'button');
    // freshBtn.type = 'button';
    // answerBox.appendChild(freshBtn);
    // let i = 2;
    for (let i=1; i < currentQuestionArray[3].length; i++) {
        makeButton(i, currentAnswerArray[i]);
        
    }
}



