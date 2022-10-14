<?php
session_start();
echo "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
<title>Login or Not Login Experiment</title>
<style>

.display{
	width:100%;
	margin:0 auto;
	display: none;
	position: fixed;
	z-index: 101;	
}

.error{
	width:1080px;
	height:768px;
	min-width: 300px;
	min-height: 300px;
	margin:150px auto;
	position: relative;
	z-index:103;
	padding: 10px;	
}

#loading {
    width:70%;
    margin-left:auto;
    margin-right:auto;
    display:none;
    top:50px;
    position:relative;
}	


#stimuli {
	font-family: Arial, Helvetica, sans-serif;
	position: relative;
	display:none;
	z-index:100; 
}

#stimuliImage1 {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	display:none;
	position: relative;

}

#stimuliImage2 {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	display:none;
	position: relative;
}

.bonus{
	position: relative;
}

#results {
	position: relative;
	display: none;	
}

#num_trials {
	position: relative;
	display: none;	
}

#startExperiment {
	position: relative;
	text-align: center;
	top: 400px;
	font-weight: bold;
	color: white;
	font-size: 14pt;	
}

#startTrial {
	position: relative;
	text-align: center;
	top: 540px;
	font-weight: bold;
	color: white;
	font-size: 200%;
	display: none;	
}


</style>
<script src=\"../JS/jquery-1.11.0.js\" type=\"text/javascript\"></script>
<script src=\"../JS/common.js\" type=\"text/javascript\"></script>
<script src=\"../JS/experiment.js\" type=\"text/javascript\"></script>
</head>
<body>

 
	

<center>
<div id=\"display\">
<div id=\"error\">
</div>
";
if($_SESSION['valid_participant']){
  echo "<div id=\"bonus\"></div>";
}else{
  echo "<div id=\"report\"></div>";
}
echo "
</div>

<!--<div id=\"accuracyDisplay\">
<div id=\"error\">
</div>
<div id=\"bonus\">
</div>
</div>--> ";

if($_SESSION['country'] == "RU" || $_SESSION['country'] == "UA" || $_SESSION['country'] == "BY"){
	echo "<div id=\"loading\"><H3>Пожалуйста, подождите, пока загрузится пробная версия</H3><br>
	<img src=\"../Images/imagesforscreenshots/loading.gif\">
	</div>";
	
}
if($_SESSION['country'] == "BG"){
	echo "<div id=\"loading\"><H3>Моля, изчакайте докато се зареди пробната версия</H3><br>
	<img src=\"../Images/imagesforscreenshots/loading.gif\">
	</div>";
	
}

echo "<div id=\"stimuli\">
<div id=\"stimuliImage1\"></div>
<div id=\"stimuliImage2\"></div>
<div id=\"ordergroup\">" . $_SESSION['group'] . "</div>
<div id=\"countrycode\">" . $_SESSION['country'] . "</div>
</div>
</div>

<br>
";
if($_SESSION['country'] == "RU" || $_SESSION['country']== "UA" || $_SESSION['country'] == "BY"){
	echo "<a href=\"javascript:advanceExperiment('startTrial')\" id=\"startTrial\"><button type=\"button\">
	Начинать</button></a>";
}
if($_SESSION['country'] == "BG" ){
	echo "<a href=\"javascript:advanceExperiment('startTrial')\" id=\"startTrial\"><button type=\"button\">
	Започнете</button></a>";
}


echo 
"<form id=\"results\" action=\"/\" method=\"post\">
  <input id=\"trials\" name=\"trials\" type=\"hidden\">
</form>
</center>
</body>
</html>
";
?>
