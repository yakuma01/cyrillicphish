<?php
//may need to uncomment, depending on how people are directed to the study
//session_start();

//check to see if this is valid for given MTurkId

$session_expired = array(
  '' => 1,
//  'US' => 1,
//  'UK' => 1,
//  'AU' => 1,
//  'NZ' => 1
);

if (isset($_GET['workerId']) && !empty($_GET['workerId'])){
    $validId = true;
}
else{
    $validId = false;
}

if (isset($_GET['assignmentId'])){
	$preview = $_GET['assignmentId'] === "ASSIGNMENT_ID_NOT_AVAILABLE";
}
else {
	$preview = false;
}

if(!$preview && isset($_GET['assignmentId'])){
    $_SESSION['assignmentId'] = $_GET['assignmentId'];
}

if (!$preview && $validId == true && (isset($_GET['hitId']) && !empty($_GET['hitId']))){
    $_SESSION['participant'] = $_GET['workerId'];
    $_SESSION['hitId'] = $_GET['hitId'];
}

else {
    $_SESSION['participant'] = $_SERVER['SERVER_NAME'] . time();
    $_SESSION['hitId'] = 'This is a test.';
	$_SESSION['assignmentId'] = 'This is a test.';
}


if(isset($_SESSION['user'])){
    $_SESSION['participant'] = hash_hmac('sha512',$_SESSION['user'],'DCNLab Login or Not Login Study');
  }


//echo $_SESSION['participant'];

$_SESSION['time'] = time();

//For testing accuracy condition
//Time = 0, Accuracy = 1
if($_SESSION['tt'] == 0){ //Time
  $_SESSION['experimentConditionNumber'] = 0;
} elseif($_SESSION['tt'] == 1){ //Accuracy
  $_SESSION['experimentConditionNumber'] = 1;
} else {  //Defaults to 'Time'
  $_SESSION['experimentConditionNumber'] = 0;
}

if($_SESSION['type'] == 'mturk'){ //MTurk Participants
 $_SESSION['participantType'] = 0;
} elseif($_SESSION['type'] == 'iu'){ //IU Participants
$_SESSION['participantType'] = 1;
}elseif($_SESSION['type'] == 'inv'){ //Invited Participants
$_SESSION['participantType'] = 2;
}
else {
$_SESSION['participantType'] = 3;
}

$directory = "../Images/Windows/Order1/";
$filecount = 0;
$files = glob($directory . "*");
if($files){
	$filecount = count($files);
}
//print  $directory + " : " + $filecount;
$_SESSION['trials'] = $filecount;
$_SESSION['completedTrials'] = 0;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Log in Not Log in Consent Form</title>
<style>

#studyarea {
    font-family: Arial, Helvetica, sans-serif;
}

#sis {
	font-family: Arial, Helvetica, sans-serif;
	display: none;
}

.ease{
width:70%;
margin-left:auto;
margin-right:auto;
top:50px;
}

</style>
<script src="JS/jquery-1.11.0.js" type="text/javascript"></script>
<script src="JS/common.js" type="text/javascript"></script>
<script src="JS/survey.js" type="text/javascript"></script>
</head>

<body>
<head>
<?php 
//header("Cache-Control: no-cache, must-revalidate");
//header("Pragma: no-cache");
if(!$preview){
$_SESSION['sisStart'] = true;
}
?>
</head>
<div id="studyarea" class="ease">
<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
<div id="sis">
      <div id="countrycode"><?= $_SESSION['country']; ?></div>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<center><h2><font color="red">I am sorry. The experiment is closed now</font></h2></center>
