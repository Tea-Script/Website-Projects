<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
$posts = 0;
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      if(file_exists("chat.txt")){
          echo file_get_contents("chat.txt"); //submit csv messages to post
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      break;

  case 'POST':
      if(isset($_POST['send'])){
        if($posts >= 5){
          file_put_contents("chat.txt", ''); //empty file
          $posts = 0;
        }

        $msg = $_POST['send'];
        $f = fopen($home . "chat.txt", 'a');
        fwrite($f, $msg . ",");
        fclose($f);
        echo $posts;
        $posts += 1;
      }
      elif(isset($_POST['req'])){
        echo $posts;
      }
     break;
}

?>
