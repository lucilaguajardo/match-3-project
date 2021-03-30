// document.addEventListener('DOMContentLoaded', () => {
//     const grid = document.querySelector('#grid');
//     let items = ["../assets/img/blanca.png", "../assets/img/naranja.png", "../assets/img/verde.png", "../assets/img/violeta.png"];
//     let lv;
// })


    // const grid = document.querySelector('#grid');


    const items = [
        "url(assets/img/blanca.png)",
        "url(assets/img/naranja.png)",
        "url(assets/img/verde.png)",
        "url(assets/img/violeta.png)"
    ];

    let duracionPartida = 30

    
    // Game
    const grid = document.querySelector('#grid')
    const squares = []

    let gridSize = 8


    let secondsLeft = 0
    let score = 0
    let combosModifier = 1
    let move = true
    let timer = null
    let initialized = false

    // DOM

    const actualPoints = () => {
        $('#points').innerHTML = points
    }
      
    const increaseCombo = () => {
        comboModifier++
        $('#combo').innerHTML = comboModifier
    }
      
    const restartCombo = () => {
        comboModifier = 1
        $('#combo').innerHTML = comboModifier
    }
      
    const actualTimeLeft = () => {
        const timeLeft = $('.time-left');
        tiempoRestante.innerHTML = secondsToMinutes(secondsLeft)
    }

// Create board

    function createBoard() {
    for (let i = 0; i < gridSize*gridSize; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomItem = Math.floor(Math.random() * items.length)
        square.style.backgroundImage = items[randomItem]
        grid.appendChild(square)
        squares.push(square)
        }
    }
    createBoard()

// Drag and drop items

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('drageleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    let itemBeingDragged
    
function dragStart(){
    itemBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    this.style.backgroundImage = ''
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundImage = ''
}

function dragDrop() {
    itemBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = itemBeingReplaced
}

// Checking valid moves

function dragEnd() {
    let validMoves = [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width,
        squareIdBeingDragged +1,
        squareIdBeingDragged +width]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = itemBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = itemBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = itemBeingDragged
}




// MODALS

let callModal = true;

// Welcome modal

const welcome = () => {
    // stopTimer()
    swal({
        title: 'Bienvenida',
        text: `En MatcheADAs tu objetivo es juntar tres o más figuras del mismo tipo, ya sea en fila o columna. Para eso, seleccioná una figura y a continuación una figura adyacente para intercambiarlas de lugar.

        Si se forma un grupo, esas figuras se eliminarán y ganarás puntos.
        ¡Seguí armando grupos de 3 o más antes de que se acabe el tiempo!

        Controles
        Click izquierdo: selección
        Enter o Espaciado: selección
        Flechas o WASD: movimiento e intercambio
        `,
        button: 'A jugar',

        closeOnClickOutside: false,
        closeOnEsc: false,
    })
    .then((X) => {
    if (callModal) {
        selectLevel();
      return callModal = false;
    } else if (!callModal){
     timer()
    }
});
};

window.onload = welcome();

// Select difficulty modal

const selectLevel = () => {
    swal({
    title: 'Nuevo juego',
    text: 'Seleccioná una dificultad',
    buttons: {
        facil: {
            text: 'Fácil',
            value: 'easy',
        },
        normal: {
            text: 'Normal',
            value: 'normal',
        },
        dificil: {
            text: 'Difícil',
            value: 'hard',
        },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
    })
    .then((value) => {
        switch (value) {

            case 'easy':
                gridSize = 9;
                createBoard(gridSize);
                break;

           case 'normal':
            gridSize = 8;
                createBoard(gridSize);
                break;

            case 'hard':
                gridSize = 7;
                createBoard(gridSize);
                break;
        }
        createBoard(gridSize)
    })
}

// Game over modal

const gameOver = () => {
    swal({
        title: '¡Juego terminado!',
        text: `Puntaje final: 0`,
        buttons: {
            juegoNuevo: {
                text: 'Nuevo juego',
                value: 'newgame'
            },
            reestablecer:{
                text:'Reiniciar',
                value: 'restartgame'
            }
        }
    })
    .then((value) => {
    switch (value) {
        case 'nuevoJuego':
            selectLevel();
        break;
        case 'reiniciar':
            createBoard(level);
        break;
    }});
    stopTimer();
};

// Restart game modal

const restartGame = () => {
    stopTimer()
    swal({
        title: '¿Estás segura de que deseas reiniciar?',
        text: `Perderás todo tu puntaje acumulado`,
        buttons: {
            newGame: {
                text: 'Nuevo Juego',
                value: 'nuevoJuego'
            },
                cancel: "Cancel",

        },
    })
    .then((value) => {
    switch (value) {
        case 'newGame':
        selectLevel();
    break;
        case null:
        timer()
    break;
        }
    })
}


