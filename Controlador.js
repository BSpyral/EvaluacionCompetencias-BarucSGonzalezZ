$(document).ready(function(){

  $("#formulario").hide();

}); 

var tipoOperacion;

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

		var infoJSON =JSON.stringify(formularioJSON);
		console.log(infoJSON);
		console.log(formularioJSON);
		const xhttp = new XMLHttpRequest();

		xhttp.open("POST", "Modelo.php");
		xhttp.send();	//Enviar a PHP
		
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
