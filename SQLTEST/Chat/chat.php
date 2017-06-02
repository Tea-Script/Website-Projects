<?php
$con = mysqli_connect("localhost","chatadmin","firefly64","chatdb");

// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  die();
}
error_reporting(E_ALL);
ini_set('display_errors', 'on');
switch($_SERVER['REQUEST_METHOD'])
{
  case 'GET':

      //TODO: lookup all the posts content and send them out
      $sql = "SELECT post from posts;";
      $row = mysqli_query($con, $sql);
      $row = mysqli_fetch_array($row);
      $post = join("\t", $row);

      break;

  case 'POST':
      if(isset($_POST['send'])){
        $msg = $_POST['send'];
        //TODO add message to database
        $sql = "INSERT INTO posts (post) VALUES (?);";
      if (!$stmt = $con->prepare($sql))
          die('Query failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->bind_param('s', $msg))
          die('Bind Param failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->execute())
              die('Insert Error ' . $con->error);

      echo "Record added";
      $stmt->close();

        mysqli_query($con, $sql);

        echo $msg;
      }
      elseif(isset($_POST['req'])){
        // COUNT number of posts in database
        $result = mysqli_query($con,"SELECT COUNT(DISTINCT post) AS 'count' FROM posts;");
        $row = mysqli_fetch_assoc($result);
        $posts = $row['count'];
        if($posts > 50 || $posts <= 0){
           //clear database
           mysqli_query($con, "TRUNCATE TABLE posts;");
          $posts = 0;
        }
        echo $posts;
      }
     break;
}
mysqli_close($con);

?>
