import React from 'react';

const Estadisticas = () => {
  const [lista, setLista] = useState([{ id: 1, nombre: 'Jugador1', puntuacion: 100 },
  { id: 2, nombre: 'Jugador2', puntuacion: 150 },
  { id: 3, nombre: 'Jugador3', puntuacion: 120 },
  // Agrega más elementos según sea necesario
]);

  const guardarListaEnServidor = async () => {
    try {
      const response = await fetch('http://localhost:3000/guardarLista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lista }), // Envía la lista en el cuerpo de la solicitud
      });

      if (response.ok) {
        console.log('Lista guardada con éxito');
      } else {
        console.error('Error al guardar la lista:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      {/* Tu componente aquí */}

      <button onClick={guardarListaEnServidor}>
        Guardar Lista en el Servidor
      </button>
    </div>
  );
};
export default Estadisticas;
