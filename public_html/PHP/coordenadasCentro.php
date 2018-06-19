<?php
$codi_centre=$_POST['codi_centre'];
$json = json_decode( file_get_contents('http://localhost/projectxserver/rest/centre/'.$codi_centre), true );
echo json_encode($json);
?>
