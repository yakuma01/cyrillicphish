<?php
session_start();

$authenticated = $_SESSION['CAS'];
$casurl = 'https://'.$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME'];
$query = $_SERVER['QUERY_STRING'];

if (!$authenticated) {
	$_SESSION['CAS'] = true;
	header("Location: https://cas.iu.edu/cas/login?cassvc=IU&casurl=$casurl");
	exit;
}

if ($authenticated) {
	if (isset($_GET["casticket"]) || isset($_SESSION['casticket'])) {
		$casticket = isset($_GET["casticket"]) ? $_GET["casticket"] : $_SESSION['casticket'];
		$_url = 'https://cas.iu.edu/cas/validate';
		$cassvc = 'IU';
		$params = "cassvc=$cassvc&casticket=$casticket&casurl=$casurl";
		$urlNew = "$_url?$params";
		$ch = curl_init();
		$timeout = 5;
		curl_setopt ($ch, CURLOPT_URL, $urlNew);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //ignores SSL (Dev only)
		ob_start();
		curl_exec($ch);
		if(!curl_exec($ch)){ //cURL error
    	die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
		}
		curl_close($ch);
		$cas_answer = ob_get_contents();
		ob_end_clean();

		list($access,$user) = explode("\n",$cas_answer,3);
//    echo "CAS ANSWER: " . $cas_answer . "<br/>";
//    echo "acess: " . $access;
//    die;
		$access = trim($access);
		$user = trim($user);

		if ($access == "yes") {
			$_SESSION['user'] = $user;
			$_SESSION['valid'] = true;
		} else {
			$_SESSION['valid'] = false;
		}
		header("Location: $casurl?authcheck=true");
		exit;

	}
	else
	{
		$_SESSION['CAS'] = true;
		header("Location: https://cas.iu.edu/cas/login?cassvc=IU&casurl=$casurl");
		exit;
	}

}



?>
