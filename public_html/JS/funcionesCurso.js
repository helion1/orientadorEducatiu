var id_curs;
$(document).ready(function(){
   var variable = 'id_curs';
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable) {
           id_curs = pair[1];
       }else{
         alert("No s'ha seleccionat correctament el curs. Torna a intentar-ho!");
         location='../HTML/index.html';
       }
   }

   $.ajax({
     type: "POST",
     dataType: "json",
     data: {id_curs : id_curs},
     url:"../PHP/cursoElegido.php",
     success:llegadaCurso,
     //error:problemas
   });

   $.ajax({
     type: "POST",
     dataType: "json",
     data: {id_curs : id_curs},
     url:"../PHP/centrosCurso.php",
     success:llegadaCentros,
     //error:problemas
   });

   $('.mapa').click(function(event){
     event.preventDefault();

     var codi_centre = $(this).attr('id');
     alert(codi_centre);

     $.ajax({
       type: "POST",
       dataType: "json",
       data: {codi_centre : codi_centre},
       url:"../PHP/coordenadasCentro.php",
       success:llegadaCoordenadas,
       //error:problemas
     });

   })



});
// FUERA DEL READY --------------------------------------------------------------------
function initMap(x, y) {
    var centro = new google.maps.LatLng(/*var cooredenadaX*/y, /*var coordenadaY*/ x);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: centro,
        zoom: 16
    });

    var coordInfoWindow = new google.maps.InfoWindow();
    coordInfoWindow.setContent(createInfoWindowContent(centro, map.getZoom()));
    coordInfoWindow.setPosition(centro);
    coordInfoWindow.open(map);

    map.addListener('zoom_changed', function() {
        coordInfoWindow.setContent(createInfoWindowContent(centro, map.getZoom()));
        coordInfoWindow.open(map);
    });
}

function llegadaCurso(cursos){
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
    //MAPA ----
function llegadaCentros(centros){
  var centrosHtml = '<ul id="centros_mapa">';
  for(var i=0; i<centros.length;i++){
    centrosHtml+='<a href="#" class="mapa" id="'+centros[i].codi_centre+'"><li>'+centros[i].nom+' ('+centros[i].municipi+')</li></a>';
  }
  centrosHtml+='</ul>';
  $('#lista_centros').html(centrosHtml);

  $.ajax({
    type: "POST",
    dataType: "json",
    data: {codi_centre : centros[0].codi_centre},
    url:"../PHP/coordenadasCentro.php",
    success:llegadaCoordenadas,
    //error:problemas
    });

}

function llegadaCoordenadas(datos){
    var centro = datos[0];
    initMap(centro.Coordenada_X, centro.Coordenada_Y);
}

























//
