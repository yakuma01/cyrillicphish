<?php
/**
 * Created by IntelliJ IDEA.
 * User: Tom
 * Date: 3/26/2015
 * Time: 1:32 PM
 */

session_start();

if(isset($_POST['trials'])){
    $_SESSION['trials'] = $_POST['trials'];
}

$totalTrials = $_SESSION['trials'];
$halfTrials = $totalTrials/2;

foreach($_POST as $k => $v) {
    if (strpos($k, 'difficulty') !== false) {
        $foundkey = TRUE;
    }
}

$user = "anonymous";
if(isset($_SESSION['user']) != ""){
    $user = $_SESSION['user'];
}

if (!file_exists(dirname(__FILE__)."/results/".$_SESSION['country'])) {
    mkdir(dirname(__FILE__)."/results/".$_SESSION['country'], 0755, true);
    //echo "CREATING directory: " . $_SESSION['country'];
}

if (array_key_exists('What_is_your_age', $_POST) == TRUE) {
    $_POST['participant'] = $_SESSION['participant'];
    $_POST['valid_participant'] = $_SESSION['valid_participant'];
    $encoded = json_encode($_POST, JSON_PRETTY_PRINT);
    $saveto = dirname(__FILE__)."/results/".$_SESSION['country']."/raw_sis_data_".$_SESSION['participant']."_" . $user . "_" .$_SESSION['time'].".json";
    file_put_contents($saveto, $encoded);

    //header("Location: stressSite.php");
    header("Location: bart.php");
//} elseif (array_key_exists('bart_results', $_POST)==TRUE){
} elseif (isset($_POST['bart_results'])){
    $_POST['participant'] = $_SESSION['participant'];
    $_POST['valid_participant'] = $_SESSION['valid_participant'];
    $encoded = json_encode($_POST, JSON_PRETTY_PRINT);
    $saveto = dirname(__FILE__)."/results/".$_SESSION['country']."/raw_bart_data_".$_SESSION['participant']."_" . $user . "_" .$_SESSION['time'].".json";
    file_put_contents($saveto, $encoded);

    //echo "BART Results: ", $_POST['bart_results'];
    header("Location: stressSite.php");
    //header("Location: bart.php");
} elseif (array_key_exists('For_the_purposes_of_this_study_if_you_feel_the_presented_website_is_NOT_SECURE_what_action_should_you_take', $_POST)==TRUE){
	
	$_POST['participant'] = $_SESSION['participant'];
	if(isset($_SESSION['valid_participant'])){
	$_POST['valid_participant'] = $_SESSION['valid_participant'];       
	}
  
	$encoded = json_encode($_POST, JSON_PRETTY_PRINT);
	$saveto = dirname(__FILE__)."/results/".$_SESSION['country']."/raw_validation_data_".$_SESSION['participant']."_" . $user . "_" .$_SESSION['time'].".json";
	file_put_contents($saveto, $encoded);

	if (array_key_exists('Which_gender_do_you_most_identify_with', $_POST) == TRUE) {
		
    		$_POST['workerId'] = $_SESSION['participant'];
    		$_POST['assignmentId'] = $_SESSION['assignmentId'];
        if(isset($_SESSION['valid_participant'])){
        	$_POST['valid_participant'] = $_SESSION['valid_participant'];       
        }
    		$encoded = json_encode($_POST, JSON_PRETTY_PRINT);
    		$saveto = dirname(__FILE__)."/results/".$_SESSION['country']."/raw_survey_data_".$_SESSION['participant']."_" . $user . "_" .$_SESSION['time'].".json";
    		file_put_contents($saveto, $encoded);

    		if(isset($_SESSION['CAS']) == true){
				console.log("cas");
      		header("Location: thanksIU.php");
    		} else{
                if($_SESSION['type'] == "mturk"){
					// console.log("mturk");
                    header("Location: thanksMturk.php");    
                }else{
					console.log("invited");
                    header("Location: thanksinv.php");   
                }
      		
    		}
	}
} elseif ($foundkey == TRUE) {
    $_POST['participant'] = $_SESSION['participant'];
    $_POST['valid_participant'] = isset($_SESSION['valid_participant']);

    $saveto = dirname(__FILE__)."/results/".$_SESSION['country']."/raw_site_data_".$_SESSION['participant']."_" . $user . "_" .$_SESSION['time'].".json";

    $arr_data = array();

    if (file_exists($saveto)) {
        $server_json = file_get_contents($saveto);
        $arr_data = json_decode($server_json, true);
    }

    $arr_data[] = $_POST;
    $encoded = json_encode($arr_data, JSON_PRETTY_PRINT);
    file_put_contents($saveto, $encoded);
	  $_SESSION['completedTrials'] = $_SESSION['completedTrials']+1;
    if (array_key_exists('bonusPay', $_POST) == TRUE) {
        $goodSites = $halfTrials - $_POST['goodSitesSkipped'];
        $badSites = $halfTrials - $_POST['badSitesLoggedInto'];
        $bonusPay = $_POST['bonusPay'];

        $_SESSION['bonusPay'] = $_POST['bonusPay'];

        echo
        "Вот ваши результаты:<br>
        Общее количество тестовых сайтов: $totalTrials<br>
        Вы правильно переходили в $goodSites из $halfTrials безопасных веб-сайтов.<br>
        Вы правильно отказались переходить в $badSites из $halfTrials небезопасных сайтов.<br>";
        if(isset($_SESSION['valid_participant'])){
          echo "<p>In order to receive your bonus of <strong>\$$bonusPay</strong> with the guaranteed compensation of \$2.00 and additional bonus for the balloon experiment, you now need to complete the survey.</p>";
        }
        echo "<p>Обратите, пожалуйста, внимание на то, что некоторые вопросы включаются в опросе для обеспечения качества. </p><br>
        <BUTTON id=\"startSurvey\" onClick=\"javascript:startSurvey()\">Продолжить к эксперименту.</BUTTON>";
    }
}
else{
	if($_SESSION['CAS'] == true){
		//console.log("cas");
      		header("Location: thanksIU.php");
    	} else{
                if($_SESSION['type'] == "mturk"){
	 	    //console.log("mturk");
                    header("Location: thanksMturk.php");    
                }else{
					//console.log("invited");
                    header("Location: thanksinv.php");   
                }
	}
};
