//123
var DatingPermissions = {
    "1": "Contacts.find accounts on the device.modify your contacts#Location.access approximate location(network-based). access precise location (GPS and network-based)#Storage.Modify or delete SD card contents. read the contents of your SD card.#Other.have full network access.view network connections.control vibration.prevent device from sleeping.receive data from Internet.Google Play billing service",
    "2": "In-app purchases.Allows the user to make purchases from within the app#Photos,Media,Files.Uses one or more of: files on the device, such as images or videos or audio, the device's external storage#Wi-Fi connection information.Allows the app to view information about Wi-Fi networking, such as whether Wi-Fi is enables and names of connected Wi-Fi devices.#Identity.Uses one or more of: accounts on the device, profile data#Camera.Uses the device's camera(s)#Location.uses the device's location#Device ID & call information.Allows the app to determine the phone number and device IDs, whether a call is active, and remote number connected by a call#Contacts.Uses contact information#SMS.Uses one or more of: SMS, MMS. Charges may apply#Other.Receive data from Internet.Full network access.View network connections.Change network connectivity.Control vibration.Prevent device from sleeping.Use accounts on the device.Read Google service configuration.Disable your screen lock.modify system settings.Change your audio settings"
};

//123
var PuzzlePermissions = {
    "1": "Storage.Modify or delete SD card contents. read the contents of your SD card.#Photos,Media,Files.Uses one or more of: files on the device, such as images or videos or audio, the device's external storage#Other.view network connections.full network access.",
    "2": "In-app purchases.Allows the user to make purchases from within the app#Photos,Media,Files.Uses one or more of: files on the device, such as images or videos or audio, the device's external storage#Wi-Fi connection information.Allows the app to view information about Wi-Fi networking, such as whether Wi-Fi is enables and names of connected Wi-Fi devices#Device ID & call information.Allows the app to determine the phone number and device IDs, whether a call is active, and remote number connected by a call#Contacts.Uses contact information#Location.uses the device's location#Other.View network connections.Full network access.Run at startup.Control Vibration"
};

var appnames = ["Dating", "Puzzles"];
var apporder = ["1", "2", "3", "4", "5", "6", "7", "8"];
var parameterorder = ["1", "2", "3", "4", "5", "6", "7", "8"];
var parametercombination = { "1": { review: "3", risk: "2", downloads: "50000" }, "2": { review: "3", risk: "2", downloads: "100000" }, "3": { review: "3", risk: "4", downloads: "50000" }, "4": { review: "3", risk: "4", downloads: "100000" }, "5": { review: "4.5", risk: "2", downloads: "50000" }, "6": { review: "4.5", risk: "2", downloads: "100000" }, "7": { review: "4.5", risk: "4", downloads: "50000" }, "8": { review: "4.5", risk: "4", downloads: "100000" } };

var DatingApps = { "1": { name: "Zoosk", desc: "", review: 1, risk: 1, downloads: 1 }, "2": { name: "Match Dating", desc: "", review: 1, risk: 1, downloads: 1 }, "3": { name: "OkCupid Dating", desc: "", review: 1, risk: 1, downloads: 1 }, "4": { name: "JAUMO Flirt Chat", desc: "", review: 1, risk: 1, downloads: 1 }, "5": { name: "LOVOO", desc: "", review: 1, risk: 1, downloads: 1 }, "6": { name: "Tinder", desc: "", review: 1, risk: 1, downloads: 1 }, "7": { name: "Badoo", desc: "", review: 1, risk: 1, downloads: 1 }, "8": { name: "POF Free Dating App", desc: "", review: 1, risk: 1, downloads: 1 } };
var PuzzleApps = { "1": { name: "Words With Friends", desc: "", review: 1, risk: 1, downloads: 1 }, "2": { name: "WordBrain Themes", desc: "", review: 1, risk: 1, downloads: 1 }, "3": { name: "Word Trek", desc: "", review: 1, risk: 1, downloads: 1 }, "4": { name: "Words Crush", desc: "", review: 1, risk: 1, downloads: 1 }, "5": { name: "WordBrain", desc: "", review: 1, risk: 1, downloads: 1 }, "6": { name: "Word Search", desc: "", review: 1, risk: 1, downloads: 1 }, "7": { name: "Word Masters", desc: "", review: 1, risk: 1, downloads: 1 }, "8": { name: "Word search - puzzle", desc: "", review: 1, risk: 1, downloads: 1 } };

var permstatus;

var num_apps_cur_installed = 0;
var Check_ID_APP_Installed = "Img1Img2Img3Img4";

