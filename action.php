<?php
  //check to see if they are using Firefox
session_start();

// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//if(!(isset($_GET['typeRadios']) && ($_GET['typeRadios'] == 'iu')) 
//  && (isset($_GET['typeRadios']) && $_GET['typeRadios'] == 'mturk') 
//  && (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) 
//  && !(isset($_GET['authcheck']) && $_GET['authcheck']) 
//  && !isset($_GET['casticket'])){
//    $type = isset($_GET['typeRadios'])?$_GET['typeRadios']:"";
//    $tt =  isset($_GET['tt'])?$_GET['tt']:"";
//    $country =  isset($_GET['country'])?$_GET['country']:"";
//    header("location: login.php?country=". $country . "&typeRadios=" . $type . "&tt=" . $tt);
//    exit;
//}

$agent = $_SERVER['HTTP_USER_AGENT'];


$_SESSION['firefox'] = '/Firefox/';


$isFirefox = preg_match($_SESSION['firefox'],$agent);

?>
<?php
$group = 0;
//if($isFirefox){
    if(isset($_GET['authcheck']) && $_GET['authcheck'] == 'true'){ //check for IU access
      if($_SESSION['valid'] == true || $_SESSION['valid'] == 1){
        require_once('PHP/sisSite.php');
      } else {
        echo 'CAS Session already used. Please close and reopen Firefox browser.';
      }
    } elseif(isset($_GET['casticket'])){ //validate cas ticket
      $_SESSION['casticket'] = $_GET['casticket']; //Perm sets ticket, so you can only login once
      require_once('PHP/casauth.php');
    } else {
      //look for TT and Type
#if(isset($_POST["country"])){
#  $_SESSION["country"] = $_POST["country"];
#  echo "Country: ", $_POST["country"];
#}
#if(isset($_POST["tt"])){
#  $_SESSION["tt"] = $_POST["tt"];
#  echo "tt: ", $_POST["tt"];
#}
#if(isset($_POST["typeRadios"])){
#  $_SESSION["typeRadios"] = $_POST["typeRadios"];
#  echo "typeRadios: ", $_POST["typeRadios"];
#}
      if(isset($_GET['tt']) && isset($_GET['typeRadios'])  && isset($_GET['country'])){
        $_SESSION['tt']=$_GET['tt']; //Time = 0, Accuracy = 1
        $_SESSION['type']=$_GET['typeRadios']; //iu or mturk or inv
        $_SESSION['group'] = $group;
        if(isset($_GET['group'])){
          $_SESSION['group']=$_GET['group']; // 0: no tool
                                             // 1: low risk high security
                                             // 2: medium risk
                                             // 3: high risk low security
        }
        $_SESSION['country']=$_GET['country']; // US: United States
                                                           // GB: United Kingdom (UK)
                                                           // ZA: South Africa
                                                           // AU: Australia
                                                           // NZ: New Zealand
        if($_SESSION['group'] < 0 || $_SESSION['group'] > 3){
            echo "Please make sure that you put the correct testing parameters (e.g. group should be 0, 1, 2, or 3)";
        }else{
          if($_SESSION['type'] == 'mturk' || $_SESSION['type'] == 'MTURK' ) { //mturk
              require_once('PHP/sisSite.php');
          }
            else if($_SESSION['type'] == 'inv') { //inv
              require_once('PHP/sisSite.php');
          } elseif($_SESSION['type'] == 'iu' || $_SESSION['type'] == 'IU' ) {//iu
              if($_SESSION['country'] == 'US'){
                require_once('PHP/casauth.php');
              }else{
                echo 'You can not experiment with the <b>IU</b> type in the <b>non-US</b> country';
              }
          }
            else if($_SESSION['type'] == 'account') { //local account
              if(isset($_GET['updated']) && $_GET['updated'] == 't'){
                echo "<font color='red'>Your participant code is successfully updated!</font>";
              }
              require_once('PHP/sisSite.php');
          } else {
#            echo "SESSION:TYPE", $_SESSION['type'], "<br/>";
#            echo "SESSION:country", $_SESSION['country'], "<br/>";
            echo 'There seems to be an error in your study type. Please contact and administrator.';
          }
        }
      }elseif(isset($_POST['tt']) && isset($_POST['typeRadios'])  && isset($_POST['country'])){
        $_SESSION['tt']=$_POST['tt']; //Time = 0, Accuracy = 1
        $_SESSION['type']=$_POST['typeRadios']; //iu or mturk or inv or account
        $_SESSION['group'] = $group;
        if(isset($_POST['group'])){
          $_SESSION['group']=$_POST['group']; // 0: no tool
                                             // 1: low risk high security
                                             // 2: medium risk
                                             // 3: high risk low security
        }
        $_SESSION['country']=$_POST['country']; // US: United States
                                                           // GB: United Kingdom (UK)
                                                           // ZA: South Africa
                                                           // AU: Australia
                                                           // NZ: New Zealand

        if($_SESSION['group'] < 0 || $_SESSION['group'] > 3){
            echo "Please make sure that you put the correct testing parameters (e.g. group should be 0, 1, 2, or 3)";
        }else{
          if($_SESSION['type'] == 'mturk' || $_SESSION['type'] == 'MTURK' ) { //mturk
              require_once('PHP/sisSite.php');
          }
              else if($_SESSION['type'] == 'inv') { //inv
              require_once('PHP/sisSite.php');
          } elseif($_SESSION['type'] == 'iu' || $_SESSION['type'] == 'IU' ) {//iu
              if($_SESSION['country'] == 'US'){
                require_once('PHP/casauth.php');
                echo "<div id=\"countrycode\">" . $_SESSION['country'] . "</div>";
              }else{
                echo 'You can not experiment with the <b>IU</b> type in the <b>non-US</b> country';
              }
          } else if($_SESSION['type'] == 'account') { //local account
              require_once('PHP/sisSite.php');
          } else {
            echo 'There seems to be an error in your study type. Please contact and administrator.';
          }
        }
      } else {
        echo 'please make sure correct testing parameters are set';
      }
    }
//}
//else{
 // echo 'It appears that you are not using a recognized version of Firefox. Please return to view this HIT using Firefox, as we have some functionality that requires Firefox, and we want to make sure you do not have further problems with this HIT.';
//}
//
//if(empty($_SESSION))
//{
//    echo "<!DOCTYPE html>";
//    echo "<p>There is no session</p>";
//}else{
//    echo "<!DOCTYPE html>";
//    echo "<pre>";
//    print_r($_SESSION);
//    echo "</pre>";
//}
?>
