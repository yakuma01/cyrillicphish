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
<div id="jscriptwarning">Трябва да имате включен Javascript за да участвате в проекта.</div>
<div id="sis">
      <div id="countrycode"><?= $_SESSION['country']; ?></div>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<center><h2><font color="red">Извиняваме се. За сега този експеримент е затворен.</font></h2></center>
<?php } ?>
<?php if($_SESSION['country'] == "US" || $_SESSION['country'] == "CA"){ ?>
<H3 ALIGN=RIGHT><I>IRB Study 1707304414</I></H3></right>

<center><H3>ИНФОРМАЦИОННА СТРАНИЦА НА ИНДИАНСКИЙ УНИВЕРСИТЕТ</H3></center><p>
<H3>ПРЕДСТАВЯНЕ</H3><P>
        Ако Ви е интересно да ни помогнете да разберем по-добре на какво потребителите в интернета 
		обръщат внимание, каним Ви да  
		участвате в нашето изследване. Този проект се управлява от Уилиям Смийл от Университета в Индиана, САЩ.
		<P><B>Молим Ви да не участвате ако българският език не Ви е роден и сте на по-малко от 18 години.</B></P>		
<?php
		if($_SESSION['type'] == 'mturk'){
			//echo "<P>Вие бяхте избран като възможен участник, защото приехте поканата ни да участвате в този изследователски проект и българския език ви е роден. Трябва да сте запознати и да имате опит в използването на браузъра Firefox, за да участвате в този проект. Ако не отговаряте на тези квалификации, не приемайте тази задача, тъй като резултатите Ви могат да бъдат отхвърлени. Молим Ви да прочетете този формуляр и да зададете всички въпроси, които имате, преди да се съгласите да участвате в проучването. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey. </P>";
        }
            else if($_SESSION['type'] == 'inv'){
			echo "<P>Вие бяхте избран като възможен участник, защото приехте поканата ни да участвате в този изследователски проект и българския език ви е роден. Трябва да сте запознати и да имате опит в използването на браузъра Firefox, за да участвате в този проект. Ако не отговаряте на тези квалификации, не приемайте тази задача, тъй като резултатите Ви могат да бъдат отхвърлени. Молим Ви да прочетете този формуляр и да зададете всички въпроси, които имате, преди да се съгласите да участвате в проучването.. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</P>";
		}
		else{
			//echo "<P>Вие бяхте избран като възможен участник, защото приехте поканата ни да участвате в този изследователски проект и българския език ви е роден. Трябва да сте запознати и да имате опит в използването на браузъра Firefox, за да участвате в този проект. Ако не отговаряте на тези квалификации, не приемайте тази задача, тъй като резултатите Ви могат да бъдат отхвърлени. Молим Ви да прочетете този формуляр и да зададете всички въпроси, които имате, преди да се съгласите да участвате в проучването. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</P>";
		}
if($_SESSION['valid_participant']){
?>
		<P>Този проект получава финансиране от Националната Фондация на Науката (NSF) (САЩ), "Living in the Internet of Things"</P>
<?php
}
?>
		<H3>ЦЕЛТА НА ИЗСЛЕДВАНЕТО</H3>
		Целта на този проект е да разбираме по-добре как хората решават дали е опасно или безопасно да влязат в разни уеб сайтове в интернет.
		<H3>ПРОЦЕДУРИТЕ НА ИЗСЛЕДВАНЕТО</H3>
		<strong> Този проект се състои от три задачи </strong>. Първата задача е кратък експеримент, в който тестваме волята Ви за рискове. Втората задача се състои от демографски въпроси. В експерименталната задача ще посетите няколко уеб сайта, за да определите дали са достатъчно сигурни сайтове за влизане. Накрая ще отговорите на няколко въпроса свързани с Вашият практически опит и Вашето знание за сигурността в интернет. Общото време за изпълнението на тези три задачи ще отнеме около 25-30 минути.    
            <?php
            if($_SESSION['type'] == 'mturk'){
            echo"Ще получите 2 долара за изпълнението на тези три задачи, но ще можете да получите до още 5 долара в зависимост от това";echo ($_SESSION['experimentConditionNumber']==0) ? "колко бързо се справите със задачата. Ако се увеличава времето за изпълнението на задача, тогава Вашият бонус се намалява." : "Ако се намалява точността на изпълнението на задача, тогава Вашият бонус се намалява.";
            }
            else if($_SESSION['type'] == 'iu'){
                echo"Ще получите 4 долара за изпълнението на тези три задачи, но ще можете да получите до още 5 долара в зависимост от това, "; echo ($_SESSION['experimentConditionNumber']==0) ? "колко бързо се справите със задачата. Ако се увеличава времето за изпълнението на задача, тогава Вашият бонус се намалява." : "Ако се намалява точността на изпълнението на задача, тогава Вашият бонус се намалява..";
            }
             else if($_SESSION['type'] == 'account' && $_SESSION['valid_participant'] == 'true'){
            echo"Ще получите 2 долара за изпълнението на тези три задачи, но ще можете да получите до още 5 долара в зависимост от това";echo ($_SESSION['experimentConditionNumber']==0) ? "колко бързо се справите със задачата. Ако се увеличава времето за изпълнението на задача, тогава Вашият бонус се намалява." : "Ако се намалява точността на изпълнението на задача, тогава Вашият бонус се намалява.";
            }
            ?>

		<H3>КОНФИДЕНЦИАЛНОСТ</H3>
		Ние се стараем да запазим конфиденциалността на Вашата лична информация. Вашата лична информация може да бъде разкрита само ако това се изисква от закона. Личността Ви няма да бъде разкрита в доклади, в които изследването ще се публикува.<br>
		Информацията относно проекта ще бъде запазена в архивите на научните данни на Университета в Индиана. Информацията ще бъде достъпна само за хората, които провеждат изследването. В устни или написани доклади няма да има никакви връзки, които могат да свързват участниците с резултатите на изследването.<br>
		Организациите, които имат право да погледнат материалите, свързани с този изследователски проект, с цел осигуряване на качеството са: главният изследовател и колегите му, Националният Научен Фонд (САЩ) и, в съответствие със закона, органите на публичната власт.<br>

<?php
if($_SESSION['type'] == 'mturk'){
    echo "<H3>ВЪЗНАГРАЖДЕНИЕ</H3>";
    echo"Общата сума, която Вие ще получите при изпълнението на трите задачи на този изследователски проект ще варира от 4 до 5 долара (USD). <B>Молим Ви, да обърнете внимание, защото няколко въпроса в анкетата са въпроси за потвърждение. Тези въпроси ще потвърдят качеството на Вашите отговори. Ако няма съответстващи отговори на тези въпроси, тогава Вашето заявление няма да бъде одобрено за заплащане. За да получите заплащане, искрено Ви молим да обърнете внимание на всеки въпрос..</B> Можете да се откажете от участието си по всяко време. Възнаграждението ще се одобрява след успешното изпълнение на трите части на изследователската работа.";
}     else if($_SESSION['type'] == 'iu'){
    echo "<H3>ВЪЗНАГРАЖДЕНИЕ</H3>";
    echo"Общата сума, която Вие ще получите при изпълнението на трите задачи на този изследователски проект ще варира от 4 до 5 долара (USD). <B>Молим Ви, да обърнете внимание, защото няколко въпроса в анкетата са въпроси за потвърждение. Тези въпроси ще потвърдят качеството на Вашите отговори. Ако няма съответстващи отговори на тези въпроси, тогава Вашето заявление няма да бъде одобрено за заплащане. За да получите заплащане, искрено Ви молим да обърнете внимание на всеки въпрос. Можете да се откажете от участието си по всяко време. Възнаграждението ще се одобрява след успешното изпълнение на трите части на изследователската работа.</B>";
    }
            else if($_SESSION['type'] == 'account' && $_SESSION['valid_participant'] == 'true'){
    echo "<H3>CВЪЗНАГРАЖДЕНИЕ</H3>";
    echo"Общата сума, която Вие ще получите при изпълнението на трите задачи на този изследователски проект ще варира от 4 до 5 долара (USD). <B>Молим Ви, да обърнете внимание, защото няколко въпроса в анкетата са въпроси за потвърждение. Тези въпроси ще потвърдят качеството на Вашите отговори. Ако няма съответстващи отговори на тези въпроси, тогава Вашето заявление няма да бъде одобрено за заплащане. За да получите заплащане, искрено Ви молим да обърнете внимание на всеки въпрос.</B> Можете да се откажете от участието си по всяко време. Възнаграждението ще се одобрява след успешното изпълнение на трите части на изследователската работа.";
}
       
?>
<H3>КОНТАКТ</H3>
Ако имате въпроси за тази изследователска работа, можете да се свържете с екипа по човешка и техническа безопасност на spice@indiana.edu (на английски език).

<p>Вие също можете да се свържете с главния изследовател на wsmeal@iu.edu (на български език).</p>

		<H3>УЧАСТИЕ</H3>
<p>Вашето участие в този изследователски проект е напълно доброволно. Вие можете да се откажете от участието си по всяко време без никакви последствия. Дори да решите да участвате, Вие имате право да се откажете на всеки един етап от участието си.</p>
<br>
<?php } ?>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<center><h2><font color="red">Извиняваме се. За сега този експеримент е затворен</font></h2></center>
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

