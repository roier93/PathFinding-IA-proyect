# Visualizador de Algoritmos de Pathfinding

Este pequeño sistema, visualiza el comportamiento de cuatro algoritmos clasicos de busqueda en inteligencia artificial, BFS, DFS, Dijkstra y A*.El sistema permite diseñar escenarios con paredes que actuan como obstaculos y observar en tiempo real cómo cada algoritmo encuentra la ruta más corta entre dos puntos.

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

## ALGORITMO BFS:
<img width="901" height="592" alt="imagen" src="https://github.com/user-attachments/assets/cbc35b71-6a0e-4057-b5c8-9958dfa75e29" />

## ALGORITMO DFS:
<img width="887" height="648" alt="imagen" src="https://github.com/user-attachments/assets/73dd8898-c89f-471e-89a3-50559ebbee65" />

## Algoritmo Dijkstra:
<img width="922" height="638" alt="imagen" src="https://github.com/user-attachments/assets/cd183f97-7146-44f9-816e-94e0ef5b7189" />

## Algoritmo A*:
<img width="902" height="619" alt="imagen" src="https://github.com/user-attachments/assets/12baa8dc-c743-466d-aa83-0cb2056acf24" />



