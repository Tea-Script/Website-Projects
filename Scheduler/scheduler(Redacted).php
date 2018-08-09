<?php
$con = mysqli_connect("localhost","admin name","password","database name");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  die();
}
error_reporting(E_ALL);
ini_set('display_errors', 'on');
//TODO: User Tables and Accounts
switch($_SERVER['REQUEST_METHOD']){
  case 'GET':
    if(isset($_GET['id'])){
      $id = $_GET['id'];
      $sql = "SELECT evt FROM evts WHERE user_id = ?;";
      $evts = Array();
      $stmt = mysqli_prepare($con, $sql);

      /* bind parameters for markers */
      mysqli_stmt_bind_param($stmt, "s", $id);

      /* execute query */
      mysqli_stmt_execute($stmt);

      $result = $stmt->get_result();
      while ($row = $result->fetch_assoc()){
          $evts[] = $row['evt'];
      }

    /* close statement */
    mysqli_stmt_close($stmt);
      // while($row = $stmt->fetch()){
      //   $evts[] = $row["evt"];
      // }
      // $stmt->close();
      //$result = mysqli_query($con, $sql);

      $evt = join("\t", $evts);
      echo $evt;
    }
    break;
  case 'POST':
    if(isset($_POST['send'])){
      $sched = $_POST['send'];
      $id = $_POST['id'];
      $sql = "INSERT INTO evts (evt, user_id) VALUES (?, ?);";
      if (!$stmt = $con->prepare($sql))
        die('Query failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->bind_param('ss', $sched, $id))
        die('Bind Param failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->execute())
        die('Insert Error ' . $con->error);

      echo "Record added ";
      $stmt->close();
      //mysqli_query($con, $sql);
      echo $sched;
    }
    elseif(isset($_POST['req'])){
      $id = $_POST['id'];
      $sql = "SELECT COUNT(evt) AS 'count' FROM evts WHERE user_id = ?;";
      if (!$stmt = $con->prepare($sql))
        die('Query failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->bind_param('s', $id))
        die('Bind Param failed: (' . $con->errno . ') ' . $con->error);

      if (!$stmt->execute())
        die('Insert Error ' . $con->error);
      $stmt->store_result();
      if($row = $stmt->fetch()){
        $evts = $row['count'];
      }
      $stmt->close();
      //$result = mysqli_query($con, $sql);
      //$row = mysqli_fetch_assoc($result);
      //$evts = $row['count'];
      echo $evts;
    }
    elseif(isset($_POST['rm'])){
      $id = $_POST['id'];
      $entry = $_POST['rm'];
      $sql = "DELETE FROM evts WHERE evt = ? and user_id = ?;";
      if (!$stmt = $con->prepare($sql))
        die('Query failed: (' . $con->errno . ') ' . $con->error);
      if (!$stmt->bind_param('ss', $entry, $id))
        die('Bind Param failed: (' . $con->errno . ') ' . $con->error);
      if (!$stmt->execute())
        die('Delete Error ' . $con->error);
      $stmt->close();
      //mysqli_query($con, $sql);
      echo "event deleted";
    }
    break;
}
mysqli_close($con);


?>
