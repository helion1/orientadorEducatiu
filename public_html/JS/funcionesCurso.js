var id_curs;
$(document).ready(function(){
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


});
// FUERA DEL READY --------------------------------------------------------------------
function curso_erroneo(){
  alert("No s'ha seleccionat correctament el curs. Torna a intentar-ho!");
  location='../HTML/index.html';
}



function initMap(x, y) {
    var centro = new google.maps.LatLng(y, x);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: centro,
        zoom: 16
    });

    var coordInfoWindow = new google.maps.InfoWindow();
    //coordInfoWindow.setContent(createInfoWindowContent(centro, map.getZoom()));
    coordInfoWindow.setPosition(centro);
    coordInfoWindow.open(map);

    map.addListener('zoom_changed', function() {
        coordInfoWindow.setContent(createInfoWindowContent(centro, map.getZoom()));
        coordInfoWindow.open(map);
    });
}

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

//FUNCION PARA PASARLE COORDENADAS AL MAPA
function llegadaCoordenadas(datos){
    var centro = datos[0];
    initMap(centro.Coordenada_X, centro.Coordenada_Y);

    var infoCentreHtml = '<ul id="lista_info_centro" style="list-style:none">';

    infoCentreHtml += '<li><strong>Tipus: </strong>'+centro.naturalesa+'</li>';
    infoCentreHtml += '<li><strong>Direcció: </strong>'+centro.direccio+'</li>';
    infoCentreHtml += '<li><strong>Teléfon: </strong>'+centro.telefon+'</li>';
    infoCentreHtml += '<li><strong>Municipi: </strong>'+centro.municipi+' ('+centro.id_provincia+')</li>';
    infoCentreHtml += '<li><strong>Correu Electrónic: </strong>'+centro.email_web+'</li>';

    infoCentreHtml += '</ul>'
    $('#info_centro').html(infoCentreHtml);

}

























//
