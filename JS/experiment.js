//variable definitions
var trialNum=0;
var legitimateSites=0;
var OSCondition=0;
var experimentCondition=null;
var experimentOrderNumber = null;
var presentationOrder = null;
var serverTime;
var trial = null;
var sampleTime = 0;
var penaltyTime = 0;
var trialTime = 0;
var bonusTime = 280;
var nTrials = 10;
var bonusPay = 8.00;
var startTrialTime=0;
var startInstructionTime=0;
var trialRunning = false;
var experimentRunning = false;
var ordergroup = 0;
var xPos= "";
var yPos= "";
var x= "";
var y= "";
var mouseClick = {"button":"","time":"","mouseX":"","mouseY":"","type":""};
var part=0;
var currentPart=0;
var badSitesLoggedInto = 0;
var goodSitesSkipped = 0;
var parentWindow = window.opener;
var participantId = window.opener.document.getElementById("workerId").value;
var testMap = '<map id="scaleMap0" name="map"><area shape="circle" coords="20,95,17" href="javascript:advanceExperiment(\'back\')" /><area shape="rect" coords="1455,79,1865,774"  href="javascript:advanceExperiment(\'login\')" /></map>';



function serverTimer() {
  $.ajax({  
    url: 'serverTime.php',
    cache: false,
    async:false,
    success: function(data){
      serverTime = data;
    }
  });
}



//function sendPulse(pulseDuration){
//  var xhttp = new XMLHttpRequest();
//  xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200){
//       console.log(this.responseText);
//    }
//    };
//  xhttp.open("POST", "OnePulseClient.php?myValue=" + pulseDuration, true);
//    xhttp.send();
//}



var participantInfo =  
{
  id:participantId,
  os: navigator.oscpu,
  browser:navigator.
  appCodeName,
  version:navigator.appVersion,
  simplifiedOS: null
};

//console.log(navigator.oscpu); 
//console.log(participantInfo);
//simplifiedOS = /(Windows|Mac|x86_64|-sm|Linux)/.exec(participantInfo.os)[1];


//switch(simplifiedOS){
 // case "Windows":
  //  participantInfo.simplifiedOS = "Windows";
  //  participantInfo.map = winMapDict;
  //  break;
//  case "Mac":
 //   participantInfo.simplifiedOS = "Mac";
    //participantInfo.map = macMapDict;
  //  break;
    //case "x86_64":
    //case "-sm":
    //participantInfo.simplifiedOS = "Linux";
    //participantInfo.map = linuxMapDict;
    //break;
 // default:
    //participantInfo.simplifiedOS = "Windows";
  //  participantInfo.map = winMapDict;
//}

//This forces the simplified OS to Windows until images are created for other OSes
participantInfo.simplifiedOS = "Windows";
participantInfo.map = winMapDict;



var stimuliDirectory="../Images/"+participantInfo.simplifiedOS;



//speed v accuracy
var conditionNumber = window.opener.document.getElementById("experimentCondition").value;
// Debug
//console.log("conditionNumber: " + conditionNumber);



var experimentalConditions = ["Speed","Accuracy"];

