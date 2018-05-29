var estudios;
var itinerarioPersona = "";
var respuesta1;
//var subtitulo;
var opciones;
var curso;
var resultado_Cuestionario;

$(document).ready(function(){
  //ESCONDER TODOS LOS CUESTIONARIOS MENOS EL PRIMERO
  $('div[id^=cuestionario], #PostTitulo').hide();

  //FUNCION PARA ESCONDER EL FORMULARIO RELLENADO Y MOSTRAR EL SIGUIENTE
  $('.botonPregunta1').click(function(){
    respuesta1 = $('div[id^=cuestionario] input:radio:checked').val();
    cambia_form($('#cuestionario1'),$('#'+respuesta1));
    //MOSTRAR EL TITULO DE LA ANTERIOR SELECCION
    /*
    subtitulo =  $('input:radio:checked[value='+respuesta1+']+label').text();
    */

  });

  $('#formEstudios input:radio').change(function(event){
    opciones = "";
    event.preventDefault();
    curso = $(this).val();
    if(curso == 'CFGM' || curso == 'CFGS'){
      if(curso == 'CFGM'){
        $('#selectCFGS').remove();
        opciones = '<select name="CFGM" id="selectCFGM">';
      }else{
        $('#selectCFGM').remove();
        opciones = '<select name="CFGS" id="selectCFGS">'
      }

      $.ajax({
          type: "POST",
          dataType: "json",
          url:"../PHP/familias.php",
          success:llegadaFamilias,
          error:problemas
      });
  }else{
      $('select[id^=selectCFG]').remove();
    }

  });

  //TRANSICION DEL FORMULARIO 2 AL 3
  $('.botonEstudios').click(function(){
    estudios = $('#formEstudios input:radio:checked').val();
    itinerarioPersona = $('#formEstudios select option:selected').val();
    resultado_Cuestionario = $('div[id^='+respuesta1+'] input:radio:checked').val();
    cambia_form($('#principal'),$('#cuestionario1'));
  });

  //LLAMADA AJAX A LA BBDD y WEB SERVICE DE LOS CURSOS RESULTATES DEL CUESTIONARIO
  $('.botonTerminar').click(function(event){
    resultado_Cuestionario = $('div[id^='+respuesta1+'] input:radio:checked').val();
    cambia_form($('div[id^='+respuesta1+']'),$('#cursosPersonalizados'));
    cambia_form($('#PreTitulo'), $('#PostTitulo'))

    event.preventDefault();

    $.ajax({
        type: "POST",
        dataType: "json",
        url:"../PHP/queryCuestionario.php",
        data: {resultado:resultado_Cuestionario},
        beforeSend:inicioEnvio,
        success:llegadaDatos,
        error:problemas
    });
  });



});
//----------------------------------------------------------------------- FIN DEL READY
//FUNCIONES
function cambia_form(ocultar,mostrar){
    ocultar.fadeOut(500,() => {mostrar.fadeIn(500);});
}

//.gif cargando
function inicioEnvio(){
  $("#cursos").html('<img id="cargando" src="../IMG/cargando.gif">');
}

function llegadaDatos(datos){
  $('#cargando').remove();
  var article = "";

  if(datos.state !== 'empty'){
    for(var i=0; i<datos.length; i++){
        //ARTICLE, NOMBRE Y DESC. DE CADA CURSO
        article =       "<article id='"+datos[i].id_curs+"' class='jumbotron cursoClickable' onclick='location=\"curso.html?id_curs="+datos[i].id_curs+"\"'>"+
                        "<strong style='font-size: 1.5em; color: rgb(200,200,200)'>"+datos[i].id_estudis+"</strong><br>"+
                        "<strong style='font-size: 2.5em'>"+datos[i].nom+"</strong><br>"+
                        "<span style='font-size: 1.5em'>"+datos[i].descripcio+"</span><br><br>";

        //CONDICIONALES PARA PONER REQUISITOS SI NO SE TIENEN
        if(datos[i].requeriments != "nada" && datos[i].requeriments.indexOf(estudios)==-1 && estudios != "UNI"){
            article+="<span>"+
                      "<strong class='red'>PER A AQUET CURS, NECESITES TENIR 19 ANYS I CUMPLIR UN D'AQUESTS REQUISITS:</strong>"+
                      "<ul class='listaRequisitos'>";
            if(datos[i].requeriments.indexOf("CFGM")>-1){
                article+="<li>-Prova d'accés</li>"+
                        "<li>-Grau MIJTÁ amb itinerari "+datos[i].itinerari+"</li>";
            }
            if(datos[i].requeriments.indexOf("CFGS")>-1 && datos[i].id_estudis.indexOf("UNI") == -1){
                article+="<li>-Grau SUPERIOR amb itinerari "+datos[i].itinerari+"</li>";
            }
            if(datos[i].requeriments.indexOf("CFGS")>-1 && datos[i].id_estudis.indexOf("UNI") > -1){
                article+="<li>-Grau SUPERIOR</li>";
            }
            if(datos[i].requeriments.indexOf("BATX")>-1){
                article+="<li>-BATXILLERAT</li>";
            }
            article+="</ul>"+
                    "</span><br>";
          }else{
              if(datos[i].requeriments.indexOf(estudios)>-1 &&
                estudios.indexOf("CFG")>-1 &&
                  datos[i].itinerari != "" &&
                  !mismoItinerario(itinerarioPersona, datos[i].itinerari)){
                  article+="<span>"+
                            "<ul class='listaRequisitos'>"+
                                "<li>Per a aquet curs, necesites tenir 19 anys i tenir un CFGM";
                  if(estudios == "CFGS"){
                    article+="/CFGS";
                  }
                  article+=" amb itinerari "+datos[i].itinerari+". El teu "+estudios+" té un itinerari "+itinerarioPersona+".</li>";
                  if(datos[i].requeriments.indexOf("BATX")>-1){
                    article+="<li>També serveix qualsevol Batxillerat</li></ul></span>";
                  }
                }
              }
              article+="</article><br>";
              $('#cursos').append(article);
          }
  }else{
    $('#cursos').append("<article>"+
                            "<h2>Ho sentim :(</h2>"+
                            "<h4 class='red'>Actualment, no tenim cursos que siguin afins als teus gustos.<br>Estem treballant per afegir-ne el mès aviat possible.</h4>"+
                        "</article>");
  }
  $('.listaRequisitos li, .red').css('color', 'red');
}

//FUNCION PARA COMPARAR ITINERARIOS
function mismoItinerario(it_pers, it_curs){
  var it_p = it_pers.split(",");
  var it_c = it_curs.split(",");

  for(i=0; i<it_p.length;i++){
    for(j=0; j<it_c.length;j++){
      if(it_p[i].indexOf(it_c[j])>-1){
        return true;
      }
    }
  }
return false;
}

//FUNCION PARA DEVOLVER LAS FAMILIAS E ITINERARIOS
function llegadaFamilias(familias){
  for(i=0; i<familias.length; i++){
    opciones+= '<option value="'+familias[i].itinerari+'">'+familias[i].nom+'</option>';
  }
    opciones+='</select>';
    $(opciones).insertAfter($('#formEstudios input:radio:checked').next());
}

//FUNCION PARA PROBLEMAS AL EJECUTAR AJAX
function problemas(){
  $("#cursos").text('Problemas en el servidor.');
}
