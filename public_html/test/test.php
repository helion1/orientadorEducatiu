<?php

header('Content-Type: text/html; charset=utf-8');

$host = "localhost";
$user = "admin";
$pw = "marianao";
$db = "project_x";

$conexion = new mysqli($host, $user, $pw, $db);

#Comprobar la conexión
if ($conexion->connect_error) {
    printf("Conexión fallida: %s", $conexion->connect_error);
    exit();
}

#Consulta
$consulta = $conexion->query("SELECT nom, id_curs, paraules_clau FROM curs");

$names = array();
$paraules_clau = array();

while ( $row = mysqli_fetch_assoc($consulta) ) {

 	array_push($names, utf8_encode($row['nom']));
	array_push($paraules_clau, utf8_encode($row['paraules_clau']));
	
}	

	$input = strtolower( $_GET['input'] );
	$len = strlen($input);
	
	
	$aResults = array();
	
	if ($len) {
		for ($i=0;$i<count($names);$i++) {
			// had to use utf_decode, here
			// not necessary if the results are coming from mysql
			
			if (strtolower(substr(utf8_decode($names[$i]),0,$len)) == $input)
				$aResults[] = array( "id"=>($i+1) ,"value"=>htmlspecialchars($names[$i]) );
			
			//if (stripos(utf8_decode($aUsers[$i]), $input) !== false)
			//	$aResults[] = array( "id"=>($i+1) ,"value"=>htmlspecialchars($aUsers[$i]), "info"=>htmlspecialchars($aInfo[$i]) );
		}
	}
	
	header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
	header ('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
	header ('Cache-Control: no-cache, must-revalidate'); // HTTP/1.1
	header ('Pragma: no-cache'); // HTTP/1.0
	
	
	
	if (isset($_REQUEST['json'])) {
		header('Content-Type: application/json');
	
		echo "{\"results\": [";
		$arr = array();
		for ($i=0;$i<count($aResults);$i++) {
			$arr[] = "{\"id\": \"".$aResults[$i]['id']."\", \"value\": \"".$aResults[$i]['value']."\"}";
		}
		echo implode(", ", $arr);
		echo "]}";
	} else {
		header("Content-Type: text/xml");

		echo "<?xml version=\"1.0\" encoding=\"utf-8\" ?><results>";
		for ($i=0;$i<count($aResults);$i++) {
			echo "<rs id=\"".$aResults[$i]['id']."\">".$aResults[$i]['value']."</rs>";
		}
		echo "</results>";
	}
?>