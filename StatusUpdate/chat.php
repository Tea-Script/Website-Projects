<?php
$messages = array();
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      if(!isempty($messages)){
          echo json_encode($messages); //submit array of messages to post
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      global $messages = array();
      break;

  case 'POST':
      $msg = $_POST['send'];
      global $messages[] = $msg;

      echo "Message: $msg posted";
      break;
}

?>
