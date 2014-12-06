<? ob_start ();?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>%TITLE%</title>
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
	<link href='http://fonts.googleapis.com/css?family=Ubuntu:400,500' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
	<?php include 'assets/variables.php'; ?>
	<h1><a href=" <?php  Echo '$home'?>"><span>UI</span>Brush</a></h1>
	<nav>
		<div id="trigger" class="fa fa-bars"></div>
		<ul>
			<li><?php Echo "<a href=$home>Home</a>"; ?></li>
			<li><?php Echo "<a href=$about_us>About Us</a>"; ?></li>
			<li><?php Echo "<a href=$services>Services</a>"; ?></li>
			<li><?php Echo "<a href=$portfolio>Portfolio</a>"; ?></li>
			<li><?php Echo "<a href=$contact_us>Contact Us</a>"; ?></li>
		</ul>
		<div id="highlight">
			<div id="gizmo" div></div>
		</div>
	</nav>
</header>