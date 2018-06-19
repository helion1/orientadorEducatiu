<?php

$json = json_decode( file_get_contents('http://localhost:8080/projectxserver/rest/familia/string'), true );
echo json_encode($json);

?>
