export var lwrcharArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export var uprcharArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export var spclcharArray = ["+", "-", "=", "&", "!", "(", ")", "{", "}", "[", "]", "^", "~", "*", "?", ":", "%", "$", "#", "@", ";", "<", ">", "_"];

export var numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function getRandoNumber() {

    var number = numberArray[Math.floor(Math.random() * numberArray.length)];
    return number;
}