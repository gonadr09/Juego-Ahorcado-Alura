let keyWord, letterLeft, score, gameOver, underscores, lettersUsed, wrongLetters, letter, searchBegin, index

const wrongLetterBox = document.querySelector("#wrong-words-box")
const rightWordsBox = document.querySelector("#right-words-box")

const newGameButton = document.querySelector("#new-game")
const desistButton = document.querySelector("#desist")

const finalMsg = document.querySelector("#final-msg-box")
const secretWordBox = document.querySelector("#secret-word-box")

const logo = document.querySelector("#logo")
const themeIcon = document.querySelector("#theme-icon")

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

// escuchadores de los botones
newGameButton.addEventListener("click", () => {animation(createBoardGame)});
desistButton.addEventListener("click", () => {animation(mainMenu)});

const line1 = document.querySelector("#line1");
const line2 = document.querySelector("#line2");
const line3 = document.querySelector("#line3");

const arr1 = ["Q","W","E","R","T","Y","U","I","O","P"];
const arr2 = ["A","S","D","F","G","H","J","K","L","Ñ"];
const arr3 = ["Z","X","C","V","B","N","M"];

function createKeywoard(){
    line1.innerHTML = ""
    line2.innerHTML = ""
    line3.innerHTML = ""
    for(let i = 0; i < arr1.length; i++){
        let div = document.createElement("div")
        div.classList.add("keyboard-letter")
        div.classList.add("flex-col-center")
        div.textContent = arr1[i]
        div.id = arr1[i]
        div.addEventListener("click", checkLetterFromKeyboard)
        line1.appendChild(div)
    }

    for(let i = 0; i < arr2.length; i++){
        let div = document.createElement("div")
        div.classList.add("keyboard-letter")
        div.classList.add("flex-col-center")
        div.textContent = arr2[i]
        div.id = arr2[i]
        div.addEventListener("click", checkLetterFromKeyboard)
        line2.appendChild(div)
    }

    for(let i = 0; i< arr3.length; i++){
        let div = document.createElement("div")
        div.classList.add("keyboard-letter")
        div.classList.add("flex-col-center")
        div.textContent = arr3[i]
        div.id = arr3[i]
        div.addEventListener("click", checkLetterFromKeyboard)
        line3.appendChild(div)
    }
}

function createBoardGame(){
    // visualizaciones
    main.classList.add("flex-col-start")
    main.classList.remove("flex-col-center")

    beginSection.style.display = "none";
    gameSection.style.display = "flex";
    newWordSection.style.display = "none";

    // Tira hacia abajo el footer en pantallas pequeñas (mediaquery en JS)
    let mdH = window.matchMedia("(max-height: 570px)");
    if(mdH.matches){
        header.classList.add("header-phone")
        main.classList.add("main-phone")
        footer.classList.add("footer-phone")
    } else {
        header.classList.remove("header-phone")
        main.classList.remove("main-phone")
        footer.classList.remove("footer-phone")
    }

    // Elige palabra y reinicia valores
    keyWord = chooseRandomWord();
    letterLeft = keyWord.length
    score = 0
    gameOver = false
    lettersUsed = []
    wrongLetters = []
    finalMsg.style.display = "none"
    secretWordBox.style.display = "none"
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHanged(score)
    drawUnderscores()
    createKeywoard()

    underscores = document.querySelectorAll(".underscore")

    console.log(keyWord)

    // escuchador del teclado
    window.addEventListener("keydown", checkKeyfromPC); // para jugar con PC
}

function checkLetterFromKeyboard(){
    let data = (this.textContent).charCodeAt(0)
    if(!gameOver){
        // comprobar que la tecla presionada sea una letra
        if(data >= 65 && data <= 90 || data >= 97 && data <= 122 || data == 209 || data == 241){
            letter = (this.textContent).toUpperCase();
            this.classList.add("pressed")
            checkLetter()
        }
    }
}

