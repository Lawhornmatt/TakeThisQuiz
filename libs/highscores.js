var highscoreBox = document.getElementById("quizContainer");

var uglyScores = localStorage.getItem('scoreObjArray');

var nicerScores = uglyScores.split("_");

// var prettyScores = nicerScores.split('"');

console.log(uglyScores);

console.log(nicerScores);
console.log(nicerScores[2]);

// console.log(prettyScores);


function makescoreBoxes() {
    for (let i = 2; i < nicerScores.length; (i+=6)) {
        var entryDiv = document.createElement('div');
        var nameDiv = document.createElement('div');
        var scoreDiv = document.createElement('div');
        entryDiv.className = ('basicWBG');
        entryDiv.id = ('entryDiv');
        nameDiv.className = ('entryDivChild');
        scoreDiv.className = ('entryDivChild');

 
        nameDiv.innerHTML = nicerScores[i];
        entryDiv.appendChild(nameDiv);
        scoreDiv.innerHTML = nicerScores[i+3];
        entryDiv.appendChild(scoreDiv);

        highscoreBox.appendChild(entryDiv);
    }
}

makescoreBoxes();

// highscoreBox.innerHTML = nicerScores;

// console.log(JSON.parse(uglyScores));

// var simpleScore = localStorage.getItem('4:17:55:58');

// for (let i=0, i < )

// console.log(simpleScore);

// highscoreBox.innerHTML = JSON.parse(uglyScores[2])

