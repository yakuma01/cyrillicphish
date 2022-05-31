function enableButton() {

    var demographics1 = false;
    var demographics2 = false;
    var demographics3 = false;
    var demographics4 = false;
  
    var x = document.getElementsByName('education');
    for (i = 0; i < x.length; i++) {
      if (x[i].type == "radio" && x[i].checked == true) {
          var optionSelected = x[i].value;
          document.getElementById('education').value = optionSelected;
          demographics1 = true;
      }
    }
  
    x = document.getElementsByName('annualIncome');
    for (i = 0; i < x.length; i++) {
      if (x[i].type == "radio" && x[i].checked == true) {
          var optionSelected = x[i].value;
          document.getElementById('annualIncome').value = optionSelected;
          demographics2 = true;
      }
    }
  
    x = document.getElementsByName('gender');
    for (i = 0; i < x.length; i++) {
      if (x[i].type == "radio" && x[i].checked == true) {
          var optionSelected = x[i].value;
          document.getElementById('gender').value = optionSelected;
          demographics3 = true;
      }
    }
  
    x = document.getElementsByName('age');
    for (i = 0; i < x.length; i++) {
      if (x[i].type == "radio" && x[i].checked == true) {
          var optionSelected = x[i].value;
          document.getElementById('age').value = optionSelected;
          demographics4 = true;
      }
    }
  
  
  
    if (demographics1 == true && demographics2 == true && demographics3 == true && demographics4 == true) {
      document.getElementById('DomographicsSubmit').disabled = false;
    } else {
      document.getElementById('DomographicsSubmit').disabled = true;
    }
  }