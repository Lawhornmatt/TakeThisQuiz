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
// var answerBox = document.getElementById("answerBox"); //Deprecated, use buttonBox instead
const buttonBox = document.getElementById("buttonBox");


// ====================
//   INITIALIZATIONS
// ====================

//this function changes the UI to whatever quiz 'quizAsset' is set to
var quizAsset = tstMainpageFile.tstMainpage;
var questionIndex;
var lastQuestion;
var countdown;  //The lynch pin to makeing this whole timer business work: A global variable to act on

var scoreIndex = 0;
var scoreObjArray = [['0_0',"_User Names:_", '0_0',"_High Scores:_"]];

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
        gameEnder();
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
    }
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
    
    let freshLabel = document.createElement('label');
    freshLabel.innerHTML = currentAnswerText;

    return buttonBox.appendChild(freshBtn) + buttonBox.appendChild(freshLabel);
}

//ANSWER BUTTON EVENT HANDLING
//An event handler on the buttonBox delegates events to its children answer buttons
buttonBox.addEventListener('click', function(e) {
    // e.preventDefault();
    const datButton = e.target;
    if (datButton.type == "button") {

        if (quizAsset.quizID == "LOADER") {
            quizAsset = tstCoding123File.tstCoding123;
            loadQuiz(quizAsset);
        } 
        
        else if (quizAsset.quizID == "MOVEON") {
    
            if (datButton.dataset.state == 'correct') {
                console.log('Goodjob');
                increaseScore();
                letsmoveOn();
            } else {
                console.log('How embarrassing...');
                workingTimeAllowance--;
                timerUI.innerHTML = workingTimeAllowance;
                letsmoveOn();
            }
        }

        else if (quizAsset.quizID == "ENDER") {

            if (document.getElementById('HSNAME')) {
                var HSNAME = document.getElementById('HSNAME');
            }

            if (datButton.dataset.state == 'correct' && HSNAME.value) {

                var scoreToAdd = {
                    User_Name: ("_"+HSNAME.value+"_"),
                    High_Score: ("_"+theScore+"_"),
                };
        
                scoreObjArray.push(scoreToAdd);

                //Saves their score in local storage
                localStorage.setItem('scoreObjArray', JSON.stringify(scoreObjArray));
                
                resettoMain();
                
            } else if (datButton.dataset.state == 'correct' && !HSNAME.value) {

                alert('Please enter your name'); //Makes sure the user entered their name.

            } else {
                resettoMain();
            }
        }
    }
});


//RESET TO MAINPAGE
//Resets Quiz Machine back to the Mainpage, along with....
function resettoMain() {
    theScore = 0;                                   //...making sure the score is reset to zero
    yourScoreBox.style.visibility = "hidden";       //...making sure the score gets hidden
    quizAsset = tstMainpageFile.tstMainpage;        //...setting the quiz asset to the mainpage data
    loadQuiz(quizAsset);                            //...running the quiz loader 
}

//END THE GAME 
//or quiz, whatever, the function hides the timer and takes the player to a page for submitting highscores
function gameEnder() {
    timerUI.style.visibility = "hidden";
    quizAsset = tstEndgameFile.tstEndgame;
    loadQuiz(quizAsset);
}

//INFANT ANNIHILATOR
//Removes all children from a node, src'd from here: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function infantAnnihilator(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//INCREASE YOUR SCORE
function increaseScore() {
    theScore++;
    scoreField.textContent = theScore;
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
        console.log('Quit to Mainpage')
        timerUI.style.visibility = "hidden";
        resettoMain();
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
    }
}
function timerStop() {
    // console.log('Clearing old interval');
    clearInterval(countdown);
}



