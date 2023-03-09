window.addEventListener("load", (event) => {
/////// INIT //////
    console.log("display.js loaded");
//the row size CSS for boxes is NOT dynamic, so if you want to change these values you'll have to change that too
    var columns = 6; //determines the number of boxes on the screen, should be equal to word length
    var rows = 6; //determines the number of rows on screen
    var $boxes = []; //stores the CSS id of every box

//box class
//the CSS ID of each individual box is two numbers, the first the row and the second for the column
    class Box {
        constructor(row, column){
            //row and column are 0 indexed
            this.row = row;
            this.column = column;
            this.ID = ""+this.row+this.column;
            this.toHtml = "<div class='box' id='box"+this.ID+"'></div>"
        }
    }
    function addBoxes(){
        var newBox;
        for (i = 0; i < rows*columns; i++){
            newBox = new Box(Math.trunc(i/6), (i % 6)); //create box variable
            $( "#table" ).append(newBox.toHtml); //add box to the actual HTML table
            $boxes.push(newBox); //add each box to the larger box array
        }
        console.log("Created boxes." );
    }

//Adds the given string to the given box, only named addCharacter because of functionality
// boxID: int in the [xy] format, where x is the row and y is the column
    function addCharacter(boxID, string) {
        $("#box"+boxID.toString()).append("<p>"+string+"</p>");
    }

//changes the color of the given box
// boxID: in [xy] format
//color: hex value
    function changeColor(boxID, color){
        $("#box"+boxID).css("background-color", "#"+color);
    }
//actual code
    addBoxes();

    function compareWord(word, userWord, row) {
        for (i = 0; i < word.length; i++) {
            if (word.slice(i, i+1) === userWord.slice(i, i+1)) {
                changeColor(row.toString()+(i.toString()), "00FF00")
            } else if (word.includes(userWord.slice(i, i+1))) {
                changeColor(row.toString()+(i.toString()), "FFFF00")
            } else {
                changeColor(row.toString()+(i.toString()), "FF0000")
            }
        }
    }
    function clearRow(row) {
        for (i = 0; i < columns; i++) {
            $("#box" + row + i).empty();
        }
    }
    function dispOut(word, row) {
        clearRow(row);
        for (i = 0; i < word.length; i++) {
            console.log(i.toString());
            addCharacter(row.toString()+(i.toString()), word.substring(i,i+1));
        }
    }

// parses the json and converts into array
    let request = new XMLHttpRequest();
    request.open("GET", "./dictionary.json", false);
    request.send(null)
    let words = Object.keys(JSON.parse(request.responseText));

// gets a random word from the array
    let wordleWord = words[Math.floor(Math.floor(Math.random()*words.length))].toUpperCase();
    let userInput = "";
    let row = 0;
    console.log(wordleWord);
// checks when key pressed, filters input, and modifies userinput
    window.addEventListener("keydown", function (event) {
        if (((userInput.length < 6) && event.key.match(/^[A-Za-z]+$/)) && event.key.length === 1) {
            userInput += event.key.toUpperCase();
            dispOut(userInput, row);
        } else if (event.key === "Backspace") {
            console.log("backspace");
            userInput = userInput.substring(0, userInput.length - 1);
            dispOut(userInput, row);
        }
    }, true);
    document.getElementById('button').onclick = function() {
        if (!(words.includes(userInput.toLowerCase()))) {
            alert("not a real word")
        } else if (userInput === wordleWord) {
            compareWord(wordleWord, userInput, row)
            alert("correct");
        } else if (userInput.length !== 6) {
            alert("Must be a 6 letter word");
        } else {
            compareWord(wordleWord, userInput, row)
            row++;
            userInput = "";
            alert("wrong");
        }
    };
});

