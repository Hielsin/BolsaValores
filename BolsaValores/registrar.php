<?php
//Para registrar
include('conexion.php');

$usu 	= $_POST["txtusuario2"];
$pass 	= $_POST["txtpassword"];

$queryusuario 	= mysqli_query($conn,"SELECT * FROM login WHERE usu = '$usu'");
$nr 			= mysqli_num_rows($queryusuario); 

if ($nr == 0)
{
    $pass = password_hash($pass, PASSWORD_BCRYPT);
	$queryregistrar = "INSERT INTO login(usu,pass) values ('$usu','$pass')";
	

if(mysqli_query($conn,$queryregistrar))
{
	echo "<script> alert('Usuario registrado: $usu');window.location= 'index.html' </script>";
}
else 
{
	echo "Error: " .$queryregistrar."<br>".mysql_error($conn);
}

}
else
{
		echo "<script> alert('No puedes registrar este usuario: $usu');window.location= 'index.html' </script>";
}
/*VaidrollTeam*/
?>