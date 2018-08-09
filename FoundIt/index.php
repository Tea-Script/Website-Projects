<html>

<head>
  <title>FoundIt - The app for people to share cool things they find</title>
  <!--<link rel="stylesheet" href="https://s3.amazonaws.com/codecademy-content/projects/bootstrap.min.css">-->
  <link rel ="stylesheet" href="./../navbar.css">
  <link rel="stylesheet" href="./FoundIt.css">


</head>
<body>
  <?php include("../navbar.html"); ?>
  <button id="b1">About This Project</button>
  <button id="b2">What stage is the project in now?</button>
  <button id="b3">Where is the project going</button>
  <section id="s1"> The purpose of this project is to create a platform for many users to submit interesting items or animal sightings to other users to allow other users to find things that may interest them.
                    I got the idea while looking for bunnies on BU campus. I realized it would be nice if people could let other people know where it is. Then I thought that this could have uses for people looking for lost pets, people wondering where public transportation is,
                    or tourists looking for sights in the woods. So I decided to make this my first app project. I'm using the Maps API, sql, Android, php, and flask.
  </section>
  <section id="s2">At the moment I have constructed the basics for the client side UI. You can tap the map to add sightings of things and theres a button to move to your location.
    You can also tap the pins that have been dropped to see the user inputted description of what they found.
    I am working on the basic serverside script for receiving locations, storing in the database, and sending them out to users nearby.</section>
  <section id="s3">I intend to have accounts, a sign in page, a settings page with undetermined settings, facebook sharing, filterable categories, a friends list (for filtering by friends), and the ability to take pictures.
    I will also have to find an efficient way to load only nearby findings to the map. This would only be a problem if there were many users, but it is important to write clean efficient code to prepare for whatever may happen.
    Due to the large scope of this project it will likely not reach completion for a few years.
  </section>


</body>

</html>