<center><H3>ИНФОРМАЦИЯ ЗА ПРОЕКТА</H3></center><p>
<H3>ПРЕДСТАВЯНЕ</H3>
<P>Ако Ви е интересно да ни помогнете да разберем по-добре на какво потребителите в интернета обръщат внимание, каним Ви да участвате в нашето изследване. Този проект се управлява от Уилиям Смийл и Яш Кумар от Университета в Индиана, САЩ.</p>
<p><B>Молим Ви да не участвате ако българският език не Ви е роден и сте на по-малко от 18 години.</B></p>
<!--<p>Трябва да сте запознати и да имате опит в използването на браузъра Firefox, за да участвате в този проект. Ако не отговаряте на тези квалификации, не приемайте тази задача, тъй като резултатите Ви могат да бъдат отхвърлени. WМолим Ви да прочетете този формуляр и да зададете всички въпроси, които имате, преди да се съгласите да участвате в проучването. Also, please <a href='https://support.mozilla.org/en-US/kb/disable-or-remove-add-ons' target='new_window'>disable any Firefox add-ons</a> to complete the survey.</p>-->
<H3>ЦЕЛТА НА ИЗСЛЕДВАНЕТО</H3> 
<p>Целта на този проект е да разбираме по-добре как хората решават дали е опасно или безопасно да влязат в разни уеб сайтове в интернет.</p>
<H3>ПРОЦЕДУРИТЕ НА ИЗСЛЕДВАНЕТО</H3>
<p>Този проект се състои от три задачи. Първата задача е кратък експеримент, в който тестваме волята Ви за рискове. Втората задача се състои от демографски въпроси. В експерименталната задача ще посетите няколко уеб сайта, за да определите дали са достатъчно сигурни сайтове за влизане. Накрая ще отговорите на няколко въпроса свързани с Вашият практически опит и Вашето знание за сигурността в интернет. Общото време за изпълнението на тези три задачи ще отнеме около 25-30 минути. Ще получите 4 долара за изпълнението на тези три задачи, но ще можете да получите до още 5 долара в зависимост от това, колко бързо се справите със задачата.</p>
<H3>КОНФИДЕНЦИАЛНОСТ</H3>
<p>Ние се стараем да запазим конфиденциалността на Вашата лична информация. Вашата лична информация може да бъде разкрита само ако това се изисква от закона. Личността Ви няма да бъде разкрита в доклади, в които изследването ще се публикува.
Информацията относно проекта ще бъде запазена в архивите на научните данни на Университета в Индиана. Информацията ще бъде достъпна само за хората, които провеждат изследването. В устни или написани доклади няма да има никакви връзки, които могат да свързват участниците с резултатите на изследването.
</p>
<H3>КОНТАКТ</H3>
<p>Ако имате въпроси за тази изследователска работа, можете да се свържете с екипа по човешка и техническа безопасност на spice@indiana.edu (на английски език) или с главния изследовател на wsmeal@iu.edu (на български език).</p>
<p>Този проект беше одобрено от Университета в Индиана.</p>
<H3>УЧАСТИЕ</H3>
<p>Вашето участие в този изследователски проект е напълно доброволно. Вие можете да се откажете от участието си по всяко време без никакви последствия. Дори да решите да участвате, Вие имате право да се откажете на всеки един етап от участието си.</p>
<?php } ?>

<?php if(!$preview && !array_key_exists($_SESSION['country'], $session_expired)) :?>
	<p>При натискането на <strong> Продължи </strong> Вие се съгласявате да участвате в това изследване.</p>
		<BUTTON id="sisacknowledged">Продължи</BUTTON>
		   <?php endif;?>

	</DIV>
<DIV id="error">&nbsp;</DIV>

	<DIV id="question" class="ease">&nbsp;</DIV>
	<DIV id="allquestions" class="ease">&nbsp;</DIV>
	
	<DIV id="navigation" class="ease">&nbsp;</DIV>
	<form id="sis_form" name="sis_form" action="PHP/dataReceiver.php" method="POST">
	<DIV id="completedquestions">
		<INPUT id="workerId" type="hidden" value="<?php echo $_SESSION['participant'];?>"/>&nbsp;
		<INPUT id="experimentCondition" type="hidden" value="<?php echo $_SESSION['experimentConditionNumber'];?>"/>
		<INPUT id="participantType" type="hidden" value="<?php echo $_SESSION['participantType'];?>"/>
		<INPUT id="trials" type="hidden" value="<?php echo $_SESSION['trials'];?>"/>
	</DIV>
	</form>
</html>
