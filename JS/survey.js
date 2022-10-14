/**
 * Created by Tom on 3/25/2015.
 */

var questions;
var which_set;

var countrycode;
var opts=[];
var queryString = window.location.search;

//function processReload(event){


//};

//window.addEventListener("beforeunload", processReload, false);
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

function popup(url) {
  var width = screen.width;
  var height = screen.height;
  var left = (screen.width - width) / 2;
  var top = (screen.height - height) / 2;
  var params = 'width=' + width + ', height=' + height;
  params += ', top=' + top + ', left=' + left;
  params += ', directories=no';
  params += ', location=no';
  params += ', menubar=no';
  params += ', resizable=no';
  params += ', scrollbars=yes';
  params += ', status=no';
  params += ', toolbar=no';
  newwin = window.open(url, 'experimentWindow', params);
  var timer = setInterval(function () {
    if (newwin.closed) {
      clearInterval(timer);
      runSurvey();
    }
  }, 100);
  if (window.focus) { newwin.focus(); }
}

$(document).ready(function () {

  blockTurkForward();
  window.history.forward(-1);
  var experimentCondition = $('#experimentCondition').val();
  var participantType = $('#participantType').val();

  $("#countrycode").hide();
  $("#ordergroup").hide();
  var docTitle = document.title;
  switch (docTitle) {
    case "Log in Not Log in Study Description":
      prepValidationInstructions();
      questions = participantValidationQuestions[participantType].concat(validationQuestions[participantType][experimentCondition]);
      which_set = "validation";
      break;
    case "Study Description":
      prepExperimentInstructions();
      questions = cultureQuestions.concat(skill_questions);
      which_set = "skills";
      break;
    case "Log in Not Log in Consent Form":
      prepSisAcknowledged();
      //console.log(participantType);
      questions = participantQuestions[participantType].concat(PreStudyQuestions);
      which_set = "sis";
      break;
    default:
      console.log("Unknown");
  }
});

function blockTurkForward() {
  $("#submitButton").hide();
  $("#sis_form").keypress(function (e) {
    if (e.which == 13) {
      return false;
    }
  });
  !window.debug && $("#completedquestions").hide();
}

function prepSisAcknowledged() {
  $("#jscriptwarning").hide();
  $("#sis").show();
  $("#sisacknowledged").click(function () {
    // TODO: verify that they have accepted the job
    if ($('#assignmentId').val() == 'ASSIGNMENT_ID_NOT_AVAILABLE') {
      alert('You must accept the HIT before continuing.');
      return false;
    }
    $("#sis").hide();
    runSurvey();
    return false;
  });
}

function prepValidationInstructions() {
  $("#jscriptwarning").hide();
  $("#sis").show();
  $("#checkUnderstanding").click(function () {
    // TODO: verify that they have accepted the job
    if ($('#assignmentId').val() == 'ASSIGNMENT_ID_NOT_AVAILABLE') {
      alert('You must accept the HIT before continuing.');
      return false;
    }
    $("#sis").hide();
    runSurvey();
    return false;
  });
}


function prepExperimentInstructions() {
  $("#jscriptwarning").hide();
  $("#sis").show();
  //$("#beginExperiment").click(function(){
  // TODO: verify that they have accepted the job
  //    if ($('#assignmentId').val()=='ASSIGNMENT_ID_NOT_AVAILABLE'){
  //        alert('You must accept the HIT before continuing.');
  //        return false;
  //    }
  //    $("#sis").hide();
  //    popup("experiment.php");
  //    $("#question").html("<h3>Please leave this window open while completing the site tasks. Closing or reloading will invalidate the results and you will not get paid.</h3>").show();
  //    return false;
  //});
}

function runSurvey() {
  $("#sis").hide();
  $("#completedquestions").append("<h1>COMPLETED QUESTIONS</h1>");
  setupAllQuestions();
  // setupQuestion(0);
  countrycode = $('#countrycode').text();
  if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY"){
    $("#navigation").html("<hr><button id='nextbutton'>Продолжать</button>");
  }
  else {
    $("#navigation").html("<hr><button id='nextbutton'>продължи</button>");
  }
  
  
  
  $("#nextbutton").click(function () {
    // nextQuestion();
    nextQuestionBatch();
    return false;
  });
}

function showFinish() {

  countrycode = $('#countrycode').text();
  
  if (countrycode === "") {
    countrycode = "US";
  }

  // console.log("countrycode: " + countrycode);
  var websites = Object.keys(dict[countrycode + ""]);
  // console.log("Websites: " + websites)
  // console.log(tasks["taskSite"])
  
  var arrayLength = websites.length;
  // console.log("ArrayLength: " + arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    if (websites[i].match(/12/)) {
      var str = websites[i].replace('12', '');
      opts.push(str);
      // console.log(str);
    }
  }
  skill_questions[0].options = opts;

  switch (which_set) {
    case 'skills':
      $("#surveyResults").submit();
      break;
    case 'sis':
      $("#sis_form").submit();
      break;
    case 'validation':
       console.log("HERE");
      $.post('dataReceiver.php', $("#surveyResults").serialize());
      $("#sis").hide();
      popup("experiment.php");
      if(countrycode == "UA" || countrycode == "RU" || countrycode == "BY"){
        $("#question").html("<h3>Пожалуйста, не закрывайте страницу во время задач, так как это действие отменит результаты.</h3>").show();
      }
      if(countrycode == "BG"){
        $("#question").html("<h3>Молим Ви не закривайте страницата по време на задачите, че това действие ше анулира резултатите.</h3>").show();
      }
      
      questions = cultureQuestions.concat(skill_questions);
      which_set = "skills";
      break;
    default:
      break;
  }
}

function setupAllQuestions() {
  countrycode = document.getElementById("countrycode").innerText;
 // alert(countrycode);
  
  var q_idx;
  for (q_idx = 0; q_idx < questions.length; q_idx++) {
    let id_name = "question" + q_idx;
    let id = "#" + id_name
    $("#allquestions").append("<DIV id=\"" + id_name + "\" class=\"ease\"></DIV>")


    window.currentQuestion = q_idx;
    question = questions[q_idx];
    if (typeof question.question == 'undefined') {
      if (window.surveypath == 'benefit') {
        question.question = question.question_ben;
      } else {
        question.question = question.question_risk;
      }
    }
    $(id).hide();

    if(countrycode === 'RU' || countrycode === 'UA' || countrycode === "BY"){
    $(id).html('<br><h3>[' + (q_idx + 1) + "/" + questions.length + "] " + question.questionRU + '</h3>').show();
    }
    if(countrycode === "BG") {
      $(id).html('<br><h3>[' + (q_idx + 1) + "/" + questions.length + "] " + question.questionBG + '</h3>').show();
    } 
    switch (question.type) {
      case 'checkboxmatrix':
        buildCheckboxMatrix(question, id);
        break;
      case 'checkall':
        buildCheckAll(question, id);
        break;
      case 'matrixrank':
        buildMatrixRank(question, id);
        break;
      case 'dimensionalrank':
        buildDimensionalRank(question, id);
        break;
      case 'freeformint':
        buildFreeFormInt(question, id);
        break;
      case 'freeCode':
        buildCode(question, id);
        break;
      case 'freeform':
        buildFreeForm(question, id);
        break;
      case 'radiowithother':
        /* No questions of this type in survey */
        buildRadioWithOther(question, id);
        break;
      case 'radio':
        buildRadio(question, id);
        break;
      case 'radiowithform':
        buildRadioWithForm(question, id);
        break;
      case 'agreementscale':
        buildAgreementScale(question, id);
        break;
      case 'countrySelect':
        buildCountrySelect(question, id);
        break;
      default:
        alert('uncrecognized question type ' + question.type);
    }
    // $(id).hide();
    // $(id).html('<br><br>').show();

  }
  window.currentQuestionStartTime = new Date().getTime();
}


function setupQuestion(question) {
  window.currentQuestion = question;
  question = questions[question];
  if (typeof question.question == 'undefined') {
    if (window.surveypath == 'benefit') {
      question.question = question.question_ben;
    } else {
      question.question = question.question_risk;
    }
  }

  $("#question").hide();

  if(countrycode == "RU" || countrycode == "UA" || countrycode == "BY"){
    $("#question").html('<h3>' + question.questionRU + '</h3>').show(); 
  }
  if(countrycode == "BG"){
    $("#question").html('<h3>' + question.questionBG + '</h3>').show(); 
  }
    

  switch (question.type) {
    case 'checkboxmatrix':
      buildCheckboxMatrix(question);
      break;
    case 'checkall':
      buildCheckAll(question);
      break;
    case 'matrixrank':
      buildMatrixRank(question);
      break;
    case 'dimensionalrank':
      buildDimensionalRank(question);
      break;
    case 'freeformint':
      buildFreeFormInt(question);
      break;
    case 'freeCode':
      buildCode(question);
      break;
    case 'freeform':
      buildFreeForm(question);
      break;
    case 'radiowithother':
      buildRadioWithOther(question);
      break;
    case 'radio':
      buildRadio(question);
      break;
    case 'radiowithform':
      buildRadioWithForm(question);
      break;
    case 'agreementscale':
      buildAgreementScale(question);
      break;
    case 'countrySelect':
      buildCountrySelect(question);
      break;
    default:
      alert('uncrecognized question type ' + question.type);
  }
  window.currentQuestionStartTime = new Date().getTime();
}

var g_agreement = 0;
var g_dict = {};

// 26 * 2 = 52

function check_agreement(option){
  if(g_dict[option] == 0){
    g_agreement += 2;
    g_dict[option] = 1;
	//  $('#changeopacity').css("opacity", "60%");
    //alert(g_agreement);
  }//else{
   // alert(option + " is already selected");
  //}
}

function buildAgreementScale(question, id) {
  var html = '<table>';

  for (i in question.options) {
    var name = clean(question.options[i]);
    var outputName = name.substr(0, name.indexOf('.'));
    var min = question.min;
    var max = question.scale;
    var step = question.step;
    var defaultVal = question.def;
    //var defaultVal = -1;
    g_dict[question.options[i]] = 0;
    var questionHTML = "<tr><td>" + question.options[i] +
	  //  "</td><td>" + min + "</td><td><input type='range' min='" + min + "' max='" + max + "' step='" + step + "' value='" + defaultVal + "'name='" + name + "'onchange='" + outputName + "Output.value = value'/></td><td>" + max + "</td></tr><tr><td colspan='4' style='text-align:center'><output id='" + outputName + "Output'>" + defaultVal + "</output></td></tr>";
     "</td><td>" + min + "</td><td id='changeopacity'><input type='range' min='" + min + "' max='" + max + "' step='" + step + "' value='" + defaultVal + "'name='" + name + "' oninput=check_agreement('" + question.options[i] + "') /></td><td>" + max + "</td></tr><tr><td colspan='4' style='text-align:center'><output id='" + outputName + "Output'></output></td></tr>";
    html += questionHTML;
  }
  html += '</table>';
  $(id).append(html);
}

function buildRadio(question, id) {
  var html = '';

  

  
    if (countrycode === 'RU' || countrycode === 'UA' || countrycode === 'BY'){

      for (i in question.optionsRU) {
      html += "<input type='radio' name='" + clean(question.question) + "' value='" + clean(question.options[i]) + "'/> " + question.optionsRU[i] + '<br>';
      }
    }

    if(countrycode === "BG"){
      for (i in question.optionsBG){
      html += "<input type='radio' name='" + clean(question.question) + "' value='" + clean(question.options[i]) + "'/> " + question.optionsBG[i] + '<br>';
      }
    }
    
  
  $(id).append(html);
}

function buildRadioWithOther(question, id) {
  var html = '';
  for (i in question.options) {
    html += "<input type='radio' name='" + clean(question.question) + "' value='" + clean(question.options[i]) + "'/> " + question.options[i] + '<br>';
  }
  html += "<input type='radio' name='" + clean(question.question) + "' value='other'/> Other (please specify):";
  html += "<input type='text' name='" + clean(question.question) + "_other' value=''/><br>";
  $(id).append(html);
}

function buildRadioWithForm(question, id) {
  var html = '';
  for (i in question.options) {
    html += "<input type='radio' name='" + clean(question.question) + "' value='" + clean(question.options[i]) + "'/> " + question.options[i] + '<br>';
  }
  for (i in question.formText) {
    html += question.formText[i] + " <input type='text' name='" + clean(question.question) + '_' + clean(question.formText[i]) + "' value=''/><br>";
  }
  //html+= name='"'+clean(question.question)+"_"+clean(question.formText[i])+'"';
  $(id).append(html);
}

function buildFreeFormInt(question, id) {
  var html = '<br><input type="text" name="' + clean(question.question) + '" value="">';
  $(id).append(html);
}
function buildCode(question, id) {
  var html = '<br><input type="text" name="' + clean(question.question) + '" value="">';
  $(id).append(html);
}

function buildFreeForm(question, id) {
  var html = '<br><input type="text" name="' + clean(question.question) + '" value="">';
  $(id).append(html);
}

