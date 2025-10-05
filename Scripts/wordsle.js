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

allLetters = [rowOneLetters, rowTwoLetters, rowThreeLetters, rowFourLetters, rowFiveLetters, rowSixLetters]

console.log(allLetters)



function changeInputCard(background, shadow)
{
    inputCard.style.background = background;
    inputCard.style.boxShadow = shadow;
}



function validateInput()
{
    var text = inputBox.value;

    if(text.length == 5)
    {
        return true;
    }

    else
    {
        let background = "rgba(255, 86, 86, 0.5)";
        let boxShadow = "0px 0px 32px 4px rgba(255, 0, 0, 0.37)";

        changeInputCard(background, boxShadow)

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
    GREEN = Correct letter in the correct space.
    YELLOW = Correct letter in the wrong space.
    RED = Wrong letter.
    */

    goal_checklist = [];
    guess_print = [];

    
}



function getInput()
{
    let check = validateInput()

    if(check == true && guesses > 0)
    {
        let text = inputBox.value;
        text = text.toUpperCase();

        currentRow = 6 - guesses

        for(let i = 0; i < text.length; i++)
        {
            allLetters[currentRow][i].innerHTML = text[i]; 
            parentCard = allLetters[currentRow][i].parentNode.parentNode.parentNode;
            parentCard.style.color = "white";
        }

        guesses -= 1
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



let lost = false
let won = false
let letters_wrong = []
let guesses = 6

