/**
 * 2C = Two of Clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales =['A','J','Q','K'];

let puntosJugador = 0;

let puntosComputadora = 0;

//Referencias html

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
const puntosJuego = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


// Crea el deck de cartas
const crearDeck = () => {
    for (let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push(i+tipo);
        };
    }
    for (let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial+tipo);
        };
    };
    deck = _.shuffle(deck);
    return deck;
};

crearDeck();

//Funcion para tomar una carta

const pedirCarta = () =>{
    if(deck.length ===0){
        throw 'No hay cartas en el deck';

    };
    const carta = deck.pop();
    return carta ;
};

 const valorCarta = (carta) =>{
    const valor = carta.substring(0,carta.length-1);
    return  (!isNaN(valor)) ? valor *1 : (valor === 'A') ? 11 : 10;    
 }
 //turno computadora

 const turnoComputadora= (puntosMinimos) =>{

    do{
        const carta =pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosJuego[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            
            break;

        };


    }while((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
    
    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            alert('Nadie Gana :(');

        }else if(puntosMinimos > 21){
            alert('Computadora Gana');

        }else if ( puntosComputadora >21){
            alert('Ganaste')
    
        }else{
            alert('Computadora gana')
        }

    }, 15);

 };



//eventos

btnPedir.addEventListener('click',() =>{

    const carta =pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosJuego[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn("El jugador perdio");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }else if (puntosJugador === 21){
        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    };

});

btnDetener.addEventListener('click',() =>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

});


btnNuevoJuego.addEventListener('click',() =>{

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck =[];
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    puntosJuego[0].innerText = puntosJugador;
    puntosJuego[1].innerText = puntosComputadora;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';


});








