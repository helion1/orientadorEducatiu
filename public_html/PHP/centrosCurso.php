<?php
$id=$_POST['id_curs'];
$json = json_decode( file_get_contents('http://localhost/projectxserver/rest/curs/centre/'.$id), true );
echo json_encode($json);
?>
