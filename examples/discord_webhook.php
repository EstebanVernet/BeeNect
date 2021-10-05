<?php
    $host = "MON HOST"; 
    $dbname = "NOM DE MA DATABASE";
    $username = "NOM UTILISATEUR";
    $password = "MOT DE PASSE";

    // Establish connection to MySQL database, using the inbuilt MySQLi library.
    $dblink = new mysqli($host, $username, $password, $dbname);

    //Check connection was successful
      if ($dblink->connect_errno) {
         printf("Failed to connect to database");
         exit();
      }

    //Fetch 3 rows from actor table
      $result = $dblink->query("SELECT * FROM beenect_data ORDER BY curtime DESC LIMIT 1");

    //Initialize array variable
      $dbdata = array();

    //Fetch into associative array
      while ( $row = $result->fetch_assoc())  {
        $dbdata[]=$row;
      }
      echo json_encode($dbdata);

      $temp = round($dbdata[0]['temperature']*10)/10;
      $humidity = round($dbdata[0]['humidity']*10)/10;

      $url = "LIEN DU WEBHOOK";
      $headers = [ 'Content-Type: application/json; charset=utf-8' ];
      $POST = [ 'username' => 'ma ruche' , 'content' => '---------------------------
      **Température** : '.$temp.'°C
      **Humidité** : '.$humidity.'%' ];

      echo $temp;
      echo '
      ';
      echo $humidity;

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($POST));
      $response = curl_exec($ch);
?>