var yesflag = "";
var yesarray = [];
var noarray = [];

Privacy_Priming_String = "";
Android_Behavior_String = "";
Permission_Comprehension_String = "";
Expertise_String = "";
Demographics_String = "";
Install_Order_String = "";
Suspicious_Data = "";
Experiment_Start_time = 0;
App_Category_Order = 0;

function shuffle(array) {
    //alert('shuffle');
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function getAPPlist() {

    if (appnames.length > 0) {
        //alert(appnames);
        app_category = appnames.pop();

        if (app_category == "Puzzles") {
            return PuzzleApps;
        }
        if (app_category == "Dating") {
            return DatingApps;
        }
    }
}

function getPermissionlist() {
    if (app_category == "Puzzles") {
        return PuzzlePermissions;
    }
    if (app_category == "Dating") {
        return DatingPermissions;
    }
}

function setAppPics() {
    $('#dvLoading').show();
    ID_APP_Installed = "";
    num_apps_cur_installed = 0;
    Application_choice_order = 0;
    $("#AppInstallCounter").text(num_apps_cur_installed + "/4");
    var tempnum = 2 - appnames.length + 1;
    $("#catnum").text(tempnum);
    $("#catname").text(appnames[0]);

    var i = 0;
    var app_list = getAPPlist();

    var perms_list = getPermissionlist();

    $('.listedapp').each(function (index) {
        $(this).attr('src', 'images/' + app_list[apporder[i]].name + ".png");
        $(this).attr('title', app_list[apporder[i]].name);
        $(this).attr('desc', app_list[apporder[i]].desc);
        $(this).attr('review', app_list[apporder[i]].review);
        $(this).attr('risk', app_list[apporder[i]].risk);
        $(this).attr('downloads', app_list[apporder[i]].downloads);
        $(this).attr('app_category', app_category);
        $(this).attr('choice_order', Application_choice_order);
        $(this).attr('state', "unopened");
        $(this).attr('name', app_list[apporder[i]].name);
        $(this).attr('permissions_viewed', 0);
        $(this).attr('permissions_scrolled', 0);
        if (($("#ExpCondition").attr('value')) === "Lock") {
            if ($(this).attr('risk') == "2") {
                $(this).attr('perms', perms_list["2"]);
            }
            else {
                $(this).attr('perms', perms_list["1"]);
            }
        }
        else {
            if ($(this).attr('risk') == "2") {
                $(this).attr('perms', perms_list["2"]);
            }
            else {
                $(this).attr('perms', perms_list["1"]);
            }
        }

        i++;

        var rateimg;
        var reviewimg;

        if ($(this).attr('review') == "3") {
            reviewimg = 'images/star3.png';
        }
        else if ($(this).attr('review') == "4.5") {
            reviewimg = 'images/star4.5.png';
        }

        if ($(this).attr('risk') == "2") {
            rateimg = 'images/lock2.png';
        }
        else if ($(this).attr('risk') == "4") {
            rateimg = 'images/lock4.png';
        }

        $("#reviewrating" + i).attr('src', reviewimg);
        $("#raterating" + i).attr('src', rateimg);

    });

    i = 0;
    $('.appname').each(function (index) {
        $(this).text(app_list[apporder[i]].name);
        i++;
    });

    i = 0;
    $('.freeorinstalled').each(function (index) {
        $(this).text("Free");
        $(this).attr('titlefor', app_list[apporder[i]].name);
        i++;
    });

    i = 0;
    $('.reviewrating').each(function (index) {
        $(this).attr('review', app_list[apporder[i]].review);
        i++;
    });

    i = 0;
    $('.raterating').each(function (index) {
        $(this).attr('risk-privacy', app_list[apporder[i]].risk);
        //alert( $(this).attr('risk-privacy'));
        i++;
    });

    rating_link = 'images/';
    if (($("#ExpCondition").attr('value')) === "Lock") {
        rating_link = 'images/lock/';
    }
    if (($("#ExpCondition").attr('value')) === "Control") { }
    //$("#nextbutton").hide();
    $("#nextButtonDiv").hide();

}

function incPerm() {

    $(".permission").hide();
    var permissions = $(window.appinplay).attr('perms').split('#');
    if ($(window.appinplay).attr('state') == "opened") {
        $(window.appinplay).attr('state', 'permsdisplayed');
    }

    var accordion_html = "";
    accordion_html = "<h4 class = \"details-toggle\"><span class=\"edit-toggle\" style=\"font-size:small;\">Click to view all Permissions</span><i class=\"fa fa-angle-down\"></i> </h4><div><ul style=\"list-style-type:none; padding:2px;\">";

    for (var i in permissions) {
        perm1 = permissions[i];
        perm2 = perm1.split('.');
        accordion_html = accordion_html + "<li><img src=\"images\/" + perm2[0] + ".png\" width=\"25\" height=\"25\" \/> <font size=\"3\" color=\"red\">" + perm2[0] + "<\/font><\/br><font size=\"2\" color=\"blue\">";
        for (k = 1; k < perm2.length; k++) {
            accordion_html = accordion_html + perm2[k] + "<\/br>";
        }
        accordion_html = accordion_html + "<\/font><\/li>";

    }
    accordion_html = accordion_html + "</ul></div>";

    $('#accordion').empty();
    $('#accordion').append(accordion_html).accordion({ heightStyle: "content", collapsible: true, active: false }).accordion("refresh");
    $('#accordion').accordion("option", "collapsible", true);

    //$(window.appinplay).attr('permissions_viewed', permstatus);
    //$(window.appinplay).attr('permissions_scrolled', 0);

    $(".details-toggle").click(function () {
        if ($(window.appinplay).attr('permissions_viewed') == '0') {
            $(window.appinplay).attr('permissions_viewed', 1);
        }
    });
}

function onload() {

    shuffle(appnames);
    shuffle(apporder);

    shuffle(parameterorder);
    for (a = 0; a < parameterorder.length; a++) {

        PuzzleApps[apporder[a]].review = parametercombination[parameterorder[a]].review;
        PuzzleApps[apporder[a]].risk = parametercombination[parameterorder[a]].risk;
        PuzzleApps[apporder[a]].downloads = parametercombination[parameterorder[a]].downloads;
    }

    shuffle(parameterorder);
    for (a = 0; a < parameterorder.length; a++) {

        DatingApps[apporder[a]].review = parametercombination[parameterorder[a]].review;
        DatingApps[apporder[a]].risk = parametercombination[parameterorder[a]].risk;
        DatingApps[apporder[a]].downloads = parametercombination[parameterorder[a]].downloads;
    }

    setAppPics();

    $(".listedapp").click(function () {

        if($(this).attr('risk') == "2"){
		    sound = document.getElementsByTagName("audio")[0];
			myrisk=5.0;
		}
        if($(this).attr('risk') == "4"){
		    sound = document.getElementsByTagName("audio")[1];
			myrisk=5.0;
        }
        
        if ($(this).attr('state')=="installed"){
			$("#installarea").html('<img src="./pics/uninstall.png" width="94px"/>');
		}
		else{
			sound.load();
        	sound.play();
		}

        window.simstate = "details";
        window.appinplay = $(this);

        if ($(this).attr('state') == "unopened") {
            $(this).attr('state', 'opened');
        }
        $("#applist").hide();
        //$("#nextbutton").hide();
        $("#nextButtonDiv").hide();
        //$("#backbutton").show();
        $("#backButtonDiv").show();
        $("#appdesc").show();

        $("#appdescimage").attr('src', $(this).attr("src"));
        $("#downloadtitle").html($(this).attr('title'));
        $("#downloadcount").html('<b>Downloads:</b> ' + $(this).attr('downloads'));
        if ($(this).attr('downloads') == "50000") {
            $("#DownloadImage").attr('src', 'images/50ThousandDownload.png');
        }
        else {
            $("#DownloadImage").attr('src', 'images/100ThousandDownload.png');
        }

        if ($(this).attr('review') == "3") {
            $("#RatingImage").attr('src', 'images/rating3.png');
        }
        else if ($(this).attr('review') == "4.5") {
            $("#RatingImage").attr('src', 'images/rating4.5.png');
        }

        if ($(this).attr('risk') == "2") {
            $("#PrivacyImage").attr('src', 'images/privacy2.png');
        }
        else if ($(this).attr('risk') == "4") {
            $("#PrivacyImage").attr('src', 'images/privacy4.png');
        }

        $("#downloaddescription").html("&nbsp;&nbsp;&nbsp;&nbsp;" + $(this).attr('desc'));
        $("#installarea").html('');
        if ($(this).attr('state') == "installed") {
            $("#installarea").html('<img src="images/uninstall.png" width="94px"/>');
        }

        incPerm();

    });

    $("#accordionwrap").scroll(function () {
        if ($(window.appinplay).attr('permissions_scrolled') == 0) {

        }
        $(window.appinplay).attr('permissions_scrolled', 1);
    });

    $("#backarea").click(function () {
        backfromdetails();
        sound.pause();
    });
}

function backfromdetails() {

    window.simstate = "list";
    $("#appdesc").hide();
    //$("#nextbutton").hide();
    $("#nextButtonDiv").hide();
    $("#applist").show();
    if (num_apps_cur_installed >= 4) {
        //$("#nextbutton").show();
        $("#nextButtonDiv").show();
    }
    //$("#backbutton").hide();
    $("#backButtonDiv").hide();
    populateAppStates();
}

function populateAppStates() {

    $('.listedapp').each(function (index) {
        $("#appstate-" + $(this).attr('id')).val($(this).attr('state'));
        $("#appstate-" + $(this).attr('id')).attr('name', "appstate-" + $(this).attr('id'));
        $("#notinstalledreason-" + $(this).attr('id')).attr('name', "notinstalledreason-" + $(this).attr('id'));
        $("#woulduninstall-" + $(this).attr('id')).attr('name', "woulduninstall-" + $(this).attr('id'));
        $("#didnotknow-" + $(this).attr('id')).attr('name', "didnotknow-" + $(this).attr('id'));
    });
}

function thebackbutton() {
    if (window.simstate == "details") {
        backfromdetails();
        sound.pause();
    }
    return false;
}

$("#installarea").click(function () {

    sound.pause();

    if (!$("#appdesc").is(":visible")) return false;
    $("#appdesc").hide();

    if ($(window.appinplay).attr('state') == "installed") {
        num_apps_cur_installed = num_apps_cur_installed - 1;
        $("#AppInstallCounter").text(num_apps_cur_installed + "/4");
        $(window.appinplay).attr('state', 'uninstalled');
        $('.freeorinstalled').each(function (index) {

            if ($(this).attr('titlefor') == $(window.appinplay).attr('title')) {

                $(this).text("Free");
            }

        });

        backfrominstall();
        return false;
    }

    simAccept();

});

function backfrominstall() {

    window.simstate = "list";
    $("#appperms").hide();
    $("#appdesc").hide();
    $("#applist").show();
    //$("#nextbutton").hide();
    $("#nextButtonDiv").hide();
    //$("#backbutton").hide();
    $("#backButtonDiv").hide();
    if (num_apps_cur_installed >= 4) {
        //$("#nextbutton").show();
        $("#nextButtonDiv").show();
    }
    populateAppStates();
}


function simAccept() {

    var d1 = new Date();
    var decision_time = d1.getTime();
    if (!window.extendedwarn) {
        $(window.appinplay).attr('state', 'installed');
        num_apps_cur_installed = num_apps_cur_installed + 1;
        Application_choice_order = Application_choice_order + 1;
        $(window.appinplay).attr('choice_order', Application_choice_order);
        $("#AppInstallCounter").text(num_apps_cur_installed + "/4");
        backfrominstall();
    } else {
        if (window.simstate == "perms") {
            window.simstate = "extendedperms";
            $(window.appinplay).attr('state', 'extendedpermsdisplayed');
            $("#extendedpermissionsarea").html($(window.appinplay).attr('extendedwarning'));
        } else if (window.simstate == "extendedperms") {
            $(window.appinplay).attr('state', 'installed');
            num_apps_cur_installed = num_apps_cur_installed + 1;
            Application_choice_order = Application_choice_order + 1;
            $(window.appinplay).attr('choice_order', Application_choice_order);
            $("#AppInstallCounter").text(num_apps_cur_installed + "/4");
            backfrominstall();
        } else {
            alert(window.simstate);
        }
    }
    $('.freeorinstalled').each(function (index) {

        if ($(this).attr('titlefor') == $(window.appinplay).attr('title')) {

            $(this).text("Installed");
        }

    });
    ID_APP_Installed = ID_APP_Installed + $(window.appinplay).attr('id');
    $(".permission").hide();

}

function thenextbutton() {

    var Installed_Choice_String = "";
    var UnInstalled_Choice_String = "";
    var PermsDisplayed_Choice_String = "";
    var Ignore_Choice_String = "";

    populateAppStates();
    //$("#nextbutton").hide();
    $("#nextButtonDiv").hide();
    window.allappsviewed = true;
    window.unopenedappsstring = "";
    $(".listedapp").each(function (index) {
        if ($(this).attr('state') == "unopened") {
            window.allappsviewed = false;
            window.unopenedappsstring = window.unopenedappsstring + $(this).attr('title') + "\n";
        }
    });

    yesflag = "no";
    if (ID_APP_Installed == Check_ID_APP_Installed) {
        yesarray.push(1);
        yesflag = "yes";
    }
    else {
        noarray.push(1);
    }

    Ignore_Choice_String += "[";
    $(".listedapp").each(function (index) {
        if ($(this).attr('state') == "unopened") {
            Ignore_Choice_String += "{" + $(this).attr('name') + "," + app_category + "," + $(this).attr('review') + "," + $(this).attr('risk') + "," + $(this).attr('downloads') + "}";
        }
    });
    Ignore_Choice_String += "]";

    Installed_Choice_String += "[";
    UnInstalled_Choice_String += "[";
    PermsDisplayed_Choice_String += "[";
    var numOfPermViewed = 0;
    $(".listedapp").each(function (index) {
        //123
        numOfPermViewed = numOfPermViewed + $(this).attr('permissions_viewed');
        if ($(this).attr('state') == "installed") {
            Installed_Choice_String += "{" + $(this).attr('name') + "," + app_category + "," + $(this).attr('choice_order') + "," + $(this).attr('review') + "," + $(this).attr('risk') + "," + $(this).attr('downloads') + "," + $(this).attr('permissions_viewed') + "," + $(this).attr('permissions_scrolled') + "," + $(this).attr('time_taken') + "}";
        }
        if ($(this).attr('state') == "uninstalled") {
            UnInstalled_Choice_String += "{" + $(this).attr('name') + "," + app_category + "," + $(this).attr('choice_order') + "," + $(this).attr('review') + "," + $(this).attr('risk') + "," + $(this).attr('downloads') + "," + $(this).attr('permissions_viewed') + "," + $(this).attr('permissions_scrolled') + "}";
        }
        if ($(this).attr('permissions_viewed') == "1") {
            PermsDisplayed_Choice_String += "{" + $(this).attr('name') + "," + app_category + "," + $(this).attr('choice_order') + "," + $(this).attr('review') + "," + $(this).attr('risk') + "," + $(this).attr('downloads') + "," + $(this).attr('permissions_viewed') + "," + $(this).attr('permissions_scrolled') + "}";
        }
    });
    NumOfPermViewed = numOfPermViewed;
    Installed_Choice_String += "]";
    UnInstalled_Choice_String += "]";
    PermsDisplayed_Choice_String += "]";

    if (app_category == "Dating") {

        $("#InstalledChoiceDating").attr('value', Installed_Choice_String);
        $("#UnInstalledChoiceDating").attr('value', UnInstalled_Choice_String);
        $("#PermsDisplayedDating").attr('value', PermsDisplayed_Choice_String);
        $("#IgnoredChoiceDating").attr('value', Ignore_Choice_String);
        $("#AppCategoryDating").attr('value', app_category);

    } else if (app_category == "Puzzles") {

        $("#InstalledChoicePuzzles").attr('value', Installed_Choice_String);
        $("#UnInstalledChoicePuzzles").attr('value', UnInstalled_Choice_String);
        $("#PermsDisplayedPuzzles").attr('value', PermsDisplayed_Choice_String);
        $("#IgnoredChoicePuzzles").attr('value', Ignore_Choice_String);
        $("#AppCategoryPuzzles").attr('value', app_category);
    }
    /*alert(Installed_Choice_String);
    alert(UnInstalled_Choice_String);
    alert(PermsDisplayed_Choice_String);
    alert(Ignore_Choice_String);
    alert(app_category);*/
    App_Category_Order++;
    if (App_Category_Order > 1) {

        var calc_val = (yesarray.length / (yesarray.length + noarray.length)) * 100;
        if (calc_val > 50) {
            $("#SuspiciousData").attr('value', "Yes");
        }

        $("#simulator").hide();
        $("#DoneSelecting").show();

        /*var d2 = new Date();
        var t = d2.getTime();
        TimeSpentApp2 = t - question_page_start_time;
        question_page_start_time = t;
    	
        $('#TimeSpentApp2').attr('value', TimeSpentApp2);
        $('#YesFlagApp2').attr('value', yesflag);
    	
        $("#simulator").hide();
        $("#followupquestions").show();
        $("#followupquestions").scrollTop(0);*/
    } else {

        var d2 = new Date();
        var t = d2.getTime();

        //TimeSpentApp1 = t - question_page_start_time;

        //question_page_start_time = t;
        //$('#TimeSpentApp1').attr('value', TimeSpentApp1);
        $('#YesFlagApp1').attr('value', yesflag);

        setAppPics();
    }


    //alert("Post results to server");

    return false;
}