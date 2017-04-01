<html>
	<head>
		<link rel="stylesheet" href="https://s3.amazonaws.com/codecademy-content/projects/bootstrap.min.css">
		<link rel="stylesheet" href="./pong.css">
                <link rel ="stylesheet" href="./../navbar.css">
		<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
                <script type='text/javascript' src='./pong.js'></script>
                <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
		<title>Pong</title>
	</head>
	<body>
                <?php include("../navbar.html"); ?> 
        	<div class="main">
			<div class="container">
				<div class="stick" id ="AI"></div>
				<div id="ball"></div>
				<div class="stick" id="player"></div>
			</div>
			<p>Score</p>
		</div>
	</body>
</html>