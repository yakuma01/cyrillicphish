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
<h1 style="color:#800000;text-align:center;">Выберите, пожалуйста, Вашу страну. / Моля, изберете Вашата страна.</h1>
    <section class="intro" style="background-color:white;">
        <div class="container">
            <div class="row">
                <div class="twelve columns section-header centered">
                    
                    <!--<h6>Introducing Usable Security</h6>-->
                </div>
            </div>
               
            <div style="background-color:white;"> 
              <table align="center">
                <tr>
                  <td><a href="action.php?country=US&typeRadios=mturk&tt=0" title="Russia"><img src="Images/RU.png" height=125px width=175px style="border:1px solid black;"></a></td>
                  <td><img src="Images/filler.jpg" height=100px width=100px></td>
                  <td><a href="action.php?country=US&typeRadios=mturk&tt=0" title="Ukraine"><img src="Images/UK.png" height=125px width=175px style="border:1px solid black;"></a></td>
                  <td><img src="Images/filler.jpg" height=100px width=100px></td>
                  <td><a href="action.php?country=US&typeRadios=mturk&tt=0" title="Belarus"><img src="Images/BEL.png" height=125px width=175px style="border:1px solid black;"></a></td>
                  <td><img src="Images/filler.jpg" height=100px width=100px></td>
                  <td><a href="action.php?country=NZ&typeRadios=mturk&tt=0" title="Bulgaria"><img src="Images/BG.png" height=125px width=175px style="border:1px solid black;"></a></td>
                  <td></td>
                  <!-- <td><a href="action.php?country=CA&typeRadios=mturk&tt=0" title="Canada"><img src="Images/CA.jpg" height=220px width=220px></a></td> -->
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="country" style="background-color:white;">
                    <td style="font-weight:bold; font-size:20px">Россия</td>
                    <td><img src="Images/filler.jpg" height=100px width=100px></td>
                    <td style="font-weight:bold; font-size:20px">Украина</td>
                    <td><img src="Images/filler.jpg" height=100px width=100px></td>
                    <td style="font-weight:bold; font-size:20px">Беларусь</td>
                    <td><img src="Images/filler.jpg" height=100px width=100px></td>
                    <td style="font-weight:bold; font-size:20px">България</td>
                    <!--<td style="font-weight:bold;">Canada</td>-->
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
          <p class="showblock" style="padding: 5px;text-align: center;background-color: white;color: gray;" onclick="showcollab()">Learn about the collaborators /  Узнайте больше о нашей команде. / Разберете повече за нашия отбор. </p>
  <div id="panel" style="padding: 5px;background-color: black;color: white;text-align:center;display: none;">
  <p>L Jean Camp,  Marthie Grobler,   Julian Jang-Jaccard,   Christian Probst, Karen Renaud, Paul Watters</p>
    <p> DongInn Kim,  Jacob Abbott, Sanchari Das, Andrew Kim, Tim Kelley, Vafa Andalibi, Jayati Dev, William Smeal, Yash Kumar</p>
  </div>
                <div class="twelve columns centered">&copy; 2015-<?php echo date("Y"); ?> <a href="http://usablesecurity.net/">HATS</a>. All Rights Reserved.
                </div>
              
            </div>
        </div>
    </section>


</body></html>
