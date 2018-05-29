<?php

$json = json_decode( file_get_contents('http://192.168.2.206:50928/projectxserver/rest/curs/id/'.$id), true );
echo json_encode($json);

?>
