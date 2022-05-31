<?php

session_start();
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
Thank you for participating in our study. We appreciate your time an effort. You have completed
both our Login task and our survey. We will approve your pay of &#36;2.00 for completing both tasks shortly. We will also ensure that you will get your bonus of &#36;<?php echo $_SESSION['bonusPay'];?> as soon as we are able.

We’d like to tell you a little more about our study design.<b>The experiment included images of websites that we created and not actual websites.  This study was designed to investigate how different groups perceive risks and privacy in online environments. </b>  
If you have any questions about this study, please do not hesitate to contact us: sancdas@indiana.edu.

</p>
<p>
    You may now close the browser.


</p>

</div>
</html>


<?php
    session_destroy();
?>
