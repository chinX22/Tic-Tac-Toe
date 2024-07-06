function player (){
    this.moves = [];
}

function makeBoard(){
    let board = document.querySelector(".board")
    for(let i = 0; i < 9; i++){
        let place = document.createElement("button");
        place.setAttribute("id", "but" + (i+1));
        board.appendChild(place);
    }
}

function clearBoard(){
    let board = document.querySelector(".board");
    board.replaceChildren();
}

function setNames(p1Element, p2Element){
    const myDialog = document.querySelector("#names");
    const myForm = document.querySelector("form");
    p1Element.textContent = "Player 1";
    p2Element.textContent = "Player 2";
    myDialog.showModal();
    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        myDialog.close();
    let player1name = myForm.elements['player1name'].value;
    let player2name = myForm.elements['player2name'].value;
    if(player1name != ""){
    p1Element.textContent = player1name;
    }
    if(player2name != ""){
        p2Element.textContent = player2name;
    }
    })
}


    

function gameMaster(){
    let player1 = new player();
    let player2 = new player();
    let win = 0;     
    const winDialog = document.querySelector("#winner");
    winDialog.close();
    const gameOverEvent = new Event("gameOver");
    const p1nameElement = document.querySelector("#player1");
    const p2nameElement = document.querySelector("#player2");
    setNames(p1nameElement, p2nameElement);
   
    const winnerText = document.querySelector("#winnertext")
    document.addEventListener("gameOver", () => {
        winnerDisplay(winDialog, winnerText, p1nameElement.textContent, p2nameElement.textContent)
        });

    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        winDialog.close();
        reset();
    });
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", () => {reset();});
    
    let winningArrays = makeWinningArray();
    let buttonArr = [];
    let turn = 1;
    playGame();

    function playGame(){
        win = 0;
        turn = 1;
       makeBoard(); 
        for(let i = 0; i < 9; i++){
            buttonArr[i] = document.querySelector("#but" + (i+1))
            buttonArr[i].addEventListener("click", () => {
                if(win == 0 && 
                    (!(buttonArr[i].classList.contains("x"))
                    && !(buttonArr[i].classList.contains("o")))){
                    if((turn % 2) != 0){
                        player1.moves.push(i+1); 
                        !buttonArr[i].classList.add("x");
                    } else {
                        player2.moves.push(i+1);
                        buttonArr[i].classList.add("o");
                    }
                    turn++;
                    if(turn > 2){
                        checkWinner(player1, player2, winningArrays);
                        if(win != 0){
                            document.dispatchEvent(gameOverEvent);
                        }
                    };
                }
            });
        
        }
    }
    
    function winnerDisplay(dialog, text, p1name, p2name){
        dialog.style.visibility = 'visible';
        
        text.textContent = (win == 1) ? "Winner is: " + p1name : "Winner is: " + p2name;
    }

    function reset(){
        winDialog.style.visibility = 'hidden';
        for(box of buttonArr){
            box.classList.remove(...box.classList);
        }
        player1.moves = [];
        player2.moves = [];
        clearBoard();
        playGame();
    }
   
    function checkWinner(p1, p2, arrs){
        let winningArrays = arrs;
            if(p1.moves.length > 2){ 
                for (let i = 0; i < winningArrays.length; i++){
                    let smallarr = winningArrays[i];
                    let count = 0;
                    for(let i = 0; i < smallarr.length; i++){
                        let ele = smallarr[i];
                        if(p1.moves.includes(ele)){
                            count++;
                        }
                    }
                    if (count > 2){
                        win = 1;
                    }}}

            if(p2.moves.length > 2){ 
                for (let i = 0; i < winningArrays.length; i++){
                    let smallarr = winningArrays[i];
                    let count = 0;
                    for(let i = 0; i < smallarr.length; i++){
                        let ele = smallarr[i];
                        if(p2.moves.includes(ele)){
                            count++;
                        }
                    }
                    if (count > 2){
                        win = 2;
                    }}}

            return 0;
        }
    }



    
        


function makeWinningArray(){
    //let here = [];
    // let a = [1,2,3];
    // let b = [1,4,7];
    // here.push(a);
    // here.push(a.map((x) => x+ 3));
    // here.push(a.map((x) => x+ 6));
    // here.push(b);
    // here.push(b.map((x) => x+ 1));
    // here.push(b.map((x) => x+ 2));
    // here.push([1,5,9]);
    // here.push([3,5,7]);
    let here =[
        [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
    ]

    return here;
}
