<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      if(file_exists('chat.txt')){
          echo file_get_contents('chat.txt'); //submit csv messages to post
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      file_put_contents('chat.txt', '');
      break;

  case 'POST':
      $f = fopen('chat.txt', 'a');
      fwrite($f, $msg . ",");
      fclose($f);
      echo "Message: $msg posted";
      break;
}

?>
