let renglones = 0; // conteo de los renglones
let columnas = 0;  //conteo de las columnas
let renglones_id = 0;   //id de cada renglon

head = []; //cabeceras de la tabla

function parseCSV(csvData) {
    const rows = csvData.split("\n");// parte el archivo en un arreglo
    const tableBody = document.querySelector('#csvTable');// se crea un objeto para manipular la tabla
    const thead = document.createElement("thead");//objeto para manipular los titulos


    rows.forEach((row, index) => {

        const columns = row.split(',');// obtiene las columnas de cada renglon
        const tr = document.createElement('tr');
        tr.id = "row" + renglones_id;//asigna un id a cada renglon

        columns.forEach((column, pos) => {

            if (index == 0) { //si es el primer renglon manipula para las cabeceras de la tabla

                const td = document.createElement('td');

                td.id = column; //asigna un id a cada dato de acuerdo a cada columna
                td.textContent = column; // asigna los datos de cada dato

                thead.appendChild(td); // agrega los datos a en renglon de la cabecera

                head[pos] = column; //asigna los nombres de las cabeceras a cada renglon
                tableBody.appendChild(thead); //agrega a la tabla thead
                columnas++; //determina el numero de columnas

            } else { //cuando los renglones sean diferentes de la cabecera
                const td = document.createElement('td');
                const input = document.createElement('input');
                const checkbox = document.createElement("input");

                input.type = "text"; //crea input por cada renglon 
                input.id = `${head[pos]}${renglones_id}`;
                input.value = column;
                input.disabled = true;

                checkbox.type = "checkbox";//crea un check box para mantener seguimiento de lo que se borra
                checkbox.className = "box";
                checkbox.checked = false;
                checkbox.id = renglones_id;
                checkbox.disabled = true;


                td.appendChild(input);
                if (pos === columnas - 1) td.appendChild(checkbox); // solo se agrega el check box al final de las columnas de cada renglon
                tr.appendChild(td);

            }



        });

        tableBody.appendChild(tr);//sube los elemetnos al html
        renglones_id++;//aumenta el id de los renglones
        renglones++;//determina la cantidad de renglones
    });


}




function readCSV(file) { //funcion para leer el archivo y obtenerlo para manipular

    const reader = new FileReader();

    reader.onload = function (e) {

        const csvData = e.target.result;
        parseCSV(csvData);

    }

    reader.readAsText(file);

}


document.querySelector('input[type="file"]').addEventListener('change', function (e) {

    const file = e.target.files[0];

    readCSV(file); // llama a la funcion que obtiene el archivo

    let b_recargar = document.createElement("button"); //crea los elementos que se van a usar al leer el archivo
    let b_mostrar = document.createElement("button");
    let b_leer = document.createElement("button");
    let b_borrar = document.createElement("button");
    let b_agregar = document.createElement("button");
    let salto = document.createElement("br");

    b_recargar.textContent = "Nueva tabla";//asigna las funciones para cada boton
    b_recargar.className = "boton";
    b_recargar.onclick = function () {
        location.reload();
    };

    b_mostrar.textContent = "Modificar";
    b_mostrar.onclick = modificar;
    b_mostrar.className = "boton";

    b_leer.textContent = "Leer";
    b_leer.onclick = leer;
    b_leer.className = "boton";

    b_borrar.textContent = "Borrar";
    b_borrar.onclick = borrar;
    b_borrar.className = "boton";

    b_agregar.textContent = "Agregar";
    b_agregar.onclick = agregar;
    b_agregar.className = "boton";

    const botones = document.getElementById("botones");

    document.body.appendChild(salto);   //sube las funciones al html
    document.getElementById("archivo").disabled = true;
    botones.appendChild(b_recargar);
    botones.appendChild(b_leer);
    botones.appendChild(salto);
    botones.appendChild(b_mostrar);
    botones.appendChild(b_borrar);
    botones.appendChild(b_agregar);

});

function avilitar() {
    this.disabled = false; // Habilita el input al hacer clic
}

function desavilitar() {
    this.disabled = true; // Habilita el input al hacer clic
}

function modificar() {//funcion para modificar los renglones al hacer click
    const tableBody = document.querySelector('#csvTable');
    const inputs = tableBody.querySelectorAll("input");

    inputs.forEach((input) => {

        input.addEventListener("mouseover", avilitar);//habilita los input
        input.addEventListener("mouseout", desavilitar);//deshabilita los input

    });
    /*
        inputs.forEach((input) => {
            input.disabled = false;
        });
    
        */
}

function leer() {//funcion para unicamente permitir la lectura de la tabla sin modificar las cosas
    const tableBody = document.querySelector('#csvTable');
    const inputs = tableBody.querySelectorAll("input");

    inputs.forEach((input) => {         //quita las funciones de habilitar y deshabilitar los inputs
        input.removeEventListener("mouseover", avilitar);
        input.removeEventListener("mouseout", desavilitar);
        input.disabled = true;
    });
}

function borrar() { //funcion para borrar los renglones

    const box = document.getElementsByClassName("box");
    let length = box.length;//obtiene la cantidad de checkbox que hay en la tabla

    if (renglones > 1) { //elimina hasta que solo quede la cabecera

        for (let i = 0; i < length; i++) {

            id = box[i].id;
            checkbox = document.getElementById(`${id}`); //elimina los renglones de acuerdo al id de el checkboc y el id de cada renglon
            tr = document.getElementById(`row${id}`);
            if (checkbox.checked) { //si esta validado el check box se elimina el renglon
                tr.remove();
                renglones--;//baja el numero de renglones en la tabla
                i = i - 1;//permite borrar mas de un renglon en un solo evento volviendo a evaluar los renglones cuando se recorren
                length--;//ajusta el tamaño del arreglo por que se elimino uno
            }
        }

    }
    else alert("No hay que borrar");



}

function agregar() {//funcion para agregar renglones
    const tableBody = document.querySelector('#csvTable');
    const tr = document.createElement("tr");
    tr.id = "row" + renglones_id;//asigna id a los renglones
    for (let i = 0; i < columnas; i++) {

        const td = document.createElement("td"); //crea los elementos para cada dato
        const input = document.createElement('input');
        const checkbox = document.createElement("input");

        input.type = "text";//asinga los atributos de cada dato
        input.id = `${head[i]}${renglones_id}`;
        input.value = "";
        input.disabled = true;

        checkbox.type = "checkbox";//crea los checkbox para eliminar los renglones
        checkbox.className = "box";
        checkbox.checked = false;
        checkbox.id = renglones_id;
        checkbox.disabled = true;

        td.appendChild(input);//agrega los elementos al HTML
        if (i === columnas - 1) td.appendChild(checkbox);//solo agrega check box en el ultimo dato
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);//sube los elementos al html
    renglones++;//aumenta la cantidad de renglones
    renglones_id++;//aumenta la cantidad para el id
}







