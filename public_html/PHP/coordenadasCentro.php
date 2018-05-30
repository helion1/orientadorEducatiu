<?php
$codi_centre=$_POST['codi_centre'];
$json = json_decode( file_get_contents('http://192.168.2.206:50928/projectxserver/rest/centre/'.$codi_centre), true );
echo json_encode($json);
?>
