let players=null;
let gameOver=false;
let gameboard=[[0,0,0],[0,0,0],[0,0,0]];
function defaultMessage(){
  const display = document.getElementById('display');
  const msg=document.createElement('p');
    msg.textContent="Enter the game mode and press 'Start game' to start the game.";
    display.appendChild(msg);
}
function deleteExtramessage(paragraph){
while (paragraph.children.length > 1) {
  paragraph.removeChild(paragraph.lastChild);
}
}
const display = document.getElementById('display');
function Buttons(){
const resetbtn=document.getElementById('reset');
const startbtn=document.getElementById('start');
const onepcard=document.getElementById('card1');
const twopcard=document.getElementById('card2');
const Dialog1=document.getElementById('1pDialog');
const Dialog2=document.getElementById('2pDialog');
const confirm1p = document.getElementById('confirm1p');
const confirm2p = document.getElementById('confirm2p');
const display = document.getElementById('display');
function attachBoxListeners(SetValue) {
  const boxes = document.getElementsByClassName('box');
  [...boxes].forEach((box, index) => {
    const row = Math.floor(index / 3);
    const column = index % 3;
    box.onclick = () => SetValue(row, column);
  });
}

resetbtn.addEventListener('click', function () {
   deleteExtramessage(display);
   defaultMessage();
const boxes=document.getElementsByClassName('box');
  [...boxes].forEach(box => {
    box.textContent ="";
    box.style.backgroundImage="url()";
});
console.clear();
gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  gameOver = false; 
players=null;
startbtn.disabled=true;
  });
  startbtn.addEventListener('click', function () {
    console.log(gameboard);
    gameOver=false;
    deleteExtramessage(display);
  if (!players) {
    if(display.children.length>7)
    deleteExtramessage(display);
    const msg=document.createElement('p');
    msg.textContent="Please enter player information first.";
    display.appendChild(msg);
    return;
  }

  const SetValue = Gameboard(players); // now we pass stored player info
  attachBoxListeners(SetValue);

  startbtn.disabled = true;
  });
  
  onepcard.addEventListener('click', function () {
   Dialog1.showModal();
  });
  confirm1p.addEventListener('click', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const choice = parseInt(document.getElementById('choice').value);

    if (!name || (choice !== 1 && choice !== 2)) {
      if(display.children.length>7)
      deleteExtramessage(display);
      
       if(display.children.length>5)
      deleteExtramessage(display);
    const msg=document.createElement('p');
    msg.textContent="Please enter valid name and choice (1 or 2)";
    display.appendChild(msg);
      return;
    }

    Dialog1.close();

    // Start Game
    players = [
    { name, token: choice },
    { name: 'Computer', token: choice === 1 ? 2 : 1 }
  ];
  document.getElementById('myForm').reset();
  startbtn.disabled = false;
  });
  twopcard.addEventListener('click', function () {
   Dialog2.showModal();
  });
  confirm2p.addEventListener('click', function (e) {
    e.preventDefault();
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    const choice1 = parseInt(document.getElementById('choice1').value);

    if (!name1 || !name2 || (choice1 !== 1 && choice1 !== 2)) {
      if(display.children.length>7)
     deleteExtramessage(display);
      const msg=document.createElement('p');
    msg.textContent="Please enter valid name and choice (1 or 2)";
    display.appendChild(msg);
    }

    const choice2 = choice1 === 1 ? 2 : 1;

    Dialog2.close();

    players = [
    { name: name1, token: choice1 },
    { name: name2, token: choice2 }
  ];
  document.getElementById('myForm2').reset();
  startbtn.disabled = false;
  });
  

}
function Gameboard(playerList){

let turn=1;
let gameOver=false;
const display=document.getElementById('display');
const gamelog=document.getElementById('gamelog');
const boxes=document.getElementsByClassName('box');
const players = playerList;

  const TokenCheck=(name,token)=>{
if (
        // Rows
        (gameboard[0][0] === token && gameboard[0][1] === token && gameboard[0][2] === token) ||
        (gameboard[1][0] === token && gameboard[1][1] === token && gameboard[1][2] === token) ||
        (gameboard[2][0] === token && gameboard[2][1] === token && gameboard[2][2] === token) ||

        // Columns
        (gameboard[0][0] === token && gameboard[1][0] === token && gameboard[2][0] === token) ||
        (gameboard[0][1] === token && gameboard[1][1] === token && gameboard[2][1] === token) ||
        (gameboard[0][2] === token && gameboard[1][2] === token && gameboard[2][2] === token) ||

        // Diagonals
        (gameboard[0][0] === token && gameboard[1][1] === token && gameboard[2][2] === token) ||
        (gameboard[0][2] === token && gameboard[1][1] === token && gameboard[2][0] === token)
    ) {
      if(gamelog.children.length>7)
      deleteExtramessage(gamelog);
      const log=document.createElement('p');
      log.textContent=name+' won the game'
      gamelog.appendChild(log)
      return true;
    }else{
      turn++;
      TurnCheck();
        return false;
    }
  }
  
const TurnCheck = () => {
  const msg=document.createElement('p');
    const currentPlayer = turn % 2 !== 0 ? players[0] : players[1];
    if(display.children.length>7)
  deleteExtramessage(display);
    msg.textContent=`${currentPlayer.name}'s turn`
    display.appendChild(msg);
};
 const SetValue = (row, column) => {
  const msg=document.createElement('p');
  if (gameOver||gameboard[row][column] !== 0) {
    if(display.children.length>5)
   deleteExtramessage(display);
    msg.textContent = gameOver ? "Game is over." : "Invalid move. Spot already taken.";
    display.appendChild(msg);
    return;
  }

  let currentPlayer=turn % 2 !== 0 ? players[0] : players[1];

  function getBox(row,column){
   const index=row*3+column;
   return boxes[index];
  }
  getBox(row, column).style.backgroundImage = 
      currentPlayer.token === 1 ? "url('images/circle-outline.svg')" : "url('images/close.svg')";
  gameboard[row][column] = currentPlayer.token;
  console.table(gameboard);
  if (TokenCheck(currentPlayer.name, currentPlayer.token)) {
    gameOver = true;
  }
  if (!gameOver && players[turn % 2 === 0 ? 1 : 0].name === 'Computer') {
  setTimeout(ComputerMove, 500); // Delay to make it feel like it's "thinking"
}

  if (turn > 9 && !gameOver) {
    if(gamelog.children.length>7)
    deleteExtramessage(gamelog);
    const log=document.createElement('p');
      log.textContent='The game ended in a draw.'
      gamelog.appendChild(log)
      gameOver = true;
}
};
const ComputerMove = () => {
  if (gameOver) return;

  // Step 1: Gather empty cells
  const emptyCells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameboard[row][col] === 0) {
        emptyCells.push([row, col]);
      }
    }
  }

  // Step 2: Pick one at random
  if (emptyCells.length > 0) {
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Step 3: Call SetValue for computer
    SetValue(row, col);
  }
};

  console.table(gameboard);
  TurnCheck();
  return SetValue
}
defaultMessage();
Buttons();