function buildDimensionalRank(question, id) {
  var html = '';
  for (i in question.dimensions) {
    html += '<b>' + question.dimensions[i].title + '</b>: ' + question.dimensions[i].explanation + '<br>';
  }
  html += '<br><table border="1"><tr><td><i>Information</i></td>';
  for (i in question.dimensions) {
    html += '<td><b>' + question.dimensions[i].title + '</b></td>';
  }
  html += '</tr>';
  for (i in question.rows) {
    html += '<tr><td>' + question.rows[i] + '</td>';
    for (j in question.dimensions) {
      html += '<td><input type="text" name="' + clean(question.prefix + '_' + question.rows[i] + '_' + question.dimensions[j].title) + '" value=""/></td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  $(id).append(html);
}

function buildMatrixRank(question, id) {
  var html = '<table border="1"><tr><td><i>Information</i></td>';
  for (i in question.columns) {
    html += '<td><b>' + question.columns[i] + '</b></td>';
  }
  html += '</tr>';
  for (i in question.rows) {
    html += '<tr><td>' + question.rows[i] + '</td>';
    for (j in question.columns) {
      html += '<td><input type="text" name="' + clean(question.prefix + '_' + question.rows[i] + '_' + question.columns[j]) + '" value=""/></td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  $(id).append(html);
}

function buildCheckboxMatrix(question, id) {



 // var html = '<table border="1"><tr><td><i>Information</i></td>';
 var html = '<table border="1"><tr><td></td>'; 


  

	// console.log(opts);

  if(countrycode == "RU" || countrycode == "UA" || countrycode == "BY"){

     


    for (i in question.columnsRU) 
    {
    html += '<td style="padding: 5px;"><b>' + question.columnsRU[i] + '</b></td>';
    }
    html += '</tr>';


    

    for (i in question.optionsRU)  {
      html += '<tr><td style="padding: 5px;">' + question.optionsRU[i] + '</td>';
     // console.log("for every row"+question.options[i]);
      for (j in question.columnsRU) {
        
      //  console.log("for every column"+question.columns[i]);
        //html += '<td><input type="checkbox" name="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '" value="yes"/></td>';


      html += '<td><input type="radio" name="' + clean(question.prefix + '_' + question.options[i]) + '" value="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '"/></td>';    
      }
      html += '</tr>';
    }


  }
  if(countrycode =="BG")
  {

    for (i in question.columnsBG) 
    {
    html += '<td style="padding: 5px;"><b>' + question.columnsBG[i] + '</b></td>';
    }
    html += '</tr>';


    for (i in question.optionsBG) {
      html += '<tr><td style="padding: 5px;">' + question.optionsBG[i] + '</td>'; 
     // console.log("for every row"+question.options[i]);
      for (j in question.columnsBG) {

      //  console.log("for every column"+question.columns[i]);
        //html += '<td><input type="checkbox" name="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '" value="yes"/></td>';
    html += '<td><input type="radio" name="' + clean(question.prefix + '_' + question.options[i]) + '" value="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '"/></td>';    
      }
      html += '</tr>';
    }

  }
  
  html += '</table>';
  $(id).append(html);
}


var numcheck = 0;
function buildCheckAll(question, id) {
  var html = '';
  for (i in question.options) {
	  numcheck = numcheck + 1; 
	  if(clean(question.prefix + '_' + question.options[i]) == "undefined_I_do_not_know" || clean(question.prefix + '_' + question.options[i]) == "undefined_I_do_not_know_about_this_certificate" || clean(question.prefix + '_' + question.options[i]) == "undefined_None_of_the_above") {

      if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY") {
        html += "<input type='radio' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='" + clean(question.options[i]) + "' onchange='radiochangecheckbox(this)'/> " + question.optionsRU[i] + '<br>';
      }
      if(countrycode === "BG"){
        html += "<input type='radio' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='" + clean(question.options[i]) + "' onchange='radiochangecheckbox(this)'/> " + question.optionsBG[i] + '<br>';
      }
	    
	     }
	  else {

      if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY") {
    html += "<input type='checkbox' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='yes' onchange='radiochangecheckbox(this)'/> " + question.optionsRU[i] + '<br>';
      }
      if(countrycode === "BG"){
        html += "<input type='checkbox' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='yes' onchange='radiochangecheckbox(this)'/> " + question.optionsBG[i] + '<br>';
      }
   // html += '<input type="checkbox" id="' +numcheck + '" name="' + clean(question.prefix + '_' + question.options[i]) + '" value="yes" onchange="'radiochangecheckbox(this)/>' + question.options[i] + '<br/>';
  	}
  }
  $(id).append(html);
}

function radiochangecheckbox(obj) {
	$('input[class="Have_you_ever_Please_check_all_that_apply"]').on('change', function(){
    		if ($(this).attr('type') == 'radio' ) {
        		if ( $(this).prop('checked') ) {
            			$('input[class="Have_you_ever_Please_check_all_that_apply"][type="checkbox"]').prop('checked', false);
        		}
    		}
    		else {
        		if ( $(this).prop('checked') ) {
           	 		$('input[class="Have_you_ever_Please_check_all_that_apply"][type="radio"]').prop('checked', false);
        		}
    		}
	});
	$('input[class="What_is_phishing_Please_check_all_that_apply"]').on('change', function(){
    		if ($(this).attr('type') == 'radio' ) {
        		if ( $(this).prop('checked') ) {
            			$('input[class="What_is_phishing_Please_check_all_that_apply"][type="checkbox"]').prop('checked', false);
        		}
    		}
    		else {
        		if ( $(this).prop('checked') ) {
           	 		$('input[class="What_is_phishing_Please_check_all_that_apply"][type="radio"]').prop('checked', false);
        		}
    		}
	});
	$('input[class="What_is_the_purpose_of_an_X.509_certificate_for_websites_Please_check_all_that_apply"]').on('change', function(){
    		if ($(this).attr('type') == 'radio' ) {
        		if ( $(this).prop('checked') ) {
            			$('input[class="What_is_the_purpose_of_an_X.509_certificate_for_websites_Please_check_all_that_apply"][type="checkbox"]').prop('checked', false);
        		}
    		}
    		else {
        		if ( $(this).prop('checked') ) {
           	 		$('input[class="What_is_the_purpose_of_an_X.509_certificate_for_websites_Please_check_all_that_apply"][type="radio"]').prop('checked', false);
        		}
    		}
	});
	//var cbs3 = document.getElementsByClassName("Have_you_ever_Please_check_all_that_apply");
	//var cbs2 = document.getElementsByClassName("What_is_the_purpose_of_an_X.509_certificate_for_websites_Please_check_all_that_apply");
    	//var cbs = document.getElementsByClassName("What_is_phishing_Please_check_all_that_apply");
	//for (var i = 0; i < cbs.length; i++) {
       // 	cbs[i].checked = false;
   	//}
	//for (var i = 0; i < cbs2.length; i++) {
        //	cbs2[i].checked = false;
   	//}
	//for (var i = 0; i < cbs3.length; i++) {
        //	cbs3[i].checked = false;
   	//}
    	//obj.checked = true;
	//if ($(obj).is(':checked')){ //radio is now checked
		//alert('radio is checked');
		//var radioid = $(obj).attr('id');
		//if($('#7').is(':checked')) {
		//if(($('#7').is(':checked')) && ($('#1').is(':unchecked') || $('#2').is(':unchecked') || $('#3').is(':unchecked') || $('#4').is(':unchecked') || $('#5').is(':unchecked') || $('#6').is(':unchecked'))) {
		//	  $('#1').prop('checked',false); //deselect
		//	  $('#2').prop('checked',false);
		//	  $('#3').prop('checked',false);
		//	  $('#4').prop('checked',false);
		//	  $('#5').prop('checked',false);
		//	  $('#6').prop('checked',false);
		//}
		//if($('#13').is(':checked')) {
		//	  $('#8').prop('checked',false);
		//	  $('#9').prop('checked',false);
	//		  $('#10').prop('checked',false);
	//		  $('#11').prop('checked',false);
	//		  $('#12').prop('checked',false);
	//	}
	//	if($('#27').is(':checked')) {
	//	          $('#20').prop('checked',false);
	//		  $('#21').prop('checked',false);
	//		  $('#22').prop('checked',false);
	//		  $('#23').prop('checked',false);
	//		  $('#24').prop('checked',false);
	//		  $('#25').prop('checked',false);
	//		  $('#26').prop('checked',false);
	//	}
        //$('input[type="checkbox"]').prop('checked', false); //unchecks all checkboxes
    //}
}

function buildCountrySelect(question, id) {
  var html = '';
  if (question.multiple = 'TRUE') {
    html += '<select multiple name="' + clean(question.question) + '">' + countriesHTML + '</select>';
  }
  else {
    html += '<select name="' + clean(question.question) + '">' + countriesHTML + '</select>';
  }
  $(id).append(html);
}

window.debug = false;

function nextQuestion() {
  if (!verifyQuestion(window.currentQuestion) && !window.debug) {
    $("#error").fadeIn();
    return false;
  }
  $("#error").hide();
  var endTime = new Date().getTime();
  var responseTime = endTime - window.currentQuestionStartTime;
  var responseTimeName = clean(window.questions[window.currentQuestion].question) + "ResponseTime";
  // console.log(responseTimeName);
  $("#question").append('<input type="hidden" name="' + responseTimeName + '" value="' + responseTime + '">');

  window.currentQuestion++;
  var ref = $("#question").contents();

  $("#completedquestions").append(ref);
  if (window.questions.length <= window.currentQuestion) {
    //submit agreement
    //open sites
    //please wait
    //console.log("BABO showFinish");
    //$("#question").html("<h2>Survey Complete</h2>");
    $("#question").html("<h2>Wait for the Experiment to Load</h2>");
    convertCheckboxesToHiddens();
    $("#nextbutton").hide();
    showFinish();
  } else {
    setupQuestion(window.currentQuestion);
  }
  return false;
}



function nextQuestionBatch() {
  
  if (!verifyAllQuestion() && !window.debug) {
    
    // let err_msg = "Please read and understand the instructions";
    //alert(err_msg);
    let err_msg = $("#error").text();
    if (err_msg.includes("внимательно прочитали инструкции") || err_msg.includes("можете да прочетете и разберете инструкциите за")) {
      // alert($("#error").text());
      $("#error").hide();
      Swal.fire({
        icon: 'error',
        title: 'Wrong Answer(s)',
        text: err_msg,
        showConfirmButton: true,
        // footer: '<a href>Why do I have this issue?</a>'
      }).then((result) => {
          window.location = "stressSite.php"    
      });
    }
    else {
      $("#error").fadeIn();
    }
    return false;
  }
  $("#error").hide();
  var endTime = new Date().getTime();
  var responseTime = endTime - window.currentQuestionStartTime;
  var responseTimeName = "ResponseTime";
  // console.log(responseTimeName);
  $("#allquestions").append('<input type="hidden" name="' + responseTimeName + '" value="' + responseTime + '">');

  // window.currentQuestion++;
  for (var q_idx = 0; q_idx < window.questions.length; q_idx++) {
    let id = "#question" + q_idx;
    var ref = $(id).contents();
    $("#completedquestions").append(ref);
  }
  // if (window.questions.length<=window.currentQuestion){
  //submit agreement
  //open sites
  //please wait
  //console.log("BABO showFinish");
  //$("#question").html("<h2>Survey Complete</h2>");
  //$("#allquestions").html("<h2>Wait for the Experiment to Load</h2>");
  convertCheckboxesToHiddens();
  $("#nextbutton").hide();
  showFinish();
  // } else {
  //     setupQuestion(window.currentQuestion);
  // }
  return false;
}

function convertCheckboxesToHiddens() {
  $('input[type=checkbox]', $("#completedquestions")).each(function () {
    var newhtml = "<input type='text' name='" + $(this).attr('name') + "' value='" + ($(this).is(':checked') ? 'checked' : 'unchecked') + "'/>";
    $(this).replaceWith(newhtml);
  });
}

function verifyQuestion(questionindex) {
  var question = window.questions[questionindex];
  switch (question.type) {
    case 'checkboxmatrix':
      return verifyCheckboxMatrix(question);
      break;
    case 'checkall':
      return verifyCheckAll(question);
      break;
    case 'matrixrank':
      return verifyMatrixRank(question);
      break;
    case 'dimensionalrank':
      return verifyDimensionalRank(question);
      break;
    case 'freeformint':
      return verifyFreeFormInt(question);
      break;
    case 'freeCode':
      return verifyFreeCode(question);
      break;
    case 'freeform':
      return verifyFreeForm(question);
      break;
    case 'radiowithother':
      return verifyRadioWithOther(question);
      break;
    case 'radio':
      return verifyRadio(question);
      break;
    case 'radiowithform':
      return verifyRadioWithForm(question);
      break;
    case 'agreementscale':
      return verifyAgreementScale(question);
      break;
    case 'countrySelect':
      return verifyCountrySelect(question);
      break;
    default:
      alert('verify: uncrecognized question type ' + question.type);
      return false;
  }
}

function verifyAllQuestion() {
  for (var q_idx = 0; q_idx < window.questions.length; q_idx++) {
    var question = window.questions[q_idx];
    var id = "#question" + q_idx;
    switch (question.type) {
      case 'checkboxmatrix':
	    if(!verifyCheckboxMatrix(question, id)) {
		    return false;
	    }
        break;
      case 'checkall':
        if (!verifyCheckAll(question, id)) {
          return false;
        }
        break;
      case 'matrixrank':
        if (!verifyMatrixRank(question, id)) {
          return false;
        }
        break;
      case 'dimensionalrank':
        if (!verifyDimensionalRank(question, id)) {
          return false;
        }
        break;
      case 'freeformint':
        if (!verifyFreeFormInt(question, id)) {
          return false;
        }
        break;
      case 'freeCode':
        if (!verifyFreeCode(question, id)) {
          return false;
        }
        break;
      case 'freeform':
        if (!verifyFreeForm(question, id)) {
          return false;
        }
        break;
      case 'radiowithother':
        if (!verifyRadioWithOther(question, id)) {
          return false;
        }
        break;
      case 'radio':
        if (!verifyRadio(question, id)) {
          return false;
        }
        break;
      case 'radiowithform':
        if (!verifyRadioWithForm(question, id)) {
          return false;
        }
        break;
      case 'agreementscale':
        if (!verifyAgreementScale(question, id)) {
          return false;
        }
        break;
      case 'countrySelect':
        if (!verifyCountrySelect(question, id)) {
          return false;
        }
        break;
      default:
        alert('verify: uncrecognized question type ' + question.type);
        return false;
    }
  }
  return true;
}


function hideQuestion(response) {
  if (response == 'hide') {
    $('input').remove();
    $('#nextbutton').remove();
    $("#question").hide();
  }
}

function verifyCheckAll(question, id) {
  
  var error = false;
  

  if (typeof question.mustbechecked != 'undefined') {
    
    for (i in question.mustbechecked) {
      var name = clean(question.prefix + '_' + question.mustbechecked[i]);
      
      var ischecked = $('input[name="' + name + '"]', $(id)).is(':checked');
      if (!ischecked) {
        if(countrycode === 'RU' || countrycode === 'UA' || countrycode === 'BY'){
          $("#error").html('<h2><font style="color:red;">' + question.rejecterrorRU + '</font></h2>');
        }
        if(countrycode === "BG")
        {
          $("#error").html('<h2><font style="color:red;">' + question.rejecterrorBG + '</font></h2>');
        }
        
        hideQuestion(question.response);
        return false;
      }
    }
    for (i in question.mustnotbechecked) {
     var  name = clean(question.prefix + '_' + question.mustnotbechecked[i]);
      var ischecked = $('input[name="' + name + '"]', $(id)).is(':checked');
	    console.log(name);
	    console.log(ischecked);
      if (ischecked) {
        if(countrycode === 'RU' || countrycode === 'UA' || countrycode === 'BY'){
          $("#error").html('<h2><font style="color:red;">' + question.rejecterrorRU + '</font></h2>');
        }
        else{
          $("#error").html('<h2><font style="color:red;">' + question.rejecterrorBG + '</font></h2>');
        }
        hideQuestion(question.response);
        return false;
      }
    }
  }
  return !error;
}

function verifyAgreementScale(question, id) {
  var error = false;
 // for (i in question.options) {
   // var name = clean(question.options[i]);
    //var value = $('input[name="' + name + '"]', $(id)).val().trim();
   // if ((!$.isNumeric(value) || parseFloat(value) > question.scale)) {
	  if(g_agreement < 52) {
      error = true;
      $('input[name="' + name + '"]', $(id)).addClass('error');
    } else {
      $('input[name="' + name + '"]', $(id)).removeClass('error');
    }
  //}
  $("#error").html('<font style="color:red;">Please fill out each field with your agreement on a scale from 1 to ' + question.scale + '</font><hr>');
  return !error;
}

function verifyRadio(question, id) {
  var error = false;
  var q_num = parseInt(id.split("question")[1]) + 1;
	// console.log(q_num);
  var name = clean(question.question);
	// console.log(name);
  var selected = $('input[name="' + name + '"]:checked', $(id));
	// console.log(selected);
	//console.log(selected.length);
  if (selected.length < 1) {
    $('input[name="' + name + '"]', $(id)).addClass('error');
    if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY"){
      $("#error").html('<font style="color:red;"> Пожалуйста, ответьте на вопрос' + q_num + '.</font><hr>');
    }
    if(countrycode === "BG"){
      $("#error").html('<font style="color:red;"> Моля, отговорете на въпрос' + q_num + '.</font><hr>');
    }
    
	
    return false;
  }
  if (typeof question.mustbechecked != 'undefined') {
    if (selected.val() != clean(question.mustbechecked)) {

      if(countrycode=== "RU" || countrycode === "UA" || countrycode === "BY"){
        alert(question.rejecterrorRU);
      $("#error").html('<h2><font style="color:red;">' + question.rejecterrorRU + '</font></h2>');
      }
      else{
        alert(question.rejecterrorBG);
        $("#error").html('<h2><font style="color:red;">' + question.rejecterrorBG + '</font></h2>');
      }
      hideQuestion(question.response);
      return false;
    }
  }
  return !error;
}

function verifyCheckboxMatrix(question, id) {
	var error;
	var q_num;
	var name;
	var selected;
	for (i in question.optionsRU){
      //alert(i);
  		error = false;
  		q_num = parseInt(id.split("question")[1]) + 1;
		 //console.log(q_num);
		 //console.log(question.options[i]);
  		name = clean(question.prefix + '_' + question.options[i]);
		  //alert(name);
  		selected = $('input[name="' + name + '"]:checked', $(id));
      //alert(selected.val());
      
      //alert(selected);
		 //console.log(selected);
		 //console.log(selected.length);
  		if (selected.length < 1) {
        //alert(selected);
        //  alert("SELECTED LESS THAN 1");
    			$('input[name="' + name + '"]', $(id)).addClass('error');
    			if(countrycode=== "RU" || countrycode === "UA" || countrycode === "BY"){
            $("#error").html('<font style="color:red;"> Пожалуйста, ответьте на вопрос' + q_num + '.</font><hr>');
          }
          else{
            $("#error").html('<font style="color:red;"> Моля, отговорете на въпрос' + q_num + '.</font><hr>');
          }
   			return false;
  		}
	}
	return !error;
}
	

function verifyRadioWithOther(question, id) {
  var error = true;
  var q_num = parseInt(id.split("question")[1]) + 1;
  var name = clean(question.question);
  var selected = $('input[name="' + name + '"]:checked', $(id));
  if (selected.length > 0) {
    if (selected.val() == 'other') {
      if ($('input[name="' + name + '_other"]', $(id)).val().trim() != '') {
        error = false;
      }
    } else {
      error = false;
    }
  }
  $("#error").html('<font style="color:red;">Please answer question ' + q_num + ' and fill out the details if you selected "other".</font><hr>');
  return !error;

}

function verifyRadioWithForm(question, id) {
  var error = false;
  var name = clean(question.question);
  var test = '';
  var selected = $('input[name="' + name + '"]:checked', $(id));
  if (selected.length > 0) {
    if (selected.val().substring(0, 3) == question.checkVal) {
      for (i in question.formText) {
        if ($('input[name="' + name + '_' + clean(question.formText[i]) + '"]', $(id)).val().trim() == '') {
          $('input[name="' + name + '_' + clean(question.formText[i]) + '"]', $(id)).addClass('error');
          error = true;
        }
        else {
          $('input[name="' + name + '_' + clean(question.formText[i]) + '"]', $(id)).removeClass('error');
        }
      }
    } else {
      error = false;
    }
  }
  $("#error").html('<font style="color:red;">Please make sure to fill out the additional details if you selected ' + question.checkVal + '.</font><hr>');
  return !error;
}

function verifyFreeForm(question, id) {
  var error = false;
  var q_num = parseInt(id.split("question")[1]) + 1;
  var name = clean(question.question);
  var value = $('input[name="' + name + '"]', $(id)).val().trim();
  if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY"){
    $("#error").html('<font style="color:red;"> Пожалуйста, ответьте на вопрос' + q_num + '.</font><hr>');
  }
  if(countrycode === "BG"){
    $("#error").html('<font style="color:red;"> Моля, отговорете на въпрос' + q_num + '.</font><hr>');
  }
	
  return (value != '');
}

