const html = document.querySelector("html")
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const beginSection = document.querySelector("#begin-section");
const newWordSection = document.querySelector("#new-word-section");
const gameSection = document.querySelector("#game-section");

function mainMenu(){
    html.style.height = window.innerHeight+"px"

    // visualizaciones
    main.classList.add("flex-col-center")
    main.classList.remove("flex-col-start")

    beginSection.style.display = "flex";
    gameSection.style.display = "none";
    newWordSection.style.display = "none";

    header.classList.remove("header-phone")
    main.classList.remove("main-phone")
    footer.classList.remove("footer-phone")

    // Botones del menú principal
    const buttonPlayGame = document.querySelector("#play-game");
    const buttonAddWord = document.querySelector("#add-new-word");
    
    buttonPlayGame.addEventListener("click", createBoardGame);
    buttonAddWord.addEventListener("click", addNewWord);
}

window.addEventListener("load", mainMenu)