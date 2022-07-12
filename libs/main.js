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


//ACCESS HTML BY DOM

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

//ON LOAD
//this function changes the UI to whatever quiz 'quizAsset' is set to

//quizAsset will initially be MainScreen, but clicking the apro btn will set it to the selected quiz AND fire loadQuiz()
var quizAsset = quizCoding123;
window.onload = loadQuiz();


//callign this loads a quiz
function loadQuiz() {
    //First change the page elements
    logo.innerHTML = quizAsset.quizTitle;
    quizTitle.innerHTML = quizAsset.quizInfo;
    
    //Next, load in the quiz questions
    let currentQuestion = 1; //currently hardset to 1, we'll make it index later
    loadtheQuestion(currentQuestion);

    //Lastly, start the timer.
    countdown.countdown(quizAsset.timeAllowance);
}

function loadtheQuestion(currentQuestion) {
    var currentQuestionArray = quizAsset.questions[currentQuestion];
    var currentAnswerArray = currentQuestionArray[3]; //answers are always the third element in the array

    questionNumber.innerHTML = currentQuestionArray[0];
    questionText.innerHTML = currentQuestionArray[1];

    console.log(currentQuestionArray[3].length);

    for (let i=1; i < currentQuestionArray[3].length; i++) {
        makeButton(i, currentAnswerArray[i]);
        
    }
}

//BUTTON
//Iteratively creates buttons and appends them to the .buttonBox based on quiz params
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


