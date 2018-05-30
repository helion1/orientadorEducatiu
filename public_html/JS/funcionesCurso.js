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
});

function llegadaCurso(cursos){
   var curso = cursos[0];
    $("#nomEstudy").html(curso.nom);
    $("#nomFamily").html(curso.nomFamilia);
    $("#nomFamily2").html("Familia: " +curso.nomFamilia);
    $("#tipoEstudi").html("Ensenyament: "+curso.id_estudis);
    var titols = curso.sortida_laboral.split(',');
    var titolsDesglosats = '<ul id="llista_titols">';
    for(var i=0; i<titols.length;i++){
      titolsDesglosats+='<li class="titol">'+titols[i]+'</li>';
    }
    titolsDesglosats+='</ul>';
    $("#titol").html("Titulació/ons: "+titolsDesglosats);
    $("#descripcio_llarga").html(curso.descripcio_llarga);

    var assignatures = curso.contingut.split(',');
    var assignaturesDesglosades = '<ul id="llista_assignatures">';
    for(var i=0; i<titols.length;i++){
      assignaturesDesglosades+='<li class="titol">'+assignatures[i]+'</li>';
    }
    assignaturesDesglosades+='</ul>';
    $("#assignatures").html("Assignatures: "+assignaturesDesglosades);
    /*
    $("#duracion").html("<p>La duració del curs serà de: " + curso.duracio + "h. Una cinquena part \n\
    d'aquestes hores, es faran en centre de treball com a pràctiques.</p><p>El cost total del curs es de\n\
     " + curso.preu + "€ aproximadament.");*/
}
/*
function separarAsignaturas(cursos){
    var asignaturas = cursos.contingut;
    var asignatura = asignaturas.split(",");
    for(var i=0; i < asignatura.length; i++){
        $("#asignaturas").html("<li>"+asignatura[i]+"</li>");
    }
}

function separarProfesiones(cursos){
    var profesiones = cursos.sortida_laboral;
    var profesio = profesiones.split(",");
    for(var i=0; i < profesio.length; i++){
        $("#profesiones").html("<li>"+profesio[i]+"</li>");
    }
}*/