function verifyFreeFormInt(question, id) {
  var error = false;
  var q_num = parseInt(id.split("question")[1]) + 1;
  var name = clean(question.question);
  var value = $('input[name="' + name + '"]', $(id)).val().trim();

  if (!isNormalInteger(value)) {
    error = true;
    $('input[name="' + name + '"]', $(id)).addClass('error');

    if(countrycode === "RU" || countrycode === "UA" || countrycode === "BY"){
      $("#error").html('<font style="color:red;"> Пожалуйста, ответьте на вопрос' + q_num + 'цифрой .</font><hr>');
    }
    if(countrycode==="BG"){
      $("#error").html('<font style="color:red;"> Моля, отговорете на въпрос' + q_num + 'с номер .</font><hr>');
    }

    //$("#error").html('<font style="color:red;">Please answer question ' + q_num + ' with a number.</font><hr>');
	  
  }
  else {
    $('input[name="' + name + '"]', $(id)).removeClass('error');
    if (parseInt(value) < question.minimum || parseInt(value) > question.maximum) {
      $('input').remove();
      $('#nextbutton').remove();
      if(countrycode=== "RU" || countrycode === "UA" || countrycode === "BY"){
      $("#error").html('<h2><font style="color:red;">' + question.rejecterrorRU + '</font></h2>');
      }else{
        $("#error").html('<h2><font style="color:red;">' + question.rejecterrorBG + '</font></h2>');
      }
      hideQuestion(question.response);
      return false;
    }

  }
  return !error;
}

function verifyFreeCode(question, id) {
  var error = false;
  var q_num = parseInt(id.split("question")[1]) + 1;
  var name = clean(question.question);
  var value = $('input[name="' + name + '"]', $(id)).val().trim();

  if (!isNormalInteger(value)) {
    error = true;
    $('input[name="' + name + '"]', $(id)).addClass('error');
    $("#error").html('<font style="color:red;">Please answer question ' + q_num + ' with a number.</font><hr>');
	 
  }
  if (!value.match('117856') && !value.match('119032') &&
    !value.match('115656') && !value.match('113432') &&
    !value.match('105675') && !value.match('107856') &&
    !value.match('109932') && !value.match('105675') &&
    !value.match('507856') && !value.match('503432') &&
    !value.match('505675') && !value.match('517856') &&
    !value.match('519932') && !value.match('515675') &&
    !value.match('217656') && !value.match('219087') &&
    !value.match('217865') && !value.match('213467') &&
    !value.match('203432') && !value.match('205675') &&
    !value.match('217856') && !value.match('219932') &&
    !value.match('317656') && !value.match('319032') &&
    !value.match('317856') && !value.match('313432') &&
    !value.match('305675') && !value.match('307856') &&
    !value.match('309932') && !value.match('305675') &&
    !value.match('302345') && !value.match('304325') &&
    !value.match('907653') && !value.match('119034') &&
    !value.match('115658') && !value.match('113434') &&
    !value.match('105677') && !value.match('107858') &&
    !value.match('109934') && !value.match('105677') &&
    !value.match('507858') && !value.match('503434') &&
    !value.match('505677') && !value.match('517858') &&
    !value.match('519934') && !value.match('515677') &&
    !value.match('217658') && !value.match('219089') &&
    !value.match('217867') && !value.match('213469') &&
    !value.match('203434') && !value.match('205677') &&
    !value.match('217858') && !value.match('219934') &&
    !value.match('317658') && !value.match('319034') &&
    !value.match('317858') && !value.match('313434') &&
    !value.match('305677') && !value.match('307858') &&
    !value.match('309934') && !value.match('305677') &&
    !value.match('302347') && !value.match('304327') &&
    !value.match('907655') && !value.match('119036') &&
    !value.match('115660') && !value.match('113436') &&
    !value.match('105679') && !value.match('107860') &&
    !value.match('109936') && !value.match('105679') &&
    !value.match('507892') && !value.match('503436') &&
    !value.match('505679') && !value.match('517860') &&
    !value.match('519936') && !value.match('515679') &&
    !value.match('217660') && !value.match('219091') &&
    !value.match('217869') && !value.match('213471') &&
    !value.match('203436') && !value.match('205679') &&
    !value.match('217860') && !value.match('219936') &&
    !value.match('317660') && !value.match('319036') &&
    !value.match('317860') && !value.match('313436') &&
    !value.match('305679') && !value.match('307860') &&
    !value.match('309936') && !value.match('305679') &&
    !value.match('302349') && !value.match('304329') &&
    !value.match('907657')
  ) {
    error = true;
    $('input[name="' + name + '"]', $(id)).addClass('error');
    $("#error").html('<font style="color:red;">Please enter correct code.</font><hr>');
  }

  else {
    
    $('input[name="' + name + '"]', $(id)).removeClass('error');
    if (parseInt(value) < question.minimum) {
      $('input').remove();
      $('#nextbutton').remove();
      $("#error").html('<h2><font style="color:red;">' + question.rejecterror + '</font></h2>');
      hideQuestion(question.response);
      return false;
    }

  }
  return !error;
}

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

function verifyDimensionalRank(question, id) {
  var error = false;

  for (i in question.rows) {
    for (j in question.dimensions) {
      var name = clean(question.prefix + '_' + question.rows[i] + '_' + question.dimensions[j].title);
      var value = $('input[name="' + name + '"]', $(id)).val().trim();
      if (value !== '') {
        if (!isNumber(value) || parseFloat(value) < 1 || parseFloat(value) > 7) {
          error = true;
          $('input[name="' + name + '"]', $(id)).addClass('error');
        } else {
          $('input[name="' + name + '"]', $(id)).removeClass('error');
        }
      }
    }
  }
  $("#error").html('<font style="color:red;">Please fill out every field and verify that each number is between 1 and 7.</font><hr>');
  return !error;
}


function verifyMatrixRank(question, id) {
  var error = false;
  var min = 100;
  for (i in question.rows) {
    for (j in question.columns) {
      var name = clean(question.prefix + '_' + question.rows[i] + '_' + question.columns[j]);
      var value = $('input[name="' + name + '"]', $(id)).val().trim();
      if (value !== '') {
        if (!isNumber(value) || parseFloat(value) < 10) {
          error = true;
          $('input[name="' + name + '"]', $(id)).addClass('error');
        } else {
          $('input[name="' + name + '"]', $(id)).removeClass('error');
          value = parseFloat(value);
          if (value < min) {
            min = value;
          }
        }
      }
    }
  }
  if (min > 10) {
    error = true;
  }
  $("#error").html('<font style="color:red;">Please fill out every field and verify that each number is 10 or higher. At least one field must be ranked at 10.</font><hr>');
  return !error;
}

function clean(input) {
  var output = input.replace(/ /g, "_");
  output = output.replace(/[^a-zA-Z0-9_.]/g, "");
  return output;
}

function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}


//mturk questions are indexed at 0, iu questions are indexed at 1, 2 invitation based questions. Time questions are indexed at 0, accuracy questions are indexed at 1.
var participantQuestions = [
  [
    {
      type: 'freeform',
      //question:'What is your Mechanical Turk ID?',
      question: 'What is your Prolific ID?',
      questionRU: 'Пишите, пожалуйста, ваш имейл.',
      questionBG: 'Моля, пишете вашият имейл адрес.',
      response: 'hide',
    },
    // {
    //     type:'freeformint',
    //     question:'What is your age?',
    //     minimum: '18',
    //    response: 'hide',
    //     rejecterror:'This study is only for participants age 18 and older. Please return the HIT.'
    // },
    // {
    //   type:'checkall',
    // question:'What languages can you read and understand?',
    // prefix:'language',
    // options:[
    //    'English',
    //    'Spanish',
    //      'Chinese',
    //      'French',
    //      'Tagalog',
    //      'Vietnamese',
    //      'Hindi',
    //      'Arabic',
    //      'Korean',
    //      'German'
    //  ],
    //	response: 'hide',
    //	mustbechecked:['English'],
    //	rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please return the //HIT.'
    //   }
    // ,
    // {
    //   type:'radio',
    //   question:'Are you a US Citizen?',
    //   options:[
    //     'Yes',
    //     'No'
    //   ],
    //   response: 'hide',
    //   mustbechecked:'Yes',
    //   rejecterror:'This study is designed for US Citizens. Please return the HIT.'

    // }
  ],
  [

    // {
    //     type:'freeformint',
    //     question:'What is your age?',
    //     minimum: '18',
    //     response: 'hide',
    //     rejecterror:'This study is only for participants age 18 and older. Please alert the experimenter.'
    // },
    //   {
    //       type:'checkall',
    //       question:'What languages can you read and understand?',
    //      prefix:'language',
    //       options:[
    //           'English',
    //           'Spanish',
    //           'Chinese',
    //           'French',
    //           'Tagalog',
    //           'Vietnamese',
    //            'Hindi',
    //            'Arabic',
    //            'Korean',
    //            'German'
    //        ],
    //        response: 'hide',
    //	mustbechecked:['English'],
    //	rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please alert the experimenter.'
    //    },
    {
      type: 'radio',
      question: 'Do you wish to participate in the research? (We will include your anonymized data in our analysis)',
      options: [
        'Yes',
        'No'
      ],
      response: 'hide',
    }
    /*
    ,
         {
         type:'radio',
        question:'Are you a US Citizen?',
        options:[
          'Yes',
          'No'
          ],
            response: 'hide',
         }
    */
  ]

  //[
  //    {
  //       type:'freeCode',
  //       question:'What is the code provided to you over email? (if multiple codes are entered, it will reject the response)',
  //   },                      

  //   {
  //       type:'freeformint',
  //       question:'What is your age?',
  //       minimum: '18',
  //       response: 'hide',
  //       rejecterror:'This study is only for participants age 18 and older.'
  //  },
  //  {
  //        type:'checkall',
  //       question:'What languages can you read and understand?',
  //      prefix:'language',
  //      options:[
  //          'English',
  //        'Spanish',
  //      'Chinese',
  //       'French',
  //       'Tagalog',
  //       'Vietnamese',
  //       'Hindi',
  //        'Arabic',
  //        'Korean',
  //       'German'
  //    ],
  //     response: 'hide',
  //	mustbechecked:['English'],
  //	rejecterror:'It is important that you be able to read and understand the instructions for this experiment.'
  // }
  /*
       ,
      {
      type:'radio',
      question:'Are you a US Citizen?',
      options:[
        'Yes',
        'No'
        ],
          response: 'hide',
          mustbechecked:'Yes',
          rejecterror:'This study is designed for US Citizens.'
    }
  */
  //],

  //[   
  //    {
  //        type:'freeform',
  //        question:'What is your Mechanical Turk ID?',
  //        response: 'hide',
  //    },
  // {
  //     type:'freeformint',
  //     question:'What is your age?',
  //     minimum: '18',
  //    response: 'hide',
  //     rejecterror:'This study is only for participants age 18 and older. Please return the HIT.'
  // },
  //   {
  //        type:'checkall',
  //        question:'What languages can you read and understand?',
  //        prefix:'language',
  //        options:[
  //            'English',
  //           'Spanish',
  //          'Chinese',
  //            'French',
  //            'Tagalog',
  //            'Vietnamese',
  //            'Hindi',
  //            'Arabic',
  //            'Korean',
  //            'German'
  //        ],
  //	response: 'hide',
  //	mustbechecked:['English'],
  //	rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please return the HIT.'
  //  }
  // ,
  // {
  //   type:'radio',
  //   question:'Are you a US Citizen?',
  //   options:[
  //     'Yes',
  //     'No'
  //   ],
  //   response: 'hide',
  //   mustbechecked:'Yes',
  //   rejecterror:'This study is designed for US Citizens. Please return the HIT.'

  // }
  //]
];



