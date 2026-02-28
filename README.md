Visualizador de Algoritmos de Pathfinding

Este pequeño sistema, visualiza el comportamiento de cuatro algoritmos clasicos de busqueda en inteligencia artificial, BFS, DFS, Dijkstra y A*.El sistema permite diseñar escenarios con paredes que actuan como obstaculos y observar en tiempo real cómo cada algoritmo encuentra la ruta más corta entre dos puntos.

Implementacion
-JavaScript : Para la logica de los algoritmos y la manipulacion del estado del board.
-p5.js: Libreria utilizada para el renderizado del lienzo (canvas) y la interaccion visual en tiempo real. Uso de draw() como bucle de control  para la visualización paso a paso.
-HTML/CSS: Para la estructura de la pagina y el panel de control lateral.
-Estructura de Datos Base: Una matriz bidimensional donde cada nodo es una instancia de la clase Celda, almacenando estados, costos (g,h,f).

Como funciona?

El visualizador consiste en un board interactivo de nodos con diferentes estados representados por colores:
-Inicio (Azul): Punto de partida del algoritmo.
-Fin (Purpura): Objetivo a alcanzar.
-Pared (Negro): Obstaculos que el algoritmo debe rodear.
-Abierto (Verde): Nodos en la frontera de busqueda (por visitar).
-Cerrado (Rojo): Nodos ya evaluados por el algoritmo.
-Camino (Amarillo): La ruta optima final encontrada.

Funcionamiento de los Algoritmos

1. BFS (Breadth-First Search)
    -Estructura: Cola (FIFO).
    -Implementación: Se utiliza Array.shift() para extraer el primer elemento descubierto y explorar a los vecinos de manera inmediata.
2. DFS (Depth-First Search)
    -Estructura: Pila (LIFO).
    -Implementación: Se utiliza Array.pop() para procesar siempre el ultimo nodo añadido a la lista de exploracion.
3. Dijkstra
    -Estructura: Cola de Prioridad.
    -Implementación: En cada iteracion de draw(), el código busca en la lista el nodo con el valor distancia más bajo antes de procesarlo.
4. A*
    -Estructura: Cola de Prioridad basada en Funcion de evaluacion.
    -Heuristica: Se implementó la Distancia Manhattan (∣x1​−x2​∣+∣y1​−y2​∣), ideal para movimientos restringidos a 4 direcciones.
    -Implementacion: El algoritmo prioriza nodos con el valor f más bajo, lo que genera una busqueda dirigida que reduce drasticamente el espacio de búsqueda comparado con Dijkstra.

Funciones y su implementacion
-setup(): Es el punto de entrada donde se inicializa la matriz grid y se calculan las dimensiones de las celdas. También es donde se ejecuta el proceso de deteccion de vecinos mediante el metodo addNeighbors().

-draw(): Funciona como el bucle principal del algoritmo. En lugar de usar un ciclo while que bloquearía la interfaz, draw() ejecuta una iteracion del algoritmo por fotograma, permitiendo la visualizacion en tiempo real de los nodos abiertos y cerrados.

-keyPressed(): Actua como el controlador de estados y disparador. Aqui es donde se reinician las variables de costo (g,h,f) y se decide que logica de extraccion (shift, pop o búsqueda de menor costo) se aplicara en el siguiente ciclo de draw().

-heuristica(a, b): Una funcion que calcula la distancia Manhattan. Es invocada exclusivamente por el algoritmo A∗ dentro de la logica de evaluacion de vecinos en cada paso.

-Celda.addNeighbors(grid): Metodo encargado de la generacion de una lista de adyacencia. Limita el movimiento a 4 direcciones, asegurando que el algoritmo no intente acceder a índices fuera de los limites de la matriz.

-Celda.mostrar(): Encargada del renderizado condicional. Utiliza un switch basado en el estado de la celda para pintar los colores correspondientes (Inicio, Fin, Pared, Camino, etc.).

Instrucciones de uso:
1. Dibujar: Usa el mouse para pintar paredes en el tablero.
2. Configurar: Presiona "I" para colocar el inicio y "F" para el destino.
3. Ejecutar: Presiona la tecla del algoritmo que quieras ver ("B" para BFS, "S" para DFS, "D" para Dijkstra o "A" para A*).
4. Reiniciar: Presiona "C" para limpiar el tablero y probar un nuevo diseño.

Analisis Comparativo: A* y BFS

Al correr las pruebas en el mismo laberinto, se nota que A* es mucho más eficiente porque visita menos nodos (cuadros rojos) que BFS. Esto pasa porque BFS es una búsqueda "no informada" que revisa todo a su alrededor por igual. En cambio, A* usa una heurística (Distancia Manhattan) que le sirve como guía para saber hacia dónde está el objetivo. Básicamente, A* no pierde el tiempo explorando zonas que lo alejan de la meta, mientras que BFS sí lo hace.



