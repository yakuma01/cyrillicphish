<?php
// Initialize the session
session_start();
 
$agent = $_SERVER['HTTP_USER_AGENT'];

$_SESSION['firefox'] = '/Firefox/';

$isFirefox = preg_match($_SESSION['firefox'],$agent);
//if(!$isFirefox){
 // echo 'It appears that you are not using a recognized version of Firefox. Please return to view this experiment using Firefox, as we have some functionality that requires Firefox, and we want to make sure you do not have further problems with this experiment.<br><br>';
 // if($_SESSION['verified']){
 //echo '<p><font color="red">Your email is verified!</font></p>';
 // }
 // die;
//}
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}
?>
 
<!DOCTYPE html>
<html class="js" lang="en-US"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>HATS | Human and Technical Security</title>
<link rel="stylesheet" href="HATS_files/skeleton.css" type="text/css" media="all">
<link rel="stylesheet" href="HATS_files/bootstrap.css">
<link rel="stylesheet" href="HATS_files/nav.css" type="text/css" media="all">
<link rel="stylesheet" href="HATS_files/custom.css" type="text/css" media="all">
<link href="HATS_files/style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="HATS_files/mobile.css" type="text/css" media="all">
    <script src="HATS_files/responsive-nav.js"></script>
</head>

<body class="front-page">
    <section class="nav-mobile">
        <div class="container ">
            <div class="row ">
                <div class="twelve columns">
</div></div></div></section>    <section class="header">
        <div class="container ">
            <div class="row ">
                <div class="twelve columns">
                    <div id="menu_nav" class="row nav centered merged-five">
<table width="100%">
<tr>
<td width=30%>
                    <a href="http://www.usablesecurity.net/"><img class="u-max-full-width" src="HATS_files/hatsWord2.jpg" alt="HATS"></a>
</td>
<td width=30% style="text-align:center;">
                    <a href="javascript:void(0)"><img class="u-max-full-width" src="Images/Uni_Glasgow_2017_arms.png" height="140px" alt="Cyber Security"></a>
</td>
<td width=30% style="text-align:right;">
                    <a href="https://www.csiro.au/"><img class="u-max-full-width" src="Images/CSIRO.jpg" alt="CSIRO"></a>
</td>
</tr>
</table>
                    </div>

                </div>
            </div>
        </div>
    </section>


