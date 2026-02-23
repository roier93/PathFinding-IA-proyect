# Visualizador de Algoritmos de Pathfinding

Este pequeño sistema, visualiza el comportamiento de cuatro algoritmos clásicos de búsqueda en inteligencia artificial, BFS, DFS, Dijkstra y A*.El sistema permite diseñar escenarios con paredes que actuan como obstaculos y observar en tiempo real cómo cada algoritmo encuentra la ruta más corta entre dos puntos.

## Tecnologias Utilizadas
**JavaScript :** Para la logica de los algoritmos y la manipulacion del estado del board.
**p5.js:** Libreria utilizada para el renderizado del lienzo (canvas) y la interaccion visual en tiempo real.
**HTML/CSS:** Para la estructura de la pagina y el panel de control lateral.

## Como funciona
El visualizador consiste en un board interactivo de nodos con diferentes estados representados por colores:
* **Inicio (Azul):** Punto de partida del algoritmo.
* **Fin (Purpura):** Objetivo a alcanzar.
* **Pared (Negro):** Obstaculos que el algoritmo debe rodear.
* **Abierto (Verde):** Nodos en la frontera de busqueda (por visitar).
* **Cerrado (Rojo):** Nodos ya evaluados por el algoritmo.
* **Camino (Amarillo):** La ruta optima final encontrada.

### Instrucciones de uso:
1. **Dibujar:** Usa el mouse para pintar paredes en el tablero.
2. **Configurar:** Presiona **I** para colocar el inicio y **F** para el destino.
3. **Ejecutar:** Presiona la tecla del algoritmo que quieras ver (**B** para BFS, **S** para DFS, **D** para Dijkstra o **A** para A*).
4. **Reiniciar:** Presiona **C** para limpiar el tablero y probar un nuevo diseño.

## Analisis Comparativo: A* y BFS

Al correr las pruebas en el mismo laberinto, se nota que A* es mucho más eficiente porque visita menos nodos (cuadros rojos) que BFS. Esto pasa porque BFS es una búsqueda "no informada" que revisa todo a su alrededor por igual. En cambio, A* usa una heurística (Distancia Manhattan) que le sirve como guía para saber hacia dónde está el objetivo. Básicamente, A* no pierde el tiempo explorando zonas que lo alejan de la meta, mientras que BFS sí lo hace.