//taskOrder
/*
var tasks = [
  {"taskSite":"airbnb","pages":2,"condition":"EV"},
  {"taskSite":"battle","pages":2,"condition":"EV"},
  {"taskSite":"dropbox","pages":2,"condition":"EV"},
  {"taskSite":"ebay","pages":2,"condition":"EV"},
  {"taskSite":"github","pages":2,"condition":"EV"},
  {"taskSite":"godaddy","pages":2,"condition":"EV"},
  {"taskSite":"paypal","pages":2,"condition":"EV"},
  {"taskSite":"steam","pages":2,"condition":"EV"},
  {"taskSite":"tripadvisor","pages":2,"condition":"EV"},
  {"taskSite":"twitter","pages":2,"condition":"EV"},
  {"taskSite":"ups", "pages":2, "condition":"EV"},
  {"taskSite":"wordpress", "pages":2, "condition":"EV"},
  {"taskSite":"yahoo", "pages":2, "condition":"EV"},
  {"taskSite":"adcash","pages":2,"condition":"SV"},
  {"taskSite":"adfly","pages":2,"condition":"SV"},
  {"taskSite":"adobe","pages":2,"condition":"SV"},
  {"taskSite":"aliexpress","pages":2,"condition":"SV"},
  {"taskSite":"amazon","pages":2,"condition":"SV"},
  {"taskSite":"expedia","pages":2,"condition":"SV"},
  {"taskSite":"flipkart","pages":2,"condition":"SV"},
  {"taskSite":"giphy","pages":2,"condition":"SV"},
  {"taskSite":"netflix","pages":2,"condition":"SV"},
  {"taskSite":"salesforce","pages":2,"condition":"SV"},
  {"taskSite":"stackoverflow","pages":2,"condition":"SV"},
  {"taskSite":"twitch","pages":2,"condition":"SV"},
  {"taskSite":"yelp","pages":2,"condition":"SV"}  
];
*/



// if(countrycode != "US"){
//   tasks = [];
//   console.log("country is not US");
// }


//adjust this to include all the orders, but for now testing
// The number of actual orders is 4 but
// We make 8 orders to have a clean distribution of images based 
// on the followingcriteria
var taskOrdering = [0,2,4,6];
var orderingdictionary = {0:0, 1:2, 2:4, 3:6};

// console.log("ordergroup: " + ordergroup);
// 1; not-spoof
// 3; spoof
var taskDifficulty = [
  [1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3], // order1 - control + not spoofed
  [1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3], // order2 - control + spoofed 
  [1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,1,3,3], // order3 - lowrisk + not spoofed- BECOMES AU
  [1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,1,3,3], // order4 - lowrisk + spoofed BECOMES AU
  [1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,1,3,3,3,3], // order5 - midrisk + not spoofed-BECOMES UK...
  [1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,1,3,3,3,3], // order6 - midrisk + spoofed
  [3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,3,1,1], // order7 - highrisk + not spoofed
  [3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,1,3,3,1,3,1,1]  // order8 - highrisk + spoofed
];

var presentationIndex = [0,1,2,3,4,5,6,7,8,9];
//var presentationIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]; //we will need to make sure the orresponding sites are removed, I would just copy the files in so that there are 13 in each folder
// var presentationIndex = []; //we will need to make sure the orresponding sites are removed, I would just copy the files in so that there are 13 in each folder

// var nTrials = tasks.length;

function disableF5(e) { if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault(); }

