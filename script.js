let request = new XMLHttpRequest();
request.open("GET", "./dictionary.json", false);
request.send(null)
let words = Object.keys(JSON.parse(request.responseText));
let wordleWord = words[Math.floor(Math.floor(Math.random()*words.length))].toUpperCase();
let userInput = "";
console.log(wordleWord);
window.addEventListener("keydown", function (event) {
    if ((event.key.match(/^[A-Za-z]+$/)) && event.key.length === 1) {
        userInput += event.key.toUpperCase();
        document.getElementById("userText").innerHTML = userInput;
    } else if (event.key === "Backspace") {
        console.log("backspace");
        userInput = userInput.substring(0, userInput.length-1);
        document.getElementById("userText").innerHTML = userInput;
    }
}, true);
document.getElementById('button').onclick = function() {
    if (userInput.length === 6 && userInput === wordleWord) {
        alert("correct");
    } else if (userInput.length !== 6) {
        alert("Must be a 6 letter word");
    } else {
        alert("wrong");
    }
};