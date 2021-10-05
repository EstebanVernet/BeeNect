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
      $result = $dblink->query("SELECT * FROM beenect_data ORDER BY curtime DESC LIMIT 150");

    //Initialize array variable
      $dbdata = array();

    //Fetch into associative array
      while ( $row = $result->fetch_assoc())  {
        $dbdata[]=$row;
      }

    //Print array in JSON format
     echo json_encode($dbdata);
?>