<?php
//may need to uncomment, depending on how people are directed to the study
//session_start();

//check to see if this is valid for given MTurkId

$session_expired = array(
  '' => 1,
//  'US' => 1,
//  'UK' => 1,
//  'AU' => 1,
//  'NZ' => 1,
//  'RU' => 1,
//  'UA' => 1,
//  'BY' => 1,
//  'BG' => 1
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
<!-- <?php if($_SESSION['country'] == 'RU' || $_SESSION['country']=='UA' || $_SESSION['country']== 'BY') { ?>
	<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
<?php } ?> -->



<div id="sis">
      <div id="countrycode"><?= $_SESSION['country']; ?></div>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<h2 style="align:center;">I am sorry. The experiment is closed now</h2>
<?php } ?>
<?php if($_SESSION['country'] == "RU" || $_SESSION['country'] == "UA"  || $_SESSION['country'] == "BY"){ ?>
<H3 ALIGN=RIGHT><I>IRB Study 1707304414</I></H3></right>

<H3 style="text-align:center;">INDIANA UNIVERSITY STUDY INFORMATION SHEET</H3><p>


<H3>ПРЕДСТАВЛЕНИЕ</H3><P>
Если Вам интересно помочь нам лучше понимать, на что потребители Интернета обращают внимание, мы приглашаем Вас поучаствовать в нашем научном исследовании. Это исследование проводится аспирантами Вильям Смийль и Яш Кумар из Индианского университета в Индиане, США.
		<P><B>Не участвуйте, пожалуйста, если Вы не являетесь носителем русского или болгарского языка и Вам меньше 18 лет.</B></P>		
<!-- <?php
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
?> -->
		<H3>ЦЕЛЬ НАУЧНОГО ИССЛЕДОВАНИЯ </H3>
		Цель этого научного исследования - лучше понимать как люди решают безопасно ли входить на разные веб-сайты в Интернете.
		<H3>ПРОЦЕДУРЫ ДЛЯ ИССЛЕДОВАНИЯ</H3>
		Это исследование состоит из трех задач. Первое задание - очень короткий эксперимент вида “пробный шар”. Вторая задача - провести краткий эксперимент, а третья задача - провести демографический и информационный опрос. Экспериментальная задача включает посещение ряда веб-сайтов чтобы определить, достаточно ли они безопасны для входа в систему. Заключительный опрос включает ряд вопросов, касающихся Вашего практического опыта и знаний о безопасности в Интернете. Общее время выполнения этих трех задач займет примерно 25-30 минут. Вы получите 4 доллара за выполнение этих трех задач, но вы можете заработать до 5 долларов больше в зависимости от того, как быстро вы выполните экспериментальное задание. Когда ваше время на задачу увеличивается, ваш бонус будет уменьшаться.

            <!-- <?php
            if($_SESSION['type'] == 'mturk'){
            echo"You will receive $4 for completing these three tasks, but you can earn up to $5 more depending on how ";echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
            else if($_SESSION['type'] == 'iu'){
                echo"You will receive $2 for completing these three tasks, but you can earn up to $5 more depending on how "; echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
             else if($_SESSION['type'] == 'account' && $_SESSION['valid_participant'] == 'true'){
            echo"You will receive $2 for completing these three tasks, but you can earn up to $5 more depending on how ";echo ($_SESSION['experimentConditionNumber']==0) ? "quickly you complete the experimental task. As your time on the task increases, your bonus will decrease." : "accurately you complete the experimental task. As your accuracy decreases, your bonus will decrease.";
            }
            ?> -->

		<H3>КОНФИДЕНЦИАЛЬНОСТЬ</H3>
		Мы стараемся сохранить конфиденциальность вашей личной информации. Однако, возможно, что Ваша личная информация будет раскрыта, если это требуется по закону. Ваша личность будет сохранена в секрете в отчетах, в которых публикуется исследование. Информация касательно исследовательского проекта будет надежно сохранена в Архивах Научных Данных в Индианском Университете и доступна только тем, кто приводит исследование.<br/> В устных или написанных отчетах не будет никаких ссылок, которые могут связать участников с результатами исследования. Организации, у которых есть право осмотреть материалы связанные с этим исследовательским проектом для обеспечения качества и анализа данных включают группы как например главный исследователь и его коллеги, Национальный научный фонд (США), Специальная комиссия учреждения индианского университета и, в соответствии с законом, органы публичной власти, в частности Управление защиты исследований человека (OHRP)(США)

<H3>КОНТАКТ</H3>
Если у Вас есть вопросы о научном исследовании, Вы можете связываться с командой человеческой и технической безопасности на spice@indiana.edu (на английском языке) или с главным исследователем на wsmeal@iu.edu (на русском или болгарском языке). 


		<H3> УЧАСТИЕ </H3>
<p>Ваше участие в этом исследованием является добровольным. Вы можете отказаться от участия без санкций. Даже если Вы решите участвовать, у Вас есть право отказаться от участия в исследовании в любое время без санкций. </p>
<br>
<?php } ?>
<?php if(array_key_exists($_SESSION['country'], $session_expired)){ ?>
<h2 style = "color:red; text-align:center;">I am sorry. The experiment is closed now</h2>
<?php } ?>

<?php if($_SESSION['country'] == "BG"){ ?>
<center><H3>STUDY INFORMATION SHEET</H3></center><p>
<H3>ПРЕДСТАВЯНЕ</H3><P>
Ако Ви е интересно да ни помогнете да разберем по-добре на какво потребителите в интернета обръщат внимание, каним Ви да участвате в нашето изследване. Този проект се управлява от Уилиям Смийл от Университета в Индиана, САЩ.  
		<P><B>Молим Ви да не участвате ако българският език не Ви е роден и сте на по-малко от 18 години. </B></P>

		<h3>ЦЕЛТА НА ИЗСЛЕДВАНЕТО</h3>
<p> 
Целта на този проект е да разбираме по-добре как хората решават дали е опасно или безопасно да влязат в разни уеб сайтове в интернет. 
</p>
	
<h3> ПРОЦЕДУРИТЕ НА ИЗСЛЕДВАНЕТО </h3>
<p> Този проект се състои от три задачи. Първата задача е кратък експеримент, в който тестваме волята Ви за рискове. Втората задача се състои от демографски въпроси. В експерименталната задача ще посетите няколко уеб сайта, за да определите дали са достатъчно сигурни сайтове за влизане. Накрая ще отговорите на няколко въпроса свързани с Вашият практически опит и Вашето знание за сигурността в интернет. Общото време за изпълнението на тези три задачи ще отнеме около 25-30 минути. Ще получите 4 долара за изпълнението на тези три задачи, но ще можете да получите до още 5 долара в зависимост от това, колко бързо се справите със задачата. Ако се увеличава времето за изпълнението на задача, тогава Вашият бонус се намалява. </p>

<h3>КОНФИДЕНЦИАЛНОСТ</h3>
<p>Ние се стараем да запазим конфиденциалността на Вашата лична информация. Вашата лична информация може да бъде разкрита само ако това се изисква от закона. Личността Ви няма да бъде разкрита в доклади, в които изследването ще се публикува. Информацията относно проекта ще бъде запазена в архивите на научните данни на Университета в Индиана. Информацията ще бъде достъпна само за хората, които провеждат изследването. В устни или написани доклади няма да има никакви връзки, които могат да свързват участниците с резултатите на изследването. Организациите, които имат право да погледнат материалите, свързани с този изследователски проект, с цел осигуряване на качеството са: главният изследовател и колегите му, Националният Научен Фонд (САЩ) и, в съответствие със закона, органите на публичната власт.<br/>

Организациите, които имат право да погледнат материалите, свързани с този изследователски проект, включват главният изследовател и колегите си, Национален Научен Фонд (САЩ), Специалната Комисия за Преглед (Review Board) на Университета в Индиана и в съответствие със закона органите на публичната власт, в частното Бюро за защитата на човешко изследване. (OHRP) (САЩ). 
</p>
	

<H3>КОНТАКТ</H3>
<p>Ако имате въпроси за тази изследователска работа, можете да се свържете с екипа по човешка и техническа безопасност на spice@indiana.edu (на английски език) или с главния изследовател на wsmeal@iu.edu (на български език)</p>

<h3> УЧАСТИЕ </h3>
<p>Вашето участие в този изследователски проект е напълно доброволно. Вие можете да се откажете от участието си по всяко време без никакви последствия. Дори да решите да участвате, Вие имате право да се откажете на всеки един етап от участието си.</p>


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

<?php if(!$preview && !array_key_exists($_SESSION['country'], $session_expired)){
		if($_SESSION['country'] == 'RU' || $_SESSION['country']=='UA' || $_SESSION['country']== 'BY'){
	
	?>

	
	<!-- <p>By clicking on the <strong> Continue to Experiment </strong> button, you agree to participate in this research.</p>
		<BUTTON id="sisacknowledged">Continue to Experiment</BUTTON> -->
	
		<!---Yash Kumar --Translate to Russian-->
		<p>RUSSIAN:Нажимая кнопку «Продолжить», вы соглашаетесь участвовать в этом исследовании.</p>
		<BUTTON id="sisacknowledged">Продолжить</BUTTON>
		   <?php }
		   else { ?>
		<!---Yash Kumar --Translate to Bulgarian-->
		<p>Bulgarian:При натискането на «Продължи», Вие се съгласявате да участвате в това изследване
</p>
		<BUTTON id="sisacknowledged">Продължи</BUTTON>
		
		<?php 
			} //ending else loop of line 261
		} //ending if loop of line 248
		?>

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
