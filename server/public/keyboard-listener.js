// Sirve para escuchar los eventos de teclado y notificar a los observadores
// Aqui van las funciones encargadas de configuracion del teclado para poder jugar en el navegador
export default function createInputListener(document) {
  const state = {
    observers: [],
    playerId: null,
  };

  function registerPlayerId(playerId) {
    state.playerId = playerId;
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function unsubscribeAll(observerFunction) {
    state.observers = [];
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchend", handleTouchEnd);

  let touchStartY;
  let touchStartX;

  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
  }
  
  function handleTouchEnd(event) {
    const touchEndY = event.changedTouches[0].clientY;
    const touchEndX = event.changedTouches[0].clientX;

    const swipeDistanceY = touchEndY - touchStartY;
    const swipeDistanceX = touchEndX - touchStartX;

    if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
      if (swipeDistanceY < 0) {
        handleKeydown("ArrowUp")
      } else {
        handleKeydown("ArrowDown")
      }
    } else {
      if (swipeDistanceX < 0) {
        handleKeydown("ArrowLeft")
      } else {
        handleKeydown("ArrowRight")
      }
    }
  }

  function createMoveCommand(keyPressed) {
    return {
      type: "move-player",
      playerId: state.playerId,
      keyPressed,
    };
  }

  function handleKeydown(event) {
    const keyPressed = typeof event === "string" ? event : event.key;

    const command = createMoveCommand(keyPressed);

    notifyAll(command);
    
  }

  return {
    subscribe,
    unsubscribeAll,
    registerPlayerId,
  };
}
