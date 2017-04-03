<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
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
        $msg = $_POST['send'];
        $f = fopen($home . "chat.txt", 'a');
        fwrite($f, $msg . ",");
        fclose($f);
        echo $msg;
      }
      elseif(isset($_POST['req'])){
        $posts = 0;
        if(file_exists("chat.txt")){
          $posts = count(preg_split("," , file_get_contents("chat.txt"))) - 1;
        }
        echo $posts;

      }
     break;
}

?>
