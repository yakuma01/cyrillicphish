<?php
include("includes/header.php");
?>
  <script src="HATS_files/jquery.js"></script>
  <script src="HATS_files/bootstrap.js"></script>
  <script>
    function showcollab() {
      var boxshow = document.getElementById("panel");
      if (boxshow.style.display === "none") {
            boxshow.style.display = "block";
      } else {
            boxshow.style.display = "none";
  }
    }
  </script>
    <section class="verfication">
        <div class="container">
            <div class="row">
<?php
if(isset($_GET['verified']) && $_GET['verified'] == "1"){
  echo "<font color='red'>Welcome! <strong>" . $_SESSION['username'] . "</strong>, your email (". $_SESSION['email'] . ") is successully verified.</font>";
  echo "<br/>";
}
if(isset($_GET['action']) && $_GET['action'] == "updated"){
  echo "<font color='red'>Your password is successully updated.</font>";
  echo "<br/>";
}
?>
                </div>
            </div>
        </div>
    </section>



<hr style="height:5px;background-color:gray;">
<h1 style="color:#800000;text-align:center;">Please Select Your Country</h1>
    <section class="intro" style="background-color:white;">
        <div class="container-fluid">
            <div style="background-color:white;margin-left:15%;"> 
              <table>
                <tr>
                  <td><a href="action.php?country=RU&typeRadios=mturk&tt=0" title="Russia"><img src="Images/RU.jpeg" height=220px width=300px style="margin-left:20px; border:1px solid black"></a></td>
                  <td><a href="action.php?country=UA&typeRadios=mturk&tt=0" title="Ukraine"><img src="Images/UA.jpeg" height=220px width=300px style="margin-left:20px;border:1px solid black"></a></td>
                  <td><a href="action.php?country=BY&typeRadios=mturk&tt=0" title="Belarus"><img src="Images/BY.jpeg" height=220px width=300px style="margin-left:20px;border:1px solid black"></a></td>
                  <td><a href="action.php?country=BG&typeRadios=mturk&tt=0" title="Bulgaria"><img src="Images/BG.jpeg" height=220px width=300px style="margin-left:20px;border:1px solid black"></a></td>
                  
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="country" style="background-color:white;">
                    <td style="font-weight:bold;">Russia</td>
                    <td style="font-weight:bold;">Ukraine</td>
                    <td style="font-weight:bold;">Belarus</td>
                    <td style="font-weight:bold;">Bulgaria</td>
                    
                </tr>
              </table>
            </div>

<br>
            <div class="hats-row">
                    <!--<strong>Test Your Phishing Resilience</strong>
<p>Our vision is to use a set of well-understood, well-documented, and systematic method to explore phishing resilience. Currently we are offering phishing resilience testing only to recruited participants. 
</p>
<p>
  If you have a participant code please select the nation above.
</p>
<p>
  If you are a scholar who would like to participate or would like to sign up to test your resilience please select your country of residence to provide contact information.
</p>-->
                </div>
            </div>
        </div>
    </section>

<hr style="height:5px;background-color:gray;">
    <section class="copyright">
   
            <div class="row">
              <div class="container ">
          <p class="showblock" style="padding: 5px;text-align: center;background-color: white;color: gray;" onclick="showcollab()">Learn about the collaborators</p>
  <div id="panel" style="padding: 5px;background-color: black;color: white;text-align:center;display: none;">
  <p>L Jean Camp,  Marthie Grobler,   Julian Jang-Jaccard,   Christian Probst, Karen Renaud, Paul Watters</p>
    <p> DongInn Kim,  Jacob Abbott, Sanchari Das, Andrew Kim, Tim Kelley, Vafa Andalibi, Jayati Dev</p>
  </div>
                <div class="twelve columns centered">&copy; 2015-<?php echo date("Y"); ?> <a href="http://usablesecurity.net/">HATS</a>. All Rights Reserved.
                </div>
              
            </div>
        </div>
    </section>


</body></html>
