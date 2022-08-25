/**
 * Created by Tom on 3/25/2015.
 */

var questions;
var which_set;
var url = new URL(window.location.href);
var paramValue = url.searchParams.get("country");

var countrycode;
var opts;

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
  alert(participantType);
  alert(experimentCondition);
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
      console.log(participantType);
      //Yash
      var url_string = window.location.href;
      var url = new URL(url_string);
      // var paramValue = url.searchParams.get("country");
      // alert(paramValue);
      // www.test.com?filename=test
      
      //End
      // questions = participantQuestions[participantType].concat(PreStudyQuestions);
      if(paramValue == 'US'){
        questions = participantQuestions_US[participantType].concat(PreStudyQuestions_US);
      }
      else if(paramValue == 'NZ'){
        questions = participantQuestions_NZ[participantType].concat(PreStudyQuestions_NZ);
      }

      console.log(questions);
      

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
 var cc = document.getElementById("countrycode").innerText;
  //alert(cc)
  $("#sis").hide();
  $("#completedquestions").append("<h1>COMPLETED QUESTIONS</h1>");
  setupAllQuestions();
  // setupQuestion(0);
  if(cc == 'US'){
    $("#navigation").html("<hr><button id='nextbutton'>Продолжить</button>");
  }
  else if(cc == 'NZ'){
    $("#navigation").html("<hr><button id='nextbutton'>Продължи</button>");
  }

  
  $("#nextbutton").click(function () {
    // nextQuestion();
    nextQuestionBatch();
   
    return false;
  });
}

function showFinish() {

  countrycode = $('#countrycode').text();
  
  if (countrycode === "US") {
    countrycode = "RU";
  }else{
    countrycode = "BG";
  }

  // console.log("countrycode: " + countrycode);
  var websites = Object.keys(dict[countrycode + ""]);
  
  // console.log(tasks["taskSite"])
  opts = [];
  var arrayLength = websites.length;
  // console.log("ArrayLength: " + arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    if (websites[i].match(/12/)) {
      var str = websites[i].replace('12', '');
      opts.push(str);
      console.log(str);
    }
  }
  skill_questions[0].options = opts;

  switch (which_set) {
    case 'skills':
      $("#surveyResults").submit();
      break;
    case 'sis':
      
      window.location.href = "https://localhost/globalcognitivesecurity.net/PHP/bart.php";
      //$("#sis_form").submit();
      
      break;
    case 'validation':
       console.log("HERE");
      $.post('dataReceiver.php', $("#surveyResults").serialize());
      $("#sis").hide();
      popup("experiment.php");
      $("#question").html("<h3>Пожалуйста не закройте эту страницу пока вы работаете над экспериментом. Обновление или закртитие страницы аннулирует ваш результат.</h3>").show();
      questions = cultureQuestions.concat(skill_questions);
      which_set = "skills";
      break;
    default:
      break;
  }
}

