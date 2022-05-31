<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, otherwise redirect to login page
if(!isset($_GET['key']) && !isset($_POST['email']) && (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true)){
    header("location: login.php");
    exit;
}
 
// Include config file
require_once "includes/config.php";
 
// Define variables and initialize with empty values
$new_password = $confirm_password = "";
$new_password_err = $confirm_password_err = "";

$country = isset($_GET['country'])?$_GET['country']:"";

$protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
$isExpired = true;
if (isset($_GET["key"]) && isset($_GET["email"]) && isset($_GET["action"])
&& ($_GET["action"]=="reset") && !isset($_POST["action"])){
  $key = $_GET["key"];
  $email = $_GET["email"];
  $curDate = date("Y-m-d H:i:s");
  $sql = "SELECT expDate FROM `password_reset_temp` WHERE `key`= ? and `email`= ?";
  if($stmt = mysqli_prepare($link, $sql)){
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ss", $key, $email);

    if(mysqli_stmt_execute($stmt)){
      mysqli_stmt_store_result($stmt);
      // Check if username exists, if yes then verify password
      if(mysqli_stmt_num_rows($stmt) != 1){
        $error .= '<h2>Invalid Link</h2>
          <p>The link is invalid/expired. Either you did not copy the correct link
          from the email, or you have already used the key in which case it is
          deactivated.</p>
          <p><a href="'.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']) .'/forgot-password.php?country='.$country.'">
          Click here</a> to reset password.</p>';
      }else{
        mysqli_stmt_bind_result($stmt, $expDate);
        if(mysqli_stmt_fetch($stmt)){
          if ($expDate >= $curDate){
            $isExpired = false;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
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
        <h2>Reset Password</h2>
        <p>Please fill out this form to reset your password.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> 
            <div class="form-group <?php echo (!empty($new_password_err)) ? 'has-error' : ''; ?>">
                <label>New Password</label>
                <input type="password" name="new_password" class="form-control" value="<?php echo $new_password; ?>">
                <span class="help-block"><?php echo $new_password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="hidden" name="email" value="<?php echo $email;?>"/>
                <input type="submit" class="btn btn-primary" value="Submit">
                <a class="btn btn-link" href="index.php">Cancel</a>
            </div>
        </form>
    </div>    
</body>
</html>
<?php
            $sql = "DELETE from password_reset_temp WHERE `email`= ?";
            if($stmt = mysqli_prepare($link, $sql)){
              mysqli_stmt_bind_param($stmt, "s",  $email);
              mysqli_stmt_execute($stmt);
            }
          }else{
            $isExpired = true;
            $error .= "<h2>Link Expired</h2>
              <p>The link is expired. You are trying to use the expired link which
              as valid only 24 hours (1 days after request).<br /><br /></p>";
          }
        }
      }
    } else{
      echo "Oops! Something went wrong. Please try again later.<br/>";
    }
    // Close statement
    mysqli_stmt_close($stmt);
  }

  // Close connection
  mysqli_close($link);

  if($error!=""){
  echo "<div class='error'>".$error."</div><br />";
  }
} // isset email key validate end


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate new password
    if(empty(trim($_POST["new_password"]))){
        $new_password_err = "Please enter the new password.";     
    } elseif(strlen(trim($_POST["new_password"])) < 6){
        $new_password_err = "Password must have atleast 6 characters.";
    } else{
        $new_password = trim($_POST["new_password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm the password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($new_password_err) && ($new_password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
        
    // Check input errors before updating the database
    if(empty($new_password_err) && empty($confirm_password_err)){
      if(isset($_SESSION['id'])){

        // Prepare an update statement
        $sql = "UPDATE users SET password = ? WHERE id = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "si", $param_password, $param_id);
            
            // Set parameters
            $param_password = password_hash($new_password, PASSWORD_DEFAULT);
            $param_id = $_SESSION["id"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                header("location: index.php?action=updated");
                exit();
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
      }
      elseif(isset($_POST['email'])){

        // Prepare an update statement
        $sql = "UPDATE users SET password = ? WHERE email = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_password, $param_email);
            
            // Set parameters
            $param_password = password_hash($new_password, PASSWORD_DEFAULT);
            $param_email = $_POST["email"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                header("location: index.php?action=updated");
                exit();
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

if (isset($_SESSION["id"])){
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
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
        <h2>Reset Password</h2>
        <p>Please fill out this form to reset your password.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> 
            <div class="form-group <?php echo (!empty($new_password_err)) ? 'has-error' : ''; ?>">
                <label>New Password</label>
                <input type="password" name="new_password" class="form-control" value="<?php echo $new_password; ?>">
                <span class="help-block"><?php echo $new_password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <a class="btn btn-link" href="index.php">Cancel</a>
            </div>
        </form>
    </div>    
</body>
</html>
<?php
}
?>