//document actions
$(document).ready(function(){

  $('#submitButton').hide();
  $('#startTrial').hide();
  //TODO: Have added separate display for accuracy condition in experiment.php.  Is hidden here until the different experiment conditions are functional
  //$('#accuracyDisplay').hide();
  $(document).on("keydown", disableF5);
  window.history.forward(-1);
  $(document).on( "mousemove", function( event ) {
    xPos = event.pageX;
    yPos = event.pageY;
  });
  
  $(document).on( "click", function( event ) {
    //alert(xPos);  
    mouseClick['button'] += event.which+";"+mouseClick['button'];
    //alert(mouseClick['button']);
    mouseClick['time'] += new Date().getTime()+";"+mouseClick['time'];
    mouseClick['mouseX'] += event.pageX +";"+mouseClick['mouseX'];
    mouseClick['mouseY'] += event.pageY +";"+mouseClick['mouseY'];
    mouseClick['type'] += 'click;'+mouseClick['type'];
  });
  //$(document).on( "dblclick", function( event ) {
  //  mouseClick['button'] += event.which+";"+mouseClick['button'];
  //  mouseClick['time'] += new Date().getTime()+";"+mouseClick['time'];
  //  mouseClick['mouseX'] += event.pageX +";"+mouseClick['mouseX'];
  //  mouseClick['mouseY'] += event.pageY +";"+mouseClick['mouseY'];
  //  mouseClick['type'] += 'dblclick;'+mouseClick['type'];
  //});
  countrycode = $('#countrycode').text();
  //if(countrycode === ""){
  // console.log(countrycode);
  // if (typeof countrycode == 'undefined'){
  //     countrycode = "US";
  // }
  // console.log(countrycode);
  $('#countrycode').hide();
  participantInfo.map = dict[countrycode];
  
  ordergroup = $('#ordergroup').text();
  $('#ordergroup').hide();


  /*
  //console.log(countrycode);
  var keys = Object.keys(dict[countrycode + ""]);
  //console.log(keys);
  //console.log(tasks["taskSite"])
  var tasks = [];
  presentationIndex = []
  var arrayLength = keys.length;
  for (var i = 0; i < arrayLength; i++) {
    if(ordergroup == 0){
      if(keys[i].match(/12/)){
        var str = keys[i].replace('12', '');
        // console.log(str);
        tasks.push({"taskSite":str,"pages":2,"condition":"EV"});
        //if(countrycode == "US" || countrycode == "CA"){
	  if(countrycode == "US"){
          presentationIndex.push(i/2);
        }
      }
    }
    else{
      if(!keys[i].match(/12/)){
        var str = keys[i];
        // console.log(str);
        tasks.push({"taskSite":str,"pages":2,"condition":"EV"});
       // if(countrycode == "US" || countrycode == "CA"){
	  if(countrycode == "US"){
          presentationIndex.push(i/2);
        }
		
      }
    }  
    if(countrycode != "US"){
      presentationIndex.push(i);
    }
  }

  // console.log(presentationIndex);
  
  // if(countrycode == "NZ"){
  //   presentationIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]; //we will need to make sure the orresponding sites are removed, I would just copy the files in so that there are 13 in each folder
  // }
  // if(countrycode == "ZA"){
  //   //presentationIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]; //we will need to make sure the orresponding sites are removed, I would just copy the files in so that there are 13 in each folder
  //   presentationIndex = [0,1]; //we will need to make sure the orresponding sites are removed, I would just copy the files in so that there are 13 in each folder
  // }
  */
  //nTrials = tasks.length;

  // console.log(tasks["taskSite"])
  // console.log(tasks);
  // Debug
  //console.log("ordergroup: " + ordergroup);
  advanceExperiment('startExperiment');
  $("#results").submit(
    function(event){

      event.preventDefault();

      var $form = $( this );
      var posting = $.post('dataReceiver.php', $form.serialize());

      posting.done(function(data){
        if(countrycode == "RU" || countrycode == "UA" || countrycode =="BY"){
          if (data.indexOf("Вот ваши результаты") > -1) {
            $("#startTrial").remove();
            $("#stimuli").html(data).show();}
        
        }
        if(countrycode == 'BG'){
          if (data.indexOf("Ето резултатите от Вашето изпълнение") > -1) {
            $("#startTrial").remove();
            $("#stimuli").html(data).show();}
        }
      });
        
        return false;
    });

});



var ImageMap = function(map, img){
  var n;
  var areas = map.getElementsByTagName('area');
  var len = areas.length;
  var prevCoords = [];
  var previousWidth=1920;
  for (n=0; n < len; n++){
    prevCoords[n] = areas[n].coords.split(',');

  }
  this.resize = function(){
    var n,m,clen,
      x = img.offsetWidth / previousWidth;
    for (n = 0; n < len; n++) {
      clen= prevCoords[n].length;
      for(m=0;m<clen;m++){
        prevCoords[n][m] *= x;
      }
      areas[n].coords = prevCoords[n].join(',');
    }
    previousWidth = img.offsetWidth;
    return true;
  };
  window.onresize = this.resize;
};

//function definitions
function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function startSurvey(){
  self.close();
}


