<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':

      $posts = 0;
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
        fwrite($f, $msg . ",");
        fclose($f);
        echo $msg;
      }
      elseif(isset($_POST['req'])){
        file_put_contents('chat.txt', "");
        echo 0;
      }
     break;
}

?>
