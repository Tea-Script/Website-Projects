<?php
$con = mysqli_connect("localhost","chatadmin","firefly64","chatdb");

// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else{
  echo "Sucess";
  echo "<script>alert('Success');</script>";
}

error_reporting(E_ALL);
ini_set('display_errors', 'on');
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':

      if(file_exists("chat.txt")){
          //$posts = count(preg_split("," , file_get_contents("chat.txt"))) - 1;
          echo file_get_contents("chat.txt"); //submit csv messages to post
          //if($posts >= 7){
          //}
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      break;

  case 'POST':
      if(isset($_POST['send'])){
        $msg = $_POST['send'];
        $f = fopen("chat.txt", 'a');
        fwrite($f, "\n" . $msg );
        fclose($f);
        echo $msg;
      }
      elseif(isset($_POST['req'])){
        $posts = count(file("chat.txt"));
        if($posts > 50 || $posts <= 0){
          file_put_contents('chat.txt', "");
          $posts = 0;
        }
        echo $posts;
      }
     break;
}

?>
