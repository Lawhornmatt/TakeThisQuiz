// ====================
//      IMPORTS
// ====================

//Quiz files. All start with tst and contain all quiz data
import * as tstMainpageFile from "./tstMainpage.js";
import * as tstEndgameFile from "./tstEndgame.js";
import * as tstCoding123File from "./tstCoding123.js";
import * as tstDEBUGFile from "./tstDEBUG.js";

//I used to have a separate file for timer and it worked until I wanted to restart it with different values. Re-extract at end of project
// import * as countdown from "./timer.js";


// ====================
//  ACCESS HTML BY DOM
// ====================

//HTML Layout
var logoText = document.getElementById("logoText");
var timerBox = document.getElementById("timerBox");
var timerUI = document.getElementById("timerUI");
var quizContainer = document.getElementById("quizContainer");
var quizTitleText = document.getElementById("quizTitleText");
var yourScoreBox = document.getElementById("yourScoreBox");
var scoreField = document.getElementById("scoreField");
var questionBox = document.getElementById("questionBox");
var questionNumber = document.getElementById("questionNumber");
var questionText = document.getElementById("questionText");
var answerBox = document.getElementById("answerBox");
var buttonBox = document.getElementById("buttonBox");

//Access the generated buttons made via makeButton()
//Added if-statements so number of buttons can be determined in the tstDEBUG.questions array (up to six! I could do more but that's too extra)
function buttonEventLoader() {
    console.log('Button# variables instanced and attached to their HTML element');
    if (document.getElementById('answer1')) {
        var button1 = document.getElementById('answer1');
    }
    if (document.getElementById('answer2')) {
        var button2 = document.getElementById('answer2');
    }
    if (document.getElementById('answer3')) {
        var button3 = document.getElementById('answer3');
    }
    if (document.getElementById('answer4')) {
        var button4 = document.getElementById('answer4');
    }
    if (document.getElementById('answer5')) {
        var button5 = document.getElementById('answer5');
    }
    if (document.getElementById('answer6')) {
        var button6 = document.getElementById('answer6');
    }
    //Also loads in the input box for the Highscore page
    if (document.getElementById('HSNAME')) {
        var HSNAME = document.getElementById('HSNAME');
    }
}

// ====================
//   INITIALIZATIONS
// ====================

//this function changes the UI to whatever quiz 'quizAsset' is set to
var quizAsset = tstMainpageFile.tstMainpage;
var questionIndex;
var lastQuestion;
var countdown;  //The lynch pin to makeing this whole timer business work: A global variable to act on

var scoreIndex = 0;
var scoreObjArray = [];

var theScore = 0;
var workingTimeAllowance;
window.onload = loadQuiz(quizAsset);


// ====================
//      FUNCTIONS
// ====================

//LOAD A QUIZ OBJECT
//calling this loads whatever obj is set to quizAsset
function loadQuiz(quizAsset) {
    //First change the page elements
    console.log('Loading Quiz: ' + quizAsset.quizTitle);
    logoText.textContent = quizAsset.quizTitle;
    quizTitleText.textContent = quizAsset.quizInfo;
    
    //First, erase anything the countdown was previously set to
    timerStop();
    //Now, start up the countdown with the current loaded quiz timer values
    //BUT only if we're loading a normal quiz which will have the quizID "MOVEON"
    if (quizAsset.quizID == "MOVEON") {
        workingTimeAllowance = quizAsset.timeAllowance;
        countdown = setInterval(timerGo, 1000); 
        
        timerUI.style.visibility = "visible";
        yourScoreBox.style.visibility = "visible";


        questionIndex = 1;
        lastQuestion = (quizAsset.questions.length - 1);
        console.log('Quiz is over in '+lastQuestion+' questions');
        handleQuestions(questionIndex);
    } else {
        questionIndex = 1;
        handleQuestions(questionIndex);
    }
}

//QUESTION HANDLER
//Handles cycling through the questions
function handleQuestions(questionIndex) {

    //First, remove the previous buttons and their labels
    console.log('Removing old questions...');
    infantAnnihilator(buttonBox);

    //var currentQuestion = 1; //currently hardset to 1, we'll make it index later via the first element in the answerArray
    loadtheQuestion(questionIndex);
}

