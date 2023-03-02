// queRy selectors
const titulo = document.querySelector('.titulo');
const descripcion = document.querySelector('.descripcion');
const boton = document.querySelector('#enviar');
const formularioDiv = document.querySelector('.formulario');
const formulario = document.querySelector('.formulario1');
const ulTodo = document.querySelector('.contenido-todo');


let listaTodo = [];

// Events listeners
titulo.addEventListener('input', validar);
descripcion.addEventListener('input', validar);
formulario.addEventListener('submit', agregarTodo);

// Funciones
function validar(e) {
    
    if (e.target.value.trim() === "") {
        const tipo = 'error'
        const mensaje = 'Ningun campo puede estar vacio'
        boton.classList.add('desactivado')
        boton.classList.remove('activado')
        boton.disabled = true;
        mostrarMensaje(mensaje, tipo);
        return
    }

    if (titulo.value != "" && descripcion.value != "") {
        boton.classList.remove('desactivado');
        boton.classList.add('activado');
        boton.disabled = false;
    }

}

function mostrarMensaje(mensaje, tipo) {
    const div = document.createElement('div')
    div.classList.add('alerta')
    div.textContent = mensaje;
    
    if ( tipo === "error" ) {
        div.classList.add('error')
    }
    formulario.appendChild(div);

    setTimeout(() => {
        div.remove()
    }, 3000);
}

function agregarTodo(e) {
    e.preventDefault()


    const todo = {
        tarea: e.target[0].value,
        descripcion: e.target[1].value,
        id: Date.now(),
    }

    listaTodo = [...listaTodo, todo];

    mostrarTodo(listaTodo);
    formulario.reset();
}

function mostrarTodo(lista){

    limpiarHTML();

    lista.forEach( todo => {
        const {tarea, descripcion, id} = todo;
        const li = document.createElement('li');
        li.classList.add('elementoLista')

        const h1 = document.createElement('h1');
        h1.classList.add('titulo');
        h1.innerHTML = `
            ${tarea}
        `;

        const p1 = document.createElement('p1');
        p1.classList.add('parrafo');
        p1.innerHTML = `
            ${descripcion}
        `;


        const btn = document.createElement('button');
        btn.classList.add('btnBorrar');
        btn.textContent = 'Eliminar';
        btn.onclick = () => borrarTarea(id);


        li.appendChild(h1);
        li.appendChild(p1);
        li.appendChild(btn);

        ulTodo.appendChild(li);
    });
}    

function borrarTarea(id) {
    listaTodo = listaTodo.filter( todo => todo.id != id );
    mostrarTodo(listaTodo);
}

function limpiarHTML() {
    while(ulTodo.firstChild) {
        ulTodo.removeChild(ulTodo.firstChild);
    }
}
