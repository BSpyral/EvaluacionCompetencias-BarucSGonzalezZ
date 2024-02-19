<?php
session_start();

$servername = "localhost";
$usuario = "root";
$contrasena = "root";

$conexion = new mysqli($servername, $usuario, $contrasena,"",3306);
if ($conexion->connect_error) {
	die("No se puedo conectar: " . $conexion->connect_error);
}
echo "Conexion exitosa<br>";

//Crea BD
$database="BD_comite";
$sql = "CREATE DATABASE IF NOT EXISTS ".$database;
	if ($conexion->query($sql) === False) {
	  die("Error: No se pudo crear la base de datos" . $conexion->error);
	} 
$tabla=$database.".Eventos";
$sql = "CREATE TABLE IF NOT EXISTS ".$tabla." (
idEvento int,
nombre varchar(255) NOT NULL,
fechaInicio date NOT NULL,
fechaTermino date NOT NULL,
observaciones varchar(255) NOT NULL,
CONSTRAINT PK_Evento PRIMARY KEY NONCLUSTERED (idEvento)
)";
	if ($conexion->query($sql) === TRUE) {
	  	echo "Tabla Eventos creada exitosamente<br>";
	} else {
	 	die("Error: No se pudo crear la tabla Eventos" . $conexion->error);
	}

//Consulta para saber ID mas alto en la tabla
$sql="SELECT MAX(idEvento) FROM ".$tabla;
$resultado=$conexion->query($sql);	
$resultado=$resultado->fetch_row();
$id_actual=$resultado[0];

if ($id_actual!=null){
	$id_actual++;
}
else{
	echo "Primer dato en la BD";
	$id_actual=1;
}




////////////////////////////////////////////////////////////////////////////////////////////////
//Recibimiento de los datos en JSON   	
$json = file_get_contents('php://input');
$data = json_decode($json,"true");
	
if ($data){
	if ($data["operacion"]=="anadir"){
		$sql = "INSERT INTO ".$tabla." (idEvento, nombre, fechaInicio,fechaTermino,observaciones)
		VALUES (".$id_actual.",'".$data["nombre"]."','".$data["fechaInicio"]."','".$data["fechaFinal"]."','".$data["observaciones"]."')";			
		if ($conexion->query($sql) === TRUE) {
		  echo "Añadido correctamente";
		} else {
		  echo "Error: " . $sql . "<br>" . $conexion->error;
		}

	}
	else if ($data["operacion"]=="modificar"){
		$sql = "UPDATE ".$tabla.
		" SET idEvento=".$data["id"].", nombre='".$data["nombre"]."', fechaInicio='".$data["fechaInicio"]."', fechaTermino='".$data["fechaFinal"]."', observaciones='".$data["observaciones"].
		"' WHERE idEvento=".$data["id"];
		$result = $conexion->query($sql);
		if ($result ===TRUE){
			echo "Modificado correctamente";
		} else {
		  echo "Error al modificar: " . $sql . "<br>" . $conexion->error;
		}
	}
	else if ($data["operacion"]=="eliminar"){
		$sql = "DELETE FROM ".$tabla." WHERE idEvento=".$data["id"];

		if ($conexion->query($sql) === TRUE) {
		  echo "Evento eliminado exitosamente";
		} else {
		  echo "Error borrando datos: " . $conexion->error;
		}
	}
}

$conexion->close(); 
?>




