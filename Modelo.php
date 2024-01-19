<?php
session_start();
$_SESSION[ID_Actual]=0;

$servername = "localhost";
$usuario = "root";
$contrasena = "root";

$conexion = new mysqli($servername, $usuario, $contrasena,"",3306);

if ($conexion->connect_error) {
	die("No se puedo conectar: " . $conexion->connect_error);
}
echo "Conexion exitosa";


//Necesario checar si la BD existe, no puedo sobreescribirla
$sql = "CREATE DATABASE BD_comite";
if ($conexion->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error: No se pudo crear" . $conexion->error;
}
//Tambien necesario checar si la tabla existe, no puedo sobreescribirla x2
$sql = "CREATE TABLE Eventos (
idEvento int IDENTITY(1,1),
nombre varchar(255) NOT NULL,
fechaInicio datetime NOT NULL,
fechaTermino datetime NOT NULL,
observaciones varchar(255) NOT NULL,
CONSTRAINT PK_Evento PRIMARY KEY NONCLUSTERED (idEvento)
)";
if ($conexion->query($sql) === TRUE) {
  echo "Tabla Eventos creada exitosamente";
} else {
  echo "Error: No se pudo crear" . $conexion->error;
}

$_SESSION[ID_Actual]++;
if ($_POST[4]=="anadir"){
	$sql = "INSERT INTO Eventos (idEvento, nombre, fechaInicio,fechaTermino,observaciones)
	VALUES ("$_SESSION[ID_Actual]",".$_POST[0].",".$_POST[1].",".$_POST[2].",".$_POST[3]")";

	if ($conexion->query($sql) === TRUE) {
	  echo "Añadido correctamente";
	} else {
	  echo "Error: " . $sql . "<br>" . $conexion->error;
	}
}
else if ($_POST[4]=="modificar"){
	//$sql = "SELECT id, firstname, lastname FROM MyGuests";
	//$result = $conn->query($sql);

	//if ($result->num_rows > 0) {
	    // output data of each row
	//  while($row = $result->fetch_assoc()) {
	//    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
	//  }
	//} else {
	//  echo "0 results";
	//}
}

else if ($_POST[4]=="eliminar"){
	//$sql = "DELETE FROM MyGuests WHERE id=3";

	//if ($conn->query($sql) === TRUE) {
	//  echo "Record deleted successfully";
	//} else {
	//  echo "Error deleting record: " . $conn->error;
	//}
}

//Hacer consulta SQL, con ORDER BY fechaInicio ASC 
//Codificar a JSON: json_encode($variable);
$conexion->close(); 
?>




