<?php

$json = json_decode( file_get_contents('http://localhost/projectxserver/rest/curs/familia/'.$id), true );
echo json_encode($json);

?>
