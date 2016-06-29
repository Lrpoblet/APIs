// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function($) {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

  // El token para poder hacer la llamada sin error de CORS
  var token = "c04e4ac3a35a4dbea4a389de79e82e6a";

  // Funcion para pedir las series
  function drawTables(url) {

    // Hacemos petición AJAX para obtener las películas de la API
    $.ajax({
      url: url,
      headers: {
        'X-Auth-Token': token
      },
      success: function(result) {
        $("#title").text(result.leagueCaption);

        $.each(result.standings, function(index, teamArray) {

          // Eliminamos el mensaje de cargando
          $("#" + index + " > tbody > tr").remove();

          // Creamos las columnas necesarias
          $.each(teamArray, function(i, team) {

            var row = $("<tr>");

            var col = $("<td>");
            var img = $("<img>");
            img.attr("src", team.crestURI);
            img.attr("width", "16px");
            img.attr("height", "16px");

            col.html(img);
            row.append(col);

            col = $("<td>");
            col.text(team.rank);
            row.append(col);

            col = $("<td>");
            col.text(team.goals);
            row.append(col);

            col = $("<td>");
            col.text(team.goalsAgainst);
            row.append(col);

            // Añadimos esa fila a la tabla que corresponda
            $("#" + index + " > tbody:last-child").append(row);
          });



        });
      }
    });
  }



  // Por aqui empezamos. Esto se ejecuta al cargar la pagina
  $(document).ready(function() {

    // Pone la fecha de hoy y dibuja la lista de series
    drawTables("http://api.football-data.org/v1/soccerseasons/424/leagueTable");

  });


})($);
