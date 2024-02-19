$(document).ready(function(){

	$("#formulario").hide();
	solicitarTabla();

	datosFormulario=document.getElementsByTagName("input");		
	for (i=0;i<datosFormulario.length;i++){
		datosFormulario[i].value="";
	}
}); 

var idEnviar="0";
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
			id: idEnviar,
			nombre: formularioJSON[0],
			fechaInicio: formularioJSON[1],
			fechaFinal: formularioJSON[2],
			observaciones: formularioJSON[3],
			operacion: formularioJSON[4],
		};

	    hacerSolicitud(infoJSON);
		alert("La informacion ha sido registrada");			
	}
}

function solicitarTabla(){

	var infoRecibida;
	// Realizar la solicitud de la tabla
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
			botonModificar.setAttribute("class","modificar");
			columnaObservaciones.insertAdjacentElement("afterend",botonModificar);

 
			botonEliminar=document.createElement("button");
			botonEliminar.textContent="Eliminar";
			botonEliminar.setAttribute("class","eliminar");
			botonModificar.insertAdjacentElement("afterend",botonEliminar);

			botonModificar.addEventListener("click",modificarEvento.bind(n_elemento));
			botonEliminar.addEventListener("click",eliminarEvento.bind(n_elemento));
		}
		botonAnadir=document.getElementById("fila_botonAnadir");
		table.insertAdjacentElement("beforeend",botonAnadir);

		//Hora Actual
		const tiempoTranscurrido = Date.now();
		const hoy = new Date(tiempoTranscurrido);
		var textoFecha=document.getElementById("fe_inicio");
		var textoEjemplo=hoy.getFullYear()+"-"+(hoy.getUTCMonth()+1)+"-"+hoy.getUTCDate();
		textoFecha.setAttribute("placeholder",textoEjemplo);

	}
	else{
		console.log("Sin datos");
	}
}

function anadirEvento(){
	var boton=document.getElementById("botonEnviar");
	boton.textContent="Añadir";

	$("#formulario").show();
	tipoOperacion="anadir";
}

	
function modificarEvento(event){
	var boton=document.getElementById("botonEnviar");
	boton.textContent="Actualizar";

	$("#formulario").show();
	tipoOperacion="modificar";

	var datosFormulario,datosModificar;

	datosFormulario=document.getElementsByTagName("input");		
	datosModificar=event.target.parentNode.childNodes;

	for (i=0;i<datosFormulario.length;i++){
		datosFormulario[i].value=datosModificar[i].textContent;
	}
	idEnviar=String(this);
}

function eliminarEvento(){
	tipoOperacion="eliminar";
	var decision=confirm("¿Desea eliminarlo?");

	if (decision==true){

		var idEnviar=this;
		const infoJSON = {
			id: idEnviar,
			operacion: tipoOperacion,
		};
		hacerSolicitud(infoJSON);
		alert("La informacion ha sido eliminada")
	}
}

function hacerSolicitud(infoJSON){
	 // Configurar solicitud
	    const solicitud = {
	        method: "POST",
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(infoJSON),
	    };

	    // Realizar solicitud
	    fetch('ActualizaDatos.php', solicitud)
	        .then(response => {
	        	console.log(response)
	        })
	        .catch(error => {
	            console.error('Error:', error);
	        });
}
