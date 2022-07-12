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
    quizID: "Coding Quiz", //I probably dont need this param, I'll find the selected  quiz via the object name or file name
    timeAllowance: 5, //seconds
    timeSubtracted: 1,
    quizInfo: "Test your coding knowledge!",

    questions: [
        ['DEBUG'],
        [1, "1)", "What's your name?", [3, 'Thom', 'Jim', 'Matty', 'Robert']], 
        [2, "2)", "Your city?", [2, 'San Antonio', 'Austin', 'Dallas', 'Houston']]
        [3, "3)", "Fav Color?", [4, 'Red', 'Yellow', 'Purple', 'Blue-Green']]
    ],
}

//IMPORTS

//Gives access to the countdown timer code
//My issue: import/export still works. Why cant I use require()???
import * as countdown from "./timer.js";


//ACCESS HTML BY DOM

//HTML Layout
var logo = document.getElementById("logo");
var timerUI = document.getElementById("timerUI");
var quizContainer = document.getElementById("quizContainer");
var quizTitle = document.getElementById("quizTitle");
var questionBox = document.getElementById("questionBox");
var questionNumber = document.getElementById("questionNumber");
var questionText = document.getElementById("questionText");
var answerBox = document.getElementById("answerBox");
var buttonBox = document.getElementById("buttonBox");

//FUNCTIONS

//ON LOAD
//this function changes the UI to whatever quiz 'quizAsset' is set to

//quizAsset will initially be MainScreen, but clicking the apro btn will set it to the selected quiz AND fire loadQuiz()
var quizAsset = quizCoding123;
window.onload = loadQuiz();


//calling this loads whatever obj is set to quizAsset
function loadQuiz() {
    //First change the page elements
    logo.innerHTML = quizAsset.quizTitle;
    quizTitle.innerHTML = quizAsset.quizInfo;
    
    //Next, start the timer.
    countdown.countdown(quizAsset.timeAllowance);
    
    //Lastly, load in the quiz questions
    handleQuestions();
}

//QUESTION HANDLER
//Handles cycling through the questions
function handleQuestions() {
    let currentQuestion = 1; //currently hardset to 1, we'll make it index later via the first element in the answerArray
    loadtheQuestion(currentQuestion);
}

//QUESTION LOADER
//Loads in an *individual* question set by the question handler
function loadtheQuestion(currentQuestion) {
    var currentQuestionArray = quizAsset.questions[currentQuestion];
    var currentAnswerArray = currentQuestionArray[3]; //answers are always the third element in the array
    
    questionNumber.innerHTML = currentQuestionArray[1];
    questionText.innerHTML = currentQuestionArray[2];
    
    // console.log(currentQuestionArray[3].length); //Debugging
    
    for (let i=1; i < currentQuestionArray[3].length; i++) {
        makeButton(i, currentAnswerArray[0], currentAnswerArray[i]); //the 0th element of the answerArray tells which index of the array is the correct answer
    }
    
    
}

//BUTTON
//Iteratively creates buttons and appends them to the .buttonBox based on quiz params
function makeButton(currentAnswerIndex, correctAnswerIndex, currentAnswerText) {
    
    let freshBtn = document.createElement('input');
    freshBtn.type = 'button';
    freshBtn.value = '#'+currentAnswerIndex;
    freshBtn.id = 'answer'+currentAnswerIndex;
    if (currentAnswerIndex == correctAnswerIndex) {
        freshBtn.dataset.state = 'correct';
    } else {
        freshBtn.dataset.state = 'wrong';
    }
    
    let freshLabel = document.createElement('label');
    // freshLabel.for = 'answer'+currentAnswerIndex; //Apparently doesnt work? But unnecessary when using CSS .grid
    freshLabel.innerHTML = currentAnswerText;
    
    return buttonBox.appendChild(freshBtn) + buttonBox.appendChild(freshLabel);
}

//ACCESSING DYNAMIC BUTTONS 
//must be at bottom of page so they load AFTER the button are iterated
const button1 = document.getElementById('answer1')
const button2 = document.getElementById('answer2')
const button3 = document.getElementById('answer3')
const button4 = document.getElementById('answer4')

//DynButns EVENT LISTENERS

button1.addEventListener('click', function() {
    if (button1.state == 'correct') {
        console.log('Goodjob');
    } else {
        console.log('How embarrassing...');
    }
});

button2.addEventListener('click', function() {
    if (button2.state == 'correct') {
        console.log('Goodjob');
    } else {
        console.log('How embarrassing...');
    }
});

button3.addEventListener('click', function() {
    if (button3.value == '#3') {
        console.log('Goodjob');
    } else {
        console.log('How embarrassing...');
    }
});

button4.addEventListener('click', function() {
    if (button4.state == 'correct') {
        console.log('Goodjob');
    } else {
        console.log('How embarrassing...');
    }
});

