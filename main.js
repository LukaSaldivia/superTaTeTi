const X_CLASS = 'x';
const O_CLASS = 'o';
const DRAW_CLASS = 'd';

let isOTurn;
let currentClass;

const Winning_Combinations = [
    
    [0,1,2],
    [3,4,5],    //Horizontal
    [6,7,8],

    [0,3,6],
    [1,4,7],    //Vertical
    [2,5,8],

    [0,4,8],    //Diagonal
    [2,4,6]

]


const mega_board = document.querySelector('#mega-board');

const tiny_boards = document.querySelectorAll('.mega-cell');

const cells = document.querySelectorAll('.tiny-cell');

cells.forEach(cell =>{
    cell.addEventListener('click',handleClick);
})

// const message_container = document.querySelector('#message-container');
// const message = document.querySelector('#message');
// const symbol = document.querySelector('#symbol');

// const reset_button = document.querySelector('#reset-button');

// reset_button.addEventListener('click',restart);

startGame();


function handleClick(e){
    const cell = e.target;
    const mega_cell = e.target.parentNode;
    const all_mega_cells = mega_cell.parentNode.children;


    currentClass = isOTurn ? O_CLASS : X_CLASS;
    
    // Verificar si mega_cell está activa y no está definida
    if(mega_cell.classList.contains('active') && !(mega_cell.classList.contains(X_CLASS) || mega_cell.classList.contains(O_CLASS) || mega_cell.classList.contains(DRAW_CLASS)) && !(cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS) || cell.classList.contains(DRAW_CLASS)) ){
        printClass(cell,currentClass)

            // Verificar si hay victoria o empate en chiquita
    if(checkWin(mega_cell.children)){
        printClass(mega_cell,currentClass);
    }else if(checkIsFull(mega_cell)){
        printClass(mega_cell,DRAW_CLASS)
    }else{
        swapTurns()
        updateTable()
    }
    // Verificar si hay victoria en grande
    if(checkWin(all_mega_cells)){
        alert(currentClass);
        tiny_boards.forEach(board => board.classList.remove('active'));
    }else{
        let posTiny = getIndex(cell,mega_cell);
    // para activar la celda grande según la posición
        tiny_boards.forEach(board => board.classList.remove('active'));
        setTimeout(()=>{

        if(tiny_boards[posTiny].classList.contains(X_CLASS) ||tiny_boards[posTiny].classList.contains(O_CLASS) ||tiny_boards[posTiny].classList.contains(DRAW_CLASS)){
            tiny_boards.forEach(board => board.classList.add('active'));
            tiny_boards.forEach(board => {
                if(board.classList.contains(X_CLASS) || board.classList.contains(O_CLASS) || board.classList.contains(DRAW_CLASS)){
    
                    board.classList.remove('active');
                }
            })
        }else{
            tiny_boards[posTiny].classList.add('active')
        }
    },0)

    // En caso que de que no, verificar si está lleno
    // En caso de que eso suceda, contar los X y O
    }
    
    // Obtener posicion de celda chiquita 
    

    }


        

}

function startGame() {
    isOTurn = false;
    updateTable()
    cells.forEach(cell=>{
        cell.addEventListener('click',handleClick)
    })

    tiny_boards.forEach(tiny_board => {
        tiny_board.classList.add('active')
    })
}

function printClass(cell,symbol) {
    cell.classList.add(symbol)
}

function swapTurns() {
    isOTurn = !isOTurn;
}

function checkWin(cellsArray) {
    return Winning_Combinations.some( combination => {
        return combination.every( i => {
            return cellsArray[i].classList.contains(currentClass)
        })
    })
}

function updateTable() {
    mega_board.classList.remove(X_CLASS)
    mega_board.classList.remove(O_CLASS)
    mega_board.classList.add(isOTurn ? O_CLASS : X_CLASS)
}


function restart() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
    })

    message_container.classList.remove('active');
    message.innerHTML = '';
    symbol.classList.remove(X_CLASS);
    symbol.classList.remove(O_CLASS);

    board.classList.remove('ended');

    startGame();

}

function winEvent() {
    cells.forEach(cell=>cell.removeEventListener('click',handleClick))
    board.classList.add('ended');

    message_container.classList.add('active');
    message.innerHTML = "'s won";
    symbol.classList.add(currentClass);

}

function drawEvent() {
    message_container.classList.add('active');
    message.innerHTML = "Draw!";
}

function getIndex(child,parent) {
    return Object.values(parent.children).indexOf(child)
}

function checkIsFull(parent) {
    return Object.values(parent.children).every(cell => 
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS) || cell.classList.contains(DRAW_CLASS)
    )
}