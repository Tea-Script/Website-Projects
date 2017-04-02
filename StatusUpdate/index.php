<html>
  <head>
    <link href="http://s3.amazonaws.com/codecademy-content/courses/ltp2/css/bootstrap.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link href="style.css" rel="stylesheet">
    <link href="../navbar.css" rel="stylesheet">
  </head>
  <body>
    <?php include("../navbar.html"); ?>
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
    <?php echo "<script type='text/javascript'>alert('This page is under construction');</script>";
          if($_POST){
            if(isset($_POST["function"])){
              switch ($_POST["function"])
              {
                case 'post':
                  post($_POST["message"]);
                  break;
              }
            }


          }

          function post($msg){
            echo "<script>
                      $('<li>').text(" . $msg . ").prependTo('.posts');
                  </script>" ;
            exit;
          }

/*
    switch($_SERVER['REQUEST_METHOD'])
    {
      case 'GET':
        if(file_exists('chat.txt') && filesize('chat.txt') > 0){
          $filesize = filesize('chat.txt');
          $f = fopen('chat.txt', "a+");
          $line = fread($f, $filesize);
          $line = htmlspecialchars(str_replace("\n", "", $line));
          echo "<script> post = '" . $line  . "';</script>";
          fclose($f);
          fclose(fopen('chat.txt', 'w'));

        }



        break;

      case 'POST':
        $function = $_POST['function'];
        $log = Array();
        switch ($function) {
          case('send'):
            $message = strip_tags($_POST['message']);
            $f = fopen('chat.txt', 'w');
            fwrite($f, $message);
            fclose($f);
            break;
        }
    }*/

    ?>
  </body>
</html>
