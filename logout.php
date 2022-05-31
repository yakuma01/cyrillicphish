<?php

    /**
     * Clears the session variable set by this class, and sends a request to CAS to logout.
     *
     * @return bool Whether the CAS remote call was successful.
     */
function logout()
{
//    $this->setUserName(null);
    $curl = curl_init();
    $url = "https://cas.iu.edu/cas/logout";
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5);
    ob_start();
    $success = curl_exec($curl);
    if ($errNum = curl_errno($curl)) {
      echo "Logout failed";
    }
    curl_close($curl);
    ob_end_clean();
}


// Initialize the session
session_start();
 
if(isset($_SESSION['valid']) && ($_SESSION['valid'] == 1 || $_SESSION['valid'] == true)){
  // Unset all of the session variables
  $_SESSION = array();
  $_POST = array();
  $_GET = array();
  header("location: https://cas.iu.edu/cas/logout");
}else{
  // Unset all of the session variables
  $_SESSION = array();
  $_POST = array();
  $_GET = array();

  // Destroy the session.
  session_destroy();

  // Redirect to login page
  header("location: index.php");
}

exit;
?>
