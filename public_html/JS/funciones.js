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
   //alert(id_curs);
});

function llegadaCurso(curso){
    $("#nomEstudy").html(curso.nom);
    $("#nomFamily").html(curso.nomFamilia);
    $("#nomFamily2").html("Familia: " +curso.nomFamilia);
    var tipoEstudi = curso.id_estudis;
    if(tipoEstudi === "CFGM" || tipoEstudi === "CFGS"){
        $("#tipoEstudi").html("Ensenyament: Formacio professional");
    }
    if(tipoEstudi === "BATX"){
        $("#tipoEstudi").html("Ensenyament: Batxillerat");
    }
    else{
        $("#tipoEstudi").html("Ensenyament: Estudis universitaris");
    }

    if(tipoEstudi === "CFGM"){
        $("#titol").html("Titulació: Tècnic/a");
    }
    if(tipoEstudi === "CFGS"){
        $("#titol").html("Titulació: Tècnic/a superior");
    }
    if(tipoEstudi === "BATX"){
        $("#titol").html("Titulació: Batxillerat");
    }
    else{
        $("#titol").html("Titulació: Llicenciat");
    }

    $("#descipcion").html(curso.descripcio_llarga);

    $("#duracion").html("<p>La duració del curs serà de: " + curso.duracio + ". Una cinquena part \n\
    d'aquestes hores, es faran en centre de treball com a pràctiques.</p><p>El cost total del curs es de\n\
     " + curso.preu + "€ aproximadament.");
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
