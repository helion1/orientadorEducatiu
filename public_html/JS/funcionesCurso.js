var id_curs;
$(document).ready(function(){
  //RECOGE LA VARIABLE id_curs DE LA URL
   var variable = 'id_curs';
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable) {
           id_curs = pair[1];
       }
   }
   //LLAMADA AJAX PARA LA INFO DEL CURSO
   $.ajax({
     type: "POST",
     dataType: "json",
     data: {id_curs : id_curs},
     url:"../PHP/cursoElegido.php",
     success:llegadaCurso,
     error:curso_erroneo
   });

   //LLAMADA AJAX PARA LOS CENTROS DEL CURSO
   $.ajax({
     type: "POST",
     dataType: "json",
     data: {id_curs : id_curs},
     url:"../PHP/centrosCurso.php",
     success:llegadaCentros,
     //error:problemas
   });
 //FUNCION PARA PASARLE COORDENADAS AL MAPA
 function llegadaCoordenadas(datos){
     var centro = datos[0];
     initMap(centro);
     $('#info_centro').html('<img class="imagenCentro" style="max-width: 500px; border: 2px solid white; border-radius: 20px; box-shadow: 4px 4px 4px black" src="../IMG/'+centro.imatge+'">');
 }

 function initMap(centro) {
       var chincheta = new google.maps.LatLng(centro.Coordenada_Y, centro.Coordenada_X);
         var map = new google.maps.Map(document.getElementById('map'), {
           center: chincheta,
           zoom: 18
         });

         var coordInfoWindow = new google.maps.InfoWindow();
         coordInfoWindow.setContent([
           centro.naturalesa,
           centro.direccio,
           centro.telefon,
           centro.municipi+' ('+centro.id_provincia+')',
           centro.email_web,
         ].join('<br>'));
         coordInfoWindow.setPosition(chincheta);
         coordInfoWindow.open(map);

          map.addListener('zoom_changed', function() {
           coordInfoWindow.setContent([
             centro.naturalesa,
             centro.direccio,
             centro.telefon,
             centro.municipi+' ('+centro.id_provincia+')',
             centro.email_web,
           ].join('<br>'));
           coordInfoWindow.open(map);
         });
       }

   /*
   var infoCentreHtml = '<ul id="lista_info_centro" style="list-style:none">';

   infoCentreHtml += '<li><strong>Tipus: </strong>'+centro.naturalesa+'</li>';
   infoCentreHtml += '<li><strong>Direcció: </strong>'+centro.direccio+'</li>';
   infoCentreHtml += '<li><strong>Teléfon: </strong>'+centro.telefon+'</li>';
   infoCentreHtml += '<li><strong>Municipi: </strong>'+centro.municipi+' ('+centro.id_provincia+')</li>';
   infoCentreHtml += '<li><strong>Correu Electrónic: </strong>'+centro.email_web+'</li>';

   infoCentreHtml += '</ul>'; */


// FUERA DEL READY --------------------------------------------------------------------
function curso_erroneo(){
  alert("No s'ha seleccionat correctament el curs. Torna a intentar-ho!");
  location='../HTML/index.html';
}




//      var TILE_SIZE = 256;

      /*function createInfoWindowContent(latLng, zoom, centro) {
        var scale = 1 << zoom;

        var worldCoordinate = project(latLng);

        var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));

        var tileCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale / TILE_SIZE),
            Math.floor(worldCoordinate.y * scale / TILE_SIZE));

        return [
          centro.naturalesa,
          centro.direccio,
          centro.telefon,
          centro.municipi+' ('+centro.id_provincia+')',
          centro.email_web,
        ].join('<br>');
      }*//*

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
      }*/




//CARGA DE TODA LA INFORMACION DEL CURSO
function llegadaCurso(cursos){
  if(cursos=="error") curso_erroneo();
  else{
    var curso = cursos[0];
    $("#nomEstudy").html(curso.nom);
    $("#nomFamily").html(curso.nomFamilia);
    $("#nomFamily2").html("<strong>Familia: </strong>" +curso.nomFamilia);
    $("#tipoEstudi").html("<strong>Tipus de curs: </strong>"+curso.id_estudis);
    $("#imatge_familia").attr('src', '../IMG/'+curso.imatge_familia);

    var titols = curso.sortida_laboral.split(',');
    var titolsDesglosats = '<ul id="llista_titols">';
    for(var i=0; i<titols.length;i++){
      titolsDesglosats+='<li class="titol">'+titols[i]+'</li>';
    }
    titolsDesglosats+='</ul>';

    $("#profesiones").html("<strong>Sortides laborals: </strong>"+titolsDesglosats);
    $("#descripcio_llarga").html(curso.descripcio_llarga);

    var assignatures = curso.contingut.split(',');
    var assignaturesDesglosades = '<ul id="llista_assignatures">';
    for(var i=0; i<titols.length;i++){
      assignaturesDesglosades+='<li class="titol">'+assignatures[i]+'</li>';
    }
    assignaturesDesglosades+='</ul>';
    $("#assignatures").html("<strong>Assignatures: </strong>"+assignaturesDesglosades);

    $("#icono_duracion").html(curso.duracio+"h");
    $("#icono_coste").html(curso.preu+"€");
  }
}
    //MAPA ----
function llegadaCentros(centros){
  var centrosHtml = '<ul id="centros_mapa">';
  for(var i=0; i<centros.length;i++){
    centrosHtml+='<a class="mapa" id="'+centros[i].codi_centre+'"><li>'+centros[i].nom+' ('+centros[i].municipi+')</li></a>';
  }
  centrosHtml+='</ul>';
  $('#lista_centros').html(centrosHtml);

  //LLAMADA AJAX PARA LAS COORDENADAS DEL PRIMER CENTRO POR DEFECTO
  $.ajax({
    type: "POST",
    dataType: "json",
    data: {codi_centre : centros[0].codi_centre},
    url:"../PHP/coordenadasCentro.php",
    success:llegadaCoordenadas,
    });



    $('.mapa').click(function(event){
      event.preventDefault();
      var codi_centre = $(this).attr('id');
      //LLAMADA AJAX PARA LA INFO DEL CENTRO
      $.ajax({
        type: "POST",
        dataType: "json",
        data: {codi_centre : codi_centre},
        url:"../PHP/coordenadasCentro.php",
        success:llegadaCoordenadas,
        //error:problemas
      });

    });


  }
});
