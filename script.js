let divs = document.querySelectorAll(".draw");
let btns = document.querySelectorAll(".btn");
let checkTurn= 0;

let remark = document.querySelector("#remark");

let winCombination = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8],[6,4,2]];

let decision = document.querySelector("#decision");

let reset = document.querySelector(".reset");


let result = (movechecker)=> {
    for (let i = 0; i < movechecker.length; i++) {
        if(movechecker[i] == 0  && decision.innerHTML =="") return 0;
    }
    return 1;
}


function blockAll() {
    for (let i = 0; i < divs.length; i++) {
        btns[i].disabled = true;
    }
}
function CheckWin(movechecker) {
    for (let i = 0; i < winCombination.length; i++) {
        let [num1, num2, num3] = winCombination[i];
        if (movechecker[num1] == 1 && movechecker[num2] == 1 && movechecker[num3] == 1) {
            decision.innerHTML = "X WINNER";
            remark.innerHTML = "";
            blockAll();
            return;
        }
        if (movechecker[num1] == 2 && movechecker[num2] == 2 && movechecker[num3] == 2) {
            decision.innerHTML = "O WINNER";
            remark.innerHTML = "";
            blockAll();
            return;
        }
    }

    if (result(movechecker) == 1) {
        remark.innerHTML = "Draw";
    }
}


reset.addEventListener("click",() =>{
    location.reload();
})


let movechecker = [0,0,0,0,0,0,0,0,0];

for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click",()=>{
        if (checkTurn%2 ==0) {
            if(movechecker[i]++ == 0){
                divs[i].innerHTML = "X";
                checkTurn++;
                remark.innerHTML="";
                if (result(movechecker) == 1) {
                    remark.innerHTML = "Draw";
                }
                CheckWin(movechecker);
            }
            else{
              remark.innerHTML = "Wrong Move!";
            }
        }
        else{
            if(movechecker[i] == 0){
                movechecker[i]+=2
                checkTurn++;
                divs[i].innerHTML = "O";
                CheckWin(movechecker);
              remark.innerHTML="";
              if (result(movechecker) == 1) {
                remark.innerHTML = "Draw";
            }
            }
            else{
              remark.innerHTML = "Wrong Move!";
            }
        }
        console.log(`box ${i} is clicked`);
    });
    };