//QUESTION LOADER
//Loads in an *individual* question set by the question handler
function loadtheQuestion(questionIndex) {

    //MajorSect: If no more questions, launches the ENDER quiz for highscore submission
    if (questionIndex > lastQuestion) { 
        timerStop();
        timerUI.style.visibility = "hidden";
        quizAsset = tstEndgameFile.tstEndgame;
        loadQuiz(quizAsset);
    } else {
        console.log('...and loading fresh question from #: ' + questionIndex);
        var currentQuestionArray = quizAsset.questions[questionIndex];
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
}

//BUTTON GENERATOR
//Iteratively creates buttons and appends them to the .buttonBox based on quiz params. Now also appends each button with it's own EventListener
function makeButton(currentAnswerIndex, correctAnswerIndex, currentAnswerText) {
    
    let freshBtn = document.createElement('input');

    freshBtn.type = 'button';
    freshBtn.value = '#'+currentAnswerIndex;
    freshBtn.id = 'answer'+currentAnswerIndex;

    if (quizAsset.quizID == "LOADER") {

            //freshBtn.dataset.state = currentAnswerIndex;  //Thus, every mainScreen button has a dataset containing the psuedofile path to the file it ought to open

    } else {
        if (currentAnswerIndex == correctAnswerIndex) {
            freshBtn.dataset.state = 'correct';
        } else {
            freshBtn.dataset.state = 'wrong';
        }
    } 

    if (quizAsset.quizID == "LOADER") {
        freshBtn.addEventListener('click', function() {
            quizAsset = tstCoding123File.tstCoding123;
            loadQuiz(quizAsset);
    });
    } else if (quizAsset.quizID == "MOVEON") {
        freshBtn.addEventListener('click', function() {

            if (freshBtn.dataset.state == 'correct') {
                    console.log('Goodjob');
                    increaseScore();
                    letsmoveOn();
            } else {
                console.log('How embarrassing...');
                workingTimeAllowance--;
                timerUI.innerHTML = workingTimeAllowance;
                letsmoveOn();
            }
    });
    } else if (quizAsset.quizID == "ENDER") {
        freshBtn.addEventListener('click', function(event) {
            event.preventDefault();

            // var scoreID_Bad = new Date();
            // var scoreID_Good = scoreID_Bad.getDay() + ":" + scoreID_Bad.getHours() + ":" + scoreID_Bad.getMinutes() + ":" + scoreID_Bad.getSeconds();
            var scoreToAdd = {
                User_Name: HSNAME.value,
                High_Score: theScore,
            };

            scoreObjArray.push(scoreToAdd);
            if (freshBtn.dataset.state == 'correct') {

                //Saves their score in local storage
                localStorage.setItem('scoreObjArray', JSON.stringify(scoreObjArray));
                
                yourScoreBox.style.visibility = "hidden";
                theScore = 0;
                // scoreIndex++;
                quizAsset = tstMainpageFile.tstMainpage;
                loadQuiz(quizAsset);
        } else {
            quizAsset = tstMainpageFile.tstMainpage;
            loadQuiz(quizAsset);
            yourScoreBox.style.visibility = "hidden";
            theScore = 0;
        }

    });
    }

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

//LETS MOVE ON
//incr the questionIndex by one and call handleQuestions() so that old questions elements are deleted/written over by new
function letsmoveOn() {
    questionIndex++;
    handleQuestions(questionIndex);
}

//DEBUG KEYS
document.addEventListener("keydown", keydownAction);
function keydownAction(e) {
    if (e.altKey && e.key == '`') {     //Fire off the Debug Quiz
        quizAsset = tstDEBUGFile.tstDEBUG;
        loadQuiz(quizAsset);
    }
    if (e.altKey && e.key == 'm') {     //Jump back to Mainpage
        console.log('Back to Mainpage');
        quizAsset = tstMainpageFile.tstMainpage;
        loadQuiz(quizAsset);
    }
    if (e.altKey && e.key == 'p') {     //Kill the timer
        console.log('Stop the timer');
        timerStop();
        timerUI.innerHTML = ('STOPPED');
    }
}

//TIMER STUFF
function timerGo() {
    if (workingTimeAllowance > 0) {
        timerUI.innerHTML = workingTimeAllowance;
        workingTimeAllowance--;
    } else if (workingTimeAllowance > -1) {
        timerUI.innerHTML = ' Done! ';
        workingTimeAllowance--;
    } else {
        timerStop();
        timerUI.style.visibility = "hidden";
        quizAsset = tstEndgameFile.tstEndgame;
        loadQuiz(quizAsset);
        clearInterval(countdown);
    }
}
function timerStop() {
    // console.log('Clearing old interval');
    clearInterval(countdown);
}

//INCREASE YOUR SCORE
function increaseScore() {
    theScore++;
    scoreField.textContent = theScore;
}


