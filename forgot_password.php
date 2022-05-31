<?php
session_start();
// Include config file
require_once "includes/config.php";
require_once "sendEmails.php";
 
if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']){
  header('location:index.php');
}
$type = isset($_GET['typeRadios'])?$_GET['typeRadios']:"";
$tt =  isset($_GET['tt'])?$_GET['tt']:"";
$country =  isset($_GET['country'])?$_GET['country']:"";

// Define variables and initialize with empty values
$email = $password = $confirm_password = $param_token = "";
$email_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $type = isset($_POST['typeRadios'])?$_POST['typeRadios']:"";
    $tt =  isset($_POST['tt'])?$_POST['tt']:"";
    $country =  isset($_POST['country'])?$_POST['country']:"";
 
    // Validate username
    if(empty(trim($_POST['email']))){
        $email_err = "Please enter a email.";
    }else{
      $email= trim($_POST["email"]);
      $email = filter_var($email, FILTER_SANITIZE_EMAIL);
      $email = filter_var($email, FILTER_VALIDATE_EMAIL);
      if (!$email) {
        $email_err .="<p>Invalid email address please type a valid email address!</p>";
      }else{
        $sql = "SELECT id, token FROM users WHERE email = ? LIMIT 1";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            
            // Set parameters
            $param_email= trim($_POST["email"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) != 1){
                    $email_err .= "I am sorry. Your email (" . $email .") is not registered.";
                }else{
                  mysqli_stmt_bind_result($stmt, $id, $token);
                  if(mysqli_stmt_fetch($stmt)){
                    $param_token = $token;
                  }
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.<br/>";
            }
        }
        // Close statement
        mysqli_stmt_close($stmt);
      }
      if($email_err==""){
        $expFormat = mktime(
          date("H"), date("i"), date("s"), date("m") ,date("d")+1, date("Y")
        );
        $expDate = date("Y-m-d H:i:s",$expFormat);
        //$key = md5(2418*2+$email);
        //$addKey = substr(md5(uniqid(rand(),1)),3,10);
        //$key = $key . $addKey;
        $key = bin2hex(openssl_random_pseudo_bytes(16));
        // Insert Temp Table
        $sql = "INSERT INTO `password_reset_temp` (`email`, `key`, `expDate`) VALUES (?, ?, ?)";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sss", $email, $key, $expDate);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                sendResetPasswordEmail($email, $key, $country, $param_token);
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        // Close statement
        mysqli_stmt_close($stmt);
      }

    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
<?php
if($country != ""){
  echo "<a href='index.php'><img src='Images/$country.jpg' style='margin:10px;' width='220px'></a>";
}
?>
    <div class="wrapper">
        <h2>Forgot your password?</h2>
        <p>Would you like to reset your password? Please enter your registered email: 
</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>    
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <input type="reset" class="btn btn-default" value="Reset">
                <input type="hidden" name="country" value="<?php echo $country; ?>" >
                <input type="hidden" name="typeRadios" value="<?php echo $type; ?>" >
                <input type="hidden" name="tt" value="<?php echo $tt; ?>" >
            </div>
            <p>Go back to <a href="login.php?country=<?php echo $country; ?>&typeRadios=<?php echo $type; ?>&tt=<?php echo $tt; ?>">Login?</a></p>
            <p>Don't have an account? <a href="register.php?country=<?php echo $country?>&typeRadios=<?php echo $type; ?>&tt=<?php echo $tt; ?>">Sign up now</a>.</p>
        </form>
    </div>    
</body>
</html>
