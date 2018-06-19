<?php
$id=$_POST['id_curs'];
$json = json_decode( file_get_contents('http://localhost/projectxserver/rest/curs/id/'.$id), true );
if(empty($json)) $json ="error";
echo json_encode($json);
?>
