<?php
// Include config file
require_once "includes/config.php";
include "includes/participant_code.php";
require_once "sendEmails.php";

$type = isset($_GET['typeRadios'])?$_GET['typeRadios']:"";
$tt =  isset($_GET['tt'])?$_GET['tt']:"";
$country =  isset($_GET['country'])?$_GET['country']:"";

// Define variables and initialize with empty values
$username = $email = $password = $confirm_password = $participant_code = "";
$username_err = $email_err = $password_err = $confirm_password_err = $participant_code_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $type = isset($_POST['typeRadios'])?$_POST['typeRadios']:"";
    $tt =  isset($_POST['tt'])?$_POST['tt']:"";
    $country =  isset($_POST['country'])?$_POST['country']:"";

    // Validate username
    if(empty(trim($_POST["username"])) || empty(trim($_POST['email']))){
      if(empty(trim($_POST['username']))){
        $username_err = "Please enter a username.";
      }
      if(empty(trim($_POST['email']))){
        $email_err = "Please enter a email.";
      }
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_email);

            // Set parameters
            $param_username = trim($_POST["username"]);
            $param_email= trim($_POST["email"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username or email is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                    $email= trim($_POST["email"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }

    if(!empty(trim($_POST["participant_code"]))){
        $participant_code = trim($_POST["participant_code"]);
        if(!empty($participant_code) && !array_key_exists($participant_code, $registered_codes)){
          $participant_code_err = "Invalid participant code";
//        }else if($registered_codes[$participant_code] != $country){
//          $participant_code_err = "Invalid participant code for $country";
        }
    }else{
        $participant_code_err = "Empty participant code";
    }

    // Check input errors before inserting in database
    if(empty($username_err) && empty($email_err) && empty($password_err) && empty($confirm_password_err) && (empty($participant_code_err) || (!empty($participant_code_err) && $participant_code_err == "Empty participant code"))){

        // Prepare an insert statement
        $sql = "INSERT INTO users (username, email, token, password) VALUES (?, ?, ?, ?)";
        if(!empty($participant_code)){
          $sql = "INSERT INTO users (username, email, token, password, vcode) VALUES (?, ?, ?, ?, ?)";
        }

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            if(empty($participant_code)){
              mysqli_stmt_bind_param($stmt, "ssss", $param_username, $param_email, $param_token, $param_password);
            }else{
              mysqli_stmt_bind_param($stmt, "sssss", $param_username, $param_email, $param_token, $param_password, $param_participant_code);
            }

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_participant_code = $participant_code;

            $param_token = bin2hex(openssl_random_pseudo_bytes(16));
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
              if($participant_code_err && $participant_code_err == "Empty participant code"){
                sendVerificationEmail($email, $param_token);
              }else{
                sendParticipantEmail($email, $param_token);
              }
              //header("location: login.php?country=". $country . "&typeRadios=" . $type . "&tt=" . $tt);
            } else{
                echo "Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
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
        <h2>Sign Up</h2>
        <p>Would you like to participate? Please fill out the following form to create an account: <br>(<font color="red">*</font> is a required field)
</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label> <font color="red">*</font>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label> <font color="red">*</font>
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label> <font color="red">*</font>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label> <font color="red">*</font>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
<p>If you have a participant code for the paid experiment, please enter it. You can still create your account without the participant code but you will not receive any payment from your experiment.</p>
            <div class="form-group <?php echo (!empty($participant_code_err)) ? 'has-error' : ''; ?>">
                <label>Participant Code</label>
                <input type="text" name="participant_code" class="form-control" value="<?php echo $participant_code; ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                <span class="help-block"><?php echo $participant_code_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <input type="reset" class="btn btn-default" value="Reset">
                <input type="hidden" name="country" value="<?php echo $country; ?>" >
                <input type="hidden" name="typeRadios" value="<?php echo $type; ?>" >
                <input type="hidden" name="tt" value="<?php echo $tt; ?>" >
            </div>
            <p>Already have an account? <a href="login.php?country=<?php echo $country; ?>&typeRadios=<?php echo $type; ?>&tt=<?php echo $tt; ?>">Login here</a>.</p>
        </form>
    </div>
</body>
</html>
