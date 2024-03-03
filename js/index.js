// Cargar tareas desde el almacenamiento local
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();
    let nombreChef = document.getElementById('nombreChef').value.trim();
    let partida = document.getElementById('partida').value.trim();

    if (nombreChef && partida) {
        localStorage.setItem('nombreChef', nombreChef);
        localStorage.setItem('partida', partida);

        // Mostrar el nombre del chef y la partida en el DOM
        document.getElementById('nombreChef').textContent = nombreChef;
        document.getElementById('partida').textContent = partida;
    }
});


let listaTareas = {
    tareas: tareas
};

// Agregar las tareas al DOM
tareas.forEach(function (tarea, indice) {
    let li = document.createElement('li');
    li.textContent = tarea;
    li.setAttribute('dataIndice', indice);
    document.getElementById('lista').appendChild(li);
});

// Evento para agregar tareas
document.getElementById('formularioTarea').addEventListener('submit', function (event) {
    event.preventDefault();
    let tarea = document.getElementById('tarea').value.trim();

    if (tarea) {
        listaTareas.tareas.push(tarea);
        mostrarTareas();
        document.getElementById('tarea').value = '';

        // Guardar tareas en el almacenamiento local
        localStorage.setItem('tareas', JSON.stringify(listaTareas.tareas));
    }
});

document.getElementById('finalizarCarga').addEventListener('click', function () {
    let fechaHora = new Date();
    localStorage.setItem('fechaHoraCarga', fechaHora);
}); 

// Evento para eliminar tareas
document.getElementById('lista').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        // Obtener el elemento que se desea eliminar
        let tarea = event.target;

        // Obtener el índice del elemento que se desea eliminar
        let indice = listaTareas.tareas.indexOf(tarea.textContent);

        // Eliminar el elemento de la lista
        tarea.remove();

        // Eliminar el elemento del array
        listaTareas.tareas.splice(indice, 1);

        // Guardar tareas en el almacenamiento local
        localStorage.setItem('tareas', JSON.stringify(listaTareas.tareas));
    }
});

// Función para mostrar tareas
function mostrarTareas() {
    let lista = document.getElementById('lista');
    lista.innerHTML = '';

    for (let i = 0; i < listaTareas.tareas.length; i++) {
        let tarea = listaTareas.tareas[i];
        let li = document.createElement('li');
        li.textContent = tarea;
        lista.appendChild(li);
    }
}
