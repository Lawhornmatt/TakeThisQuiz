var highscoreBox = document.getElementById("highscoreBox");

var uglyScores = window.localStorage;

console.log(uglyScores);
console.log(JSON.parse(uglyScores));

highscoreBox.innerHTML = uglyScores.User_Name;

// for (let i=0; i < window.localStorage.key.length, i++)

