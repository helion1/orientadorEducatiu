
/*
    var TILE_SIZE = 256;
    // The mapping between latitude, longitude and pixels is defined by the web
    // mercator projection.
    function project(latLng) {
        var siny = Math.sin(latLng.lat() * Math.PI / 180);

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
    }

*/



/* Info extra: */
/* El head de curso.html tiene que ir en este orden segun Miguel Angel (profe)*/
/*      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../CSS/style.css">
        <script src="../JS/jquery.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWJRtTGQ0d-n5w3obKW8s93sAb-QG6WK8&callback=initMap"></script>
        <script type="text/javascript" src="../JS/googleMaps.js"></script>
        <script type="text/javascript" src="../JS/funcionesCurso.js"></script>

        <title>Orientador Educatiu</title>*/

/* Hay que crear un div con "id" map y hay que darle width y height ara que se vea.
 *  500px he usado yo de prueba*/
