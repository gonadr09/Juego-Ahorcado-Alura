function addNewWord(){
    // visualizaciones
    beginSection.style.display = "none";
    gameSection.style.display = "none";
    newWordSection.style.display = "flex";

    main.classList.remove("flex-col-start")
    main.classList.add("flex-col-center")

    // funcionamiento input y botones de pantalla add new Word
    const inputText = document.querySelector("#new-word-input");
    const confirmNewWord = document.querySelector("#confirm-new-word")
    const saveButton = document.querySelector("#new-word-save");
    const cancelButton = document.querySelector("#new-word-cancel");

    confirmNewWord.innerHTML = ""
    let tempInput = ""
    let expresion = /[A-Z]/i;

    inputText.addEventListener("input", (e) => {  
        if(e.data == null){
        } 
        else if(expresion.test(e.data)){
            tempInput = inputText.value
        } else {
            inputText.value = tempInput
        }
    })

    cancelButton.addEventListener("click", createBoardGame)
    saveButton.addEventListener("click", () => {        
        if(inputText.value != ""){
            if(inputText.value.length <= 20){
                wordsList.push((inputText.value).toUpperCase())
                confirmNewWord.textContent = `Agregaste la palabra: ${(inputText.value).toUpperCase()}`
                confirmNewWord.classList.remove("color-red")
                confirmNewWord.classList.add("color-green")
                inputText.value = "";
            } else {
                confirmNewWord.textContent = `La palabra supera los 20 caracteres permitidos`
                confirmNewWord.classList.add("color-red")
                confirmNewWord.classList.remove("color-green")
            }
        } 
    })
}