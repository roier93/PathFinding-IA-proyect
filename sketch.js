// Variables globales
let columnas = 10;
let filas = 10;
let anchoCelda, altoCelda;
let grid = [];

// Variables para controlar el inicio y fin
let nodoInicio = null;
let nodoFin = null;
let pincelActual = "PARED"; // Modos: PARED, INICIO, FIN, BORRAR

// Diccionario de estados y colores [cite: 18]
const ESTADOS = {
    VACIO: "Blanco",
    INICIO: "Azul",
    FIN: "Púrpura",
    PARED: "Negro",
    ABIERTO: "Verde",
    CERRADO: "Rojo",
    CAMINO: "Amarillo"
};

class Celda {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.estado = ESTADOS.VACIO; 
        this.vecinos = []; 
    }

    mostrar() {
        switch(this.estado) {
            case ESTADOS.VACIO: fill(255); break;
            case ESTADOS.INICIO: fill(0, 0, 255); break;
            case ESTADOS.FIN: fill(128, 0, 128); break;
            case ESTADOS.PARED: fill(0); break;
            case ESTADOS.ABIERTO: fill(0, 255, 0); break;
            case ESTADOS.CERRADO: fill(255, 0, 0); break;
            case ESTADOS.CAMINO: fill(255, 255, 0); break;
        }
        stroke(200);
        rect(this.i * anchoCelda, this.j * altoCelda, anchoCelda, altoCelda);
    }
}

function setup() {
    createCanvas(1000, 750);
    anchoCelda = width / columnas;
    altoCelda = height / filas;

    for (let i = 0; i < columnas; i++) {
        grid[i] = [];
        for (let j = 0; j < filas; j++) {
            grid[i][j] = new Celda(i, j);
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {
            grid[i][j].mostrar();
        }
    }
}

// Eventos del mouse para dibujar 
function mouseDragged() { dibujarEscenario(); }
function mousePressed() { dibujarEscenario(); }

function dibujarEscenario() {
    let i = floor(mouseX / anchoCelda);
    let j = floor(mouseY / altoCelda);

    if (i >= 0 && i < columnas && j >= 0 && j < filas) {
        let celda = grid[i][j];

        if (pincelActual === "PARED" && celda !== nodoInicio && celda !== nodoFin) {
            celda.estado = ESTADOS.PARED;
        } else if (pincelActual === "BORRAR") {
            if (celda === nodoInicio) nodoInicio = null;
            if (celda === nodoFin) nodoFin = null;
            celda.estado = ESTADOS.VACIO;
        } else if (pincelActual === "INICIO" && celda.estado !== ESTADOS.PARED) {
            if (nodoInicio) nodoInicio.estado = ESTADOS.VACIO; // Quita el inicio anterior
            celda.estado = ESTADOS.INICIO;
            nodoInicio = celda;
        } else if (pincelActual === "FIN" && celda.estado !== ESTADOS.PARED) {
            if (nodoFin) nodoFin.estado = ESTADOS.VACIO; // Quita el fin anterior
            celda.estado = ESTADOS.FIN;
            nodoFin = celda;
        }
    }
}

// Controles del teclado [cite: 32, 37]
function keyPressed() {
    if (key === 'p' || key === 'P') pincelActual = "PARED";
    if (key === 'i' || key === 'I') pincelActual = "INICIO";
    if (key === 'f' || key === 'F') pincelActual = "FIN";
    if (key === 'v' || key === 'V') pincelActual = "BORRAR"; // V de Vacío
    
    // C para reiniciar el tablero 
    if (key === 'c' || key === 'C') {
        for (let i = 0; i < columnas; i++) {
            for (let j = 0; j < filas; j++) {
                grid[i][j].estado = ESTADOS.VACIO;
            }
        }
        nodoInicio = null;
        nodoFin = null;
    }
}