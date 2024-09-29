const form = document.getElementById('nota-form');
const listaNotas = document.getElementById('lista-notas');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputNota = document.getElementById('nota-input');
    const nuevaNota = inputNota.value;

    // Agregar la nueva nota al servidor
    await fetch('/notas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nota: nuevaNota })
    });

    // Limpiar el input
    inputNota.value = '';

    // Actualizar la lista de notas
    cargarNotas();
});

async function cargarNotas() {
    const respuesta = await fetch('/notas');
    const notas = await respuesta.json();
    listaNotas.innerHTML = '';

    notas.forEach((nota, index) => {
        const li = document.createElement('li');
        li.textContent = nota;

        // Botón para eliminar la nota
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', async () => {
            await fetch(`/notas/${index}`, {
                method: 'DELETE'
            });
            cargarNotas();
        });

        li.appendChild(btnEliminar);
        listaNotas.appendChild(li);
    });
}

// Cargar notas al iniciar la aplicación
cargarNotas();