<?php } ?>
<?php if($_SESSION['country'] == "US" || $_SESSION['country'] == "CA"){ ?>
<H3 ALIGN=RIGHT><I>IRB Study 1707304414</I></H3></right>

<center><H3>INDIANA UNIVERSITY STUDY INFORMATION SHEET</H3></center><p>
<H3>INTRODUCTION</H3><P>
		If you are interested in helping us better understand what users are
		paying attention to when browsing the Internet, we welcome you to
		participate in our research study. This study is being conducted by Dr. L. Jean Camp from Indiana University Bloomington, USA.
		<P><B>Do not complete this study unless you can read and understand English and are at least 18 years old.</B></P>		
<?php
		if($_SESSION['type'] == 'mturk'){
			//echo "<P>You were selected as a possible subject because you have a Mechanical Turk account in good standing and you can read and understand the English language. You must be familiar with and have experience using the Firefox browser to participate in this study. If you do not meet these qualifications, do not accept this task as your results may be rejected. We ask that you read this form and ask any questions you may have before agreeing to be in the study. Before you begin, please note that the data you provide may be collected and used by Amazon as per its privacy agreement. <B>Additionally, you must be at least 18 years of age to participate in this study</B>; if you are under the age of 18, please do not complete this study. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey. </P>";
        }
            else if($_SESSION['type'] == 'inv'){
			echo "<P>You were selected as a possible subject because you have accepted our invitation to participate in the study and you can read and understand the English language. You must be familiar with and have experience using the Firefox browser to participate in this study. If you do not meet these qualifications, do not accept this task as your results may be rejected. We ask that you read this form and ask any questions you may have before agreeing to be in the study. <B>Additionally, you must be at least 18 years of age to participate in this study</B>; if you are under the age of 18, please do not complete this study. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</P>";
		}
		else{
			//echo "<P>You were selected as a possible subject because you agreed to participate in the study and can read and understand the English language. You must be familiar with and have experience using the Firefox browser to participate in this study. If you do not meet these qualifications, do not accept this task as your results may be rejected. We ask that you read this form and ask any questions you may have before agreeing to be in the study. <B>Additionally, you must be at least 18 years of age to participate in this study</B>; if you are under the age of 18, please do not complete this study. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</P>";
		}
if($_SESSION['valid_participant']){
?>
		<P>This study is funded by the following grant: National Science Foundation(NSF), "Living in the Internet of Things"</P>
<?php
}
?>
		<H3>STUDY PURPOSE</H3>
		This study seeks to understand how people decide whether or not it is secure to sign-in to different websites on the Internet.
		<H3>PROCEDURES FOR THE STUDY</H3>
		<strong> This study consists of three tasks </strong>. The first task is a very brief balloon experiment. The second task is to complete a brief experiment, and the third task is to complete a demographic and informational survey. The experimental task involves visiting a series of websites and deciding whether or not they are secure enough to sign-in.  The final survey involves a series of questions concerning your practical experience and knowledge about security on the Internet. The combined time for completing these three tasks will be approximately 25-30 minutes.  
            <?php
            if($_SESSION['type'] == 'mturk'){
            echo"You will receive $4 for completing these three tasks, but you can earn up to $5 more depending on how ";echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
            else if($_SESSION['type'] == 'iu'){
                echo"You will receive $2 for completing these three tasks, but you can earn up to $5 more depending on how "; echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
             else if($_SESSION['type'] == 'account' && $_SESSION['valid_participant'] == 'true'){
            echo"You will receive $2 for completing these three tasks, but you can earn up to $5 more depending on how ";echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
            ?>

		<H3>CONFIDENTIALITY</H3>
		Efforts will be made to keep your personal information confidential. We cannot guarantee absolute confidentiality. Your personal information may be disclosed if required by law. Your identity will be held in confidence in reports in which the study is published.<br>
The information will be stored securely in the Scholarly Data Archive at Indiana University and will only be accessible to those conducting this study. There will be no references in oral or written reports that could link participants to the study.<br>
Organizations that may inspect and/or copy research records for quality assurance and data analysis include groups such as the study investigator and his/her research associates, the National Science Foundation, the Indiana University Institutional Review Board or its designees, and (as allowed by law) state or federal agencies, specifically the Office for Human Research Protections (OHRP), who may need to access your research records.<br>

<?php
if($_SESSION['type'] == 'mturk'){
    echo "<H3>COMPENSATION</H3>";
    echo"The total payment for completing this study will range between $4 and $5 depending on your performance while completing the experimental task. <B>Please note that some of the questions on the survey are validation questions. These will ensure the quality of your responses. If these questions are not answered appropriately, your submissions will not be approved for payment. In order to ensure payment we encourage you to pay attention to every question sincerely.</B> Participants may withdraw at any time. Payment will be made at the completion of the survey.";
}     else if($_SESSION['type'] == 'iu'){
    echo "<H3>COMPENSATION</H3>";
    echo"The total payment for completing this study will range between $2 and $5 depending on your performance while completing the experimental task. <B>Please note that some of the questions on the survey are validation questions. These will ensure the quality of your responses. If these are incorrect, you will have to talk with the person running the experiment to ensure that you understand what is expected. If these questions are not answered appropriately, your submissions will not be approved for payment. In order to ensure payment we encourage you to pay attention to every question sincerely. Participants may withdraw at any time. Payment will be made at the completion of the survey.</B>";
    }
            else if($_SESSION['type'] == 'account' && $_SESSION['valid_participant'] == 'true'){
    echo "<H3>COMPENSATION</H3>";
    echo"The total payment for completing this study will range between $2 and $5 depending on your performance while completing the experimental task. <B>Please note that some of the questions on the survey are validation questions. These will ensure the quality of your responses. If these questions are not answered appropriately, your submissions will not be approved for payment. In order to ensure payment we encourage you to pay attention to every question sincerely.</B> Participants may withdraw at any time. Payment will be made at the completion of the survey.";
}
       
?>
<H3>CONTACT</H3>
		If you have questions at any time about the study, you may contact The Human and Technical Security research group at spice@indiana.edu or (812) 856-1865.

<p>For questions about your rights as a research participant or to discuss problems, complaints or concerns about a research study, or to obtain information, or offer input, contact the IU Human Subjects Office at (812) 856-4242 or (800) 696-2949 [toll free].</p>

		<H3>PARTICIPATION</H3>
<p>Your participation in this study is voluntary; you may decline to participate without penalty. If you decide to participate, you may withdraw from the study at any time without penalty. Your decision whether or not to participate in this study will not affect your current or future relations with Indiana University.</p>
<br>
<?php } ?>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<center><h2><font color="red">I am sorry. The experiment is closed now</font></h2></center>
<?php } ?>
<?php if($_SESSION['country'] == "GB" || $_SESSION['country'] == 'UK'){ ?>
<center><H3>STUDY INFORMATION SHEET</H3></center><p>
<H3>INTRODUCTION</H3><P>
		If you are interested in helping us better understand what users are
		paying attention to when browsing the Internet, we welcome you to
		participate in our research study. This study is being conducted by Dr. L. Jean Camp from Indiana University Bloomington, USA.
		<P><B>Do not complete this study unless you can read and understand English and are at least 18 years old.</B></P>		
<H3>CONTACT</H3>
<p>If you have questions at any time about the study, you may contact The Human and Technical Security research group at spice@indiana.edu.</p>
<?php } ?>
<?php if($_SESSION['country'] == "AU" | $_SESSION['country'] == "NZ"){ ?>
    <H3 ALIGN=RIGHT><I>La Trobe Ethical clearance (002/18) | Indiana University IRB Study 1707304414</I></H3></right>

<center><H3>STUDY INFORMATION SHEET</H3></center><p>
<H3>INTRODUCTION</H3>
<P>If you are interested in helping us better understand what users are paying attention to when browsing the Internet, we welcome you to participate in our research study. This study is being conducted in Australia by Prof Paul Watters from La Trobe University and Dr Marthie Grobler from CSIRO Data61, in collaboration with Prof L. Jean Camp from Indiana University, USA, Prof Karen Renaud from Abertay University, United Kingdom, and Prof Julian Jang-Jaccard from Massey University, New Zealand.</p>
<p><B>Do not complete this study unless you can read and understand English and are at least 18 years old.</B></p>
<!--<p>You must be familiar with and have experience using the Firefox browser to participate in this study. If you do not meet these qualifications, do not accept this task as your results may be rejected. We ask that you read this form and ask any questions you may have before agreeing to be in the study. Before you begin, please note that the data you provide may be collected and used by Amazon as per its privacy agreement. <b>Additionally, you must be at least 18 years of age to participate in this study</b>; if you are under the age of 18, please do not complete this study. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</p>-->
<H3>STUDY PURPOSE</H3> 
<p>This study seeks to understand how people decide whether or not it is secure to sign-in to different websites on the Internet.</p>
<H3>PROCEDURES FOR THE STUDY</H3>
<p>This study consists of three tasks. The first task is a very brief balloon experiment. The second task is to complete a brief experiment, and the third task is to complete a demographic and informational survey. The experimental task involves visiting a series of websites and deciding whether or not they are secure enough to sign-in. The final survey involves a series of questions concerning your practical experience and knowledge about security on the Internet. The combined time for completing these three tasks will be approximately 25-30 minutes. The total payment for completing this study will range between $4 and $5 depending on your performance while completing the experimental task.</p>
<H3>CONFIDENTIALITY</H3>
<p>Efforts will be made to keep your personal information confidential. We cannot guarantee absolute confidentiality. Your personal information may be disclosed if required by law. Your identity will be held in confidence in reports in which the study is published.
The information will be stored securely in the Scholarly Data Archive at Indiana University and will only be accessible to those conducting this study. There will be no references in oral or written reports that could link participants to the study.
</p>
<H3>CONTACT</H3>
<p>If you have questions at any time about the study or the procedures, you may contact the researchers Dr L Jean Camp from Indiana University (spice@indiana.edu), Prof Paul Watters from La Trobe University (P.Watters@latrobe.edu.au) and Dr Marthie Grobler from CSIRO Data61 (marthie.grobler@data61.csiro.au).</p>
<p>This study has been approved by Indiana University Institutional Review Board, La Trobe University Human Ethics Committee and CSIRO Social Science Human Research Ethics Committee in accordance with the National Statement on Ethical Conduct in Human Research (2007). If you have any questions concerning your participation in the study please contact the researchers directly. Alternatively any concerns or complaints about the conduct of this study can be raised with La Trobe University Chair of the University Human Ethics Committee on (03) 9479 1443 |  humanethics@latrobe.edu.au, or the CSIRO Manager of Social Responsibility and Ethics on (07) 3833 5693 | csshrec@csiro.au.</p>
<H3>PARTICIPATION</H3>
<p>Your participation in this study is voluntary; you may decline to participate without penalty. If you decide to participate, you may withdraw from the study at any time without penalty. Your decision whether or not to participate in this study will not affect your current or future relations with Indiana University, La Trobe University or CSIRO Data61.</p>
<?php } ?>

<?php if(!$preview && !array_key_exists($_SESSION['country'], $session_expired)) :?>
	<p>By clicking on the <strong> Continue to Experiment </strong> button, you agree to participate in this research.</p>
		<BUTTON id="sisacknowledged">Continue to Experiment</BUTTON>
		   <?php endif;?>

	</DIV>
<DIV id="error">&nbsp;</DIV>

	<DIV id="question" class="ease">&nbsp;</DIV>
	<DIV id="allquestions" class="ease">&nbsp;</DIV>
	
	<DIV id="navigation" class="ease">&nbsp;</DIV>
	<form id="sis_form" action="PHP/dataReceiver.php" method=POST>
	<DIV id="completedquestions">
		<INPUT id="workerId" type="hidden" value="<?php echo $_SESSION['participant'];?>"/>&nbsp;
		<INPUT id="experimentCondition" type="hidden" value="<?php echo $_SESSION['experimentConditionNumber'];?>"/>
		<INPUT id="participantType" type="hidden" value="<?php echo $_SESSION['participantType'];?>"/>
		<INPUT id="trials" type="hidden" value="<?php echo $_SESSION['trials'];?>"/>
	</DIV>
	</form>
</html>
