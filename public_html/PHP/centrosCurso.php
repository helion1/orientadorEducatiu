<?php
$id=$_POST['id_curs'];
$json = json_decode( file_get_contents('http://192.168.2.206:50928/projectxserver/rest/curs/centre/'.$id), true );
echo json_encode($json);
?>