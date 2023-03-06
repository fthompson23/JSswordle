async function word() {
    let request = new Request('https://random-word-api.herokuapp.com/word?length=6', {
        method: 'GET'
    });
    let result = await fetch(request);
    let apiResponse = await result.json();

    return(apiResponse)
}
let userInput = "";
let wordleWord = word().toLocaleString().toUpperCase()
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
if(document.getElementById("button").clicked === true)
{
    if (userInput === wordleWord) {
        console.log("correct");
    }
}