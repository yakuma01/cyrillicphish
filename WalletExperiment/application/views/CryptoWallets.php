<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Android Play Store Study</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
        crossorigin="anonymous">

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

    <!--IoT CSS -->
    <link rel="stylesheet" href="<?=base_url()?>css/style.css" />

</head>

<body onload="setControl(<?=$group?>); loadCategory();">
    <div class="container-fluid" id="simulator" class="mb-5" style="display:block">
	<center>
		<h1>
			<div> Please choose <b> 4 </b> apps out of the 8 apps below in this category! </div>
		</h1>
		<h1>
			<div> Category <span id="catNum"> </span> / 4 : <span id="catName"> </span> </div>
		</h1>
		<h1>
			<div id="appInstalledNum"> Apps Installed in Category <span id="installNum"> </span> / 4 </div>
		</h1>
	</center>



        <div id="applist" style="position: relative; left: 0px; top: 5px; border-style:solid; height:605px; width: 282px; margin-left:auto; margin-right:auto;">
            <img src="../../images/base-list.png" width="276" />
            <div id="apps" style="position: absolute; top: 103px; left: 0px; width:260px;">


            </div>
        </div>
        <div id="appdesc" style="position: relative; left: 0px; top: 5px; border-style:solid; width: 281px; display:none; margin-left:auto; margin-right:auto;">
            <img src="../../images/app-desc.png" width="275px" />
            <div id="backarea" style="position: absolute; width:50px; height:50px; top: 10px; left: 0px;" onclick="showApps();"></div>
	    <button id="installarea" style="position: absolute; width:100px; height:30px; top: 120px; left: 170px;"></button>

            <img id="appdescimage" width="35px" height="35px" style="position: absolute; top: 75px; left: 5px;" />
            <div id="downloadtitle" style="position: absolute; top: 80px; left: 45px;"></div>
            <img id="DownloadImage" width="72px" height="96px" style="position: absolute; top: 158px; left: 90px;" />
	    <img id="RatingImage" width="70px" height="80px" style="position: absolute; top: 170px; left: 10px;" />
	    <?php if (!$group) { ?>
	    <img id="PrivacyImage" width="70px" height="77px" style="position: absolute; top: 170px; left: 170px;"/>
	    <?php } ?>
            <button id="downloaddescription" style="position: absolute; top: 270px; left: 5px; text-align:center; margin-left:auto; margin-right:auto; ">View/Hide Permissions</button>

            <!--45 -->
            <div id="perms" style="position: absolute; top: 300px; left: 0px;">
                <div id="accordionwrap" style="overflow-y:scroll; width:273px; height:180px;">
                    <div id="accordion">
                    </div>
                </div>
            </div>
        </div>
	<center>
        <div id="BackToAppSet" class="row justify-content-center mb-3" style="display:none; margin:15px;">
            <button id="ShowAppsButton" onclick="showApps();return false;"> 
                Back to List of Apps in Current Category
            </button>
            <br/>
        </div>
        <div id="nextButtonDiv" class="row justify-content-center mb-3" style="display:none; margin:15px;">
            <button id="nextButton" onclick="loadNextCategory();return false;"> 
                Continue to Next App Set
            </button>
            <br/>
        </div>
        <div id="lastButtonDiv" class="row justify-content-center mb-3" style="display:none; margin:15px;">
            <button id="lastButton" onclick="loadLastCategory();return false;"> 
                Go Back to Last App Set
            </button>
            <br/>
        </div>
	</center>

   </div>
    <div id="readyToSubmit" style="display:none" >
	    <center>
		    <h1>
			    You have selected all the apps!
			    <form id="submitForm" method="post" action="submitApps">
				    <button onclick="return submitApps(this);"> Submit </button> 
			    </form>
		    </h1>
	    </center>
    </div>
    <div id="redirectDiv" style="display:none" >
            <center>    
                        <h1>
                                You should be redirected to a post experiment survey shortly, if you are not please contact smomenza@iu.edu.
                        </h1>   
            </center>   
    </div>
	
</body>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
    crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
    crossorigin="anonymous"></script>

<script src="<?=base_url()?>scripts/jquery-1.11.2.min.js"></script>
<script src="<?=base_url()?>scripts/jquery-ui.js"></script>
<script src="<?=base_url()?>scripts/jquery.raty.js"></script>
<script src="<?=base_url()?>scripts/choosingScript.js"></script>

</html>
