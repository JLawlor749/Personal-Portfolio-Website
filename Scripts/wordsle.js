const inputBox = document.getElementById("wordsleInput");
const inputCard = document.getElementById("wordsleInputCard");

const submitButton = document.getElementById("wordsleButton");

const rowOne = document.getElementById("wordsleR1");
const rowOneLetters = rowOne.getElementsByClassName("wordsleLetter");

const rowTwo = document.getElementById("wordsleR2");
const rowTwoLetters = rowTwo.getElementsByClassName("wordsleLetter");

const rowThree = document.getElementById("wordsleR3");
const rowThreeLetters = rowThree.getElementsByClassName("wordsleLetter");

const rowFour = document.getElementById("wordsleR4");
const rowFourLetters = rowFour.getElementsByClassName("wordsleLetter");

const rowFive = document.getElementById("wordsleR5");
const rowFiveLetters = rowFive.getElementsByClassName("wordsleLetter");

const rowSix = document.getElementById("wordsleR6");
const rowSixLetters = rowSix.getElementsByClassName("wordsleLetter");

allLetters = [rowOneLetters, rowTwoLetters, rowThreeLetters, rowFourLetters, rowFiveLetters, rowSixLetters];

console.log(allLetters)

let lost = false;
let won = false;
let letters_wrong = [];
let guesses = 6;

targetWords = ["beans", "borne", "allow", "skulls", "laser", "smash", "flame", "shield", "roses", "bricks", "tonne", "fermi", "trade", "larps", "fangs",
    "shoot", "track", "shoes", "quirk", "shine", "sword", "blade", "model", "paint", "games", "friend", "guess", "silky", "songs", "knight", "nails"]

todaysDate = new Date();
currentDay = todaysDate.getUTCDate();
todaysWord = targetWords[currentDay - 1];
todaysWord = todaysWord.toUpperCase();



function changeInputCard(background, shadow)
{
    inputCard.style.background = background;
    inputCard.style.boxShadow = shadow;
}



function validateInput()
{
    var text = inputBox.value;
    text = text.toUpperCase()
    wrongLetters = false;

    for(let i = 0; i < text.length; i++)
    {
        if(letters_wrong.includes(text[i]))
        {
            wrongLetters = true;
        }
    }

    if(text.length == 5 && wrongLetters == false)
    {
        return true;
    }

    else
    {
        let background = "rgba(255, 86, 86, 0.5)";
        let boxShadow = "0px 0px 32px 4px rgba(255, 0, 0, 0.37)";

        changeInputCard(background, boxShadow);

        background = "rgba( 187, 255, 255, 0.5 )";
        boxShadow = "0px 0px 32px 4px rgba( 34, 208, 187, 0.37 )";

        setInterval(() => {
            changeInputCard(background, boxShadow)
        }, 600);

        return false;
    }
}



function check_word(word, target_word)
{
    /*
    This function checks each letter in the guessed word against the target.
    It prints each letter of the guess in a different colour based on correctness.
    BLUE, 2 = Correct letter in the correct space.
    RED, 1 = Correct letter in the wrong space.
    GREY, 0 = Wrong letter.
    */

    goal_checklist = [];
    guess_print = [];
    positions_checked = [];
    currentRow = 6 - guesses;

    // Create a list containing every letter in the word.  
    for(let i = 0; i < target_word.length; i++)
    {
        goal_checklist.push(target_word[i]);
    }

    // Iterate over the word, checking for correct letters in the correct spot.
    for(let i = 0; i < word.length; i++)
    {
        // When a letter in the correct spot is found, a tuple with the green colour code AND the letter's index in the word to the guess, and remove the letter from the checklist.
        if(word[i] == target_word[i])
        {
            guess_print.push([i, 2])
            positions_checked.push(i)
            index = goal_checklist.indexOf(word[i])
            if(index > -1)
            {
                goal_checklist.splice(index, 1);
            }
        }
    }

    // Iterate again, check for correct letters in the wrong spot.
    for(let i = 0; i < word.length; i++)
    {
        if(goal_checklist.includes(word[i]) && word[i] != target_word[i] )
        {
            //When found, add a tuple with the yellow colour code AND the letter's index, and remove that letter from the checklist.
            guess_print.push([i, 1])
            positions_checked.push(i)
            index = goal_checklist.indexOf(word[i])
            if(index > -1)
            {
                goal_checklist.splice(index, 1);
            }
        }
    }

    // If the letter isn't found in the word at all, we add a tuple with the red colour code to the guess list. Also add the letter to the list of incorrect letters.
    for(let i = 0; i < word.length; i++)
    {        
        if( !(goal_checklist.includes(word[i])) && !(positions_checked.includes(i)) )
        {
            guess_print.push([i, 0])
        }

        // If the letter isn't in the word at all, add it to the letters wrong list.
        if( !(target_word.includes(word[i])) && !(letters_wrong.includes(word[i])) )
        {
            letters_wrong.push(word[i])
            console.log(letters_wrong)
        }
    }

    // Sort the guess_print[] array by the first element of each item, producing a list of which colours to put on each letter.
    for(let i = 0; i < guess_print.length; i++)
    {
        for(let j = 0; j < guess_print.length; j++)
        {
            if( (guess_print[i])[0] < (guess_print[j])[0] )
            {
                temp = guess_print[i]
                guess_print[i] = guess_print[j]
                guess_print[j] = temp
            }
        }
    }

    // Add the appropriate text and colouration to the cells on the current row.
    for(let i = 0; i < guess_print.length; i++)
    {
        allLetters[currentRow][i].innerHTML = word[i]; 
        parentCard = allLetters[currentRow][i].parentNode.parentNode.parentNode;
        parentCard.style.color = "white";

        if( (guess_print[i])[1] == 2)
        {
            parentCard.style.background = "rgba(100, 255, 131, 0.75)"
            parentCard.style.boxShadow = "0px 0px 32px 6px rgba(0, 255, 26, 0.37)"
        }

        if( (guess_print[i])[1] == 1)
        {
            parentCard.style.background = "rgba(255, 86, 86, 0.5)";
            parentCard.style.boxShadow = "0px 0px 32px 6px rgba(255, 0, 0, 0.37)";
        }
    }

    guesses -= 1

    console.log(goal_checklist)
    console.log(guess_print)
    
}



function getInput()
{
    let check = validateInput();

    let text = inputBox.value;
    text = text.toUpperCase();

    if(check == true && guesses > 0)
    {
        check_word(text, todaysWord);
    }
}



submitButton.addEventListener("click", function (e) {
        getInput();
})

inputBox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        getInput();
    }
});