function recordMouseData(xPosition,yPosition){
  x = xPosition+";"+x;
  y = yPosition+";"+y;
  part = currentPart+";"+part;
  sampleTime = new Date().getTime()+";"+sampleTime;
  //serverSampleTime = serverTime()+";"+serverSampleTime;
}

function calculatePay(elapsedTime,bonusTime,bonusPay, condition){
  var pay;
  if (condition == "Speed") {
    pay = ((1 - (elapsedTime / bonusTime)) * bonusPay);
    pay = Math.max(0.00, pay);
    if (pay < 1.00) {
      pay = Math.round(pay);
    }
    return (pay.toFixed(2));
    //return(Math.max(0,(1-(elapsedTime/bonusTime))*bonusPay).toFixed(2));
  }
  else if (condition=="Accuracy") {
    //TODO: insert function once Tim and Bennet decide upon it after testing
    var fracIncorrect = ((badSitesLoggedInto + goodSitesSkipped)/nTrials);
    /** adjust weightIncorrect to manipulate the effects of misses.
    /*  For example, weightIncorrect = 2 means that bonus pay is 0 when
    /*  participant has missed half of the trials.
    /*  Increasing the weight means participants have less leeway for error.
    /*  Reducing weightIncorrect increases their margin for error. 
    /*  Suggestions are:
    /*  weightIncorrect = 2; //no bonus pay at 50% accuracy
    /*  weightIncorrect = 2.5; //no bonus pay at 60% accuracy
    /*  weightIncorrect = 1.67; //no bonus pay at 40% accuracy
     **/
    var weightIncorrect = 2;
    var weightedPenalty = 1 - (weightIncorrect*fracIncorrect);
    pay = bonusPay * weightedPenalty;
    pay = Math.max(0.00,pay);
    if (pay < 1.00) {
      pay = Math.round(pay);
    }
    return (pay.toFixed(2));
  }
}

function advanceExperiment(clickedResponse){
  switch(clickedResponse){
    case "startExperiment":
      startExperiment();
      break;
    case "showInstructions":
      trial = showInstructions();
      break;
    case "startTrial":
      startTrial();
      break;
    case "back":
      //sendPulse(30);
      stopTrial(trial,clickedResponse);
      break;
    case "login":
      stopTrial(trial,clickedResponse);
      //sendPulse(20);
      //advanceTrial(trial);
      //console.log("should not reach here on login");
      break;
    case "reload":
      switch(currentPart){
        case 1:
          $("#stimuliImage1").hide();
          $("#stimuliImage1").show();
          break;
        case 2:
          $("#stimuliImage2").hide();
          $("#stimuliImage2").show();
          break;
        default:
          console.log("should not reach here on reload");
      }
      break;
    default:
      console.log("should not reach here.");
  }

}

function appendResults(name,value){
  // Debug
  //console.log(name + " : " + value + " : " + trialNum);
  $('#results').append("<input name=\"trials\" type=\"hidden\" value=\""+trialNum+"\"/>");
  $('#results').append("<input name=\""+name+"\" type=\"hidden\" value=\""+value+"\"/>");
}

function startExperiment(){
  if(experimentRunning){
    return;
  }

  experimentCondition = experimentalConditions[conditionNumber];
  //experimentOrderNumber = getRandomSubarray(taskOrdering,1)[0];
  experimentOrderNumber = orderingdictionary[ordergroup];
  presentationOrder = getRandomSubarray(presentationIndex,nTrials);
  console.log(experimentOrderNumber);
  //console.log(presentationOrder);
  participantInfo.experimentCondition = experimentCondition;
  participantInfo.experimentOrderNumber = experimentOrderNumber;
  participantInfo.experimentPresentationOrder = presentationOrder;
  stimuliDirectory = stimuliDirectory+ "/" + countrycode + "/Order";
	//console.log(stimuliDirectory);
  experimentRunning=true;
  //hide the experiment start
  $('#startExperiment').hide();
  //run trial from 1 -> N
  advanceExperiment("showInstructions");
}

