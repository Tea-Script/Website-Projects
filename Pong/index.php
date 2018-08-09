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
      
    		<div class="numplayers">
				<h1>Select how many players there will be!</h1>
				<span class="Pbutton" id="P0" onclick="setTimeout( () =>{setPlayers(-1)}, 100)">No Player</span> 
				<span class="Pbutton" id="P1" onclick="setTimeout( () =>{setPlayers(0)}, 100)">Single Player</span> 
				<span class="Pbutton" id="P2" onclick="setTimeout( () =>{setPlayers(1)}, 100)">Two Player</span>
				
			</div>
			<div class="container" style="display:none">
				<div class="stick" id ="AI"></div>
				<div id="ball"></div>
				<div class="stick" id="player"></div>
			</div>
			<div id="score" style="display:none">
				<h3>Score</h3>
				<p class = "score"> Playing to 10</p>
				<p class = "score" id="playerScore"></p>
				<p class = "score" id="oppScore"></p>
			</div>
			<div class="gameover" id="gameover" style="display:none">
				<h2>Better luck next time!</h2>
				<span class="Pbutton" id="PAgain" onclick="location.reload()">Main Menu</span>

			</div>
			<div class="gameover" id="victory" style="display:none">
				<h2>Congratulations! You're the best!</h2>
				<span class="Pbutton" id="PAgain" onclick="location.reload()">Main Menu</span>

			</div>
		</div>
	</body>
</html>