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

//Consulta para saber ID actual en la tabla
	//EDITAR: no puedo hacer uso del Count para definir el id, deberia usar el ultimo id o el mas grande como referencia
$sql="SELECT COUNT(*) FROM ".$tabla;
$resultado=$conexion->query($sql);	
$id_actual=$resultado->fetch_row();
$_SESSION["ID_Actual"]=$id_actual[0];
$_SESSION["ID_Actual"]++;

$resultado->close();


////////////////////////////////////////////////////////////////////////////////////////////////
//Recibimiento de los datos en JSON   	//PROBAR
	//$json = file_get_contents('php://input');
	//$data = json_decode($json);
	if ($_POST["operacion"]=="anadir"){
		$sql = "INSERT INTO ".$tabla." (idEvento, nombre, fechaInicio,fechaTermino,observaciones)
		VALUES (".$_SESSION["ID_Actual"].",".$_POST["nombre"].",".$_POST["fechaInicio"].",".$_POST["fechaFinal"].",".$_POST["observaciones"].")";

		if ($conexion->query($sql) === TRUE) {
		  echo "Añadido correctamente";
		} else {
		  echo "Error: " . $sql . "<br>" . $conexion->error;
		}
		$_SESSION["ID_Actual"]++;
	}
	else if ($_POST["operacion"]=="modificar"){
		$sql = "UPDATE ".$tabla." SET ".data["id"].",".$_POST["nombre"].",".$_POST["fechaInicio"].",".$_POST["fechaFinal"].",".$_POST["observaciones"]." WHERE idEvento=".data["id"];
		$result = $conexion->query($sql);
		if ($result ===TRUE){
			echo "Modificado correctamente";
		} else {
		  echo "Error al modificar: " . $sql . "<br>" . $conexion->error;
		}
	}
	else if ($_POST["operacion"]=="eliminar"){
		$sql = "DELETE FROM ".$tabla." WHERE idEvento=".data["id"];

		if ($conexion->query($sql) === TRUE) {
		  echo "Evento eliminado exitosamente";
		} else {
		  echo "Error borrando datos: " . $conexion->error;
		}
	}

$conexion->close(); 


?>




