//INITIALIZATIONS

import * as dfltArrays from "../libs/defaultArrays.js";

import * as wrdArray from "../libs/wordsArray.js";

var touseArrays = [];

var newLetter = "";
var emptyPassword = "";

//ACCESS HTML BY DOM

// Password:
var generateBtn = document.getElementById("generate");
var passwordText = document.getElementById("password");
// Checkboxes //
// used in default password generation:
var lwrcaseBox = document.getElementById("useLwrcase");
var uprcaseBox = document.getElementById("useUprcase");
var specialsBox = document.getElementById("useSpecials");
var numbersBox = document.getElementById("useNumbers");
// used in option selection:
var dfltBox = document.getElementById("useDfltOption");
var xkcdBox = document.getElementById("useXKCDOption");

// Slider(s):
var slider = document.getElementById("passLengthSlider");
var output = document.getElementById("passLengthText");
var wordSlider = document.getElementById("wordpassLengthSlider");
var wordOutput = document.getElementById("wordpassLengthText");
var numbSlider = document.getElementById("numbpassLengthSlider");
var numbOutput = document.getElementById("numbpassLengthText");

//FUNCTIONS

//which options to display:
import * as optionChckbx from "./optionChckbxs.js";

document.onload = optionChckbx.checkDFLTbox();
document.onload = optionChckbx.checkXKCDbox();

dfltBox.addEventListener("click", optionChckbx.checkDFLTbox);
xkcdBox.addEventListener("click", optionChckbx.checkXKCDbox);


// Called in beginning of writePassword, generates the password
function genDefaultPassword() {

    if (!lwrcaseBox.checked && !uprcaseBox.checked && !specialsBox.checked && !numbersBox.checked) {
      emptyPassword = "Please check at least one option box at minimum";
      return emptyPassword;
    }
    
    if (lwrcaseBox.checked) {
      touseArrays = touseArrays.concat(dfltArrays.lwrcharArray);
    }

    if (uprcaseBox.checked) {
      touseArrays = touseArrays.concat(dfltArrays.uprcharArray);
    }

    if (specialsBox.checked) {
      touseArrays = touseArrays.concat(dfltArrays.spclcharArray);
    }

    if (numbersBox.checked) {
      touseArrays = touseArrays.concat(dfltArrays.numberArray);
    }
    
    for (let i = 0; i < slider.value; i++) {
      newLetter = touseArrays[Math.floor(Math.random() * touseArrays.length)];
      emptyPassword += newLetter;
    }
    return emptyPassword;
}

// Both called at end of writePassword, resets the pass generation for next btn press
function resetPassword() {
  emptyPassword = "";
}

function emptyArray() {
  touseArrays = [];
}

// Main func, writePassword is called when gnerateBtn is clicked
function writePassword() {
  if (dfltBox.checked) {
    var password = genDefaultPassword();
  } 
  else if (xkcdBox.checked) {
    var password = genXKCDPassword();    
  }
  else {
    var password = "Error: Please chose just one password style option"
  }
  passwordText.value = password;
  resetPassword();
  emptyArray();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);




// SLIDER CODE:

output.value = slider.value; // Display the default slider value
// Updates the other input method when its correspondent is changed (e.g. slider moves when numbers are typed in box)
slider.oninput = function() {
  output.value = this.value;
}

output.oninput = function() {
  slider.value = this.value;
}

wordSlider.oninput = function() {
  wordOutput.value = this.value;
}

wordOutput.oninput = function() {
  wordSlider.value = this.value;
}

numbSlider.oninput = function() {
  numbOutput.value = this.value;
}

numbOutput.oninput = function() {
  numbSlider.value = this.value;
}