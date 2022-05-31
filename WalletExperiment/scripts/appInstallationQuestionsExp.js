var ranksArray = new Array();
var ranksIDArray = new Array();

function updateRankArray(clicked_id) {
    var element = document.getElementById(clicked_id);
    if (element.checked == true) {
        ranksArray.push(element.value);
        ranksIDArray.push(element.id);
        var labelID = element.id + "Rank";
        document.getElementById(labelID).classList = "border border-success ml-1";
        document.getElementById(labelID).innerHTML = "&nbsp; " + ranksArray.length + " &nbsp;";
    } else if (element.checked == false) {
        var temp = element.id + "Rank";
        document.getElementById(temp).classList = "border border-dark ml-1";

        for (var i = 0; i < ranksArray.length; i++) {
            if (ranksArray[i] == element.value) {
                var labelID = element.id + "Rank";
                document.getElementById(labelID).innerHTML = "&nbsp; " + "#" + " &nbsp;";
                break;
            }
        }
        ranksArray.splice(i, 1);
        ranksIDArray.splice(i, 1);
        for (var i = 0; i < ranksIDArray.length; i++) {
            var labelID = ranksIDArray[i] + "Rank";
            document.getElementById(labelID).innerHTML = "&nbsp; " + (i + 1) + " &nbsp;";
        }

    }
}

function enableButton() {

    //boolean values that are true if the question has been answered.
    var androidPhoneFrequency = false;
    var appInstallFrequency = false;
    var numberAppsInstalled = false;
    var readPermissionsFrequency = false;
    var readPermissions = false;
    var motivationsToInstallApps = false;
    var permissionsStopInstall = false;
    var understandSound = false;
    var soundDidNotHelp = false;
    var soundHelped = false;
    var soundAttention = false;


    var x = document.getElementsByName('androidPhoneFrequency');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postAndroidPhoneFrequency').value = optionSelected;
            androidPhoneFrequency = true;
        }
    }

    x = document.getElementsByName('appInstallFrequency');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postAppInstallFrequency').value = optionSelected;
            appInstallFrequency = true;
        }
    }

    x = document.getElementsByName('numberAppsInstalled');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postNumberAppsInstalled').value = optionSelected;
            numberAppsInstalled = true;
        }
    }

    x = document.getElementsByName('readPermissionsFrequency');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postReadPermissionsFrequency').value = optionSelected;
            readPermissionsFrequency = true;
        }
    }

    x = document.getElementsByName('readPermissions');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postReadPermissions').value = optionSelected;
            readPermissions = true;
        }
    }

    x = document.getElementsByName('permissionsStopInstall');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postPermissionsStopInstall').value = optionSelected;
            permissionsStopInstall = true;
        }
    }

    x = document.getElementsByName('soundDidNotHelp');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postSoundDidNotHelp').value = optionSelected;
            soundDidNotHelp = true;
        }
    }

    x = document.getElementsByName('soundHelped');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postSoundHelped').value = optionSelected;
            soundHelped = true;
        }
    }

    x = document.getElementsByName('soundAttention');
    for (i = 0; i < x.length; i++) {
        if (x[i].type == "radio" && x[i].checked == true) {
            var optionSelected = x[i].value;
            document.getElementById('postSoundAttention').value = optionSelected;
            soundAttention = true;
        }
    }

    x = document.getElementsByName('motivationsToInstallApps');
    var y = document.getElementById('postMotivationsToInstallApps');
    var first = true;
    var checked = 0;
    for (i = 0; i < x.length; i++) {

        if (x[i].type == "checkbox" && x[i].checked == true) {
            checked++;
        }

    }
    if (checked == 8) {
        motivationsToInstallApps = true;
        y.value = "{" + ranksArray + "}";
    }
    if (motivationsToInstallApps) {
        first = true;
    }

    x = document.getElementsByName('understandSound');
    y = document.getElementById('postUnderstandSound');
    var first = true;
    for (i = 0; i < x.length; i++) {

        if (x[i].type == "checkbox" && x[i].checked == true) {
            var optionSelected = x[i].value;
            if (first) {
                y.value = "{" + optionSelected;
                first = false;
            } else {
                y.value = y.value + "," + optionSelected;
            }
            understandSound = true;
        }

    }
    if (understandSound) {
        y.value = y.value + "}";
        first = true;
    }

    if (androidPhoneFrequency == true && appInstallFrequency == true
        && numberAppsInstalled == true && readPermissionsFrequency == true && readPermissions == true && motivationsToInstallApps == true && permissionsStopInstall == true
        && understandSound == true && soundDidNotHelp == true && soundHelped == true && soundAttention == true) {
		var z = document.getElementById('postMotivationsToInstallApps');
		z.value = "{"+ranksArray+"}";
        document.getElementById('ComputerUseSubmit').disabled = false;
    } else {
        document.getElementById('ComputerUseSubmit').disabled = true;
    }

}