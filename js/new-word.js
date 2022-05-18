function addNewWord(){
    // visualizaciones
    beginSection.style.display = "none";
    gameSection.style.display = "none";
    newWordSection.style.display = "flex";

    main.classList.remove("flex-col-start")
    main.classList.add("flex-col-center")

    // funcionamiento input y botones de pantalla add new Word
    const inputText = document.querySelector("#new-word-input");
    const saveButton = document.querySelector("#new-word-save");
    const cancelButton = document.querySelector("#new-word-cancel");

    cancelButton.addEventListener("click", mainMenu)
    saveButton.addEventListener("click", () => {
        if(inputText.value != ""){
            wordsList.push((inputText.value).toUpperCase())
            inputText.value = "";
            createBoardGame()
            console.log(inputText.value)
            console.log(wordsList)
        }
    })
}