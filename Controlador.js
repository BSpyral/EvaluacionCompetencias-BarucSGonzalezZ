$(document).ready(function(){

	$("#formulario").hide();
	actualizarTabla();

}); 

var tipoOperacion;
var idEnviar;

function anadirEvento(){
	$("#formulario").show();
	tipoOperacion="anadir";
}
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
			id:idEnviar,
			nombre:formularioJSON[0],
			fechaInicio:formularioJSON[1],
			fechaFinal:formularioJSON[2],
			observaciones:formularioJSON[3],
			operacion:formularioJSON[4],
		};

		console.log(JSON.stringify(infoJSON));

		 // Configurar la solicitud
	    const solicitud = {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(infoJSON),
	    };

	    // Realizar la solicitud
	    fetch('Modelo.php', solicitud)
	        .then(response => response.json())
	        .then(data => {
	        	console.log(data);
	        })
	        .catch(error => {
	            // Manejar errores de la solicitud
	            console.error('Error:', error);
	        });
			
			alert("La informacion ha sido registrada");
			$("#formulario").hide();
		}
	
}

function modificarEvento(){
	//$("#formulario").show();
	tipoOperacion="modificar";
	//Pero obteniendo informacion de la tabla y su id
}

function eliminarEvento(){
	tipoOperacion="eliminar";
	var decision=confirm("¿Desea eliminarlo?");

	if (decision==true){
		//idEnviar=;
		//Eliminar desde PHP
		alert("La informacion ha sido eliminada")
	}
}


function actualizarTabla(){
	var table=document.getElementById("table");
	//Crear dinamicamente la tabla



	//JSON.parse() //Para recoger en JSON

	//Abajo tiene codigo ejemplo
	//table.insertAdjacentElement("afterend", formulario);
	//formulario.appendChild(label_evento);
	//formulario.appendChild(inputNombreEvento);
}
