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



// ====================
//ACCESS HTML BY DOM
// ====================

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

//Access the generated buttons made via makeButton()
function buttonEventLoader() {
    console.log('Button# variables instanced and attached to their HTML element');
    var button1 = document.getElementById('answer1');
    var button2 = document.getElementById('answer2');
    var button3 = document.getElementById('answer3');
    var button4 = document.getElementById('answer4');
}



// ====================
//      FUNCTIONS
// ====================

//START!
//this function changes the UI to whatever quiz 'quizAsset' is set to
//ToDo: quizAsset will initially be MainScreen, but clicking the apro btn will set it to the selected quiz AND fire loadQuiz()
var quizAsset = quizCoding123;
window.onload = loadQuiz();

//LOAD A QUIZ OBJECT
//calling this loads whatever obj is set to quizAsset
function loadQuiz() {
    //First change the page elements
    console.log('Loading Quiz: ' + quizAsset.quizTitle);
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

    //First, remove the previous buttons and their labels
    console.log('Removing old questions...');
    infantAnnihilator(buttonBox);

    let currentQuestion = 1; //currently hardset to 1, we'll make it index later via the first element in the answerArray
    loadtheQuestion(currentQuestion);
}

//QUESTION LOADER
//Loads in an *individual* question set by the question handler
function loadtheQuestion(currentQuestion) {

    console.log('...and loading fresh question from #: ' + currentQuestion);
    var currentQuestionArray = quizAsset.questions[currentQuestion];
    var currentAnswerArray = currentQuestionArray[3]; //answers are always the third element in the array
    
    questionNumber.innerHTML = currentQuestionArray[1];
    questionText.innerHTML = currentQuestionArray[2];
    
    // console.log(currentQuestionArray[3].length); //Debugging
    
    // buttonLoader(currentQuestionArray, currentAnswerArray);
    for (let i=1; i < currentQuestionArray[3].length; i++) {
        console.log('Made button: ' + i);
        makeButton(i, currentAnswerArray[0], currentAnswerArray[i]); //the 0th element of the answerArray tells which index of the array is the correct answer
    }

    buttonEventLoader();
}

//BUTTON GENERATOR
//Iteratively creates buttons and appends them to the .buttonBox based on quiz params. Now also appends each button with it's own EventListener
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

    freshBtn.addEventListener('click', function() {
        if (freshBtn.dataset.state == 'correct') {
            console.log('Goodjob');
        } else {
            console.log('How embarrassing...');
        }
    });

    let freshLabel = document.createElement('label');
    freshLabel.innerHTML = currentAnswerText;

    return buttonBox.appendChild(freshBtn) + buttonBox.appendChild(freshLabel);
}

//INFANT ANNIHILATOR
//Removes all children from a node, src'd from here: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function infantAnnihilator(parent) {
    
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}







