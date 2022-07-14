//INITIALIZATIONS

const tstMainpage = {
    quizTitle: "Welcome to Quiz Machine!",
    quizID: "LOADER",
    timeAllowance: null, //seconds
    timeSubtracted: null,
    quizInfo: null,

    question1Title: "Pick any quiz:",
    //question1Answers: find a way to point to the id of the quizes stored in local memeory ["Coding Quiz"],
};

const tstDEBUG = {
    quizTitle: "Yay Debug Test, woooo",
    quizID: "MOVEON", //Keep this! Use this param for a function to tell if it needs to begin a quiz, go to end state, go to highscore table, etc
    timeAllowance: 99, //seconds
    timeSubtracted: 1,
    quizInfo: "Matty has seen these questions too many times :)",

    questions: [
        ['DEBUG'],
        [1, "1)", "Who made this quiz?", 
        [3, 'Alowishus', 'Tchefuncte', 'Matty Lawhorn', 'Its a mystery']], 

        [2, "2)", "What is the airspeed velocity of swallow?", 
        [2, '40 MPH', 'Is it unlaiden?', '35 Km/H', '11 m/s']],

        [4, "4)", "What is the color of this website background?", 
        [3, 'Mossy Green', 'Garbage-y Blue?', 'Its ugly', 'Blue-Green']],

        [5, "5)", "What are you lookin at?!", 
        [1, 'You!', 'Nothin...', 'The timer :(', 'Im taking this quiz blindfolded']],

        [6, "6)", "What is the meaning of life?", 
        [4, 'Money', 'Coffee', '*insert users personal philosophy here*', '42']],

        [7, "7)", "我是个傻男人", 
        [2, '是的', 'what?', '去湖里跳', '你妈妈']],

        [8, "8)", "How many questions are there?", 
        [1, 'Three', 'Two', 'One']],

        [9, "9)", "Whatabout now??", 
        [6, 'One', 'Two', 'Three', 'Four', 'Five', 'Six']],

        [10, "10)", "Heres a freebee for taking my quiz!", 
        [3, '', '', 'Pick Me!', '']],

        [11, "You have finished the quiz!", "Submit Highscore?", [1, 'Yes', 'No']],
    ],
};

const tstCoding123 = {
    quizTitle: "Coding Quiz 1-2-3",
    quizID: "MOVEON", //Keep this! Use this param for a function to tell if it needs to begin a quiz, go to end state, go to highscore table, etc
    timeAllowance: 20, //seconds
    timeSubtracted: 1,
    quizInfo: "Test your coding knowledge!",

    questions: [
        ['DEBUG'],
        [1, "1)", "Who made this quiz?", 
        [3, 'Alowishus', 'Tchefuncte', 'Matty Lawhorn', 'Its a mystery']], 

        [2, "2)", "What is the airspeed velocity of swallow?", 
        [2, '40 MPH', 'Is it unlaiden?', '35 Km/H', '11 m/s']],

        [4, "4)", "What is the color of this website background?", 
        [3, 'Mossy Green', 'Garbage-y Blue?', 'Its ugly', 'Blue-Green']],

        [5, "5)", "What are you lookin at?!", 
        [1, 'You!', 'Nothin...', 'The timer :(', 'Im taking this quiz blindfolded']],

        [6, "6)", "What is the meaning of life?", 
        [4, 'Money', 'Coffee', '*insert users personal philosophy here*', '42']],

        [7, "7)", "我是个傻男人", 
        [2, '是的', 'what?', '去湖里跳', '你妈妈']],

        [8, "8)", "How many questions are there?", 
        [1, 'Three', 'Two', 'One']],

        [9, "9)", "Whatabout now??", 
        [6, 'One', 'Two', 'Three', 'Four', 'Five', 'Six']],

        [10, "10)", "Heres a freebee for taking my quiz!", 
        [3, '', '', 'Pick Me!', '']],

        [11, "You have finished the quiz!", "Submit Highscore?", [1, 'Yes', 'No']],
    ],
};

//IMPORTS

//Gives access to the countdown timer code
//My issue: import/export still works. Why cant I use require()???
import * as countdown from "./timer.js";



// ====================
//  ACCESS HTML BY DOM
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
}



// ====================
//      FUNCTIONS
// ====================

//START!
//this function changes the UI to whatever quiz 'quizAsset' is set to
//ToDo: quizAsset will initially be tstMainScreen, but clicking the apro btn will set it to the selected quiz AND fire loadQuiz()
var quizAsset = tstDEBUG;
var questionIndex = 1;
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
    handleQuestions(questionIndex);
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
            letsmoveOn();
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

//LETS MOVE ON
//incr the questionIndex by one and call handleQuestions() so that old questions elements are deleted/written over by new
function letsmoveOn() {
    questionIndex++;
    handleQuestions(questionIndex);
}