function setupAllQuestions() {
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
    $(id).html('<br><h3>[' + (q_idx + 1) + " / " + questions.length + "] " + question.question + '</h3>').show();

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
  $("#question").html('<h3>' + question.question + '</h3>').show();

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
  for (i in question.options) {
    html += "<input type='radio' name='" + clean(question.question) + "' value='" + clean(question.options[i]) + "'/> " + question.options[i] + '<br>';
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
var html = '<table border="1"><tr><td><i></i></td>';
  for (i in question.columns) {
	 // console.log("goes in this loop");
    html += '<td style="padding: 5px;"><b>' + question.columns[i] + '</b></td>';
  }
  html += '</tr>';
	// console.log(opts);
  for (i in question.options) {
    html += '<tr><td style="padding: 5px;">' + question.options[i] + '</td>';
	 // console.log("for every row"+question.options[i]);
    for (j in question.columns) {
	  //  console.log("for every column"+question.columns[i]);
      //html += '<td><input type="checkbox" name="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '" value="yes"/></td>';
	html += '<td><input type="radio" name="' + clean(question.prefix + '_' + question.options[i]) + '" value="' + clean(question.prefix + '_' + question.options[i] + '_' + question.columns[j]) + '"/></td>';    
    }
    html += '</tr>';
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
	     html += "<input type='radio' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='" + clean(question.options[i]) + "' onchange='radiochangecheckbox(this)'/> " + question.options[i] + '<br>';
	     }
	  else {
    html += "<input type='checkbox' class ='" + clean(question.question) + "' id='" +numcheck + "' name='" + clean(question.prefix + '_' + question.options[i]) + "' value='yes' onchange='radiochangecheckbox(this)'/> " + question.options[i] + '<br>';
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
    console.log("BABO showFinish");
    //$("#question").html("<h2>Survey Complete</h2>");
    $("#question").html("<h2>Подождите пока эксперимент загружается</h2>");
    convertCheckboxesToHiddens();
    $("#nextbutton").hide();
    showFinish();
  } else {
    setupQuestion(window.currentQuestion);
  }
  return false;
}



function nextQuestionBatch() {
  let res = verifyAllQuestion();
  // alert(res);
  // alert(window.debug);
  if (!verifyAllQuestion() && !window.debug) {
    // alert("A");
    let err_msg = $("#error").text();
    alert(err_msg);
    if (err_msg.includes("read and understand the instructions")) {
      // alert($("#error").text());
      $("#error").hide();
      Swal.fire({
        icon: 'error',
        title: 'Wrong Answer(s)',
        text: $("#error").text(),
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

  window.currentQuestion++;
  for (var q_idx = 0; q_idx < window.questions.length; q_idx++) {
    let id = "#question" + q_idx;
    var ref = $(id).contents();
    $("#completedquestions").append(ref);
  }

  if (window.questions.length<=window.currentQuestion){
  //submit agreement
  //open sites
  //please wait
  
  console.log("BABO showFinish");
  //$("#question").html("<h2>Survey Complete</h2>");
  $("#allquestions").html("<h2>Подождите пока эксперимент загружается</h2>");
  
  convertCheckboxesToHiddens();
  $("#nextbutton").hide();
  showFinish();
  } else {
      setupQuestion(window.currentQuestion);
  }
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
		result = false;
    return result;
	}
        break;
      case 'checkall':
        if (!verifyCheckAll(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'matrixrank':
        if (!verifyMatrixRank(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'dimensionalrank':
        if (!verifyDimensionalRank(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'freeformint':
        if (!verifyFreeFormInt(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'freeCode':
        if (!verifyFreeCode(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'freeform':
        if (!verifyFreeForm(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'radiowithother':
        if (!verifyRadioWithOther(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'radio':
        if (!verifyRadio(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'radiowithform':
        if (!verifyRadioWithForm(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'agreementscale':
        if (!verifyAgreementScale(question, id)) {
          result = false;
          return result;
        }
        break;
      case 'countrySelect':
        if (!verifyCountrySelect(question, id)) {
          result = false;
          return result;
        }
        break;
      default:
        alert('verify: uncrecognized question type ' + question.type);
        result = false;
        return result;
    }
  }
  result = true;
  return result;
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
        $("#error").html('<h2><font style="color:red;">' + question.rejecterror + '</font></h2>');
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
        $("#error").html('<h2><font style="color:red;">' + question.rejecterror + '</font></h2>');
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
    $("#error").html('<font style="color:red;">Please answer question ' + q_num + '.</font><hr>'); //change this
	
    return false;
  }
  if (typeof question.mustbechecked != 'undefined') {
    if (selected.val() != clean(question.mustbechecked)) {
      $("#error").html('<h2><font style="color:red;">' + question.rejecterror + '</font></h2>');
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
	for (i in question.options){
  		error = false;
  		q_num = parseInt(id.split("question")[1]) + 1;
		 console.log(q_num);
		 console.log(question.options[i]);
  		name = clean(question.prefix + '_' + question.options[i]);
		 console.log(name);
  		selected = $('input[name="' + name + '"]:checked', $(id));
		 console.log(selected);
		 console.log(selected.length);
  		if (selected.length < 1) {
    			$('input[name="' + name + '"]', $(id)).addClass('error');
    			$("#error").html('<font style="color:red;">Please answer question ' + q_num + '.</font><hr>');
	
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
  $("#error").html('<font style="color:red;">Please answer question ' + q_num + '.</font><hr>');
	
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
    $("#error").html('<font style="color:red;">Please answer question ' + q_num + ' with a number.</font><hr>');
	  
  }
  else {
    $('input[name="' + name + '"]', $(id)).removeClass('error');
    if (parseInt(value) < question.minimum || parseInt(value) > question.maximum) {
      $('input').remove();
      $('#nextbutton').remove();
      $("#error").html('<h2><font style="color:red;">' + question.rejecterror + '</font></h2>');
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

//Yash
//mturk questions are indexed at 0, iu questions are indexed at 1, 2 invitation based questions. Time questions are indexed at 0, accuracy questions are indexed at 1.
var participantQuestions = [
  [
    {
      type: 'freeform',
      //question:'What is your Mechanical Turk ID?',
      question: 'What is your Prolific ID?',
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

var participantQuestions_US = [
  [
    {
      type: 'freeform',
      //question:'What is your Mechanical Turk ID?',
      question: 'Пишите, пожалуйста, ваш имейл.',
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

var participantQuestions_NZ = [
  [
    {
      type: 'freeform',
      //question:'What is your Mechanical Turk ID?',
      question: 'Моля, пишете вашият имейл адрес.',
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
      question: 'Обновление страницы аннулирует ваши результаты?',
      options: [
        'Правильно',
        'Неправильно'
      ],
      mustbechecked: 'Правильно',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
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
      question: 'Для целей данного исследования, если вы считаете, что представленный веб-сайт НЕ БЕЗОПАСЕН, что вам нужно сделать?',
      options: [
        'Закрывать страницу',
        'Найти и нажать кнопку ВХОД или ВОЙТИ.',
        'Найти и нажать кнопку НАЗАД.',
        'Перезагружать проект',
        'Выходить из браузера.'
      ],
      mustbechecked: 'Найти и нажать кнопку НАЗАД.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection.',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'Для целей данного исследования, если вы считаете, что представленный веб-сайт БЕЗОПАСЕН, что вам нужно сделать?',
      options: [
        'Закрыть страницу',
        'Найти и нажать кнопку ВХОД или ВОЙТИ.',
        'Найти и нажать кнопку НАЗАД.',
        'Перезагружать проект.',
        'Выходить из браузера.'
      ],
      mustbechecked: 'Найти и нажать кнопку ВХОД или ВОЙТИ.',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment. Please return to avoid a rejection',
      response: 'hide'
    },

    {
      type: 'radio',
      question: 'Вы используете мышь или сенсорную панель?',
      options: [
        'Да',
        'Нет'
      ],
      mustbechecked: 'Да',
      rejecterror: 'This study requires the use of a mouse or touchpad as an input device. Please return to avoid a rejection.',
      response: 'hide'
    }
  ],

  [
    {
      type: 'radio',
      question: 'Обновление страницы аннулирует ваши результаты??',
      options: [
        'Правильно',
        'Неправильно'
      ],
      mustbechecked: 'Правильно',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
    },

    {
      type: 'radio',
      question: 'Разрешается ли повторение этого проекта?',
      options: [
        'Нет',
        'Да'
      ],
      mustbechecked: 'Нет',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
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
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
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
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
    },

    {
      type: 'radio',
      question: 'Is repeating this study allowable?',
      options: [
        'No',
        'Yes'
      ],
      mustbechecked: 'No',
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
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
      rejecterror: 'It is important that you be able to read and understand the instructions for this experiment.'
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
    options: [
      'Male',
      'Female',
      'Non-binary or other',
      'Do not wish to specify'
    ]
  },
  //{
  //    type:'radiowithother',
  //    question:'What is your gender?',
  //    options:['Male','Female', 'Do not wish to answer']
  //}
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
    options: opts,
    rows: opts,
	  columns: ['Not at all familiar','Slightly familiar','Somewhat familiar','Moderately familiar','Extremely familiar']
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
	  columns: ['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree'],
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

	 {
   type:'radio',
   question:'How likely are you to sign-in into the COVID-19 information website? ',
   options: [
   'Not at all likely',
   'Somewhat unlikely',
   'May or may not be likely',
   'Somewhat likely',
   'Very likely'
   ]
   },
	 {
   type:'radio',
  // // question:'(Question about account takeover) Knowledge to the exposed: How much would a person like you reasonably know about the implications of account takeover? ',
   question:'Did you spend more or less time on viewing the COVID-19 website when compared to others?',
   options: [
   'Less time',
   'More time',
   'About the same amount of time',
   'I do not remember'
   ]
   },
	
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
   {
      type: 'freeform',
      //question:'What is your Mechanical Turk ID?',
      question: 'Please enter any feedback or thoughts about the experiment or survey. Enter NA if you do not wish to comment.',
      response: 'hide',
    }

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
    minimum: '18',
    maximum: '120',
    response: 'hide',
    rejecterror: 'This study is only for participants between the ages of 18 and 120 years'

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
    options: [
      'Less than a high school diploma',
      'High school degree or equivalent (e.g. GED) Some college, no  degree',
      'Associate degree (e.g. AA, AS)',
      'Bachelor\'s degree (e.g. BA, BS)',
      'Master\'s degree (e.g. MA, MS,  MEd)',
      'Professional degree (e.g. MD, DDS, DVM)',
      'Doctorate (e.g. PhD, EdD)'
    ]
  },
  {
    type: 'radio',
    question: 'What is your current employment status?',
    options: [
      'Employed full time (40 or more hours per week)',
      'Employed part time (less than 40 hours per week)',
      'Unemployed, seeking employment',
      'Unemployed, not seeking employment',
      'Student',
      'Retired or Homemaker',
      'Self-employed',
      'Unable to work'
    ]
  }//,
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
];

var PreStudyQuestions_US = [
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
    question: 'Сколько Вам лет?',
    minimum: '18',
    maximum: '120',
    response: 'hide',
    rejecterror: 'This study is only for participants between the ages of 18 and 120 years'

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
    question: 'Какова самая высокая степень или уровень образования, которую вы закончили?)',
    options: [
      'У меня нет ни аттестата ни диплома',
      'У меня аттестат и/или диплом',
      'У меня бакалавр',
      'У меня магистр',
      'Я дипломированный специалист',
      'У меня докторат'
    ]
  },
  {
    type: 'radio',
    question: 'Сколько вы работаете?',
    options: [
      'Я работаю 40+ часов в неделью',
      'Я работаю меньше 40 часов в неделью',
      'У меня нет работы и я ищу работу',
      'У меня нет работы и я не ищу работу',
      'Я студент',
      'Я вышел(ла) на пенсию',
      'Я работаю не по найму',
      'Я не могу работать'
    ]
  }//,
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
];

var PreStudyQuestions_NZ = [
  //    {
  //	type: 'freeform',
  //	question:'Вашето име:',
  //    },
  //    {
  //	type: 'freeform',
  //	question: 'Вашето презиме, фамилия:',
  //    },
  {
    type: 'freeformint',
    question: 'На колко години сте?',
    minimum: '18',
    maximum: '120',
    response: 'hide',
    rejecterror: 'This study is only for participants between the ages of 18 and 120 years'

    //type:'freeform',
    //question:'What is your age?',
    //response: 'hide',
    //options: [
    //  'По-малко от 18 годинии',
    //  '18-30 години',
    //  '30-40 години',
    //  '40-50 години',
    //  '50-60 години',
    //  '60-70 години',
    //  '70-80 години',
    //  'Повече от 80 години'
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
    question: 'Вашето ниво на образование:',
    options: [
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
    question: 'Колко работите?',
    options: [
      '40 или повече часове седмично',
      'По-малко от 40 часове седмично',
      'Нямам работа и търся работа',  
      'Нямам работа и не търся работа',
      'Студент съм',
      'Аз се пенсионирах',
      'Аз работя за себе си',
      'Аз не мога да работя'
    ]
  }//,
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
];