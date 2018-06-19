<?php

header('Content-Type: text/html; charset=utf-8');

$cursos = json_decode( file_get_contents('http://localhost/projectxserver/rest/curs/buscador/'), true );
json_encode($cursos);

$input = trim(strtolower( quitar_tildes(utf8_encode($_GET['input']) )));
$len = strlen($input);

$aResults = array();

//SI HA ESCRITO ALGO EL USER, COMPROBAMOS
if ($len>2) {
	for ($i=0;$i<count($cursos);$i++) {
        // QUITAMOS DE LA BBDD ACENTOS, ESPACIOS, COMAS Y APOSTROFES DE LOS NOMBRES DE LOS CURSOS
        //PARA HACER MENOS METICULOSA LA COMPARACION Y LO DIVIDIMOS EN UN ARRAY
        $nombresCompuestos = explode(' ', str_replace(',', '',str_replace("d'", "", quitar_tildes($cursos[$i]['nombre']))));
        $palabraBBDDsClaveCompuestas = explode(',', quitar_tildes($cursos[$i]['claves']));
        $esta = false;
        //COMPROBAMOS SI EL USUARIO HA ESCRITO VARIAS PALABRAS, PARA COMPRAR CON UN ARRAY O CON UN STRING
        if(es_palabra_compuesta($input)){
          $inputDescompuesto = explode(' ', str_replace(',', '',str_replace("d'", "",$input)));
        }
        //COMPARAMOS CON LOS NOMBRES DE LOS CURSOS, PALABRA POR PALABRA
        foreach ($nombresCompuestos as $palabraBBDD) {
          if(es_palabra_compuesta($input)){
            foreach($inputDescompuesto as $palabraInput){
              if(strtolower(substr($palabraBBDD,0,$len)) == $palabraInput) $esta = true;
            }
          }else{
            if(strtolower(substr($palabraBBDD,0,$len)) == $input) $esta = true;
            }
          }

        //COMPARAMOS CON LOS NOMBRES DE LAS PALABRAS CLAVE, PALABRA POR PALABRA
        foreach ($palabraBBDDsClaveCompuestas as $palabraClaveBBDD) {
          //COMPROBAMOS SI EL USUARIO HA ESCRITO VARIAS PALABRAS, PARA COMPRAR CON UN ARRAY O CON UN STRING
          if(es_palabra_compuesta($input)){
            foreach($inputDescompuesto as $palabraInput){
              if(strtolower(substr($palabraClaveBBDD,0,$len)) == $palabraInput)  $esta = true;
            }
          }else {
            if(strtolower(substr($palabraClaveBBDD,0,$len)) == $input)  $esta = true;
          }
        }
        //SI COINCIDE ALGUNA PALABRA CON ALGUN CURSO O PALABRA CLAVE, LO GUARDA PARA MOSTRARLO LUEGO
        if($esta){
            $aResults[] = array( "id"=>($cursos[$i]['id']) ,"value" => htmlspecialchars($cursos[$i]['nombre']) );
        }
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

//FUNCION PARA QUITAR TILDES
  function quitar_tildes($cadena) {
    $no_permitidas = array ("à","á","é","í","ó","ú","Á","É","Í","Ó","Ú","À","Ì","Ò","Ù");
    $permitidas = array ("a","a","e","i","o","u","A","E","I","O","U","A","I","O","U");
    $texto = str_replace($no_permitidas, $permitidas ,$cadena);
    return $texto;
    }
//FUNCION PARA SABER SI UNA PALABRA ES COMPUESTA
function es_palabra_compuesta($texto){
  if(strpos($texto, " ") !== false) return true;
  return false;
}


?>
