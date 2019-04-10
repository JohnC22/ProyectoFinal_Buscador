<?php
  function options(){
    $data_file = fopen("../data/data-1.json","r");
    $data_readed = fread($data_file, filesize("../data/data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);

    $elementCount  = count($data);
    $j = 0;

    for ($i=0; $i < $elementCount; $i++) {
      $Ciudad[$i] =     $data[$i]["Ciudad"];
      $Tipo[$i] =       $data[$i]["Tipo"];
    }
    if ($i == 0) {
      echo "No data";
    }else {
      $ciudadList = array_values(array_unique($Ciudad));
      $tipoList = array_values(array_unique($Tipo));
      sort($ciudadList);
      sort($tipoList);
      $array = array(
        'ciudad' => $ciudadList,
        'tipo' => $tipoList
      );
      echo json_encode($array);
    }
  }
  options();
 ?>
