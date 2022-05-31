function enableButton(){

    //boolean values that are true if the question has been answered.
    var askHelp = false;
    var otherAskHelp = false;
    var performedActions = false;
    var itDegree = false;
    var securityCourse = false;
    var securityJob = false;
    var securityConference = false;
    var websiteIndicators = false;
  
    var x = document.getElementsByName('performedActions');
    var y = document.getElementById('postPerformedActions');
    var first = true;
    for(i=0; i < x.length ;i++){
      
      if(x[i].type == "checkbox" && x[i].checked == true){
        var optionSelected = x[i].value;
        if(first){
          y.value = "{"+optionSelected;
          first = false;
        }else{
          y.value = y.value+","+optionSelected;
        }
        performedActions = true;
      }

    }
    if(performedActions){
      y.value = y.value+"}";
      first = true;
    }
  
    x = document.getElementsByName('itDegree');
    for(i=0; i < x.length ;i++){
      if(x[i].type == "radio" && x[i].checked == true){
        var optionSelected = x[i].value;
        document.getElementById('postItDegree').value = optionSelected;
        itDegree = true;
      }
    }
  
    x = document.getElementsByName('securityCourse');
    for(i=0; i < x.length ;i++){
      if(x[i].type == "radio" && x[i].checked == true){
        var optionSelected = x[i].value;
        document.getElementById('postSecurityCourse').value = optionSelected;
        securityCourse = true;
      }
    }
  
    x = document.getElementsByName('securityJob');
    for(i=0; i < x.length ;i++){
      if(x[i].type == "radio" && x[i].checked == true){
        securityJob = true;
        var optionSelected = x[i].value;
        document.getElementById('postSecurityJob').value = optionSelected;
      }
    }
  
    x = document.getElementsByName('securityConference');
    for(i=0; i < x.length ;i++){
      if(x[i].type == "radio" && x[i].checked == true){
        securityConference = true;
        var optionSelected = x[i].value;
        document.getElementById('postSecurityConference').value = optionSelected;
      }
    }
  
    x = document.getElementsByName('websiteIndicators');
    y = document.getElementById('postWebsiteIndicators');
    first = true;
    for(i=0; i < x.length ;i++){
      if(x[i].type == "checkbox" && x[i].checked == true){
        
        var optionSelected = x[i].value;
        if(first){
          y.value = "{"+optionSelected;
          first = false;
        }else{
          y.value = y.value+","+optionSelected;
        }
        websiteIndicators = true;
      }
    }

    if(websiteIndicators){
      y.value = y.value+"}";
      first = true;
    }
  
    if(performedActions == true && itDegree == true 
      && securityCourse == true && securityJob == true && securityConference == true && websiteIndicators == true){
        document.getElementById('ComputerUseSubmit').disabled = false;
    }else{
      document.getElementById('ComputerUseSubmit').disabled = true;
    }
  
  }