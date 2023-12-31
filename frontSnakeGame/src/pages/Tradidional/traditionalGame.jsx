import React, {useEffect, useState} from 'react';
import {
  randomIntFromInterval,
  reverseLinkedList,
  useInterval,
} from '../../../../server/public/ut';

import './traditional.css';

// Clase para crear nodos de la lista enlazada
class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
//* Clase para crear la lista enlazada
class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}
// Direccion de la serpiente
const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

const BOARD_SIZE = 15;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;

// Obtiene el valor inicial de la serpiente
const getStartingSnakeLLValue = board => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};
import { useLocation } from 'react-router-dom';

// Componente que contiene el juego de la serpiente
const TraditionalGame = () => {
  const location = useLocation();
  const { selectedColor, idSala, selectedValue, selectedValue2,tiempo } = location.state;
  //console.log('Color seleccionado:', selectedColor);
  //console.log('Id de la sala:', idSala);
  //console.log('Tematica de juego:', selectedValue);
  //console.log('Tipo de juego:', selectedValue2);


  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board)),
  );
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell]),
  );
  // El valor inicial de foodCell es el valor de la celda de la cabeza de la serpiente más 5.
  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [foodShouldReverseDirection, setFoodShouldReverseDirection] = useState(
    false,
  );
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    
    window.addEventListener('keydown', e => {
      handleKeydown(e);
    });

    const intervalID = setInterval(() => {
      
      console.log(tiempo);
      setSeconds(prevSeconds => {
        console.log(`Seconds: ${prevSeconds}`);
        if (prevSeconds -1 === tiempo - 1) {
          console.log('Game over!');
          alert(
            'Game over! Se va a registrar su puntuación. Para iniciar otro juego, acepte.'
          );
          window.location.reload();
        }
        return prevSeconds + 1;
      });
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalID);

  }, [seconds]);

  // intervalo para mover la serpiente cada 150 milisegundos
  useInterval(() => {
    moveSnake();
  }, 150);

  const handleKeydown = e => {
    const newDirection = getDirectionFromKey(e.key);
    const isValidDirection = newDirection !== '';
    if (!isValidDirection) return;
    const snakeWillRunIntoItself =
      getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
    if (snakeWillRunIntoItself) return;
    setDirection(newDirection);
  };

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      console.log('Game over!');
      handleGameOver();
      return;
    }
    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      console.log('Game over!');
      handleGameOver();
      return;
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.tail = snake.tail.next;
    if (snake.tail === null) snake.tail = snake.head;

    const foodConsumed = nextHeadCell === foodCell;
    if (foodConsumed) {
      // aqui se crece la serpiente
      growSnake(newSnakeCells);
      if (foodShouldReverseDirection) reverseSnake();
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

  // aqui se crece la serpiente
  const growSnake = newSnakeCells => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
    if (isOutOfBounds(growthNodeCoords, board)) {
      return;
    }
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });
    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;

    newSnakeCells.add(newTailCell);
  };

  const reverseSnake = () => {
    const tailNextNodeDirection = getNextNodeDirection(snake.tail, direction);
    const newDirection = getOppositeDirection(tailNextNodeDirection);
    setDirection(newDirection);

    reverseLinkedList(snake.tail);
    const snakeHead = snake.head;
    snake.head = snake.tail;
    snake.tail = snakeHead;
  };
  // Constante que se encarga de manejar la comida
  // E: la nueva celda de la serpiente
  // S: la nueva celda de la comida
  // restricciones: la celda de la comida no puede estar en la serpiente
  const handleFoodConsumption = newSnakeCells => {
    
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
        continue;
      break;
    }

    const nextFoodShouldReverseDirection =
      Math.random() < PROBABILITY_OF_DIRECTION_REVERSAL_FOOD;

    setFoodCell(nextFoodCell);
    setFoodShouldReverseDirection(nextFoodShouldReverseDirection);
    setScore(score + 1);
  };

  // Constante que se encarga de manejar el fin del juego
  // R: el juego termina cuando la serpiente se come a si misma o se sale del tablero
  const handleGameOver = () => {
    setScore(0);
    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);
    setSnakeCells(new Set([snakeLLStartingValue.cell]));
    setDirection(Direction.RIGHT);
    //console.log('Game over!');
    alert('Game over! Se va a registrar su puntuación, para iniciar otro juego de aceptar');
    window.location.reload();
  };

  return (
    <>
      <div className='scorev'><h1>Score: {score}</h1></div> 
      <div className='rooms'>
        <h1>Sala: {idSala}</h1>
      </div>
      <div className="clock">
          <p>{`Seconds: ${seconds}`}</p>
      </div>
      <div className='containerBoard'>
        <div className="board">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cellValue, cellIdx) => {
                const className = getCellClassName(
                  cellValue,
                  foodCell,
                  foodShouldReverseDirection,
                  snakeCells,
                );
                return <div key={cellIdx} className={className}></div>;
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
// Constante que se encarga de crear el tablero
// E: el tamaño del tablero
// S: el tablero
// R: el tamaño del tablero debe ser mayor a 0
const createBoard = BOARD_SIZE => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};
// Constante que se encarga de configurar el tablero
// E: el tablero y el juego
// S: el tablero configurado
// R: el tablero debe ser mayor a 0
const getCoordsInDirection = (coords, direction) => {
  if (direction === Direction.UP) {
    return {
      row: coords.row - 1,
      col: coords.col,
    };
  }
  if (direction === Direction.RIGHT) {
    return {
      row: coords.row,
      col: coords.col + 1,
    };
  }
  if (direction === Direction.DOWN) {
    return {
      row: coords.row + 1,
      col: coords.col,
    };
  }
  if (direction === Direction.LEFT) {
    return {
      row: coords.row,
      col: coords.col - 1,
    };
  }
};
// Constante que se encarga de verificar si la serpiente se sale del tablero
// E: las coordenadas de la serpiente y el tablero
// S: true si se sale del tablero, false si no
// R: las coordenadas deben ser mayores a 0
const isOutOfBounds = (coords, board) => {
  const {row, col} = coords;
  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;
  return false;
};
// Constante que se encarga de obtener la direccion de la serpiente
// E: la tecla presionada
// S: la direccion de la serpiente
// R: la tecla presionada debe ser valida
const getDirectionFromKey = key => {
  if (key === 'ArrowUp') return Direction.UP;
  if (key === 'ArrowRight') return Direction.RIGHT;
  if (key === 'ArrowDown') return Direction.DOWN;
  if (key === 'ArrowLeft') return Direction.LEFT;
  return '';
};
// Constante que se encarga de obtener la direccion del siguiente nodo
// E: el nodo y la direccion actual
// S: la direccion del siguiente nodo
// R: la direccion actual debe ser valida
const getNextNodeDirection = (node, currentDirection) => {
  if (node.next === null) return currentDirection;
  const {row: currentRow, col: currentCol} = node.value;
  const {row: nextRow, col: nextCol} = node.next.value;
  if (nextRow === currentRow && nextCol === currentCol + 1) {
    return Direction.RIGHT;
  }
  if (nextRow === currentRow && nextCol === currentCol - 1) {
    return Direction.LEFT;
  }
  if (nextCol === currentCol && nextRow === currentRow + 1) {
    return Direction.DOWN;
  }
  if (nextCol === currentCol && nextRow === currentRow - 1) {
    return Direction.UP;
  }
  return '';
};
// Constante que se encarga de obtener las coordenadas del nodo de crecimiento
// E: la cola de la serpiente y la direccion actual
// S: las coordenadas del nodo de crecimiento
// R: la direccion actual debe ser valida
const getGrowthNodeCoords = (snakeTail, currentDirection) => {
  const tailNextNodeDirection = getNextNodeDirection(
    snakeTail,
    currentDirection,
  );
  const growthDirection = getOppositeDirection(tailNextNodeDirection);
  const currentTailCoords = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  };
  const growthNodeCoords = getCoordsInDirection(
    currentTailCoords,
    growthDirection,
  );
  return growthNodeCoords;
};
// Constante que se encarga de obtener la direccion opuesta
// E: la direccion actual
// S: la direccion opuesta
const getOppositeDirection = direction => {
  if (direction === Direction.UP) return Direction.DOWN;
  if (direction === Direction.RIGHT) return Direction.LEFT;
  if (direction === Direction.DOWN) return Direction.UP;
  if (direction === Direction.LEFT) return Direction.RIGHT;
};
// Constante que se encarga de obtener la clase de la celda
// E: el valor de la celda, la celda de la comida, la direccion de la comida y las celdas de la serpiente
// S: la clase de la celda
// R: el valor de la celda debe ser valido
const getCellClassName = (
  cellValue,
  foodCell,
  foodShouldReverseDirection,
  snakeCells,
) => {
  let className = 'cell';
  if (cellValue === foodCell) {
    if (foodShouldReverseDirection) {
      className = 'cell cell-purple';
    } else {
      className = 'cell cell-red';
    }
  }
  const location = useLocation();
  const { selectedColor} = location.state;
  const color = selectedColor ;
  if (snakeCells.has(cellValue)) {

    if (color === "#ff0000") {  //Colores que se le aceptan al usuario para poder cambiar el color 
      className = 'cell cell-green';
    } 
    if (color === "#0000ff") {
      className = 'cell cell-blue';
    }
    if (color === "#ffff00") {
      className = 'cell cell-yellow';
    }
    if (color === "#008000") {
      className = 'cell cell-green';
    }
    if (color === "#a349a4") {
      className = 'cell cell-purple';
    }
    if (color === "#ffa500") {
      className = 'cell cell-orange';
    }
    if (color === "#000000") {
      className = 'cell cell-black';
    }

  }
  

  return className;
};

export default TraditionalGame;