function showInstructions(){
  if(trialRunning){
    return;
  }
  //setup Stimuli
  trial = loadAndSaveStimuli();
  //console.log(trial);
  //start mouse tracking

  startInstructionTime = new Date().getTime();
  serverTimer();
  serverStartInstructionTime = serverTime;

  part = currentPart = 0;
  trial['trialPart ' + currentPart + ' StartTime'] = new Date().getTime();

  mouseClick = {"button":"","time":"","mouseX":"","mouseY":"","type":""};
  //for each trial
  //show instructions
  if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY"){
    var instructionHTML = '<center><strong>Испытание '+(trialNum+1)+'/'+nTrials+'</strong><br>Когато сте готови, натиснете бутона за стартиране на пробен период</center>';
  }
  if(countrycode === "BG"){
    var instructionHTML = '<center><strong>Trial '+(trialNum+1)+'/'+nTrials+'</strong><br>Когато сте готови, натиснете бутона за стартиране на пробен период</center>';
  }
  $('#stimuli').html(instructionHTML).show();
  //sendPulse(10);
  $('#startTrial').show();
  return(trial);
}


function loadAndSaveStimuli(){
  // console.log(countrycode);
  var keys = Object.keys(dict[countrycode + ""]);
  //console.log(keys)
  
  var tasks = [];
  var arrayLength = keys.length;

  for (var i = 0; i < arrayLength; i++) {
    if(experimentOrderNumber === 0 || experimentOrderNumber === 1){
      
      if(keys[i].match(/12/)){
        var str = keys[i].replace('12', '');
        //console.log(str);
        tasks.push({"taskSite":str,"pages":2,"condition":"EV"});  
      }
    }
    else
    {
      
      if(!keys[i].match(/12/)){
        var str = keys[i];
        //console.log(str);
        tasks.push({"taskSite":str,"pages":2,"condition":"EV"});
      }
    }


  }
  //console.log(tasks);
  var task = tasks[participantInfo.experimentPresentationOrder[trialNum]];
  //console.log(participantInfo);
  console.log(task)
  var trialDifficulty = taskDifficulty[participantInfo.experimentOrderNumber][participantInfo.experimentPresentationOrder[trialNum]];
  var trial = {"difficulty": trialDifficulty, "trialNumber": trialNum,"image":task["taskSite"],"trialCondition":task["condition"],"pages":task["pages"]};
    //console.log(participantInfo);
    // for(var i = 0;i < tasks.length;i++){

    // }
   



    // console.log("participantInfo.experimentOrderNumber: " + participantInfo.experimentOrderNumber);
    // console.log("participantInfo.experimentPresentationOrder[trialNum]: " + participantInfo.experimentPresentationOrder[trialNum]);
    // console.log("trialDifficulty: " + trialDifficulty);
    
    
    // Debug 
    //console.log(participantInfo.experimentOrderNumber + ", " + participantInfo.experimentPresentationOrder[trialNum]);
    // console.log(trial);
    
  
  //console.log(tasks);
  return(trial);
 
}

function updateClockHTML(elapsedTime, elapsedPenaltyTime,totalBonusTime,maxBonusPay, condition){
  if (condition == 'Accuracy') {
    if(countrycode == "UA" || countrycode == "RU" || countrycode == "BY"){
      return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>Got Right: '+(trialNum-(badSitesLoggedInto+goodSitesSkipped))+'</td><td>Got Wrong: '+(badSitesLoggedInto+goodSitesSkipped)+'</td><td>Bonus Pay: '+calculatePay((elapsedTime+elapsedPenaltyTime),totalBonusTime,maxBonusPay,experimentCondition)+'</td></tr></table></center>');
    }
    if(countrycode == "BG"){
      return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>Got Right: '+(trialNum-(badSitesLoggedInto+goodSitesSkipped))+'</td><td>Got Wrong: '+(badSitesLoggedInto+goodSitesSkipped)+'</td><td>Bonus Pay: '+calculatePay((elapsedTime+elapsedPenaltyTime),totalBonusTime,maxBonusPay,experimentCondition)+'</td></tr></table></center>');
    }
    
  }
  else if (condition == 'Speed') {
    return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>Elapsed Time: '+(elapsedTime+elapsedPenaltyTime).toFixed(2)+'</td><td>Penalty Time: '+elapsedPenaltyTime.toFixed(2)+'</td><td>Bonus Pay: '+calculatePay((elapsedTime+elapsedPenaltyTime),totalBonusTime,maxBonusPay,experimentCondition)+'</td></tr></table></center>');
  }
}

