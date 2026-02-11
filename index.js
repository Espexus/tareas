(function (){

    // carga inicial de las tareas

    let listado = [];
    document.addEventListener("DOMContentLoaded", ()=> {
        const espacioTareas = document.getElementById("lista-tareas")
        if (localStorage.getItem("listado") != undefined && JSON.parse(localStorage.getItem("listado")).length != 0) {
            listado = JSON.parse(localStorage.getItem("listado"));
            mostrarTareas(listado, espacioTareas);
            
        } else {
            espacioTareas.textContent = "sin tareas por ahora";
        }

        // borrar

        let btnsborrar = document.querySelectorAll(".boton-borrar");
        btnsborrar.forEach(boton => {
            console.log("hola")
            boton.addEventListener("click", (e)=>{
                const elemento = e.target.parentNode.id;
                borrar(elemento)
        })

        const checks = document.querySelectorAll(".check");
        checks.forEach(check => {
            check.addEventListener("change", (e)=> {
                let elemento = e.target;
                const padre = check.parentNode;
                const padreid = padre.id;

                if(elemento.checked) {
                    listado[padreid].hecho = "checked";
                } else {
                    listado[padreid].hecho = "";
                }

                localStorage.setItem("listado", JSON.stringify(listado));

    
            })
        })
    })

    })

    function mostrarTareas (listado, espacio) {
        listado.forEach(tarea => {
            let contenido = `
            <div class="tarea" id="${listado.indexOf(tarea)}">
                <input type="checkbox" class="check" ${tarea.hecho}>
                <p class="contenido" class="white">${tarea.contenido}</p>
                <button class="boton-borrar">Borrar</button>
            </div>`

            espacio.insertAdjacentHTML("beforeend", contenido);
        })
    }

    // creación de nuevas tareas
    const formularioAgregar = document.getElementById("form-tarea");
    formularioAgregar.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = new FormData(formularioAgregar);
        const tarea = datos.get("tarea");
        if (tarea == "") {
            alert("agrega una tarea válida");
            return;
        }

        listado.push({contenido: tarea, hecho: ""});
        localStorage.setItem("listado",JSON.stringify(listado));
        window.location.reload();
    })

    // borrar 
    function borrar (elemento) {
        listado.splice(elemento, 1);

        localStorage.setItem("listado", JSON.stringify(listado));
        window.location.reload();
    }

    // mostrar o ocultar agregado de tareas 
    const botonNueva = document.getElementById("nueva-tarea");
    const cajaFormulario = document.getElementById("espacio-formulario");
    botonNueva.addEventListener("click", () => {
        cajaFormulario.classList.toggle("oculto");
    })
    
    

})();