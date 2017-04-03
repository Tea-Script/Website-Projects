<?php
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      if(isset($messages)){
          echo json_encode($messages); //submit array of messages to post
      }
      else{
          echo ""; //app.js only posts if it receives a non null input to callback function
      }
      unset($messages);
      break;

  case 'POST':
      $msg = $_POST['send'];
      if(isset($messages)){
          $messages[] = $msg;
      }
      else{
        static $messages = array($msg);
      }
      echo "Message: $msg posted";
      break;
}

?>
