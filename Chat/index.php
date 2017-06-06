<html>
  <head>
    <title>Anonymous Chat Room</title>
    <link href="http://s3.amazonaws.com/codecademy-content/courses/ltp2/css/bootstrap.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link href="style.css" rel="stylesheet">
    <link href="../navbar.css" rel="stylesheet">
  </head>
  <body>
    <?php include("../navbar.html");
    ?>
    <div class="container">
      <form>
        <div class="form-group">
          <textarea class="form-control status-box" rows="2" placeholder="What's on your mind?"></textarea>
        </div>
      </form>
      <div class="button-group pull-right">
        <p class="counter">140</p>
        <a href="#" class="btn btn-primary">Post</a>
      </div>

      <ul class="posts">
      </ul>
    </div>

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="./app.js"></script>

  </body>
</html>
