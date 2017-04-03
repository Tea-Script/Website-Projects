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
      if($posts >= 50){
        file_put_contents("chat.txt", '');
        echo true;
      }

      $msg = $_POST['send'];
      $f = fopen($home . "chat.txt", 'a');
      fwrite($f, $msg . ",");
      fclose($f);
      $posts += 1;

      break;
}

?>
