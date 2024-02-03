<?php
session_start();

$servername = "localhost";
$usuario = "root";
$contrasena = "root";

$conexion = new mysqli($servername, $usuario, $contrasena,"",3306);
if ($conexion->connect_error) {
	die("No se puedo conectar: " . $conexion->connect_error);
}
echo "Conexion exitosa";

$database="BD_comite";
$sql = "CREATE DATABASE IF NOT EXISTS ".$database;
	if ($conexion->query($sql) === False) {
	  die("Error: No se pudo crear la base de datos" . $conexion->error);
	} 

$tabla=$database.".Eventos";
$sql = "CREATE TABLE IF NOT EXISTS ".$tabla." (
idEvento int,
nombre varchar(255) NOT NULL,
fechaInicio datetime NOT NULL,
fechaTermino datetime NOT NULL,
observaciones varchar(255) NOT NULL,
CONSTRAINT PK_Evento PRIMARY KEY NONCLUSTERED (idEvento)
)";
	if ($conexion->query($sql) === TRUE) {
	  	echo "Tabla Eventos creada exitosamente";
	} else {
	 	die("Error: No se pudo crear la tabla Eventos" . $conexion->error);
	}

$sql="SELECT COUNT(*) FROM ".$tabla;
$_SESSION["ID_Actual"]=$conexion->query($sql);		//Ver
$_SESSION["ID_Actual"]++;

////////////////////////////////////////////////////////////////////////////////////////////////
//Recibimiento de los datos en JSON
$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data["operacion"]=="anadir"){
	$sql = "INSERT INTO Eventos (idEvento, nombre, fechaInicio,fechaTermino,observaciones)
	VALUES ("$_SESSION["ID_Actual"]",".$data["nombre"].",".$data["fechaInicio"].",".$data["fechaFinal"].",".$data["observaciones"]")";

	if ($conexion->query($sql) === TRUE) {
	  echo "Añadido correctamente";
	} else {
	  echo "Error: " . $sql . "<br>" . $conexion->error;
	}
	$_SESSION["ID_Actual"]++;
}
else if ($data["operacion"]=="modificar"){
	$sql = "UPDATE ".$tabla." SET ".data["id"]",".$data["nombre"].",".$data["fechaInicio"].",".$data["fechaFinal"].",".$data["observaciones"]" WHERE idEvento="data["id"];
	$result = $conexion->query($sql);
	if ($result ===TRUE){
		echo "Modificado correctamente";
	} else {
	  echo "Error al modificar: " . $sql . "<br>" . $conexion->error;
	}
}
else if ($data["operacion"]=="eliminar"){
	$sql = "DELETE FROM ".$tabla." WHERE idEvento=".data["id"];

	if ($conexion->query($sql) === TRUE) {
	  echo "Evento eliminado exitosamente";
	} else {
	  echo "Error borrando datos: " . $conexion->error;
	}
}
else {
	echo "Que paso? No hay nada"
}

$sql="SELECT * FROM ".$table." ORDER BY fechaInicio ASC";
$result=$conexion->query($sql);
json_encode($result);
echo $result;
//Enviar datos al Controlador

$conexion->close(); 
?>




