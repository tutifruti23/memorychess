<?php
$db_host='sql.rezacz.nazwa.pl';
$db_user = 'rezacz_bandb';
$db_password = 'Haslo123';
$db_name="rezacz_bandb";
	$name = $_GET['name'];
	$score = $_GET['score'];
	$type = $_GET['type'];
	$level = $_GET['level'];
	$polaczenie = new mysqli($db_host,$db_user,$db_password ,$db_name);
	$polaczenie->query("INSERT INTO `results`(`Score`, `Name`, `Type`, `Level`) VALUES ($score,'$name',$type,$level)");
	$polaczenie->close();
?>