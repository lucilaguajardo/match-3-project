let callModal = true;

const bienvenida = () => {
    // stopTimer()
    swal({
        title: '¡Welcome!',
        text: `En MatcheADAs tu objetivo es juntar tres o más figuras del mismo tipo, ya sea en fila o columna. Para eso, selecciona una figura y a continuación una figura adyacente para intercambiarlas de lugar.

        Si se forma un grupo, esas figuras se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!

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
        seleccionNivel();
      return callModal = false;
    } else if (!callModal){
     timer()
    }
});
};

window.onload = bienvenida();

const seleccionNivel = () => {
    swal ({
    title:'Nuevo juego !',
    text: 'Selecciona una dificultad',
    buttons: {
        facil: {
            text: 'Facil',
            value: 'facil',
        },
        normal: {
            text: 'Normal',
            value: 'normal',
        },
        dificil: {
            text: 'Dificil',
            value: 'dificil',
        },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
})
.then(
    (value)=>{
        switch (value) {
            case 'facil':
                level = 9;
                break;

           case 'normal':
               level = 8;
               break;

          case 'dificil':
              level = 7;
              break;
              default:
        }
        crearTablero(level)
    })
  }

const gameOver = () => {
    swal({
        title: '¡Juego Terminado!',
        text: `Puntaje Final: 0`,
        buttons: {
            juegoNuevo: {
                text: 'Nuevo Juego',
                value: 'nuevoJuego'
            },
            reestablecer:{
                text:'Reiniciar',
                value: 'reiniciar'
            }
        },

    })
.then((value) => {
    switch (value) {
        case 'nuevoJuego':
            seleccionNivel();
        break;
        case 'reiniciar':
            crearTablero(level);
        break;
    }
});
    stopTimer();
};

const reiniciarJuego = () =>{
    stopTimer()
    swal({
        title: '¿Esta seguro de que desea reiniciar?',
        text: `Perderas todo tu puntaje acumulado`,
        buttons: {
            juegoNuevo: {
                text: 'Nuevo Juego',
                value: 'nuevoJuego'
            },
                cancel: "Cancelar",

        },
    })
.then((value) =>{
    switch (value) {
        case 'nuevoJuego':
        seleccionNivel();
    break;
        case null:
        timer()
    break;
        }
    })
}

