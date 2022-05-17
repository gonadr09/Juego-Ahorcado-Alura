const main = document.querySelector("main");
const beginSection = document.querySelector("#begin-section");
const newWordSection = document.querySelector("#new-word-section");
const gameSection = document.querySelector("#game-section");

function mainMenu(){
    main.classList.add("flex-col-center")
    main.classList.remove("flex-col-start")

    beginSection.style.display = "flex";
    gameSection.style.display = "none";
    newWordSection.style.display = "none";

    const buttonPlayGame = document.querySelector("#play-game");
    const buttonAddWord = document.querySelector("#add-new-word");
    
    buttonPlayGame.addEventListener("click", createBoardGame);
    buttonAddWord.addEventListener("click", addNewWord);
}

window.addEventListener("load", mainMenu)