// var usCitizen = [
//{
//		type:'radio',
//		question:'Are you a US Citizen? (This is not a validation question, but is used to adjust the demographic questions later in the survey)',
//		options:[
//			'Yes',
//			'No'
//			]
//	}

//]

var usTax = [
  {
    type: 'radio',
    question: 'Do you file taxes in the US?',
    options: [
      'Yes',
      'No'
    ]
  }

]

var countryTax = [
  {
    type: 'freeform',
    question: 'What is your country of tax residence?'
  }
]

/*
var countriesHTML =
	'<option value="AF">Afghanistan</option>'+
	'<option value="AX">Ã…land Islands</option>'+
	'<option value="AL">Albania</option>'+
	'<option value="DZ">Algeria</option>'+
	'<option value="AS">American Samoa</option>'+
	'<option value="AD">Andorra</option>'+
	'<option value="AO">Angola</option>'+
	'<option value="AI">Anguilla</option>'+
	'<option value="AQ">Antarctica</option>'+
	'<option value="AG">Antigua and Barbuda</option>'+
	'<option value="AR">Argentina</option>'+
	'<option value="AM">Armenia</option>'+
	'<option value="AW">Aruba</option>'+
	'<option value="AU">Australia</option>'+
	'<option value="AT">Austria</option>'+
	'<option value="AZ">Azerbaijan</option>'+
	'<option value="BS">Bahamas</option>'+
	'<option value="BH">Bahrain</option>'+
	'<option value="BD">Bangladesh</option>'+
	'<option value="BB">Barbados</option>'+
	'<option value="BY">Belarus</option>'+
	'<option value="BE">Belgium</option>'+
	'<option value="BZ">Belize</option>'+
	'<option value="BJ">Benin</option>'+
	'<option value="BM">Bermuda</option>'+
	'<option value="BT">Bhutan</option>'+
	'<option value="BO">Bolivia, Plurinational State of</option>'+
	'<option value="BQ">Bonaire, Sint Eustatius and Saba</option>'+
	'<option value="BA">Bosnia and Herzegovina</option>'+
	'<option value="BW">Botswana</option>'+
	'<option value="BV">Bouvet Island</option>'+
	'<option value="BR">Brazil</option>'+
	'<option value="IO">British Indian Ocean Territory</option>'+
	'<option value="BN">Brunei Darussalam</option>'+
	'<option value="BG">Bulgaria</option>'+
	'<option value="BF">Burkina Faso</option>'+
	'<option value="BI">Burundi</option>'+
	'<option value="KH">Cambodia</option>'+
	'<option value="CM">Cameroon</option>'+
	'<option value="CA">Canada</option>'+
	'<option value="CV">Cape Verde</option>'+
	'<option value="KY">Cayman Islands</option>'+
	'<option value="CF">Central African Republic</option>'+
	'<option value="TD">Chad</option>'+
	'<option value="CL">Chile</option>'+
	'<option value="CN">China</option>'+
	'<option value="CX">Christmas Island</option>'+
	'<option value="CC">Cocos (Keeling) Islands</option>'+
	'<option value="CO">Colombia</option>'+
	'<option value="KM">Comoros</option>'+
	'<option value="CG">Congo</option>'+
	'<option value="CD">Congo, the Democratic Republic of the</option>'+
	'<option value="CK">Cook Islands</option>'+
	'<option value="CR">Costa Rica</option>'+
	'<option value="CI">CÃ´te d\'Ivoire</option>'+
	'<option value="HR">Croatia</option>'+
	'<option value="CU">Cuba</option>'+
	'<option value="CW">CuraÃ§ao</option>'+
	'<option value="CY">Cyprus</option>'+
	'<option value="CZ">Czech Republic</option>'+
	'<option value="DK">Denmark</option>'+
	'<option value="DJ">Djibouti</option>'+
	'<option value="DM">Dominica</option>'+
	'<option value="DO">Dominican Republic</option>'+
	'<option value="EC">Ecuador</option>'+
	'<option value="EG">Egypt</option>'+
	'<option value="SV">El Salvador</option>'+
	'<option value="GQ">Equatorial Guinea</option>'+
	'<option value="ER">Eritrea</option>'+
	'<option value="EE">Estonia</option>'+
	'<option value="ET">Ethiopia</option>'+
	'<option value="FK">Falkland Islands (Malvinas)</option>'+
	'<option value="FO">Faroe Islands</option>'+
	'<option value="FJ">Fiji</option>'+
	'<option value="FI">Finland</option>'+
	'<option value="FR">France</option>'+
	'<option value="GF">French Guiana</option>'+
	'<option value="PF">French Polynesia</option>'+
	'<option value="TF">French Southern Territories</option>'+
	'<option value="GA">Gabon</option>'+
	'<option value="GM">Gambia</option>'+
	'<option value="GE">Georgia</option>'+
	'<option value="DE">Germany</option>'+
	'<option value="GH">Ghana</option>'+
	'<option value="GI">Gibraltar</option>'+
	'<option value="GR">Greece</option>'+
	'<option value="GL">Greenland</option>'+
	'<option value="GD">Grenada</option>'+
	'<option value="GP">Guadeloupe</option>'+
	'<option value="GU">Guam</option>'+
	'<option value="GT">Guatemala</option>'+
	'<option value="GG">Guernsey</option>'+
	'<option value="GN">Guinea</option>'+
	'<option value="GW">Guinea-Bissau</option>'+
	'<option value="GY">Guyana</option>'+
	'<option value="HT">Haiti</option>'+
	'<option value="HM">Heard Island and McDonald Islands</option>'+
	'<option value="VA">Holy See (Vatican City State)</option>'+
	'<option value="HN">Honduras</option>'+
	'<option value="HK">Hong Kong</option>'+
	'<option value="HU">Hungary</option>'+
	'<option value="IS">Iceland</option>'+
	'<option value="IN">India</option>'+
	'<option value="ID">Indonesia</option>'+
	'<option value="IR">Iran, Islamic Republic of</option>'+
	'<option value="IQ">Iraq</option>'+
	'<option value="IE">Ireland</option>'+
	'<option value="IM">Isle of Man</option>'+
	'<option value="IL">Israel</option>'+
	'<option value="IT">Italy</option>'+
	'<option value="JM">Jamaica</option>'+
	'<option value="JP">Japan</option>'+
	'<option value="JE">Jersey</option>'+
	'<option value="JO">Jordan</option>'+
	'<option value="KZ">Kazakhstan</option>'+
	'<option value="KE">Kenya</option>'+
	'<option value="KI">Kiribati</option>'+
	'<option value="KP">Korea, Democratic People\'s Republic of</option>'+
	'<option value="KR">Korea, Republic of</option>'+
	'<option value="KW">Kuwait</option>'+
	'<option value="KG">Kyrgyzstan</option>'+
	'<option value="LA">Lao People\'s Democratic Republic</option>'+
	'<option value="LV">Latvia</option>'+
	'<option value="LB">Lebanon</option>'+
	'<option value="LS">Lesotho</option>'+
	'<option value="LR">Liberia</option>'+
	'<option value="LY">Libya</option>'+
	'<option value="LI">Liechtenstein</option>'+
	'<option value="LT">Lithuania</option>'+
	'<option value="LU">Luxembourg</option>'+
	'<option value="MO">Macao</option>'+
	'<option value="MK">Macedonia, the former Yugoslav Republic of</option>'+
	'<option value="MG">Madagascar</option>'+
	'<option value="MW">Malawi</option>'+
	'<option value="MY">Malaysia</option>'+
	'<option value="MV">Maldives</option>'+
	'<option value="ML">Mali</option>'+
	'<option value="MT">Malta</option>'+
	'<option value="MH">Marshall Islands</option>'+
	'<option value="MQ">Martinique</option>'+
	'<option value="MR">Mauritania</option>'+
	'<option value="MU">Mauritius</option>'+
	'<option value="YT">Mayotte</option>'+
	'<option value="MX">Mexico</option>'+
	'<option value="FM">Micronesia, Federated States of</option>'+
	'<option value="MD">Moldova, Republic of</option>'+
	'<option value="MC">Monaco</option>'+
	'<option value="MN">Mongolia</option>'+
	'<option value="ME">Montenegro</option>'+
	'<option value="MS">Montserrat</option>'+
	'<option value="MA">Morocco</option>'+
	'<option value="MZ">Mozambique</option>'+
	'<option value="MM">Myanmar</option>'+
	'<option value="NA">Namibia</option>'+
	'<option value="NR">Nauru</option>'+
	'<option value="NP">Nepal</option>'+
	'<option value="NL">Netherlands</option>'+
	'<option value="NC">New Caledonia</option>'+
	'<option value="NZ">New Zealand</option>'+
	'<option value="NI">Nicaragua</option>'+
	'<option value="NE">Niger</option>'+
	'<option value="NG">Nigeria</option>'+
	'<option value="NU">Niue</option>'+
	'<option value="NF">Norfolk Island</option>'+
	'<option value="MP">Northern Mariana Islands</option>'+
	'<option value="NO">Norway</option>'+
	'<option value="OM">Oman</option>'+
	'<option value="PK">Pakistan</option>'+
	'<option value="PW">Palau</option>'+
	'<option value="PS">Palestinian Territory, Occupied</option>'+
	'<option value="PA">Panama</option>'+
	'<option value="PG">Papua New Guinea</option>'+
	'<option value="PY">Paraguay</option>'+
	'<option value="PE">Peru</option>'+
	'<option value="PH">Philippines</option>'+
	'<option value="PN">Pitcairn</option>'+
	'<option value="PL">Poland</option>'+
	'<option value="PT">Portugal</option>'+
	'<option value="PR">Puerto Rico</option>'+
	'<option value="QA">Qatar</option>'+
	'<option value="RE">RÃ©union</option>'+
	'<option value="RO">Romania</option>'+
	'<option value="RU">Russian Federation</option>'+
	'<option value="RW">Rwanda</option>'+
	'<option value="BL">Saint BarthÃ©lemy</option>'+
	'<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>'+
	'<option value="KN">Saint Kitts and Nevis</option>'+
	'<option value="LC">Saint Lucia</option>'+
	'<option value="MF">Saint Martin (French part)</option>'+
	'<option value="PM">Saint Pierre and Miquelon</option>'+
	'<option value="VC">Saint Vincent and the Grenadines</option>'+
	'<option value="WS">Samoa</option>'+
	'<option value="SM">San Marino</option>'+
	'<option value="ST">Sao Tome and Principe</option>'+
	'<option value="SA">Saudi Arabia</option>'+
	'<option value="SN">Senegal</option>'+
	'<option value="RS">Serbia</option>'+
	'<option value="SC">Seychelles</option>'+
	'<option value="SL">Sierra Leone</option>'+
	'<option value="SG">Singapore</option>'+
	'<option value="SX">Sint Maarten (Dutch part)</option>'+
	'<option value="SK">Slovakia</option>'+
	'<option value="SI">Slovenia</option>'+
	'<option value="SB">Solomon Islands</option>'+
	'<option value="SO">Somalia</option>'+
	'<option value="ZA">South Africa</option>'+
	'<option value="GS">South Georgia and the South Sandwich Islands</option>'+
	'<option value="SS">South Sudan</option>'+
	'<option value="ES">Spain</option>'+
	'<option value="LK">Sri Lanka</option>'+
	'<option value="SD">Sudan</option>'+
	'<option value="SR">Suriname</option>'+
	'<option value="SJ">Svalbard and Jan Mayen</option>'+
	'<option value="SZ">Swaziland</option>'+
	'<option value="SE">Sweden</option>'+
	'<option value="CH">Switzerland</option>'+
	'<option value="SY">Syrian Arab Republic</option>'+
	'<option value="TW">Taiwan, Province of China</option>'+
	'<option value="TJ">Tajikistan</option>'+
	'<option value="TZ">Tanzania, United Republic of</option>'+
	'<option value="TH">Thailand</option>'+
	'<option value="TL">Timor-Leste</option>'+
	'<option value="TG">Togo</option>'+
	'<option value="TK">Tokelau</option>'+
	'<option value="TO">Tonga</option>'+
	'<option value="TT">Trinidad and Tobago</option>'+
	'<option value="TN">Tunisia</option>'+
	'<option value="TR">Turkey</option>'+
	'<option value="TM">Turkmenistan</option>'+
	'<option value="TC">Turks and Caicos Islands</option>'+
	'<option value="TV">Tuvalu</option>'+
	'<option value="UG">Uganda</option>'+
	'<option value="UA">Ukraine</option>'+
	'<option value="AE">United Arab Emirates</option>'+
	'<option value="GB">United Kingdom</option>'+
	'<option value="UK">United Kingdom</option>'+
	'<option value="US">United States</option>'+
	'<option value="UM">United States Minor Outlying Islands</option>'+
	'<option value="UY">Uruguay</option>'+
	'<option value="UZ">Uzbekistan</option>'+
	'<option value="VU">Vanuatu</option>'+
	'<option value="VE">Venezuela, Bolivarian Republic of</option>'+
	'<option value="VN">Viet Nam</option>'+
	'<option value="VG">Virgin Islands, British</option>'+
	'<option value="VI">Virgin Islands, U.S.</option>'+
	'<option value="WF">Wallis and Futuna</option>'+
	'<option value="EH">Western Sahara</option>'+
	'<option value="YE">Yemen</option>'+
	'<option value="ZM">Zambia</option>'+
	'<option value="ZW">Zimbabwe</option>';

*/
var participantValidationQuestions = [

  [
    {
      type: 'radio',
      question: 'REFRESHING the experiment page will INVALIDATE your results and result in a rejection?',
      questionRU: 'Обновление страницы аннулирует ваши результаты?',
      questionBG: 'Обновяването на страницата ще анулира вашите резултати?',
      options: [
        'True',
        'False'
      ],
      optionsRU:[
        'Правильно',
        'Неправильно'
      ],
      optionsBG:[
        'Правилно ',
        'Неправилно'

      ],
      mustbechecked: 'True',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      rejecterrorRU:'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      response: 'hide'
    },

    //	{
    //		type:'radio',
    //		question:'Is repeating this study allowable?',
    //		options:[
    //			'No',
    //			'Yes'
    //			],
    //		mustbechecked:'No',
    //		rejecterror:'It is important that you be able to read and understand the instructions for this experiment. Please return the HIT to avoid a rejection.',
    //		response:'hide'
    //	},

    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is NOT SECURE, what action should you take?',
      questionRU: 'Для целей данного исследования, если вы считаете, что представленный веб-сайт НЕ БЕЗОПАСЕН, что вам нужно сделать?',
      questionBG: 'Ако уебсайтът изглежда несигурен, какво трябва да направите?',
      options: [
        'CLOSE the window',
        'Find the LOGIN button on the simulated page and click it.',
        'Find the BACK button on the simulated browser and click it.',
        'RELOAD the experiment',
        'EXIT your browser'
      ],
      optionsRU:[
        'Закрывать страницу',
        'Найти и нажать кнопку ВХОД или ВОЙТИ.',
        'Найти и нажать кнопку НАЗАД.',
        'Перезагружать проект',
        'Выходить из браузера.'
      ],
      optionsBG: [
        'Да затворите прозореца',
        'Да намерите ВХОД/ВЛИЗАНЕ/РЕГИСТРАЦИЯ и влезте.',
        'Да натиснете върху бутон за връщане назад',
        'Да заредите страницата отново',
        'Да затворите браузера'
      ],
      mustbechecked: 'Find the BACK button on the simulated browser and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      response: 'hide'
    },
    
    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is SECURE, what action should you take?',
      questionRU:'Для целей данного исследования, если вы считаете, что представленный веб-сайт БЕЗОПАСЕН, что вам нужно сделать?',
      questionBG:'Ако уебсайтът изглежда сигурен, какво трябва да направите?',
      options: [
        'CLOSE the window',
        'Find the LOGIN button on the simulated page and click it.',
        'Find the BACK button on the simulated browser and click it.',
        'RELOAD the experiment',
        'EXIT your browser'
      ],
      optionsRU:[
        'Закрыть страницу',
        'Найти и нажать кнопку ВХОД или ВОЙТИ.',
        'Найти и нажать кнопку НАЗАД.',
        'Перезагружать проект.',
        'Выходить из браузера.'
      ],
      optionsBG: [
        'Да затворите прозореца',
        'Да намерите ВХОД/ВЛИЗАНЕ/РЕГИСТРАЦИЯ и влезте.',
        'Да натиснете върху бутон за връщане назад.',
        'Да заредите страницата отново',
        'Да затворите браузера'
      ],
      mustbechecked: 'Find the LOGIN button on the simulated page and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'Are you using a mouse (or touchpad) as your input device?',
      questionRU:'Вы используете мышь или сенсорную панель?',
      questionBG: 'Използвате ли мишка или тъчпад?',
      options: [
        'Yes',
        'No'
      ],
      optionsRU:[
        'Да',
        'Нет'
      ],
      optionsBG:[
        'Да',
        'Не'
      ],
      mustbechecked: 'Yes',
      rejecterror: 'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      response: 'hide'
    }
  ],

  [
    {
      type: 'radio',
      question: 'REFRESHING the experiment page will INVALIDATE your results and nullify your potential compensation?',
      
      options: [
        'True',
        'False'
      ],
      mustbechecked: 'True',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.'
    },

    {
      type: 'radio',
      question: 'Is repeating this study allowable?',
      options: [
        'No',
        'Yes'
      ],
      mustbechecked: 'No',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorBG: 'It is important that you be able to read and understand the instructions for this experiment.'
    },


    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is insecure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the back button on the simulated browser and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.'
    },

    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is secure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the login button on the simulated page and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
    },
    {

      type: 'radio',
      question: 'Are you using a mouse or touchpad as your input device?',
      options: [
        'Yes',
        'No'
      ],
      mustbechecked: 'Yes',
      rejecterror: 'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      rejecterrorBG: 'Това изследване изисква използването на мишка или тъчпад като устройство за въвеждане. Моля, върнете, за да избегнете отказ.',
      rejecterrorRU: 'Это исследование требует использования мыши или сенсорной панели в качестве устройства ввода. Пожалуйста, верните, чтобы избежать отказа.',
      response: 'hide'
    }
  ],
  [
    {
      type: 'radio',
      question: 'Refreshing the experiment page will invalidate your results and nullify your potential compensation?',
      options: [
        'True',
        'False'
      ],
      mustbechecked: 'True',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.'
    },

    {
      type: 'radio',
      question: 'Is repeating this study allowable?',
      options: [
        'No',
        'Yes'
      ],
      mustbechecked: 'No',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU:'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.'
    },


    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is insecure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the back button on the simulated browser and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.'
    },

    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is secure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the login button on the simulated page and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.',
      rejecterrorRU:'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      rejecterrorBG:'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.'
    },
    {

      type: 'radio',
      question: 'Are you using a mouse or touchpad as your input device?',
      options: [
        'Yes',
        'No'
      ],
      mustbechecked: 'Yes',
      rejecterror: 'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      rejecterrorBG:'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      rejecterrorRU:'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.', 
      response: 'hide'
    }
  ],

  [
    {
      type: 'radio',
      question: 'Refreshing the experiment page will invalidate your results and result in a rejection?',
      options: [
        'True',
        'False'
      ],
      mustbechecked: 'True',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      rejecterrorRU:'Это исследование требует использования мыши или сенсорной панели в качестве устройства ввода. Пожалуйста, верните, чтобы избежать отказа.',
      rejecterrorBG: 'Това изследване изисква използването на мишка или тъчпад като устройство за въвеждане. Моля, върнете, за да избегнете отказ.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'Is repeating this study allowable?',
      options: [
        'No',
        'Yes'
      ],
      mustbechecked: 'No',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      rejecterrorRU: 'Это исследование требует использования мыши или сенсорной панели в качестве устройства ввода. Пожалуйста, верните, чтобы избежать отказа.',
      rejecterrorBG: 'Това изследване изисква използването на мишка или тъчпад като устройство за въвеждане. Моля, върнете, за да избегнете отказ.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is insecure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the back button on the simulated browser and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      rejecterrorBG: 'Това изследване изисква използването на мишка или тъчпад като устройство за въвеждане. Моля, върнете, за да избегнете отказ.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'For the purposes of this study, if you feel the presented website is secure, what action should you take?',
      options: [
        'Close the window',
        'Find the login button on the simulated page and click it.',
        'Find the back button on the simulated browser and click it.',
        'Reload the experiment',
        'Exit your browser'
      ],
      mustbechecked: 'Find the login button on the simulated page and click it.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection',
      rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
      rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'Are you using a mouse or touchpad as your input device?',
      options: [
        'Yes',
        'No'
      ],
      mustbechecked: 'Yes',
      rejecterror: 'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      rejecterrorBG: 'Това изследване изисква използването на мишка или тъчпад като устройство за въвеждане. Моля, върнете, за да избегнете отказ.',
      rejecterrorRU: 'Это исследование требует использования мыши или сенсорной панели в качестве устройства ввода. Пожалуйста, верните, чтобы избежать отказа.',
      response: 'hide'
    }
  ]

];

