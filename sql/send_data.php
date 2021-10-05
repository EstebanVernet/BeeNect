<?php
    $host = "MON HOST"; 
    $dbname = "NOM DE MA DATABASE";
    $username = "NOM UTILISATEUR";
    $password = "MOT DE PASSE";

    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        echo "Connected to mysql database. ";
    }

  if(!empty($_POST['temperature']) && !empty($_POST['humidity']) ){

        $temperature = (float) $_POST['temperature'];
        $humidity = (float) $_POST['humidity'];
            
            date_default_timezone_set('Europe/Paris');

            $sql = "INSERT INTO beenect_data (temperature, humidity, curtime)
            VALUES ('".$temperature."','".$humidity."','".time()."')";

            if ($conn->query($sql) === TRUE) {

                echo "Values inserted in MySQL database table.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    $conn->close();
?>