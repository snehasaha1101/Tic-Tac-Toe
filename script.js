let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true; //playerX, playerO;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        box.innerText="X";
        if(turnO){
            box.innerText="O";
            turnO=false;
            box.classList.add("playerO");
        }else{
            box.innerText="X";
            turnO=true;
            box.classList.add("playerX");
        }
        box.disabled=true;//to prevent multiple clicks on the same button
        checkWinner();//function to check winner after each move
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const highlightWinningBoxes = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].classList.add("winning-box");
    });
};
const dehighlightWinningBoxes = () => {
    boxes.forEach((box) => {
        box.classList.remove("winning-box", "playerO", "playerX");
    });
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations! Winner is Player ${winner}`;
    msgContainer.classList.remove("hide");
}
const showDraw=()=>{
    msg.innerText=`Draw!`;
    msgContainer.classList.remove("hide");
}
let winnerFound=false;
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!=""&&pos2Val!=""&&pos3Val!="")
            if(pos1Val==pos2Val &&pos2Val==pos3Val){
                disableBoxes();
                showWinner(pos1Val);
                highlightWinningBoxes(pattern);
                winnerFound = true;
                return; 
            }    
    } 
    const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allBoxesFilled && !winnerFound) {
        disableBoxes();
        showDraw();
    }
    
};

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    dehighlightWinningBoxes();
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
