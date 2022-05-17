let keyWord, letterLeft, score, gameOver, underscores, lettersUsed, wrongLetters

const wrongLetterBox = document.querySelector("#wrong-words-box")
const rightWordsBox = document.querySelector("#right-words-box")

const newGameButton = document.querySelector("#new-game")
const desistButton = document.querySelector("#desist")

const finalMsg = document.querySelector("#final-msg-box")
const secretWordBox = document.querySelector("#secret-word-box")

const openKeyboard = document.querySelector("#open-keyboard")
const fakeInput = document.querySelector("#fake-input")


function createBoardGame(){
    main.classList.add("flex-col-start")
    main.classList.remove("flex-col-center")
    
    beginSection.style.display = "none";
    gameSection.style.display = "flex";
    newWordSection.style.display = "none";

    rightWordsBox.innerHTML = ""
    wrongLetterBox.innerHTML = ""

    newGameButton.addEventListener("click", createBoardGame)
    desistButton.addEventListener("click", mainMenu)

    keyWord = chooseRandomWord();
    letterLeft = keyWord.length
    score = 0
    gameOver = false

    drawHanged()
    finalMsg.style.display = "none"
    secretWordBox.style.display = "none"

    console.log("board game created");
    console.log(keyWord)

    drawUnderscores()
    underscores = document.querySelectorAll(".underscore")

    lettersUsed = []
    wrongLetters = []

    openKeyboard.addEventListener("click", () => fakeInput.focus())
    
    window.addEventListener("keydown", checkKeyDown);        
}

function checkKeyDown(){
    // comprobar que no haya perdido y que la tecla presionada sea una letra
    if(!gameOver && event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 192){
        let letter = (event.key).toUpperCase();
        // comprobar que no se haya usado esa letra
        if(!lettersUsed.includes(letter)){
            let searchBegin = 0
            let index = keyWord.indexOf(letter, searchBegin)
            // comprobar que la letra esté en la palabra
            if(index != -1){
                console.log()
                lettersUsed.push(letter)
                while(index != -1){
                    letterLeft--
                    underscores[index].textContent = letter
                    searchBegin = index +1
                    index = keyWord.indexOf(letter, searchBegin)
                }
            }else{
                console.log()
                lettersUsed.push(letter)
                wrongLetters.push(letter)
                wrongLetterBox.textContent = wrongLetters.join(' ')
                score++
                drawHanged()
            }
            hasWon()
        }
    }
}

function chooseRandomWord(){
    return wordsList[Math.floor(Math.random() * wordsList.length)];
}

function drawUnderscores(){
    const rightWordsBox = document.querySelector("#right-words-box")
    for(let i=0; i<keyWord.length; i++){
        let div = document.createElement("div")
        div.classList.add("underscore")
        div.classList.add("flex-col-center")
        rightWordsBox.appendChild(div)
    }
}

function drawHanged(){
    let img = document.querySelector("#hanged-img");
    switch(score) {
        case 0:
            img.src = "img/0.png"
            break;
        case 1:
            img.src = "img/1.png"
            break;
        case 2:
            img.src = "img/2.png"
            break;
        case 3:
            img.src = "img/3.png"
            break;
        case 4:
            img.src = "img/4.png"
            break;
        case 5:
            img.src = "img/5.png"
            break;
        case 6:
            img.src = "img/6.png"
            break;
      }
}

function hasWon(){
    if(letterLeft == 0){
        gameOverMsg(won=true, keyWord)
        gameOver = true
    } else if (score == 6){
        gameOverMsg(won=false, keyWord)
        gameOver = true
    }    
}

function gameOverMsg(won){
    finalMsg.style.display = "flex"
    if(won){
        finalMsg.classList.remove("red")
        finalMsg.classList.add("green")
        finalMsg.textContent = `¡ GANASTE, FELICIDADES !`
    } else {
        finalMsg.classList.remove("green")
        finalMsg.classList.add("red")
        finalMsg.textContent = `¡ FIN DEL JUEGO !`
        
        secretWordBox.style.display = "flex"
        secretWordBox.textContent = `La palabra secreta era: ${keyWord}`
    }
}

