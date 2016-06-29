// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function($) {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

  // Esperamos a que la página se cargue para poner la fecha de hoy
  $(document).ready(function() {

    // Formatea la fecha de hoy (sacado de http://stackoverflow.com/a/4929629/593722)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;

    // La añade en el span
    $("#fechahoy").text(today)
  });


  // Hacemos petición AJAX para obtener las películas de la API
  $.getJSON("http://api.tvmaze.com/schedule?country=US", function(result) {

    var list = $("<ul>");

    // result será un array y cada elemento una peli
    $.each(result, function(i, field) {
      var serie = $("<li>");

      var link = $("<a />", {
        href: field.url,
        text: "S" + field.season + "E" + field.number + " de " + field.show.name
      });

      serie.html(link);

      list.append(serie);

    });

    $("#series").html(list);

  });



})($);
