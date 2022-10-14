<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Log in Not Log in Study Description</title>
<style>

#studyarea {
	font-family: Arial, Helvetica, sans-serif;
}

#sis {
	font-family: Arial, Helvetica, sans-serif;
	display: none;
}

.instructions {
	width:70%;
	margin-left:auto;
	margin-right:auto;
	top:40%;
}



#bigText{
font-size:150%;
}

</style>
<script src="../JS/jquery-1.11.0.js" type="text/javascript"></script>
<script src="../JS/sweetalert2.js" type="text/javascript"></script>
<script src="../JS/common.js" type="text/javascript"></script>
<script src="../JS/survey.js" type="text/javascript"></script>


</head>
<body>
      <div id="countrycode" style="display:none"><?= $_SESSION['country']; ?></div>
      <div id="ordergroup" style="display:none"><?= $_SESSION['group']; ?></div>
<?php
// if($_SESSION["country"] == ""){
//     $_SESSION["country"] = "US";
// }

  //mturk
if($_SESSION['type']=='mturk'){
    //tt = 0
    if($_SESSION['tt']==0)
    {
		if($_SESSION['country'] === 'RU' || $_SESSION['country'] === 'UA' || $_SESSION['country'] === 'BY'){
			echo '
			<div id="studyarea">
			<div id="jscriptwarning">У вас должен быть включен JavaScript, чтобы пройти это исследование.</div>
			<div id="sis">
			<div id="thisStudy" class="instructions">
			<center><H2>Что включает в себя это исследование?</H2></center><br>
			';
		}
		else{
			echo '
			<div id="studyarea">
			<div id="jscriptwarning">Трябва да имате разрешен javascript, за да вземете това проучване.</div>
			<div id="sis">
			<div id="thisStudy" class="instructions">
			<center><H2>Какво включва това проучване?</H2></center><br>
			';
		}
		/* English Translations
	echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail?</H2></center><br>
       ';
	   */
      if($_SESSION['valid_participant']){

   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
	  if($_SESSION['country'] === 'RU' || $_SESSION['country'] === 'UA' || $_SESSION['country'] === 'BY'){

		//Yash Kumar -> Translate into Russian
		 echo'
		<p>
		Этот проект состоит из двух задач: короткий эксперимент и опрос. В этом эксперименте Вы будете посещать ряд вебсайтов, и Вам надо будет решить выглядит ли каждый из этих сайтов безопасно, чтобы входить. Тем больше времени Вы проводите на экспериментальную задачу, тем меньше становится Ваш бонус. Вы сможете постоянно наблюдать прошедшее время и Ваш бонус в верхней части страницы.  </p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Следующий </BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>Что Вам надо делать?</H3></center>
		  <br>Цель задачи посещать все вебсайты ььь. Если вебсайт БЕЗОПАСЕН, входите и продолжите на следующий сайт. Если Вы решите не входить потому, что вебсайт НЕБЕЗОПАСЕН, нажмите кнопку назад в панели инструментов браузера. 
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/func_buttons_coz.jpeg" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>Если Вы решите ВХОДИТЬ и вебсайт БЕЗОПАСЕН, Вы продолжите на следующий вебсайт.</LI>
		<LI>Если Вы решите ВХОДИТЬ и вебсайт НЕБЕЗОПАСЕН, Вам надо будет ПОДОЖДАТЬ 15 секунд перед тем, как Вы сможете продолжать. </LI>
		<LI>Если Вы решите НЕ ВХОДИТЬ и вебсайт НЕБЕЗОПАСЕН, Вы продолжите на следующий вебсайт. </LI>
		<LI>Если Вы решите НЕ ВХОДИТЬ и вебсайт БЕЗОПАСЕН, Вам надо будет ПОДОЖДАТЬ 15 секунд перед тем, как Вы сможете продолжать. 
		</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Предедущий</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Следующий </BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Входить в систему:</H3></center><br>
		
		Не все веб-сайты следуют одним и тем же соглашениям для входа в систему. Как правило, запрос на вход в систему находится в верхней правой части веб-страницы. Если вы не можете найти кнопку входа, попробуйте найти кнопки РЕГИСТРАЦИЯ. Это будет работать ТОЛЬКО при полном отсутствии кнопки ВХОД.
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/login_example_coz.jpeg" alt "Login Examples" width="60%"><br>Примеры</img>
		</center>
		</p>

		<p>
		Вы максимизируете свои результаты, отвечая как можно быстрее. Неправильный ответ приводит к штрафному времени: 15 секунд.</p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Предедущий </BUTTON>
		<p>Прежде чем приступить к экспериментальному заданию, вы должны убедиться, что вы поняли инструкции. Пожалуйста, не нажимайте кнопку НАЗАД или ОБНОВИТЬ, так как это действие отменит результаты.
		</p>
		<p>
				<BUTTON id="checkUnderstanding">Проверка</BUTTON>
		</p>
		</div>
			</DIV>';
	  }
	  if($_SESSION['country'] === 'BG')
	  {
		//William --> has to be translated to Bulgarian.. Currently in Russian
		echo'


		<p>
		Какво трябва да направите? Целта на тази задача е да посетите всичките уебсайтове за възможно най-кратко време. Ако уебсайтът изглежда сигурен, влезте и след това ще продължите към следващия уебсайт. <span id="bigText">Ако решите да не влизате, защото уебсайтът не изглежда сигурен, тогава не трябва да влизате, а трябва да натиснете върху <strong>Бутон за връщане назад</strong> в лентата с инструменти на браузъра.</strong> span> Вашето изпълнение ще бъде засечено и точките ще се определят от това колко време ви е отнело да завършите задачата. 
		 </p>


		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Следващ</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>Какво трябва да направите?</H3></center>
		  
		  <br> Целта на тази задача е да посетите всичките уебсайтове за възможно най-кратко време. Ако уебсайтът изглежда сигурен, влезте и след това ще продължите към следващия уебсайт. Ако решите да не влизате, защото уебсайтът не изглежда сигурен, тогава не трябва да влизате, а трябва да натиснете върху "Бутон за връщане назад" в лентата с инструменти на браузъра. Вашето изпълнение ще бъде засечено и точките ще се определят от това колко време ви е отнело да завършите задачата. </br>
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>Ако решите да ВХОДИТЕ и вебсайтът е БЕЗОПАСЕН, ще продължите на следващия вебсайт. </LI>
		<LI> Ако решите да ВХОДИТЕ и вебсайтът е НЕБЕЗОПАСЕН, ще трябвате да изчакате 15 секунди.. </LI>
		<LI>Ако решите да НЕ ВХОДИТЕ и вебсайтът е НЕБЕЗОПАСЕН, ще продължите на следващия вебсайт. </LI>
		<LI>Ако решите да НЕ ВХОДИТЕ и вебсайтът е БЕЗОПАСЕН, ще трябвате да изчакате 15 секунди </LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Предишните инструкции</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Следващите инструкции</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>ВХОД ВЪВ ВЕБСАЙТ:</H3></center>
		<br> 
		Не всичките уебсайтове следват едни и същи конвенции за влизане. По принцип, бутона за влизане ще се намира в горната дясна част на страницата. Ако НЕ МОЖЕТЕ да намерете опция ВХОД или ВЛИЗАНЕ, търсете опция РЕГИСТРАЦИЯ. Това функционира само когато няма опцията ВХОД или ВЛИЗАНЕ. 
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
		Ще увеличите точките си най-много отговаряйки възможно най-бързо и точно. Ще Ви бъдат отнети 15 секунди като наказание за неправилен опит..</p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();"> предишни инструкции  </BUTTON>
		<p>
		Преди да започнете експерименталната задача, трябва да се уверите, че разбирате инструкциите. Молим Ви НЕ НАТИСКАЙТЕ бутона НАЗАД или ОБНОВЯВАНЕ, защото това действие ще анулира резултатите. 
		</p>
		<p>
				<BUTTON id="checkUnderstanding">Проверка</BUTTON>
		</p>
		</div>
			</DIV>';

	  }

	
	
	/*
	
	Original English Translation

    echo'

		<p>
		This study consists of two tasks: A brief experiment and a survey. In this experiment, you will be presented with a series of websites, and you will need to decide whether to <strong>Sign-in</strong> to each of these sites based on whether or not they are <strong>secure</strong>. As your time on the experimental task <strong>increases</strong>, your bonus will <strong>decrease</strong>. You will be able to constantly monitor the elapsed time and bonus payout at the <strong>top of the page</strong>. </p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal is to visit all the websites in the shortest possible time. If the website is SECURE, <strong>login to proceed to the next website</strong>. <br> If you decide to <strong> not login </strong> because the website is NOT SECURE, click on the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to LOGIN and the website is SECURE, you will PROCEED to the next website.</LI>
		<LI>If you decide to LOGIN and the website is NOT SECURE, you will have to WAIT 15 seconds before continuing.</LI>
		<LI>If you decide to NOT LOGIN and the website is SECURE, you will have to WAIT 15 seconds before continuing.</LI>
		<LI>If you decide to NOT LOGIN and the website is NOT SECURE, you will PROCEED to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx". If you CANNOT find a login button at all, try to find the SIGN IN or SIGN UP buttons. This will work ONLY when the LOGIN button is completely absent.
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
			You will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <strong>responding as quickly and as accurately as possible.</strong> There will be a time penalty of <strong> 15 SECONDS </strong> for an incorrect trial.</p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		<p>
			Before you can begin the experimental task, you must verify that you understand the instructions. Click the <strong>"Check Understanding"</strong> button at the bottom of the page. <strong> Please DO NOT click the BACK or REFRESH buttons at any point in the experiment as it will invalidate the results. </strong> </p>
		<p>
				<BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
		</p>
		</div>
			</DIV>';

		*/
    }
	// <p>
			// Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		// </p>
		// <p>
		// <center>
		// <table>
		// <tr>
		// <td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		// <td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		// </tr>
		// <tr>
		// <td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		// </tr>
		// </table>
		// </center>
		// </p>
    //tt=1
    else{
        echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){

   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img>
		</center>
		</p>
		<p>
		<strong>Experimental Task:</strong> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. All of the websites are designed to simulate real websites viewed with a Firefox browser, but just like in the real world,the Firefox browser may not be able to ensure the protection of your credentials.</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		
		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <strong>RESPONDING AS QUICKLY AND ACCURATELY AS POSSIBLE</strong></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		<p>
			Before you can begin the experimental task, you must verify that you understand the instructions. Click the <strong>"Check Understanding"</strong> button at the bottom of the page.</p>
		<p>
				<BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
		</p>
		</div>
			</DIV>';
        
    }
}
//inv
else if($_SESSION['type']=='inv') {
	//TODO: Change instructions here to explain accuracy condition
    //tt = 0
    if($_SESSION['tt']==0)
    {
	echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){

   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img>
		</center>
		</p>
		<p>
		<strong>Experimental Task:</strong> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. All of the websites are designed to simulate real websites viewed with a Firefox browser, but just like in the real world,the Firefox browser may not be able to ensure the protection of your credentials.</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		
		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you understand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
    }
	// <p>
			// Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		// </p>

		// <p>
		// <center>
		// <table>
		// <tr>
		// <td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		// <td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		// </tr>
		// <tr>
		// <td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		// </tr>
		// </table>
		// </center>
		// </p>

    else
        // inv tt=1, 0.67
    {
        
        	echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){
   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img>
		</center>
		</p>
		<p>
		This study consists of two tasks. The first task is to complete a brief experiment and the second task is to complete a survey.
		<strong>Experimental Task:</strong> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. All of the websites are designed to simulate real websites viewed with a Firefox browser, but just like in the real world,the Firefox browser may not be able to ensure the protection of your credentials.</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
       <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>


		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you undestand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
    }
}
// <p>
			// Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		// </p>

		// <p>
		// <center>
		// <table>
		// <tr>
		// <td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		// <td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		// </tr>
		// <tr>
		// <td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		// </tr>
		// </table>
		// </center>
		// </p>
//<p><center><img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img></center>	</p>
 //iu
 else if($_SESSION['type']=='iu') {
	//TODO: Change instructions here to explain accuracy condition
       //tt = 0
       if($_SESSION['tt']==0)
    {
	echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){
   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		
		<p> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. </p>
		<p><center><img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img></center>	</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
			Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		</p>

		<p>
		<center>
		<table>
		<tr>
		<td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		<td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		</tr>
		<tr>
		<td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		</tr>
		</table>
		</center>
		</p>

		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you undestand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
       }
       else
           //iu tt-1
       {
           echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){
   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img>
		</center>
		</p>
		<p>
		<strong>Experimental Task:</strong> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. All of the websites are designed to simulate real websites viewed with a Firefox browser, but just like in the real world,the Firefox browser may not be able to ensure the protection of your credentials.</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
			Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		</p>

		<p>
		<center>
		<table>
		<tr>
		<td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		<td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		</tr>
		<tr>
		<td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		</tr>
		</table>
		</center>
		</p>

		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you undestand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
       }
} elseif($_SESSION['type']=='account'){
	//TODO: Change instructions here to explain accuracy condition
       //tt = 0
       if($_SESSION['tt']==0)
    {
	echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){
   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure.  As your time on the experimental task INCREASES, your bonus DECREASES. You will be able to constantly monitor the elapsed time and bonus payout at the TOP OF THE PAGE. </p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized and have to wait 15 seconds before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
			Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		</p>

		<p>
		<center>
		<table>
		<tr>
		<td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		<td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		</tr>
		<tr>
		<td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		</tr>
		</table>
		</center>
		</p>

		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you undestand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
       }
       else
           //iu tt-1
       {
           echo '
		<div id="studyarea">
		<div id="jscriptwarning">You must have javascript enabled to take this study.</div>
		<div id="sis">
		<div id="thisStudy" class="instructions">
		<center><H2>What Does This Study Entail</H2></center><br>
      This study consists of two tasks. The first task is to complete a brief experiment, and the second task is to complete a survey.';
      if($_SESSION['valid_participant']){
   echo 'You will receive $4 for completing these two tasks, but you can earn up to $5 more depending on how quickly you complete the experimental task. As your time on the experimental task increases, your bonus will decrease. You will be able to constantly monitor the elapsed time and bonus payout at the top of the page. Here is a screen shot of the clock that will appear at the top of every page showing elapsed time and bonus payout. The penalty time is explained below. <p>If you manage to take this HIT multiple times <strong>You will only be paid once, for your first attempt. Thus, you are not allowed to take the survey multiple times and refreshing the page will invalidate your result. Please use mouse or touchpad to take the survey. </strong>
';
      }
    echo '
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/screenClock.png" alt="Screen Clock" width="60%"><br>Screen Clock</img>
		</center>
		</p>
		<p>
		<strong>Experimental Task:</strong> In this experiment, you will be presented with a series of websites, and you will need to decide whether or not to sign-in to each of these sites based on whether or not they are secure. All of the websites are designed to simulate real websites viewed with a Firefox browser, but just like in the real world,the Firefox browser may not be able to ensure the protection of your credentials.</p>
		<br>
		<center>
		<BUTTON onclick="$(\'#thisStudy\').hide(); $(\'#needToDo\').show();">Next Instructions</BUTTON>
				</center>
		</div>
		<div id="needToDo" class="instructions" style="display:none;">
		  <center><H3>What do you need to do?</H3></center><br> The goal of this task is to visit all the websites in as short a time as possible. If the website is secure, sign-in and then you will proceed to the next website. <span id="bigText">If you decide to not login because the website is not secure, then you should not sign-in, rather you should click the <strong>Back Button</strong> on the browser toolbar.</span> Your performance will be timed, and your final '. ($_SESSION['valid_participant']?'payout':'score') .' will depend on how much time it takes to complete the task:
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/functionalButtons.png" alt="Functional Buttons" width="60%"></center></p>
		<p>
		<B>
        <OL>
		<LI>If you decide to sign-in and the website is secure, you will proceed immediately to the next website.</LI>
		<LI>If you decide to sign-in and the website is insecure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is secure, you will be penalized $0.67 before continuing.</LI>
		<LI>If you decide to not sign-in and the website is not secure, you will proceed immediately to the next website.</LI>
		</OL>
        </B>
		</p><center>
		<BUTTON onclick="$(\'#needToDo\').hide(); $(\'#thisStudy\').show();">Previous Instructions</BUTTON> <BUTTON onclick="$(\'#needToDo\').hide(); $(\'#loggingIn\').show();">Next Instructions</BUTTON>
		</center>
		</div>
		<div id="loggingIn" class="instructions" style="display:none;">
		<p>
		<center><H3>Logging- or Signing-in to a website:</H3></center><br> All websites do not follow the same conventions for signing- or logging-in. Typically, the sign-in or log-in prompt will be found in the upper right-hand side of the web page. For a few of the websites, you will need to click on a pull-down menu titled "My Account" or something similar beginning with "My xxxxxxx".
		</p>
		<p>
		<center>
		<img src="../Images/imagesforscreenshots/loginExamples.png" alt "Login Examples" width="60%"><br>Login Examples</img>
		</center>
		</p>

		<p>
			Once you click on this prompt, you will be directed to: (1) a new page with another prompt to sign-in or log-in, or (2) a pop-up window with another prompt to sign-in or login. If prompted to sign-in or log-in, click on the sign-in or log-in prompt and then you will be directed to begin the next trial. If you decide to not login, you can click the back button on the 2nd page of the website. Please note, you cannot click the back button on the 1st page of the website.
		</p>

		<p>
		<center>
		<table>
		<tr>
		<td><img src="../Images/imagesforscreenshots/newSiteLogin.png" alt="New Site Login" width="90%"></td>
		<td><img src="../Images/imagesforscreenshots/popupLogin.png" alt="Popup Login" width="90%"></td>
		</tr>
		<tr>
		<td><center>New Login Site</center></td><td><center>Popup Login Site</center></td></tr>
		</tr>
		</table>
		</center>
		</p>

		<p>
			It is important to understand that you will maximize your '. ($_SESSION['valid_participant']?'payout':'score') .' by <span id="bigText"><strong>responding as quickly and as accurately as possible.</strong></span></p>

		<BUTTON onclick="$(\'#loggingIn\').hide(); $(\'#needToDo\').show();">Previous Instructions</BUTTON>
		 <p>
                        Before you can begin the experimental task, you must verify that you undestand the instructions. Click the <strong>"Check Understanding"</strong>
                <p>
                                <BUTTON id="checkUnderstanding">Check Understanding</BUTTON>
                </p>
		</div>
			</DIV>';
       }
}

?>




	<FORM id="surveyResults" method="POST" action="dataReceiver.php">&nbsp;
	<DIV id="question" class="instructions"></DIV>
	<DIV id="allquestions" class="instructions"></DIV>
	<DIV id="completedquestions">
		<input type="hidden" id="workerId" value="<?php echo $_SESSION['participant'];?>"/>
		<input type="hidden" id="participantType" value="<?php echo $_SESSION['participantType'];?>"/>
		<input type="hidden" id="experimentCondition" value="<?php echo $_SESSION['experimentConditionNumber'];?>"/>
        <input type="hidden" id="assignmentId" value="<?php echo $_SESSION['assignmentId'];?>"/>
		<input type="hidden" id="country_code" value="<?php echo $_SESSION['country'];?>"/>
	</DIV>
	</FORM>
	<DIV id="error"></DIV>
	<DIV id="navigation" class="instructions">&nbsp;</DIV>



</div>


</body>
</html>
