$(document).ready(function(){

	$("#formulario").hide();
	solicitarTabla();

}); 

var tipoOperacion;

function enviarFormulario(){
	var input=document.getElementsByTagName("input");
	var completado=true;
	var formularioJSON=new Array("","","","","");

	for(i=0;i<input.length;i++){
		if (input[i].value=="") 
		{
		completado=false;
		formularioJSON=[];
		break;
		}	

		formularioJSON[i]=input[i].value;
	}

	if (completado){
		formularioJSON[4]=tipoOperacion;

		const infoJSON = {
			"id":idEnviar,
			"nombre":formularioJSON[0],
			"fechaInicio":formularioJSON[1],
			"fechaFinal":formularioJSON[2],
			"observaciones":formularioJSON[3],
			"operacion":formularioJSON[4],
		};

		 // Configurar la solicitud
	    const solicitud = {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(infoJSON),
	    };

	    // Realizar la solicitud
	    fetch('ActualizaDatos.php', solicitud)
	        .then(response => response.json())
	        .then(data => {
	        	console.log(data);
	        })
	        .catch(error => {
	            console.error('Error:', error);
	        });
		$("#formulario").hide();
		alert("La informacion ha sido registrada");			//Será?
	}
}

function solicitarTabla(){

	var infoRecibida;

	// Realizar la solicitud
	    fetch('Modelo.php')
	        .then(response => response.json())
	        .then(data => {
	        	infoRecibida=data;
	        	actualizarTabla(infoRecibida);
	        })
	        .catch(error => {
	            console.error('Error:', error);
	        });
}	

function actualizarTabla(infoRecibida){

	if (infoRecibida!=null) {

		var n_elemento;
		var fila;
		var columnaNombre,columna_fechaInicio,columna_fechaFinal,columnaObservaciones;
		var botonModificar,botonEliminar,botonAnadir;

		var table=document.getElementById("table");	
		table=table.lastChild.previousSibling;
		console.log(table);

		//Crear dinamicamente la tabla
		for (var i = 0; i < infoRecibida.length; i++) {
			n_elemento = infoRecibida[i][0];

			//Nueva fila
			fila=document.createElement("tr");
			fila.setAttribute("id",n_elemento); 	
			table.appendChild(fila);		

			columnaNombre=document.createElement("td");
			columnaNombre.textContent=infoRecibida[i][1];		
			fila.appendChild(columnaNombre);
			
			columna_fechaInicio=document.createElement("td");
			columna_fechaInicio.textContent=infoRecibida[i][2];
			columnaNombre.insertAdjacentElement("afterend",columna_fechaInicio);
			
			columna_fechaFinal=document.createElement("td");
			columna_fechaFinal.textContent=infoRecibida[i][3];
			columna_fechaInicio.insertAdjacentElement("afterend",columna_fechaFinal);

			columnaObservaciones=document.createElement("td");
			columnaObservaciones.textContent=infoRecibida[i][4];
			columna_fechaFinal.insertAdjacentElement("afterend",columnaObservaciones);

			botonModificar=document.createElement("button");
			botonModificar.textContent="Modificar";
			botonModificar.setAttribute("id","modificar");
			botonModificar.setAttribute("onclick","modificarEvento()")
			columnaObservaciones.insertAdjacentElement("afterend",botonModificar);
 
			botonEliminar=document.createElement("button");
			botonEliminar.textContent="Eliminar";
			botonEliminar.setAttribute("id","eliminar");
			botonEliminar.setAttribute("onclick","eliminarEvento()")
			botonModificar.insertAdjacentElement("afterend",botonEliminar);
		}
		botonAnadir=document.getElementById("fila_botonAnadir");
		table.insertAdjacentElement("beforeend",botonAnadir);
	}
	else{
		console.log("Sin datos");
	}
}

function anadirEvento(){
	$("#formulario").show();
	tipoOperacion="anadir";
}

	
function modificarEvento(){
	$("#formulario").show();
	tipoOperacion="modificar";


	//Pero obteniendo informacion de la tabla y su id
}

function eliminarEvento(){
	tipoOperacion="eliminar";
	var decision=confirm("¿Desea eliminarlo?");

	if (decision==true){
		//Eliminar desde PHP
		alert("La informacion ha sido eliminada")
	}
}
