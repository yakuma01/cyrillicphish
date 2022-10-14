<?php

session_start();

if ($_SESSION['country'] === "UK") {
    $countryID = "370D851E";
}
else if ($_SESSION['country'] === "CA") {
    $countryID = "EBE48533";
}
else if ($_SESSION['country'] === "AU") {
    $countryID = "554FF676";
}
else if ($_SESSION['country'] === "NZ") {
    $countryID = "392B9C7A";
}
else {
    
    $countryID = "57941F7C";    
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Log in Not Log in Study Thanks</title>
<style>
</style>
</head>
<div id="finalForm" style="width:60%;margin-left:auto;margin-right:auto;top:100px;font-size:125%;">
<p>
    <?php 
    echo "<script type = 'text/javascript'>console.log(".$_SESSION['country'] . ")</script>"
    ?>
<?php if($_SESSION['country'] === "RU" || $_SESSION['country'] === "UA" || $_SESSION['country'] === "BY" ) { 
    
    ?>
    
    Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.
<?php } ?>

<?php if($_SESSION['country'] === "BG") { ?>
    Благодарим ви за участието в нашето проучване. Оценяваме отделеното време и усилия. Вие завършихте и нашата задача за влизане, и нашата анкета.
<?php } ?>

<?php if($_SESSION['country'] === "UK" || $_SESSION['country'] === "CA" || $_SESSION['country'] === "AU" || $_SESSION['country'] === "NZ" || $_SESSION['country'] === ""   ) { ?>
Thank you for participating in our study. We appreciate your time and effort. You have completed
both the login task and the survey. We will approve your pay of &#36;4.00 for completing both tasks shortly. We will also ensure that you will get your bonus pay as soon as we are able.
    
We’d like to tell you a little more about our study design.<b>The experiment included images of websites that we created and not actual websites.  This study was designed to investigate how different groups perceive risks and privacy in online environments. </b>  
If you have any questions about this study, please do not hesitate to contact us: spice@indiana.edu.
<?php } ?>
</p>
<!--
<p>
    If you have any additional comments on our study we would appreciate your feedback. These comments are optional and if you just wish to complete the HIT, click the Complete HIT button. Once again thank you for your time and effort.


</p> --> 
<!-- <p>
    Please click on the link below to complete the study and go back to Prolific:

</p>

<FORM action="http://app.prolific.co/submissions/complete?cc=<?php echo $countryID ?>" method="POST" id="mturk_form">
    <input type="hidden" name="assignmentId" value="<?php echo $_SESSION['assignmentId'];?>"/>
    <input type="hidden" name="bonusPay" value="<?php echo $_SESSION['bonusPay'];?>"/>
    <input type="hidden" name="foo" value="bar"/>
<p>
<button type="submit" value="Submit">Go back to Prolific</button>
</p>
    </FORM> -->

</div>
</html>


<?php
    session_destroy();
?>