var validationQuestions = [

  [
    [
      {
        type: 'radio',
        question: 'What is the time penalty for logging into an insecure site?',
        questionRU:'Сколько будет штрафное время для входа в небезопасный сайт?',
        questionBG:'Колко време ще загубите за влизане в несигурен сайт?',
        options: [
          '5 seconds',
          '10 seconds',
          '15 seconds',
          '20 seconds',
          '25 seconds',
          '30 seconds'
        ],
        optionsRU:[
          '5 секунд',
          '10 секунд',
          '15 секунд',
          '20 секунд',
          '25 секунд',
          '30 секунд'
        ],
        optionsBG:[
          '5 секунди',
          '10 секунди',
          '15 секунди',
          '20 секунди',
          '25 секунди',
          '30 секунди'
        ],
        mustbechecked: '15 seconds',
        rejecterror: 'It is important that you understand the instructions for this experiment. Please return to avoid a rejection',
        rejecterrorBG:'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
        rejecterrorRU:'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
        response: 'hide'
      }
    ],
    [
      {
        type: 'radio',
        question: 'What is the penalty for logging into an insecure site?',
        options: [
          '$0.50',
          '$0.67',
          '$0.75',
          '$1.00',
          '$1.25',
          '$1.33'
        ],
        mustbechecked: '$0.67',
        rejecterror: 'It is important that you understand the instructions for this experiment. Please return to avoid a rejection',
        rejecterrorBG:'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.',
        rejecterrorRU:'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
        response: 'hide'
      }
    ]
  ],
  [
    [
      {
        type: 'radio',
        question: 'What is the time penalty for logging into an insecure site?',
        options: [
          '5 seconds',
          '10 seconds',
          '15 seconds',
          '20 seconds',
          '25 seconds',
          '30 seconds'
        ],
        mustbechecked: '15 seconds',
        rejecterror: 'It is important that you understand the instructions for this experiment.',
        rejecterrorRU: 'Важно, чтобы вы внимательно прочитали инструкции для эксперимента. Пожалуйста, верните, чтобы снова прочитать инструкции.',
        rejecterrorBG: 'Важно е да можете да прочетете и разберете инструкциите за експеримента. Моля, върнете, за да прочетете инструкците отново.'
      }
    ],

    [
      {
        type: 'radio',
        question: 'What is the penalty for logging into an insecure site?',
        options: [
          '$0.50',
          '$0.67',
          '$0.75',
          '$1.00',
          '$1.25',
          '$1.33'
        ],
        mustbechecked: '$0.67',
        rejecterror: 'It is important that you understand the instructions for this experiment.',
        rejecterrorBG: 'It is important that you understand the instructions for this experiment.',
        rejecterrorRU: 'It is important that you understand the instructions for this experiment.',

      }
    ]
  ],
  [
    [
      {
        type: 'radio',
        question: 'What is the time penalty for logging into an insecure site?',
        options: [
          '5 seconds',
          '10 seconds',
          '15 seconds',
          '20 seconds',
          '25 seconds',
          '30 seconds'
        ],
        mustbechecked: '15 seconds',
        rejecterror: 'It is important that you understand the instructions for this experiment.',
        rejecterrorBG: 'It is important that you understand the instructions for this experiment.',
        rejecterrorRU: 'It is important that you understand the instructions for this experiment.',
        response: 'hide'
      }
    ],
    [
      {
        type: 'radio',
        question: 'What is the penalty for logging into an insecure site?',
        options: [
          '$0.50',
          '$0.67',
          '$0.75',
          '$1.00',
          '$1.25',
          '$1.33'
        ],
        mustbechecked: '$0.67',
        rejecterror: 'It is important that you understand the instructions for this experiment.',
        rejecterrorBG: 'It is important that you understand the instructions for this experiment.',
        rejecterrorRU: 'It is important that you understand the instructions for this experiment.',
        response: 'hide'
      }
    ]
  ],
  [
    [
      {
        type: 'radio',
        question: 'What is the time penalty for logging into an insecure site?',
        options: [
          '5 seconds',
          '10 seconds',
          '15 seconds',
          '20 seconds',
          '25 seconds',
          '30 seconds'
        ],
        mustbechecked: '15 seconds',
        rejecterror: 'It is important that you understand the instructions for this experiment. Please return to avoid a rejection',
        rejecterrorBG: 'It is important that you understand the instructions for this experiment.',
        rejecterrorRU: 'It is important that you understand the instructions for this experiment.',
        response: 'hide'
      }
    ],
    [
      {
        type: 'radio',
        question: 'What is the penalty for logging into an insecure site?',
        options: [
          '$0.50',
          '$0.67',
          '$0.75',
          '$1.00',
          '$1.25',
          '$1.33'
        ],
        mustbechecked: '$0.67',
        rejecterror: 'It is important that you understand the instructions for this experiment. Please return to avoid a rejection',
        response: 'hide'
      }
    ]
  ]

];