function checkKeyfromPC(e){
    if(!gameOver){
        // comprobar que no haya perdido y que la tecla presionada sea una letra
        if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 192){
            letter = (e.key).toUpperCase();
            checkLetter()
            let letterDiv = document.querySelector("#"+letter)
            letterDiv.classList.add("pressed")
        }
    }
}

function checkLetter(){
    // comprobar que no se haya usado esa letra
    if(!lettersUsed.includes(letter)){
        searchBegin = 0
        index = keyWord.indexOf(letter, searchBegin)
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
            drawHanged(score)
        }
        hasWon()
    }
}

function chooseRandomWord(){
    return wordsList[Math.floor(Math.random() * wordsList.length)];
}

function drawUnderscores(){
    rightWordsBox.innerHTML = ""
    wrongLetterBox.innerHTML = "&nbsp;"
    for(let i=0; i<keyWord.length; i++){
        let div = document.createElement("div")
        div.classList.add("underscore")
        div.classList.add("flex-col-center")
        rightWordsBox.appendChild(div)
    }
}

function drawHanged(score){
    ctx.beginPath();
    ctx.lineWidth = 6
    const root = document.querySelector(':root');
    const rootStyle = getComputedStyle(root);
    true? ctx.strokeStyle = rootStyle.getPropertyValue('--darkblue'): ctx.strokeStyle = rootStyle.getPropertyValue('--lightblue');
    switch(score) {
        case 0:
            // BASE
            ctx.moveTo(25, 350);
            ctx.lineTo(325, 350);
            // COL
            ctx.moveTo(105, 0);
            ctx.lineTo(105, 350);
            ctx.moveTo(135, 350);
            ctx.lineTo(105, 320);
            ctx.moveTo(75, 350);
            ctx.lineTo(105, 320);
            // VIGA
            ctx.moveTo(155, 0);
            ctx.lineTo(105, 50);
            ctx.moveTo(257, 3);
            ctx.lineTo(103, 3);
            // CUERDA
            ctx.moveTo(255, 0);
            ctx.lineTo(255, 50);
            break;
        case 1:
            // CABEZA
            ctx.arc(255, 80, 30,2*Math.PI,0)
            break;
        case 2:
            // TORSO
            ctx.moveTo(255, 185);
            ctx.lineTo(255, 110);
            break;
        case 3:
            // PI_I
            ctx.moveTo(275, 230);
            ctx.lineTo(255, 185);
            break;
        case 4:
            // PI_D
            ctx.moveTo(235, 230);
            ctx.lineTo(255, 185);
            break;
        case 5:
            // BR_I
            ctx.moveTo(275, 170);
            ctx.lineTo(255, 120);
            break;
        case 6:
            // BR_I
            ctx.moveTo(235, 170);
            ctx.lineTo(255, 120);
            break;
    }
    ctx.stroke()
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
        finalMsg.textContent = `¡ GANASTE !` //⭐✨🌟💫🏮🎎🎉🎊🎈🎀 ❌✅❗❕😁😄😄
    } else {
        finalMsg.classList.remove("green")
        finalMsg.classList.add("red")
        finalMsg.textContent = `¡ FIN DEL JUEGO ! ` // 😈👻💩🤡💀☠️🥴😵😥😨😰😓😥

        secretWordBox.style.display = "flex"
        secretWordBox.textContent = `La palabra secreta era: ${keyWord} 😵`
    }
}

const darkThemeButton = document.querySelector("#myCheck")

darkThemeButton.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if(currentTheme == "light"){
        currentTheme="dark";
        logo.style.fill = "rgb(239, 241, 250)"
        themeIcon.textContent = "MODO 🌘"
    } else {
        currentTheme="light";
        logo.style.fill = "rgb(7, 45, 100)"
        themeIcon.textContent = "MODO 🌘"
    }
    document.documentElement.setAttribute("data-theme", currentTheme);
    reDrawHanged();
})

function reDrawHanged(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("repintando")
    console.log("score = "+ score)
    for(let i = 0; i <= score; i++){
        drawHanged(i);
    }
}
