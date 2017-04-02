<?php
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':
      echo "<script type='text/javascript'>alert('GET');</script>";
      break;

  case 'POST':
      $msg = $_POST['send'];
      //echo "'$msg'";
      echo "<script type='text/javascript'>alert('POST');</script>";
      break;
}


function post($msg){
  echo "<script type='text/javascript'>$('<li>').text('dummy message').prependTo('.posts');console.log('successful php');</script>";
  //exit;
}
?>
