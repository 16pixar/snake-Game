# Snake Game

Este proyecto es una implementación del clásico juego Snake, desarrollado como parte del curso de Lenguajes de Programación en el Tecnológico de Costa Rica. Los autores de este proyecto son Aarón Piñar Mora y Duvan Espinoza.

La interfaz de usuario se crea con React, y el servidor proporciona la lógica del juego y gestiona las solicitudes del cliente.

## Características

- **Cliente React:**
  - Interfaz de usuario interactiva y receptiva.
  - Comunicación con el servidor a través de solicitudes API.

- **Servidor Node.js:**
  - Lógica del juego implementada en el servidor.
  - API simple para la comunicación con el cliente.

## Configuración del Proyecto

1. **Servidor Node.js:**
   - Utiliza Express para crear un servidor.
   - Proporciona una API para enviar mensajes al cliente.

2. **Cliente React:**
   - Creado con Create React App.
   - Se comunica con el servidor a través de la API y `sockets.io` para obtener datos y facilitar la interactividad en tiempo real.

## Ejecución del Proyecto

1. **Iniciar el servidor:**
   ```bash
   npm start
Visita http://localhost:3000 en tu navegador para jugar al Snake.

¡Diviértete jugando y experimentando con el código!
