<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

if(!isset($messages)){
  $messages = array();
}
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      if(! empty($messages)){
          echo json_encode($messages); //submit array of messages to post
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      $messages = array();
      break;

  case 'POST':
      $msg = $_POST['send'];
      $messages[] = $msg;
      echo "Message: $msg posted";
      break;
}

?>
