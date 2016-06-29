// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function($) {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

   // Donde consultar las pelis. Por defecto España
  var seriesUrl = "http://api.tvmaze.com/schedule?country=ES";

  // Funcion para pedir las series
  function drawSeries(url) {
    // Hacemos petición AJAX para obtener las películas de la API
    $.getJSON(seriesUrl, function(result) {

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
  }

  // Función para generar la fecha de hoy como una cadena formateada al estilo español
  function getTodayDate() {
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

    return today;
  }

  // Manejadores de eventos
  $("#flag-es").on('click', function(event) {

    $("#series").text("Cargando series España...");
    seriesUrl = "http://api.tvmaze.com/schedule?country=ES";
    drawSeries(seriesUrl);
  });

  $("#flag-us").on('click', function(event) {
    $("#series").text("Cargando series USA...");

    seriesUrl = "http://api.tvmaze.com/schedule?country=US";
    drawSeries(seriesUrl);
  });


  // Por aqui empezamos. Esto se ejecuta al cargar la pagina
  $(document).ready(function() {

    // Pone la fecha de hoy y dibuja la lista de series
    $("#fechahoy").text(getTodayDate);
    drawSeries(seriesUrl);

  });


})($);