var cultureQuestions = [
  {
    type: 'radio',
    question: 'Which gender do you most identify with?',
    questionRU: 'Укажите Вас пол',
    questionBG: 'Изберете Ваш пол',
    optionsRU:[
      'Мужской',
      'Женской',
      'Я предпочитаю не ответить'
    ],
    optionsBG:[
      'Mъж',
      'Жена',
      'Предпочитам да не споделя тази информация'
    ],
    options: [
      'Male',
      'Female',
      'Non-binary or other',
      'Do not wish to specify'
    ]
  },
  // {
  //    type:'radiowithother',
  //    question:'What is your gender?',
  //    questionRU:'What is your gender?',
  //    questionBG: 'What is your gender?',
  //    options:['Male','Female', 'Do not wish to answer'],
  //    optionsRU:['Male','Female', 'Do not wish to answer'],
  //    optionsBG: ['Male','Female', 'Do not wish to answer']
  // }
  //    ,
  //    {
  //        type:'checkall',
  //        prefix:'selfDescription',
  //        question:'What categories describe you (check all that apply)?',
  //        options:[
  //            'White',
  //            'Hispanic or Latino',
  //            'Black or African American',
  //            'Asian',
  //            'Native American or Alaska Native</P>',
  //            'Native Hawaiian or Other Pacific Islander',
  //	        'Middle Eastern or North African',
  //	        'Some other race, ethnicity, or origin'
  //		]
  //    }
];
/*,

	{
		type:'countrySelect',
		question:'Where do you currently live?',
		multiple:'FALSE'
	},
	{
		type:'freeformint',
		question:'How long have you lived there?',
		minimum:'0'
	},


	{
		type:'countrySelect',
		question:'Select any other countries you have lived in. Use CTRL to select multiple countries.',
		multiple:'TRUE'
	},

	{
		type:'freeform',
		question:'List the number of years lived in each of the countries you listed previously. Separate each entry with a comma and respond with -1 if this questions does not apply.'
	},


	{
		type:'countrySelect',
		question:'In what country were you born?',
		multiple:'FALSE'
	},

	{
		type:'countrySelect',
		question:'List the country each of your guardians were born in. Use CTRL to select multiple countries',
		multple:'TRUE'
	},

	{
		type:'freeform',
		question:'How much were you exposed to the culture of your guardians\' country of origin?'
	},

	{
		type:'freeform',
		question:'What is your religion?'
	}
*/
var skill_questions = [
  {
    type: 'checkboxmatrix',
    //min: '1',
    //step: '0.1',
    //scale: '5',
    //def: '0',
    question: 'Please rate how familiar you are with the following websites:',
    questionRU:'Оцените, пожалуйста, насколько Вы знакомы следующими сайтами:',
    questionBG:'Колко сте запознат със следващите сайтове?',
    options: opts,
    optionsRU: opts,
    optionsBG: opts,
    rows: opts,
	  columns: ['Not at all familiar','Slightly familiar','Somewhat familiar','Moderately familiar','Extremely familiar'],
    columnsRU: ['вообще не знаком(а)','немного знаком(а)','довольно знаком(а)','знаком(а)','Очень хорошо знаком(а)'],
    columnsBG:['Въобще не запознат','Не съвсем запознат','Донякъде запознат','Съвсем запознат','Много добре запознат'],
    // options:[
    //   'adcash.com',
    //   'adf.ly',
    //   'adobe.com',
    //   'airbnb.com',
    //   'aliexpress.com',
    //   'amazon.com',
    //   'battle.net',
    //   'dropbox.com',
    //   'ebay.com',
    //   'expedia.com',
    //   'flipkart.com',
    //   'giphy.com',
    //   'github.com',
    //   'godaddy.com',
    //   'netflix.com',
    //   'paypal.com',
    //   'salesforce.com',
    //   'stackoverflow.com',
    //   'steampowered.com',
    //   'tripadvisor.com',
    //   'twitch.tv',
    //   'twitter.com',
    //   'ups.com',
    //   'wordpress.com',
    //   'yahoo.com',
    //   'yelp.com'
    // ]
  },
  {
    type: 'checkall',
    question: 'What is phishing? (Please check all that apply)',
    questionRU:'Что такое фишинг? (Выбирайте все подходящие ответы.)',
    questionBG: 'Какво е фишинг? (Изберете всички подходящи отговори)',
    optionsRU:[ 'Выдавать себя за кого-то или компанию, чтобы украсть информацию о пользователях.',
      'Создание поддельного веб-сайта, который выглядит безопасным для кражи информации о пользователях',
      'Рассылка спам-писем, чтобы обманывать кого-либо в интернете.',
      'Другие способы кражи информации.',
      'Наблюдение посещения сайтов в интернете с целью создания реклам.',
      'Вид интернет мошеничества, целую которого является получение доступа к конфиденциальным данным пользователей логинам и паролем.',
      'Я не знаю'],
    optionsBG: [
      'Фалшиво представяне на човек или компания за кражба на потребителска информация',
      'Фалшив сайт направен за кражба на потребителска информация',
      'Изпращането на спам',
      'Други способи на кражба на информация',
      'компютер хакове',
      'Наблюдение на интернет история за изпращането на реклами ',
      'Не знам'
    ],
    
    options: [
      'Pretending to be someone or a company to steal user information',
      'Making a fake website that looks legitimate to steal user information',
      'Sending spam emails, Defrauding someone online',
      'Other methods for stealing information',
      'Hacking a computer that belongs to someone',
      'Tracking your internet habits to send advertisements ',
      'I do not know'
    ]
  },

  {
    type: 'checkall',
    //  question:'What is the purpose of an X.509 certificate?',
    question: 'What is the purpose of an X.509 certificate for websites? (Please check all that apply)',
    questionRU: 'Какова цель сертификата X.509 для интернет страницы? (Выбирайте все подходящие ответы.)',
    questionBG: 'Какво е целта на сертификат X.509? (Изберете всички подходящи отговори)',
    optionsRU:[
      'Обеспечивает шифрование',
      'Обеспечивает защиту информации',
      'Показывает действительность и регистрацию веб-сайта',
      'Активная защита от киберпреступности и хакеров',
      'Показывает надежность сайта и защиту конфиденциальности',
      'Я ничего не знаю об этом сертификате'
    ],
    optionsBG:[
      'Предоставя криптиране',
      'Защитава информация',
      'Показва, че сайтът е регистриран и валиден',
      'Защитава от хакове и други киберпристъпления',
      'Показва, че сайтът е надежден и има подходяща защита на поверителността',
      'Не знам'
    ],
    options: [
      'Provides encryption',
      'Protects information',
      'Shows the website is registered and valid',
      'Is actively secure and safe against malicious stuff, including hackers',
      'Shows the website is trustworthy, has proper privacy protection and is accountable for information use',
      'I do not know about this certificate'
    ]
  },


  {
    type: 'radio',
    question: 'SQL injection is a technique to:',
    questionRU:'SQL инъекция – это метод для',
    questionBG:'Инжекция SQL се използва за:',
    optionsRU:[
      'Внедрение вируса в базу данных',
      'Внедрение исправлений безопасности в базе данных в ответ на обнаружение новых угроз',
      'Внедрение сообщений, которые проверяют целостность базы данных ',
      'Внедрение вредоносного кода в базу данных через веб сайт.',
      'Я не знаю'
    ],
    optionsBG:[
      'Инжектиране на злонамерен вирус в машината SQL на база данни',
      'Инжектиране на корекция за сигурност в SQL машината на базата данни в отговор на откриването на нови заплахи',
      'Инжектиране на изявление, което проверява целостта на базата данни чрез уебсайт',
      'Inject root user privileges to a regular user without using the graphical user interface (GUI) of the database',
      'Инжектиране на злонамерено съобщение в база данни чрез уеб страница',
      'Не знам'
    ],
    options: [
      'Inject a malicious virus to the database SQL engine',
      'Inject a security patch to the database SQL engine in response to the discovery of new threats',
      'Inject a statement that checks the database integrity through a website',
      'Inject root user privileges to a regular user without using the graphical user interface (GUI) of the database',
      'Inject a malicious statement to the database through a website',
      'I do not know'

    ]
  },

  {
    type: 'radio',
    question: 'The difference between a passive and reactive Intrusion Detection System is?',
    questionRU:'В чем разница между пассивной и активной системой обнаружения несанкционированного дуступа?',
    questionBG: 'Каква е разликата между пасивна и реактивна система за откриване на проникване (Intrusion Detection System)?',
    optionsRU:[
      'Пассивная система обнаружения – аппаратное обеспечение а активная система – программное обеспечение',
      'Пассивная система обнаружения только уведомляет о вредоносных кодах а активная система может отвечать, присылая вредоносные коды атакующим',
      'Нет разницы, просто разные фирменные наименования',
      'Пассивная система обнаружения формирует часть межсетевого экрана а активная – отдельный компонент',
      'Активная система обнаружения может перепрограммировать межсетевой экран а пассивная система не может',
      'Я не знаю'
    ],
    optionsBG:[
      'Пасивната система се базира на софтуер (програмно обезпечение) и реактивната система се базира на хардуер (техника).',
      'Пасивната система изпраща само уведомления докато реактивната систама може да изпрати злонамерен код на нападатела.',
      'Няма разлика. Те са просто отделни марки.',
      'Пасивната система се включва в защитна стена докато реактивната система е самостоятелен компонент на мрежата.',
      'Реактивната система може да препрограмира защитната стена, а пасивната система не може.',
      'Аз не знам'
    ],
    options: [
      'Passive IDS is software based and reactive is hardware based',
      'Passive IDS provides only alerts and reactive IDS can retaliate by sending malicious code to the attacker',
      'There are no real differences, they are just brand names',
      'Passive IDS is included in a Firewall while reactive IDS is a standalone network component',
      'Reactive IDS can reprogram the Firewall and passive IDS does not',
      'I do not know'
    ]
  },
  {
    type: 'radio',
    question: 'Without any other changes in the default settings of a web server, what can be the motivation to close port 80?',
    questionRU:'Без каких-либо других изменений в настройках веб-сервера, какая может быть мотивация для закрытия порта 80?',
    questionBG:'Без никакви промени в настройките на уеб сервера, какво може да бъде мотивациата да се затвори порта 80?',
    optionsRU:[
      'Заблокировать входящий запрос XMLhttp',
      'Заблокировать протокол передачи файлов',
      'Заблокировать протокол передачи гипертекста',
      'Заблокировать входящие и исходящие запросы от клиентов',
      'Заблокировать безопасный демон протокола передачи гипертекста',
      'Я не знаю'
    ],
    optionsBG:[
      'За да блокира заявка XMLhttp.',
      'За да блокира протокола на прехвърлянето на файла daemon.',
      'За да блокира протокола на прехвърлянето на гипертехт daemon',
      'За да блокира входящи и изходящи заявки от клиенти SMB/CIFS.',
      'Аз не знам.'
    ],
    options: [
      'Block incoming XMLhttp Request',
      'Block File Transfer Protocol daemon',
      'Block Hypertext Transfer Protocol daemon',
      'Block incoming and outgoing requests from SMB/CIFS clients',
      'Block Hypertext Transfer Protocol Secure daemon',
      'I do not know'
    ]
  },

  {
    type: 'radio',
    question: 'How many computer programming languages do you know (not including HTML)?',
    questionRU:'Сколько компьютерных языков Вы знаете? (не включая HTML)?',
    questionBG:'Колко компютерни езици знаете? (без да включвате HTML)?',
    optionsRU:[
      'Больше чем 10',
      '6-10',
      '2-5',
      '1',
      'Никаких'
    ],
    optionsBG:[
      'Повече от 10',
      '6-10',
      '2-5',
      '1',
      'Никакви'
    ],
    options: [
      'More than 10',
      '6-10',
      '2-5',
      '1',
      'None'
    ]
  },
  {
    type: 'radio',
    question: 'How many years of working experience do you have in network operation and security?',
    questionRU:'Есть ли у Вас опыт в области сетевых операций и сетевой безопасности?',
    questionBG:'Колко години опита имате в сферата на мрежова сигурност?',
    optionsRU:[
      'Более 10 лет',
      '6-10 лет',
      '1-5 лет',
      'Меньше одного года',
      'У меня нет опыта в этой сфере'
    ],
    optionsBG:[
      'Повече от 10 години',
      '6-10 години',
      '1-5 годинии',
      'По-малко от една година',
      'Нямам опит в тази сфера'
    ],
    options: [
      'More than 10 years',
      '6-10 years',
      '1-5 years',
      'Less than a year',
      'None'
    ]
  },
  {
    type: 'radio',
    question: 'On average, how many times do you have to deal with computer security related problems?',
    questionRU:'Как часто Вам приходится иметь дел с проблемами связанными с компьютерной безопасностью?',
    optionsRU:[
      'Несколько раз каждый день',
      '1 раз в день',
      '1 раз в неделью',
      '1 раз в месяц',
      '1 раз в год (или меньше)'
    ],
    questionBG:'По принцип колко пъти трябва да се справяте с проблеми свързани с компютерна сигурност?',
    optionsBG:[
      'Няколко пъти на ден',
      'Един път в ден',
      'Един път в седмица',
      'Един път в месец',
      'Един път в година (или по-малко)'
    ],
    options: [
      'Several times every day',
      'Once a day',
      'Once a week',
      'Once a month',
      'Once a year (or less)'
    ]
  },
  {
    type: 'checkall',
    question: 'What information and network security tools do you use regularly? (Please check all that apply)',
    questionRU:'Какие информации и инструменты сетевой безопасности вы регулярно используете? (выбрать все подходящие ответы)',
    optionsRU:[
      'Межсетовой экран',
      'Антивирусная программа',
      'Система обнаружения вторжений',
      'Безопасная оболочка (SSH)',
      'Pretty Good Privacy (PGP)',
      'Система контроля и управления доступом'
    ],
    questionBG:'Какви инструменти за мрежова сигурност Вие регуларно използвате? (Може да изберете няколко варианти)',
    optionsBG:[
      'Защитна стена',
      'Антивирусна система',
      'Система за откриване на проникване (Intrusion Detection System)',
      'Сигурна Обвивка (Secure Shell (SSH))',
      'Pretty Good Privacy (PGP)',
      'Система за контрол на достъпа (Access control (AC))'
    ],
    options: [
      'Firewall',
      'Anti-virus',
      'Intrusion Detection System (IDS)',
      'Secure Shell (SSH)',
      'Pretty Good Privacy (PGP)',
      'Access control (AC)'
    ]
  },
  {
    type: 'checkall',
    question: 'Have you ever (Please check all that apply)',
    questionRU:'Вы когда-нибудь (пожалуйста, отметьте все подходящие варианты)',
    questionBG:'Моля, изберете всичките варианти на които можете да отговорете "да',
    optionsRU:[
      'Вы когда-нибудь проектировали веб-сайт?',
      'Вы когда-нибудь регистрировали доменное имя?',
      'Вы когда-нибудь использовали SSH?',
      'Вы когда-нибудь настраивали межсетевой экран?',
      'Вы когда-нибудь создавали базу данных?',
      'Вы когда-нибудь устанавливали компьютерную программу?',
      'Вы когда-нибудь писали компьютерную программу?',
      'Никакого из этих вариантов',
    ],
    optionsBG:[
      'Проектирали ли сте някога уебсайт?',
      'Регистрирали ли сте някога име на домейн?',
      'Използвали ли сте някога Сигурна Обвивка (SSH)?',
      'Конфигурирали ли сте някога защитна стена?',
      'Создали ли сте някога база данни? a database',
      'Инсталировали ли сте някога компютерна програма?',
      'Написали ли сте някога компютерна програма?',
      'Направили ли сте нито един от варианти, показани в този списък?',
    ],
    options: [
      'Designed a website',
      'Registered a domain name',
      'Used SSH',
      'Configured a firewall',
      'Created a database',
      'Installed a computer program',
      'Written a computer program',
      'None of the above',
    ]
  },
  {
    type: 'checkall',
    question: 'Which of the following indicators do you use to decide if it is safe to enter your username and password on a particular website? (Please check all that apply)',
    questionRU:'Какие из следующих указателей Вы ищете, чтобы понять, безопасно ли будет переходить в определённый сайт? (пожалуйста, отметьте все подходящие варианты)',
    optionsRU:[
      'https',
      'изображение замка',
      'сертификат',
      'сообщение о небезопасности страницы',
      'вид вебнсайта',
      'профессионально выглядящий сайт',
      'другие'
    ],
    questionBG:'Кои от следващите показатели Вие използвате за да решите дали е безопасно да въведеш паролата Ви в определен сайт? (Изберете всички подходящи отговори)',
    optionsBG:[
      'https',
      'Изображение на ключалка',
      'Сертификат',
      'Съобщения за поверителност',
      'Вид на уеб-сайт',
      'Професионална външност на уеб-сайта',
      'Други показатели'
    ],
    options: [
      'https',
      'lock icon on the page',
      'certificate',
      'website privacy statements',
      'type of website',
      'professional-looking website',
      'other'
    ]
  },
  {
	  type: 'checkboxmatrix',
	  question: 'To what extent do you agree or disagree with the following:',
    questionRU:'В какой степени вы согласны или не согласны со следующими утверждениями:',
    optionsRU:[ 'Мой телефон или планшет доступнен для всех, без ввода пароля или пинкод.',
    'Каждый раз, когда я дома отхожу от компьютера, я блокирую экран.',
    'Каждый раз, когда я на работе отхожу от компьютера, я блокирую экран.',
    'Вместо выхода из страницы я просматриваю другие сайты или просто закрываю страницу.'],
	  columns: ['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree'],
    columnsRU:['безусловно несогласен(а)', 'не согласен(а)', 'Трудно сказать', 'согласен(а)', 'безусловно согласен(а)'],
    questionBG:'До каква степен Вие съсласни със следващите изречения:',
    columnsBG:['Напълно несъгласен', 'Несъгласен', 'Безразличен', 'Съгласен', 'Напълно съгласен'],
    optionsBG:[ 'Някой може да има достъп до моят телефон или таблет без да трябва да въведе ПИН или парола.',
    'Когато отстъпвам от компютера си вкъщи, аз винаги заключвам екрана.',
    'Когато отстъпвам от компютера си на работа, аз винаги заключвам екрана.',
    'Вместо да излизам от уеб-сайтове, аз сърфирам други страници и просто затварям прозореца когато вече не сърфирам.'],
	  options: [  
		 'Anyone can access my smartphone or tablet without needing a PIN or passcode.',
		 'Whenever I step away from my computer at home, I lock the screen.',
		 'Whenever I step away from my computer at work, I lock the screen.',
		 'Rather than logging out of websites, I usually just navigate elsewhere or close the window when am done.'
	]
 
   // type: 'radio',
   // question: 'Anyone can access my smartphone or tablet without needing a PIN or passcode.',
   // options: [
   //   'Strongly disagree',
   //   'Disagree',
   //   'Neither agree nor disagree',
   //   'Agree',
   //   'Strongly agree'
   // ]
  },
  //{
  //  type: 'radio',
  //  question: 'Whenever I step away from my computer at home or work, I lock the screen.',
  //  options: [
  //    'Strongly disagree',
  //    'Disagree',
  //    'Neither agree nor disagree',
  //    'Agree',
  //    'Strongly agree'
  //  ]
  //},

  //{
  //  type: 'radio',
  //  question: 'Rather than logging out of websites, I usually just navigate elsewhere or close the window when am done.',
  //  options: [
  //    'Strongly disagree',
   //   'Disagree',
   //   'Neither agree nor disagree',
   //   'Agree',
   //   'Strongly agree'
  //  ]
 // },

  {
    type: 'radio',
    //  question:'(Question about phishing) Voluntary: To what extent do you have a choice in being exposed to this risk? ', //(1=Voluntary; 5=Involuntary) 
    question: 'To what extent do you have a choice in being exposed to phishing? ',
    questionRU:'По Вашему мнению насколько глубокими знаниями обладает обичный человек о риске фишинга? ',
    optionsRU:[
      'Ничего не знает',
      'Очень мало знает',
      'Что то знает о риске',
      'Хорошо знает',
      'Очень хорошо знает'
    ],
    questionBG:'Според вас, колко знае обикновен човек за рисковете на фишинга?',
    optionsBG:[
      'Нищо не знае за рисковете',
      'Не знае много за рисковете',
      'Може да знае може да не знае за рисковете',
      'Знае за рисковете',
      'Много знае за рисковете'
    ],
    options: [
      'Completely voluntary',
      'Voluntary',
      'Neither voluntary nor involuntary',
      'Involuntary',
      'Completely involuntary'
    ]
  },

  {
    type: 'radio',
    //question:'(Question about phishing)	Immediacy: Is the risk from the phishing immediate or does it occur at a later time? ', //(1=Immediate; 5=Delayed)
    question: 'How immediate do you think is the risk from the phishing? ',
    questionRU:'По Вашему мнению насколько опасен риск фишинга? ',
    optionsRU:[
      'Риск опасен',
      'Риск до некоторой степени опасен',
      'Риск является ни опасен ни безопасен',
      'Риск до некоторой степени опасен',
      'Риск неопасен'
    ],

    questionBG:'Колко е важно рискът от фишинга?',
    optionsBG:[
      'Много важно',
      'Донякъде важно',
      'Нито важно нито маловажно',
      'Донякъде маловажно',
      'Маловажно'
    ],
    options: [
      'Immediate',
      'Somewhat immediate',
      'Neither',
      'Somewhat delayed',
      'Delayed'
    ]
  },

  {
    type: 'radio',
    //  question:'(Question about phishing) Knowledge to the exposed: How much would a person like you reasonably know about the implications of phishing? ',
    question: 'How much would the average person reasonably know about the risks of phishing? ',
    questionRU:'По Вашему мнению насколько глубокими знаниями обладает обичный человек о риске фишинга? ',
    optionsRU:[
      'Ничего не знает',
      'Очень мало знает',
      'Что то знает о риске',
      'Хорошо знает',
      'Очень хорошо знает'
    ],
    questionBG:'Според вас, колко знае обикновен човек за рисковете на фишинга?',
    optionsBG:[
      'Нищо не знае за рисковете',
      'Не знае много за рисковете',
      'Може да знае може да не знае за рисковете',
      'Знае за рисковете',
      'Много знае за рисковете'
    ],
    options: [
      'No knowledge',
      'Very little knowledge',
      'May or may not know about the risk',
      'Knowledgeable',
      'Very knowledgeable'
    ]
  },

  {
    type: 'radio',
    //question:'(Question about phishing) Knowledge to the expert: How much would an expert know about the implications of phishing? ',
    question: 'To what extent would an expert know about the risks of phishing? ',
    questionRU:'По Вашему насколько глубокими знаниями обладает эксперт о риске фишинга? ',
    optionsRU:[
      'Мы никогда не можем контролировать ущерб',
      'Мы почти никогда не можем контролировать ущерб',
      'Мы иногда можем контролировать ущерб',
      'Мы можем контролировать ущерб почти каждый раз',
      'Мы всегда можем контролировать ущерб.'
    ],
    questionBG:'До каква степен можем да контролираме последствията на фишинг атакове?',
    optionsBG:['Никога не можем да ги контролираме',
    'Почти никога не можем да ги контролираме',
    'Понякога можем да ги контролираме',
    'Можем да ги контролираме почти всеки път',
    'Винаги можем да ги контролираме'],
    options: [
      'No knowledge',
      'Very little knowledge',
      'May or may not know about the risk',
      'Knowledgeable',
      'Very knowledgeable'
    ]
  },

  {
    type: 'radio',
    //question:'(Question about phishing) To what extent can you control (or mitigate) the risk from being phished? ',// (1=Uncontrollable; 5=Controllable)
    question: 'To what extent can you control the harm that results from being phished ',
    questionRU:'До какой степени вы считаете, что можете контролировать ущерб в результате фишинговой атаки?',
    optionsRU:[  'Мы никогда не можем контролировать ущерб',
    'Мы почти никогда не можем контролировать ущерб',
    'Мы иногда можем контролировать ущерб',
    'Мы можем контролировать ущерб почти каждый раз',
    'Мы всегда можем контролировать ущерб.'],
    questionBG:'До каква степен можем да контролираме последствията на фишинг атакове?',
    optionsBG:[
      'Никога не можем да ги контролираме',
      'Почти никога не можем да ги контролираме',
      'Понякога можем да ги контролираме',
      'Можем да ги контролираме почти всеки път',
      'Винаги можем да ги контролираме'
    ],
    options: [
      'Never control harm',
      'Almost never control harm',
      'Sometimes control harm',
      'Almost every time control harm',
      'Always control harm'
    ]
    
  },

  {
    type: 'radio',
    // question:'(Question about phishing) Newness: Is phishing a new risk resulting from new technologies or is it a new version of an old risk? ',// (1=Old; 5=New)
    question: 'How novel do you think the risks from phishing are? ',
    questionRU:'Как вы понимаете характер фишинга? ',
    optionsRU:[
      'Это очень старый риск',
      'Это довольно старый риск',
      'Этот риск ни старый ни новый',
      'Это довольно новый риск',
      'Это совсем новый риск'
    ],
    questionBG:'До каква степен смятате ли, че рисковете на фишинга са ново появление? ',
    optionsBG:[
      'Отдавно са същестували рисковете на фишинга',
      'Повечето от рисковете са стари',
      'Рисковете не са нито нови нито стари',
      'Рисковете са донякъде стари',
      'Рисковете са напълно нови'
    ],
    options: [
      'Entirely an old risk',
      'Mostly an old risk',
      'Neither new nor old',
      'Somewhat new',
      'Completely new'
    ]
  },

  {
    type: 'radio',
    //  question:'(Question about phishing) Common-Dread: Is phishing commonplace or rarely encountered? ',// (1=Common; 5=Rare)
    question: 'How commonly encountered do you think phishing is? ',
    questionRU: 'Как вы считаете? Как часто люди сталкиваются с фишингом? ',
    optionsRU:[
      'Это часто бывает',
      'Это очень часто бывает',
      'Это иногда бывает',
      'Это бывает не очень часто ',
      'Это редко бывает'
    ],
    questionBG:'Според Вас, колко често се срещаме с фишинга?',
    optionsBG:[
      'Често се срещаме с фишинга',
      'Много често се срещаме с фишинга',
      'Не се срещаме с фишинга много често',
      'Рядко се срещаме с фишинга',
      'Фишингът се случва нито често, нито рядко'
    ],
    options: [
      'Common',
      'Frequently encountered',
      'Neither common nor rare',
      'Infrequently encountered',
      'Rare'
    ]
  },

  {
    type: 'radio',
    //  question:'(Question about phishing) Chronic-catastrophic: Does phishing affect only the person who is phished or does it affect many people? ',// (1= Individual; 5=(Many People) Global)
    question: 'Does phishing affect only the person who is phished or does it affect other people as well? ',
    questionRU:'Как вы считаете? Фишинг может быть опасен для Вас персонально или для других пользователей в вашем окружением?',
    optionsRU:['Фишинг опасен для конкретного пользователя',
    'Фишинг опасен и для людей в окружении конкретного пользователя',
    'Фишинг опасен для большого количества людей',
    'Фишинг опасен для всех'],
    questionBG:'Затяга ли фишингът само на индивидуален човек или на други хора също? ',
    optionsBG:[
      'на индивидуален човек',
      'на няколко хора свързани с този идивид',
      'на разни хора',
      'на голямо количество хора',
      'на много голямо количество хора'
    ],
    options: [
      'Individual',
      'A few people associated with the individual',
      'Multiple people',
      'A large number of people',
      'A very large number of people'
    ]
  },

  {
    type: 'radio',
    //question:'(Question about phishing) Severity: In the worst possible outcome, how severe are the consequences of phishing? ',// (1=Not Severe; 5=Severe)
    question: 'In the worst possible outcome, how severe are the consequences of phishing? ',
    questionRU:'В худшем случае, насколько серьезны последствия фишинговой атаки?',
    optionsRU:[
      'вообще несерьезные',
      'не банальные, но тоже не серьезные',
      'ни банальные ни серьезные',
      'может быть серьезные',
      'серьезные'
    ],
    questionBG:'В най-лошия сценарий, колко тежки са последствията на фишинга?',
    optionsBG:[
      'Съвсем не тежки, маловажни',
      'Не маловажни, а не тежки',
      'Нито маловажни, нито тежки',
      'Може да бъдат тежки',
      'Тежки'
    ],
    options: [
      'Not at all severe, trivial',
      'Not trivial but not severe',
      'Neither trivial nor severe',
      'May be severe',
      'Severe'
    ]
  },

  // {
  // type:'radio',
  //question:'(Question about account takeover) Voluntary: To what extent do you have a choice in being exposed to account takeover? ',// (1=Voluntary; 5=Involuntary)
  // question:'To what extent do you feel like you have a choice in your account being taken over? ',
  // options: [
  // 'Completely voluntary',
  // 'Voluntary',
  // 'Neither voluntary nor involuntary',
  // 'Involuntary',
  // 'Completely involuntary'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) Immediacy: Is the risk from the account takeover immediate or does it occur at a later time? ',// (1=Immediate; 5=Delayed)
  // question:'How immediate is the risk of an account being taken over by someone else? ',
  // options: [
  // 'Immediate',
  // 'Somewhat immediate',
  // 'Neither',
  // 'Somewhat delayed',
  // 'Delayed'
  // ]
  // },

	//  {
  //  type:'radio',
  //  question:'How likely are you to sign-in into the COVID-19 information website? ',
  //  options: [
  //  'Not at all likely',
  //  'Somewhat unlikely',
  //  'May or may not be likely',
  //  'Somewhat likely',
  //  'Very likely'
  //  ]
  //  },
	//  {
  //  type:'radio',
  // // // question:'(Question about account takeover) Knowledge to the exposed: How much would a person like you reasonably know about the implications of account takeover? ',
  //  question:'Did you spend more or less time on viewing the COVID-19 website when compared to others?',
  //  options: [
  //  'Less time',
  //  'More time',
  //  'About the same amount of time',
  //  'I do not remember'
  //  ]
  //  },
	
  // {
  // type:'radio',
  // // question:'(Question about account takeover) Knowledge to the exposed: How much would a person like you reasonably know about the implications of account takeover? ',
  // question:'To what extent would the average person reasonably know about the implications of account takeover? ',
  // options: [
  // 'No knowledge',
  // 'Very little knowledge',
  // 'May or may not know about the risk',
  // 'Knowledgeable',
  // 'Very knowledgeable'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) Knowledge to the expert: How much would an expert know about the implications of account takeover? ',
  // question:'To what extent would an expert know about the implications of account takeover? ',
  // options: [
  // 'No knowledge',
  // 'Very little knowledge',
  // 'May or may not know about the risk',
  // 'Knowledgeable',
  // 'Very knowledgeable'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) To what extent can you control (or mitigate) the risk from being account takeover? ',// (1=Uncontrollable; 5=Controllable)
  // question:'To what extent can you control (or mitigate) the risk from your account being taken over? ',
  // options: [
  // 'Can prevent all harm',
  // 'Can prevent some harm',
  // 'May or may not be able to prevent harm',
  // 'Can somewhat reduce harm',
  // 'No control over resulting harm'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) Newness: Is account takeover a new risk resulting from new technologies or is it a new version of an old risk? ',// (1=Old; 5=New)
  // question:'How new or old is the risk of account takeover that results from technologies? ',
  // options: [
  // 'Entirely an old risk',
  // 'Mostly an old risk',
  // 'Neither new nor old',
  // 'Somewhat new',
  // 'Completely new'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) Common-Dread: Is account takeover commonplace or rarely encountered? ',// (1=Common; 5=Rare)
  // question:'How commonplace is taking over someone\'s account? ',
  // options: [
  // 'Common',
  // 'Frequently encountered',
  // 'Neither common nor rare',
  // 'Infrequently encountered',
  // 'Rare'
  // ]
  // },

  // {
  // type:'radio',
  // //question:'(Question about account takeover) Chronic-catastrophic: Does account takeover affect only the person who is phished or does it affect many people?', //(1= Individual; 5=(Many People) Global)
  // question:'Do you think account takeover affect only the person phished or does it affect many other people?',
  // options: [
  // 'Individual',
  // 'Multiple people',
  // 'May be global or individual',
  // 'A large number of people',
  // 'A very large number of people'
  // ]
  // },

  // {
  // type:'radio',
  // // question:'(Question about account takeover) Severity: In the worst possible outcome, how severe are the consequences of account takeover ?',// (1=Not Severe; 5=Severe)
  // question:'In the worst possible outcome, how severe are the consequences of someone taking over your account?',
  // options: [
  // 'Not at all severe, trivial',
  // 'Not trivial but not severe',
  // 'Neither trivial nor severe',
  // 'May be severe',
  // 'Severe'
  // ]
  // },

  {
	  type:'checkboxmatrix',
	  question: 'Please rate how far you agree or disagree with the following:',
    questionRU:'В какой степени вы согласны или не согласны со следующими утверждениями:',
    columnsRU:['полностью не согласен(а)', 'не согласен(а)', 'Ни согласен, ни несогласен', 'согласен(а)', 'полностью согласен(а)'],
    optionsRU:[ 'Онлайн компании честно используют мои личные предпочтения по поводу онлайн покупок.  ',
    'У меня есть доверие, что онлайн компании защищают мои личные данные когда я покупаю продукты в их сайтах.',
    'В общем было бы рискованно дать онлайн компаниям информацию по поводу моих личных предпочтений.',
    'Существует высокая вероятность потери связана с обменом информацией о личных предпочтениях.',
    'Я готов предоставить интернет-компаниям свою личную информацию в обмен на скидки на продукты.',
    'Мне мешает, когда интернет-компании просят доступ к личным информациям.',
    'Я иногда стесняюсь, когда интернет-компании просят доступ к личным данным.',
    'Мне мешает давать личные данные разным интернет-компаниям',
    'Я боюсь того, что интернет-компании собирают слишком много информации обо мне.',
    'Онлайн-компании не должны использовать личную информацию для каких-либо целей, если это не было разрешено лицами, предоставившими информацию',
    'Когда люди предоставляют личную информацию онлайн-компании по определенной причине, онлайн-компания никогда не должна использовать эту информацию по какой-либо другой причине.',
    'Онлайн-компании никогда не должны продавать личную информацию из своих компьютерных баз данных другим компаниям.',
    'Онлайн-компании никогда не должны делиться личной информацией с другими компаниями, если это не было разрешено лицами, предоставившими информацию.'],
    questionBG: 'До каква степен сте съгласни със следващите изречения:',
    columnsBG:['Напълно несъгласен', 'Несъгласен', 'Донякъде несъгласен', 'Безразличен съм', 'Донякъде согласен', 'Съгласен', 'Напълно съгласен'], 
    optionsBG:[
      'Може да имаме доверие в онлайн компании, които знаят личните ни предпочитения.',
		  'Вярвам, че онлайн компании етично управляват информацията относто личните предпочитения на клиентите си',
		  'Общо взето, ще бъде рисковано да дам на интернет компании информация относто личните си предпочитения',
		  'Има голям риск свързан с раздаването на личните предпочитения на онлайн компании',
		  'Аз съм готов(а) да разкрия личната си информация в замяна на отстъпки на потребителски продукти',
		  'Изберете Согласен',
		  'Притеснявам се когато онлайн компании искат лична информация от мен.',
		  'Понякога се колебая когато онлайн компании изискат лична информация.',
		  'Притеснява ме да дам лична инфомация на разни онлайн компании',
		  'Притеснява ме, че онлайн компании събират прекалено много информация за мен',
		  'Когато хората дават на онлай компания лична информация по определена причина, компанията няма право да използва тази информация по друга причина',
		  'Онлайн компании никога не трябва да продадат лична информация от бази данни на други компании',
		  'Онлайн компании не трябва де споделят лична информация с други компании без разрешението на хората, които са им дали тази информация'
    ],
	  columns: ['Strongly disagree', 'Disagree', 'Somewhat disagree', 'Neither agree nor disagree', 'Somewhat agree', 'Agree', 'Strongly agree'], 
	  options: [
		  'Online companies would be trustworthy in handling my personal purchase preferences',
		  'I trust that online companies would keep my best interests in mind when dealing with my personal purchase preference information',
		  'In general, it would be risky to give my personal purchase preference information to online companies',
		  'There would be high potential for loss associated with giving my personal purchase preference information to online firms',
		  'I am willing to give my personal purchase preference information to online companies in exchange for discounts on consumer products',
		  'Select Agree for this question',
		  'It usually bothers me when online companies ask me for personal information',
		  'When online companies ask me for personal information, I sometimes think twice before providing it',
		  'It bothers me to give personal information to so many online companies',
		  'I\'m concerned that online companies are collecting too much personal information about me',
		  'Online companies should not use personal information for any purpose unless it has been authorized by the individuals who provided the information',
		  'When people give personal information to an online company for some reason, the online company should never use the information for any other reason',
		  'Online companies should never sell the personal information in their computer databases to other companies',
		  'Online companies should never share personal information with other companies unless it has been authorized by the individuals who provided the information'
		  ]
    //type: 'radio',
    //question: 'Online companies would be trustworthy in handling my personal purchase preferences',
    //options: [
    //  '1 (Strongly disagree)',
    //  '2',
    //  '3',
    //  '4',
    //  '5',
    //  '6',
    //  '7 (Strongly agree)'
   // ]
  },
  //  {
  //     type: 'freeform',
  //     //question:'What is your Mechanical Turk ID?',
  //     question: 'Please enter any feedback or thoughts about the experiment or survey. Enter NA if you do not wish to comment.',
  //     response: 'hide',
  //   }

  //{
  //  type: 'radio',
 //   question: 'I trust that online companies would keep my best interests in mind when dealing with my personal purchase preference information',
  //  options: [
  //    '1 (Strongly disagree)',
  //    '2',
  //    '3',
  //    '4',
 //     '5',
 //     '6',
  //    '7 (Strongly agree)'
 //   ]
 // },

 // {
//    type: 'radio',
//    question: 'In general, it would be risky to give my personal purchase preference information to online companies',
//    options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
 //     '6',
 //     '7 (Strongly agree)'
 //   ]
 // },

  //{
 //   type: 'radio',
 //   question: 'There would be high potential for loss associated with giving my personal purchase preference information to online firms',
 //   options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
//      '6',
//      '7 (Strongly agree)'
//    ]
 // },

 // {
 //   type: 'radio',
 //   question: 'I am willing to give my personal purchase preference information to online companies in exchange for discounts on consumer products',
 //   options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
 //     '6',
 //     '7 (Strongly agree)'
 //   ]
 // },

//  {
//    type: 'radio',
//    question: 'It usually bothers me when online companies ask me for personal information',
//    options: [
//      '1 (Strongly disagree)',
//      '2',
//      '3',
//      '4',
//      '5',
//      '6',
//      '7 (Strongly agree)'
//    ]
//  },

//  {
//    type: 'radio',
//    question: 'When online companies ask me for personal information, I sometimes think twice before providing it',
//    options: [
//      '1 (Strongly disagree)',
//      '2',
//      '3',
//      '4',
//      '5',
//      '6',
//      '7 (Strongly agree)'
//    ]
//  },

//  {
//    type: 'radio',
//    question: 'It bothers me to give personal information to so many online companies',
//    options: [
//      '1 (Strongly disagree)',
//      '2',
//      '3',
//      '4',
//      '5',
//      '6',
//      '7 (Strongly agree)'
//    ]
//  },

//  {
//    type: 'radio',
//    question: 'I\'m concerned that online companies are collecting too much personal information about me',
//    options: [
//      '1 (Strongly disagree)',
//      '2',
//      '3',
//      '4',
//      '5',
//      '6',
//      '7 (Strongly agree)'
//    ]
//  },

 // {
 //   type: 'radio',
 //   question: 'Online companies should not use personal information for any purpose unless it has been authorized by the individuals who provided the information',
 //   options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
 //     '6',
 //     '7 (Strongly agree)'
 //   ]
 // },

 // {
 //   type: 'radio',
 //   question: 'When people give personal information to an online company for some reason, the online company should never use the information for any other reason',
 //   options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
 //     '6',
 //     '7 (Strongly agree)'
  //  ]
 // },

	// {
 //   type: 'radio',
 //   question: 'Online companies should never sell the personal information in their computer databases to other companies',
 //   options: [
 //     '1 (Strongly disagree)',
 //     '2',
 //     '3',
 //     '4',
 //     '5',
 //     '6',
 //     '7 (Strongly agree)'
 //   ]
 // },

  //{
  //  type: 'radio',
  //  question: 'Online companies should never share personal information with other companies unless it has been authorized by the individuals who provided the information',
  //  options: [
  //    '1 (Strongly disagree)',
  //    '2',
  //    '3',
  //    '4',
  //    '5',
  //    '6',
  //    '7 (Strongly agree)'
 //   ]
 // }
];
// console.log("OPTS: " + opts)
var PreStudyQuestions = [
  //    {
  //	type: 'freeform',
  //	question:'What is your first name?',
  //    },
  //    {
  //	type: 'freeform',
  //	question: 'What is your last name?',
  //    },
  {
    type: 'freeformint',
    question: 'What is your age?',
    questionRU: 'Сколько Вам лет?',
    questionBG: 'На колко години сте?',
    minimum: '18',
    maximum: '120',
    response: 'hide',
    rejecterror: 'This study is only for participants between the ages of 18 and 120 years',
    rejecterrorRU: 'Это исследование предназначено только для участников в возрасте от 18 до 120 лет.',
    rejecterrorBG: 'Това проучване е само за участници на възраст между 18 и 120 години'

    //type:'freeform',
    //question:'What is your age?',
    //response: 'hide',
    //options: [
    //  'Less than 18 years',
    //  '18-30 years',
    //  '30-40 years',
    //  '40-50 years',
    //  '50-60 years',
    //  '60-70 years',
    //  '70-80 years',
    //  'more than 80 years'
    //	]
  },
  
  //{
  //	type:'radio',
  //	question: 'Can you read and understand English?',
  //	options: [
  //	    'Yes',
  //	    'No'
  //	],
  //	mustbechecked:'Yes'
  //  },
  {
    type: 'radio',
    question: 'What is the highest degree or level of school you have completed? (If you are currently enrolled in school, please indicate the highest degree you have received.)',
    questionRU: 'Какая самая высокая степень или уровень образования, которую вы закончили?',
    questionBG: 'Вашето ниво на образование:',
    options: [
      'Less than a high school diploma',
      'High school degree or equivalent (e.g. GED) Some college, no  degree',
      //'Associate degree (e.g. AA, AS)',
      'Bachelor\'s degree (e.g. BA, BS)',
      'Master\'s degree (e.g. MA, MS,  MEd)',
      'Professional degree (e.g. MD, DDS, DVM)',
      'Doctorate (e.g. PhD, EdD)'
    ],
  optionsRU:[
    'У меня нет ни аттестата ни диплома',
    'У меня аттестат и/или диплом',
    'У меня бакалавр',
    'У меня магистр',
    'Я дипломированный специалист',
    'У меня докторат'

  ],
  optionsBG:[
    'Аз не съм получил диплома от гимназия',
    'Диплома от гимназия',
    'Бакалавър',
    'Магистър',
    'Друга професионална степен',
    'Докторска степен'
  ]
  
  },
  {
    type: 'radio',
    question: 'What is your current employment status?',
    questionRU: 'Сколько вы работаете?',
    questionBG: 'Колко работите?',
    options: [
      'Employed full time (40 or more hours per week)',
      'Employed part time (less than 40 hours per week)',
      'Unemployed, seeking employment',
      'Unemployed, not seeking employment',
      'Student',
      'Retired or Homemaker',
      'Self-employed',
      'Unable to work'
    ],
    optionsRU:[
      'Я работаю 40+ часов в неделью',
      'Я работаю меньше 40 часов в неделью',
      'У меня нет работы и я ищу работу',
      'У меня нет работы и я не ищу работу',
      'Я студент',
      'Я вышел(ла) на пенсию',
      'Я работаю не по найму',
      'Я не могу работать'
    ],
    optionsBG:[
      '40 или повече часове седмично',
      'По-малко от 40 часове седмично',
      'Нямам работа и търся работа',
      'Нямам работа и не търся работа',
      'Студент съм',
      'Аз се пенсионирах',
      'Аз работя за себе си',
      'Аз не мога да работя'
    ]
  }
  //,
  //this question needs to be modified for countries --- not same income levels
  //   {
  //	type:'radio',
  //	question:'What is your annual income?',
  //	options: [
  //	    'Less than $20,000',
  //	    '$20,000 to $34,999',
  //	    '$35,000 to $49,999',
  //	    '$50,000 to $74,999',
  //	    '$75,000 to $99,999',
  //	    'Over $100,000'
  //	]
  //   },
 // {
  //  type: 'radiowithother',
  //  question: 'What is your nation of citizenship?',
    // options:['United States','Australia','New Zealand', 'United Kingdom', 'South Africa', 'India', 'China']
  //  options: ['United States', 'Australia', 'New Zealand', 'United Kingdom', 'Canada']
 // },
  //{
  //  type:'radiowithother',
  //  question:'In what nation do you currently live?',
  //  options:['United States','Australia','New Zealand', 'United Kingdom', 'South Africa', 'India', 'China']
  //}    
]
  