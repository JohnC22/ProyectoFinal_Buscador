
//-----Sección para obtener las opciones encontradas en la base de datos-----//

$(document).ready(LoadOptions);

function LoadOptions(){
  $.ajax({
    url: "./php/index.php",
    type: "POST",
    data: {}
  }).done(function(data){
    if (data === "No data") {
      alert("No se encontraron opciones en la base de datos")
    }else {
      var newdata = JSON.parse(data);
      document.getElementById("selectCiudad").innerHTML = `
        ${optionsCiudad(newdata.ciudad)}
      `;
      document.getElementById("selectTipo").innerHTML = `
        ${optionsTipo(newdata.tipo)}
      `;
    }
  });
}

//--------Funciones para imprimir en el html las opciones encontradas--------//

function optionsCiudad(newdata){
  return `
  <option value="" disabled selected>Elija una ciudad</option>
  ${newdata.map(imprimirCiudad).join("")}
  `;
}

function imprimirCiudad(data){
  return `
  <option value="${data}">${data}</option>
  `;
}

function optionsTipo(newdata){
  return `
  <option value="" disabled selected>Elige un tipo</option>
  ${newdata.map(imprimirTipo).join("")}
  `;
}

function imprimirTipo(data){
  return `
  <option value="${data}">${data}</option>
  `;
}

//-----------------Sección para imprimir todos los registros-----------------//

document.getElementById("mostrarTodos").onclick = imprimirTodos;

function imprimirTodos(){

  var ciudad = "";
  var tipo = "";
  var valorMin = "";
  var valorMax = "";

  $.ajax({
    url: "./php/getData.php",
    type: "POST",
    data: {
      ciudad:     ciudad,
      tipo:       tipo,
      valorMin:   valorMin,
      valorMax:   valorMax
    }
  }).done(function(data){
    if (data === "No data") {
      document.getElementById("resultados").innerHTML = `

      `;
      alert("Lo sentimos pero no encontramos ningun resultado");
    }else {
      var newdata = JSON.parse(data);
      var Count = Object.keys(newdata).length;
      document.getElementById("resultados").innerHTML = `
        ${imprimir(newdata)}
      `;
    }
  });
}

//---------------Sección para imprimir los registros filtrados---------------//

document.getElementById("submitButton").onclick = GetData;

function GetData(){

  var ciudad = document.getElementsByName("ciudad")[0].value;
  var tipo = document.getElementsByName("tipo")[0].value;
  var precioMin = $('.irs-from').text();
  var precioMax = $('.irs-to').text();
  var valorMin = (precioMin.replace("$", "")).replace(" ", "");
  var valorMax = (precioMax.replace("$", "")).replace(" ", "");

  $.ajax({
    url: "./php/getData.php",
    type: "POST",
    data: {
      ciudad:     ciudad,
      tipo:       tipo,
      valorMin:   valorMin,
      valorMax:   valorMax
    }
  }).done(function(data){
    if (data === "No data") {
      document.getElementById("resultados").innerHTML = `

      `;
      alert("Lo sentimos pero no encontramos ningun resultado");
    }else {
      var newdata = JSON.parse(data);
      var Count = Object.keys(newdata).length;
      document.getElementById("resultados").innerHTML = `
        ${imprimir(newdata)}
      `;
    }
  });
}

//--------Funciones para imprimir en el html los resultados obtenidos--------//

function imprimir(newdata){
  return `
  <div class="card-panel col s12" style="border-radius: 5px !important; background-color: #f5f5f5;">
    <span class="">
      <h5>Se encontraron ${newdata.length} opciones</h5>
      ${newdata.map(resultados).join("")}
        </span>
      </div>
    </span>
  </div>
  `;
}

function resultados(data) {
  return `
  <div class="card-panel" style="border-radius: 5px;">
    <span class="black-text">
      <div class="row">
        <div class="col s5">
          <img src="img/home.jpg" alt="" style="max-width: 100% !important;">
        </div>
        <div class="col s7">
          <p>
            <b>Direccion:</b> ${data.Direccion}
            <br>
            <b>Ciudad:</b> ${data.Ciudad}
            <br>
            <b>Telefono:</b> ${data.Telefono}
            <br>
            <b>Codigo Postal:</b> ${data.Codigo_Postal}
            <br>
            <b>Tipo:</b> ${data.Tipo}
          </p>
          <p style="text-align: right; margin: 0px !important; padding: 0px !important; font-weight: bold; font-size: 25px">
            Precio: ${data.Precio}
          </p>
          <div style="text-align: right; margin: 0px !important; padding: 0px !important;">
            <button  type="button" class="btn-flat waves-effect" style="margin: 0px !important; border: 1px #bdbdbd solid; border-radius: 5px; color: gray;">VER MÁS</button>
          </div>
        </div>
      </div>
    </span>
  </div>
  `;
}
