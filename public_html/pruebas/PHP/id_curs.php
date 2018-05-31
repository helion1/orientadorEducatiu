<?php
$resultado=$_POST['resultado'];

//LLAMADA AL RESTFUL QUE TE DEVUELVE UN JSON CON TODOS LOS CURSOS QUE TENGAN codi_questionari = $resultado
$json = json_decode( file_get_contents('http://192.168.2.206:50928/projectxserver/rest/curs/string/'.$resultado), true );
if(empty($json)){
  $json = ['state' => 'empty'];
}
echo json_encode($json);

?>
