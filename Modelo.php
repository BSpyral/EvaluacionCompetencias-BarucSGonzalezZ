<?php
session_start();

$servername = "localhost";
$usuario = "root";
$contrasena = "root";

$conexion = new mysqli($servername, $usuario, $contrasena,"",3306);
if ($conexion->connect_error) {
	die("No se puedo conectar: " . $conexion->connect_error);
}

$database="BD_comite";
$tabla=$database.".Eventos";

//Enviar datos al Controlador
$sql="SELECT * FROM ".$tabla." ORDER BY fechaInicio ASC";
$result=$conexion->query($sql);
$resultado=$result->fetch_all();
$resultado=json_encode($resultado);

echo $resultado;			

$conexion->close(); 
?>




