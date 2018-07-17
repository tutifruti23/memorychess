<?php
$db_host='sql.rezacz.nazwa.pl';
$db_user = 'rezacz_bandb';
$db_password = 'Haslo123';
$db_name="rezacz_bandb";
	$type = $_GET['type'];
	$level = $_GET['level'];
	$polaczenie = new mysqli($db_host,$db_user,$db_password ,$db_name);
	$result=$polaczenie->query("SELECT Name,Score FROM `results` WHERE Type=$type AND Level=$level ORDER BY Score LIMIT 10");
	$results=array();
    while($row=$result->fetch_assoc()){
        array_push($results,array(
            'name'=>$row['Name'],
            'points'=>$row['Score']
        ));
    }
	$polaczenie->close();
    echo json_encode($results);
?>