function player (){
    this.moves = [];
    const addMove = (place) => moves.push(place);
}

function getButtons(){
    let buttonArr = [];
    console.log("hey");
    for(let i = 0; i < 9; i++){
        buttonArr[i] = document.querySelector(".but" + (i+1))
        buttonArr[i].addEventListener("click", () => {console.log("hi")});
    }
}

function takeTurns(x){
    if((turn % 2) != 0){
        player1.moves.push(x);        
    } else {
        player2.moves.push(x);
    }
}

function playGame(){
    const player1 = new player();
    const player2 = new player();
    const resetButton = document.querySelector("#clear");
    resetButton.addEventListener("click", () => {
        reset();
    });
    let winningArrays = makeWinningArray();
    let buttonArr = [];
    console.log("hey");
    let turn = 1;
    let win = 0;

    for(let i = 0; i < 9; i++){
        buttonArr[i] = document.querySelector("#but" + (i+1))
        buttonArr[i].addEventListener("click", () => {
            if(win == 0){
                if((turn % 2) != 0){
                    player1.moves.push(i+1); 
                    buttonArr[i].classList.add("x");
                } else {
                    player2.moves.push(i+1);
                    buttonArr[i].classList.add("o");
                }
                console.log(player1.moves);
                console.log(player2.moves);
                turn++;
                if(turn > 2){
                    win = checkWinner(player1, player2, winningArrays);
                };
            }
        });
    }
    
    function reset(){
        for(box of buttonArr){
            box.classList.remove(...box.classList);
        }
        player1.moves = [];
        player2.moves = [];
        playGame();
    }
    
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
                        console.log("p1 win");
                        return 1;
                    }
                }
            }

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
                        console.log("p2 win");
                        return 2;
                    }
                }
            }

            return 0;
        }
        


function makeWinningArray(){
    let here = [];
    let a = [1,2,3];
    let b = [1,4,7];
    here.push(a);
    here.push(a.map((x) => x+ 3));
    here.push(a.map((x) => x+ 6));
    here.push(b);
    here.push(b.map((x) => x+ 1));
    here.push(b.map((x) => x+ 2));
    here.push([1,5,9]);
    here.push([3,5,7]);

    return here;
}
