<?php

//------Función que se comunica con la base de datos y filtra los mismos------//

function GetData(){

  $ciudadFormulario = $_POST['ciudad'];
  $tipoFormulario = $_POST['tipo'];
  $valorMinFormulario = $_POST['valorMin'];
  $valorMaxFormulario = $_POST['valorMax'];

  $data_file = fopen("../data/data-1.json","r");
  $data_readed = fread($data_file, filesize("../data/data-1.json"));
  $data = json_decode($data_readed, true);
  fclose($data_file);

  $elementCount  = count($data);
  $j = 0;

  if ($ciudadFormulario != "" && $tipoFormulario == "") {
    for ($i=0; $i < $elementCount; $i++) {
      $precio = str_replace(",",'', (str_replace("$",'', $data[$i]["Precio"])));
      if ($data[$i]["Ciudad"] == $ciudadFormulario && $valorMinFormulario <= $precio && $precio <= $valorMaxFormulario) {
        $array[$j] = array(
          "Id"              =>    $data[$i]["Id"],
          "Direccion"       =>    $data[$i]["Direccion"],
          "Ciudad"          =>    $data[$i]["Ciudad"],
          "Telefono"        =>    $data[$i]["Telefono"],
          "Codigo_Postal"   =>    $data[$i]["Codigo_Postal"],
          "Tipo"            =>    $data[$i]["Tipo"],
          "Precio"          =>    $data[$i]["Precio"]
        );
        $j++;
      }
    }
  }
  elseif ($ciudadFormulario == "" && $tipoFormulario != "") {
    for ($i=0; $i < $elementCount; $i++) {
      $precio = str_replace(",",'', (str_replace("$",'', $data[$i]["Precio"])));
      if ($data[$i]["Tipo"] == $tipoFormulario && $valorMinFormulario <= $precio && $precio <= $valorMaxFormulario) {
        $array[$j] = array(
          "Id"              =>    $data[$i]["Id"],
          "Direccion"       =>    $data[$i]["Direccion"],
          "Ciudad"          =>    $data[$i]["Ciudad"],
          "Telefono"        =>    $data[$i]["Telefono"],
          "Codigo_Postal"   =>    $data[$i]["Codigo_Postal"],
          "Tipo"            =>    $data[$i]["Tipo"],
          "Precio"          =>    $data[$i]["Precio"]
        );
        $j++;
      }
    }
  }
  elseif ($ciudadFormulario != "" && $tipoFormulario != "") {
    for ($i=0; $i < $elementCount; $i++) {
      $precio = str_replace(",",'', (str_replace("$",'', $data[$i]["Precio"])));
      if ($data[$i]["Ciudad"] == $ciudadFormulario && $data[$i]["Tipo"] == $tipoFormulario  && $valorMinFormulario <= $precio && $precio <= $valorMaxFormulario) {
        $array[$j] = array(
          "Id"              =>    $data[$i]["Id"],
          "Direccion"       =>    $data[$i]["Direccion"],
          "Ciudad"          =>    $data[$i]["Ciudad"],
          "Telefono"        =>    $data[$i]["Telefono"],
          "Codigo_Postal"   =>    $data[$i]["Codigo_Postal"],
          "Tipo"            =>    $data[$i]["Tipo"],
          "Precio"          =>    $data[$i]["Precio"]
        );
        $j++;
      }
    }
  }
  if ($j == 0) {
    if ($valorMinFormulario == "" && $valorMaxFormulario == "") {
      echo json_encode($data);
    }else {
      echo "No data";
    }
  }else {
    echo json_encode($array);
  }
}
GetData();

?>
