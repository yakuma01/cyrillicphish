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
if($_SESSION['user'] != ""){
    $user = $_SESSION['user'];
}

?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>      
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>        
        <title>oBART</title>
        
        <!-- these files are required for the BART to work    -->
        <script type="text/javascript" src="../JS/jquery-1.11.0.js"></script>              <!-- basic javascript library for dom manipulation -->
        <script type="text/javascript" src="../JS/jquery.jcanvas.min.js"></script>          <!-- the canvas plugin -->
        <script type="text/javascript" src="../JS/jquery.bart.js"></script>                         <!-- the main BART plugin -->
        <link rel="stylesheet" type="text/css" href="../css/jquery.bart.css" />                   <!-- additional styles for to make the BART look fancy -->
        
        <!-- additional scripts to run the demo on this page -->
        <script type="text/javascript">
            $(document).ready(function() {	 
	        //load BART
            var s = {//txt_cashin: 'PUNKTE SAMMELN',
                     //txt_inflate: 'BALLON AUFBLASEN',
                     //txt_next: 'Nï¿½chster Ballon',
                     //txt_balloon_number: 'Ballon:',
                     //txt_current_earned: 'Punkte fï¿½r Ballon:',
                     //txt_total_earned: 'Punkte insgesamt:',
                     //txt_prob_explosion: "Wahrscheinlichkeit,\n\n dass Ballon platzt:",
                     showpumpcount: false,
                     showpopprob: false,
                     ballon: {popprob: 60}};
            var b = [ {b:1, o: { color: 'blue', earnings: 1}}, 
                      {b:1, o: { color: 'green', earnings:1}},
                      {b:1, o: { color: 'red', earnings: 1}} ];
                $("#bart").bart( {s:s, b:b} );
	    });
	</script>
    
    </head>
    <body>
        <!--<h1 style="text-align:center;">Online Ballon Analogue Risk Task (oBART)</h1>-->
        <?php
        if($_SESSION['country'] == 'RU' || $_SESSION['country']=='UA' || $_SESSION['country']== 'BY'){
        ?>
            <h1 style="text-align:center;">Нажмите, пожалуйста, на шарик, чтобы надувать его. Когда вы закончите, нажмите, пожалуйста, на следующий шарик. Чем больше надувается шарик, тем больше станет ваша оплата. Обратите внимание на то, что вы потеряете всю свою сумму если шарик лопнет. </h1>  
				<p style="text-align:center;"> <strong> Внимание: </strong> Нажимая на шарик, вы услышите звук. Проверьте, пожалуйста, что звук на вашем устройстве включен. </p>
        <!-- load AMP here -->
        <?php } ?>

        <?php
        if($_SESSION['country'] == 'BG'){
            ?>
                <h1 style="text-align:center;">Моля, натиснете НАДУВАНЕ НА БАЛОН за да надуете балона. Когато приключите, моля натиснете СЛЕДВАЩ БАЛОН.  Колкото повече се надува балонът, толкова по-голямо става заплащането Ви, но ще загубите цялата си сума за всеки балон, който се спука. </h1>  
                    <p style="text-align:center;"> <strong> Внимание:  </strong> Ще чуете звук при натискане на балона. Уверете се, че звукът на устройството Ви е включен.</p>
            <!-- load AMP here -->
        <?php } ?>
        <div id="bart" style="margin: auto; text-align: center;"></div>
        

	<FORM id="bartResults" method=POST action="dataReceiver.php">&nbsp;
	<DIV id="completedquestions">
		<input type="hidden" id="workerId" value="<?php echo $_SESSION['participant'];?>"/>
		<input type="hidden" id="participantType" value="<?php echo $_SESSION['participantType'];?>"/>
		<input type="hidden" id="experimentCondition" value="<?php echo $_SESSION['experimentConditionNumber'];?>"/>
    <input type="hidden" id="assignmentId" value="<?php echo $_SESSION['assignmentId'];?>"/>
    <input type="hidden" id="saveBart" name="bart_results" value=""/>
	</DIV>
	</FORM>

</body>

</html>
