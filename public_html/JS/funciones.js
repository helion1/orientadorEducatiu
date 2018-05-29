
var opcion = "";
$(document).ready(function(){
$("#nombreCursos").css("display", "hidden");

    $.getJSON('../PHP/familias.php',optionFamilias);
  //  $.getJSON('../PHP/cursos.php',optionCursos);

function optionFamilias(familias){
   for (var i=0; i< familias.length; i++){
        opcion += "<option value =" + familias[i].id + ">" + familias[i].nom + "</option>";
    }
    $("#familias").html(opcion);
};

/*
function optionCursos(){
    var cursoSelected = $("#familias option:selected").val();
    //console.log(cursoSelected);
}*/





function infoCursos(cursos){
    $("#nomEstudy").html(cursos.nomCurs);
    $("#nomFamily").html(cursos.nomFamilia);
    $("#nomFamily2").html("Familia: " +cursos.nomFamilia);
    var tipoEstudi = cursos.id_estudis;
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

    $("#descipcion").html(cursos.descripcio_llarga);

    $("#duracion").html("<p>La duració del curs serà de: " + cursos.duracio + ". Una cinquena part \n\
    d'aquestes hores, es faran en centre de treball com a pràctiques.</p><p>El cost total del curs es de\n\
     " + cursos.preu + "€ aproximadament.");

}

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
}


});
