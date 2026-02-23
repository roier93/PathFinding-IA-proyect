let columnas = 10;
let filas = 10;
let anchoCelda, altoCelda;
let grid = [];

// Variables para controlar el inicio y fin
let nodoInicio = null;
let nodoFin = null;
let pincelActual = "PARED"; 

//Variables para el algoritmo BFS
let queue = []; // Cola FIFO para BFS 
let algoritmoCorriendo = false;
let camino = [];

// Diccionario de estados y colores 
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
        this.padre = null; 
    }

    mostrar() {
        if (this === nodoInicio) {
            fill(0, 0, 255); // Azul para el inicio
        } else if (this === nodoFin) {
            fill(128, 0, 128); // Púrpura para el fin
        }else
            switch(this.estado) {
                case ESTADOS.VACIO: fill(255); break;
                case ESTADOS.PARED: fill(0); break; // Negro 
                case ESTADOS.ABIERTO: fill(0, 255, 0); break; // Verde 
                case ESTADOS.CERRADO: fill(255, 0, 0); break; // Rojo 
                case ESTADOS.CAMINO: fill(255, 255, 0); break; // Amarillo 
            }
        stroke(200);
        rect(this.i * anchoCelda, this.j * altoCelda, anchoCelda, altoCelda);
    }

    addNeighbors(grid) {
        let i = this.i;
        let j = this.j;
        
        // Derecha
        if (i < columnas - 1) this.vecinos.push(grid[i + 1][j]);
        // Izquierda
        if (i > 0) this.vecinos.push(grid[i - 1][j]);
        // Abajo
        if (j < filas - 1) this.vecinos.push(grid[i][j + 1]);
        // Arriba
        if (j > 0) this.vecinos.push(grid[i][j - 1]);
    }
}

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent('lienzo-container'); 

    anchoCelda = width / columnas;
    altoCelda = height / filas;

    //Inicializar la cuadrícula 
    for (let i = 0; i < columnas; i++) {
        grid[i] = [];
        for (let j = 0; j < filas; j++) {
            grid[i][j] = new Celda(i, j);
        }
    }

    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
}

function draw() {
    background(255);

    // LÓGICA DEL ALGORITMO PASO A PASO
    if (algoritmoCorriendo) {
        if (queue.length > 0) {
            let actual = queue.shift(); 

            if (actual === nodoFin) {
                algoritmoCorriendo = false;
                console.log("¡Camino encontrado!");
                
                let temp = actual;
                camino = [];
                while (temp.padre) {
                    camino.push(temp.padre);
                    temp = temp.padre;
                }
                // Pintar el camino de Amarillo 
                for (let i = 0; i < camino.length; i++) {
                    if (camino[i] !== nodoInicio) camino[i].estado = ESTADOS.CAMINO;
                }
            } else {
                // Marcar nodo evaluado como CERRADO (Rojo)
                if (actual !== nodoInicio) {
                    actual.estado = ESTADOS.CERRADO; 
                }

                // Revisar a los vecinos
                for (let i = 0; i < actual.vecinos.length; i++) {
                    let vecino = actual.vecinos[i];
                    
                    // Si el vecino es válido (no es pared, ni está cerrado, ni abierto)
                    if (vecino.estado !== ESTADOS.PARED && 
                        vecino.estado !== ESTADOS.CERRADO && 
                        vecino.estado !== ESTADOS.ABIERTO && 
                        vecino !== nodoInicio) {
                        
                        vecino.estado = ESTADOS.ABIERTO; // Nodos por visitar (Verde) 
                        vecino.padre = actual;
                        queue.push(vecino); 
                    }
                }
            }
        } else {
            // La cola se vació y no llegamos al final 
            console.log("No hay solución");
            algoritmoCorriendo = false;
        }
    }

    // Dibujar todas las celdas actualizadas en la pantalla
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

// Controles del teclado
function keyPressed() {
    if (key === 'p' || key === 'P') pincelActual = "PARED";
    if (key === 'i' || key === 'I') pincelActual = "INICIO";
    if (key === 'f' || key === 'F') pincelActual = "FIN";
    if (key === 'v' || key === 'V') pincelActual = "BORRAR"; 
    
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

    if ((key === 'b' || key === 'B') && nodoInicio && nodoFin ) {
        queue = [];
        camino = [];
        // Reiniciar estados de las celdas, excepto paredes
        for (let i = 0; i < columnas; i++) {
            for (let j = 0; j < filas; j++) {
                if (grid[i][j].estado === ESTADOS.ABIERTO || 
                    grid[i][j].estado === ESTADOS.CERRADO || 
                    grid[i][j].estado === ESTADOS.CAMINO) {
                    grid[i][j].estado = ESTADOS.VACIO;
                }
                grid[i][j].padre = null;
            }
        }
        // Iniciar BFS
        queue.push(nodoInicio);
        algoritmoCorriendo = true;
    }   
}