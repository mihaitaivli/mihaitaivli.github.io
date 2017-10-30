$(function(){
    //helper functions and variables********************************
    
    // array to hold used letters
    var usedLettersArray = [];
    
    // var to hold max number of guesses
    var maxGuesses = 9;
    
    // var to hold current letter
    var curLetter = '';
    
    // function to check if a letter was already used
    function letterIsUsedAlready(l){
        return usedLettersArray.indexOf(l) !== -1? true : false;
    };
    
    // function to read the letter entered and clear the field afterwards
    function readAndClearLetter(){
      curLetter = $("#letter").val();
      $("#letter").val('');
    };
    
    // use a random number to pick a word
    var randomIndex = Math.floor(Math.random() * 5) + 1;
    
    // initialize an array with the letters from the random word
    var wordToGuess = wordsDict[randomIndex].split('');
    
    // initialize a map of letters to help verify if user won
    var correctWord = {};
    wordToGuess.forEach(v => correctWord[v] = true);

    // create the placeholders for letters and make them invisible
    $.each(wordToGuess, function(index, value){
        $("#wordToGuess").append('<div class="letterHolder"><span class="hiddenLetter">'
         + value + '</span><div>');
    });
    
    // function that reveals a char
    function revealChar(curLetter){
        $(".hiddenLetter").filter(function(){
            // filter the letters by content and display
            // console.log($(this).text());
            return $(this).text() === curLetter;
        }).css("visibility", "visible");
    }

    // if the char is not in the word
    // draw a portion of the line
    function drawLine(number){
        $("#" + number).css("visibility", "visible")
            .addClass("animatedLine");
    }

    // this function ends the game
    function endTheGame(){
        // call with a delay
        setTimeout(function(){
            alert('You ran out of guesses. Game over!');
            // reload the page
            location.reload();
        }, 1000);
    };
    
    // this function checks if the game was won
    function checkIfWon(letter){
        delete correctWord[letter];

        if ($.isEmptyObject(correctWord)){
            setTimeout(function() {
                alert('You won!');
                location.reload();
            }, 1000);

        }
    }
    //***************************************************************
    
    
    
    
    // detect button pressed
    $("#button").click(function(e){

        e.stopPropagation();
        readAndClearLetter();
        
        if (letterIsUsedAlready(curLetter)){
            
            // check if the letter was used before
            alert("You already used the letter " + curLetter);
            
        } else {
            
            // update list of used letters
            usedLettersArray.push(curLetter);
            $("#usedLettersList").html(usedLettersArray.toString());

            //call the function to reveal the char
            revealChar(curLetter);
            // check if the player won the game
            checkIfWon(curLetter);

            // draw line and
            // check how many guesses are left
            if(wordToGuess.indexOf(curLetter) === -1){

                drawLine(maxGuesses);
                maxGuesses -=1;
                // end the game if there are no more guesses left
                if(maxGuesses === 0){
                    endTheGame(); //end the game
                }
            }

            
            // console logs
            console.log("can try " + maxGuesses + " times.");
            console.log(usedLettersArray);
        }
    });
    
    // if the enter key is pressed, click the button:)
    $('#letter').keypress(function(e){
        // Enter key pressed
        if(e.which == 13){
            $("#button").click(); //Trigger button
        }
    });

console.log(wordToGuess);
});