function updateReport(elapsedTime, elapsedPenaltyTime,totalBonusTime,maxBonusPay, condition){
  if (condition == 'Accuracy') {
    return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>Got Right: '+(trialNum-(badSitesLoggedInto+goodSitesSkipped))+'</td><td>Got Wrong: '+(badSitesLoggedInto+goodSitesSkipped)+'</td></tr></table></center>');
  }
  else if (condition == 'Speed') {
    //Add Translations for Penalty Time
    if(countrycode == "RU" || countrycode == "UA" || countrycode == "BY"){
      return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>пройденное время: '+(elapsedTime+elapsedPenaltyTime).toFixed(2)+'</td><td>Penalty Time: '+elapsedPenaltyTime.toFixed(2)+'</td></tr></table></center>');
    }
    if(countrycode == "BG"){
      return('<center><table border=1 rules=none cellspacing=10 cellpadding=10><tr><td>изтечено време '+(elapsedTime+elapsedPenaltyTime).toFixed(2)+'</td><td>Penalty Time: '+elapsedPenaltyTime.toFixed(2)+'</td></tr></table></center>');
    }
    
  }
}

function isEven(n) {
   return n % 2 === 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function startTrial(){
  if(trialRunning){
    return;
  }
  //update the mouse tracking.
  currentPart = 1;
  trial['trialPart ' + currentPart + ' StartTime'] = new Date().getTime();
  serverTimer();
  trial['trialPart ' + currentPart + ' ServerStartTime'] =serverTime;
  sampleTime = trial['trialPart ' + currentPart + ' StartTime'];
  serverSampleTime = serverTime; 
  x = xPos;
  y = yPos;
  sampledPositions = setInterval(function(){recordMouseData(xPos,yPos);},4);
  //record how long it took to read instructions
  trial.instructionTime = (new Date().getTime()-startInstructionTime);
  $('#startTrial').hide();
  //load the image
  var spoofedOrNot = (experimentOrderNumber+1);
  // console.log(experimentOrderNumber);
  // console.log("Difficulty: " + trial["difficulty"])
  if(isEven(experimentOrderNumber) && trial["difficulty"] == 3){
    spoofedOrNot = spoofedOrNot + 1;
  }
  if(isOdd(experimentOrderNumber) && trial["difficulty"] == 1){
    spoofedOrNot = spoofedOrNot - 1;
  }
  var initialSource = stimuliDirectory+""+spoofedOrNot+"/"+trial.image;
  var image = initialSource+".jpg";
  //console.log(trial.image);
  //console.log(image);
  // if(countrycode != "US"){
  //   image = initialSource+"_" + countrycode + ".jpg";
  // }
    
  // console.log("Image path" + image);
  //  var loginImage = initialSource+"_login.png";
  var trial_image;
  if(experimentOrderNumber === 0 || experimentOrderNumber === 1){
    trial_image = trial.image + "12";
  }else{
    trial_image = trial.image;
  }
  // console.log("trial_image: " + trial_image);
  // Debug
  //console.log("experimentOrderNumber: " + experimentOrderNumber + ", trial_image: " + trial_image);
  var imageMap = participantInfo.map[trial_image];
  //console.log(imageMap);
  //  var loginMap = participantInfo.map[trial.image+"_login"];
  //console.log(loginMap);
  var trialHTML = "";
  if(imageMap === undefined ){
    imageMap = testMap;
    trialHTML = '<center><img src=\"'+image+'\" alt='+trial.image+' id="stimuliImage1" border="0" usemap="#map"/>'+imageMap+'</center>';
    //      trialHTML = trialHTML + '<center><img src=\"'+loginImage+'\" alt='+trial.image+' id="stimuliImage2" border="0" usemap="#map"/>'+loginMap+'</center>';
  }
  else{
    trialHTML = '<center><img src=\"'+image+'\" alt='+trial.image+' id="stimuliImage1" border="0" usemap="#'+trial_image+"_map"+'"/>'+imageMap+'</center>';
    //      trialHTML = trialHTML + '<center><img src=\"'+loginImage+'\" alt='+trial.image+' id="stimuliImage2" border="0" usemap="#'+trial.image+"_login_map"+'"/>'+loginMap+'</center>';
  }
  //console.log("Debug");
  //console.log(imageMap);

  //first we show initial screen with potential manipulations.
  $('#report').html(updateClockHTML(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
  if(document.getElementById("bonus")){
    $('#bonus').html(updateClockHTML(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
  }
  if(document.getElementById("report")){
    $('#report').html(updateReport(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
  }
  $('#stimuli').html(trialHTML);
  $('#trials').value = trialNum;
  $('#loading').show();
  $('#stimuliImage1').load(function(){
    startTrialTime = new Date().getTime();
    serverTimer();
    serverStartTrialTime = serverTime;
    $('#startTrial').hide();
    $('#loading').hide();
    $('#display').show();
    trialCountDown = setInterval(function(){
      trialTime = trialTime+1;
      if(trialTime < 0){
        trialTime = Number.MAX_VALUE;
      }
      if(document.getElementById("bonus")){
        $('#bonus').html(updateClockHTML(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
      if(document.getElementById("report")){
        $('#report').html(updateReport(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
    },1000);
    trialRunning=true;
    $('#stimuli').show();
    $('#stimuliImage1').show();
    //console.log(document.getElementById('scaleMap0'));
    imageMap = new ImageMap(document.getElementById('scaleMap0'), document.getElementById('stimuliImage1'));
    imageMap.resize();
  });

}

function advanceTrial(stimulus){
  trial.response1 = "login";
  currentPart = 2;
  trial['trialPart ' + currentPart + ' StartTime'] = new Date().getTime();
  serverTimer();
  trial['trialPart ' + currentPart + ' ServerStartTime'] = serverTime;

  $('#stimuliImage1').hide();

  $('#stimuliImage2').show();
  imageMap = new ImageMap(document.getElementById('scaleMap1'), document.getElementById('stimuliImage2'));
  imageMap.resize();
}

function applyPenalty(response,time, condition){

  var secondsLeft;
  var delay;
  var initialPenaltyTime;
  var errorHTML;
  if (condition == 'Speed') {
    secondsLeft = time;
    delay = 100;
    initialPenaltyTime = penaltyTime;
    penaltyTime += time;
    $("#stimuli").hide();
     errorHTML = "<H2>Applying Penalty</H2><p>";
    switch(response){
      case 0:
        errorHTML = "<H1>Did Not Log Into a Good Site</H1><p>"+errorHTML;
        break;
      case 1:
        errorHTML = "<H1>Logged Into a Bad Site</H1><p>"+errorHTML;
        break;
    }
  }
  else if (condition=='Accuracy'){
    secondsLeft = 3;
    delay = 100;
    initialPenaltyTime = penaltyTime;
    penaltyTime += time;
    $("#stimuli").hide();
    errorHTML = "";
    switch(response){
      case 0:
        errorHTML = "<H1>Did Not Log Into a Good Site</H1><p>"+errorHTML;
        break;
      case 1:
        errorHTML = "<H1>Logged Into a Bad Site</H1><p>"+errorHTML;
        break;
    }
  }

  var interval = setInterval(function() {
    if((secondsLeft > 0.1) && (condition == 'Speed')){
      $("#stimuli").hide();
      $("#startTrial").hide();
      $("#error").html(errorHTML).show();
      secondsLeft -= 0.1;
      initialPenaltyTime += 0.1;
      if(document.getElementById("bonus")){
        $('#bonus').html(updateClockHTML(trialTime,initialPenaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
      if(document.getElementById("report")){
        $('#report').html(updateReport(trialTime,initialPenaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
    }
    else if((secondsLeft > 0.1) && (condition == 'Accuracy')){
      $("#stimuli").hide();
      $("#startTrial").hide();
      $("#error").html(errorHTML).show();
      secondsLeft -= 0.1;
      initialPenaltyTime += 0.1;
      if(document.getElementById("bonus")){
        $('#bonus').html(updateClockHTML(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
      if(document.getElementById("report")){
        $('#report').html(updateClockHTML(trialTime,penaltyTime,bonusTime,bonusPay, experimentCondition)).show();
      }
    }
    else {
      $("#error").hide();
      if(document.getElementById("bonus")){
        $('#bonus').hide();
      }
      if(document.getElementById("report")){
        $('#report').hide();
      }
      $("#stimuli").show();
      $("#startTrial").show();
      clearInterval(interval);
    }
  }, delay);
  return false;
}

function stopTrial(stimulus,clickResponse){
  //for each trial create an input to store subject id, stim displayed, tiral
  //number,condition,response in left, response in right, subject's
  //response,error,resp_num,response time, time to initialize, distractor,
  //ideal y-int, maxdev, time trial is run,number of samples, X coordinates, Y
  //coordinates.
  //stop the trial
  trial.x = x;
  trial.y = y;
  trial.part = part;
  trial.sampleTime = sampleTime;
  clearInterval(sampledPositions);
  clearInterval(trialCountDown);
  trial.response2 = clickResponse;
  var currentTime = new Date().getTime();
  serverTimer(); 
  var currentServerTime = serverTime;
  var RT = currentTime - startTrialTime;
  var servRT = currentServerTime - serverStartTrialTime;
  trial.responseTime = RT;
  trial.serverResponseTime = servRT;
  trialRunning = false;
  $("#error").hide();
  if(document.getElementById("bonus")){
    $('#bonus').hide();
  }
  if(document.getElementById("report")){
    $('#report').hide();
  }
  trial.correct = 1;
  // Debug
  //console.log("trial[difficulty]: " + trial["difficulty"]);
  switch(trial["difficulty"]){
    case 0:
    case 1:
      if(clickResponse == "back"){
        applyPenalty(0,15, experimentCondition);
        goodSitesSkipped++;
        trial.correct = 0;
      }
      break;
    case 2:
    case 3:
      if(clickResponse == "login"){
        applyPenalty(1,15, experimentCondition);
        badSitesLoggedInto++;
        trial.correct = 0;
      }
      break;
    default:

  }


  //record trial information
  for(var key in trial){
    appendResults("t"+trialNum+key,trial[key]);
  }
  for(key in mouseClick){
    appendResults("t"+trialNum+key,mouseClick[key]);
  }

  trialNum++;
  if(trialNum < nTrials){
    $('#stopTrial').hide();
    currentPart=0;
    $("#trials").value = trialNum;
    $("#results").submit();
    //$('#num_trials').submit();
    $("#results").empty();
    advanceExperiment("showInstructions");
  }
  else{
    participantInfo.goodSitesSkipped = goodSitesSkipped;
    participantInfo.badSitesLoggedInto = badSitesLoggedInto;
    participantInfo.bonusPay = calculatePay((trialTime+penaltyTime),bonusTime,bonusPay,experimentCondition);
    for (key in participantInfo){
      appendResults(key,participantInfo[key]);
    }
    $("#stimuli").empty();
    $("#results").submit();
    $("#results").empty();
    $("#startTrial").hide();
  }
}
