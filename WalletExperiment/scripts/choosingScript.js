String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

categoryInstalls = 0;

isControl = false;

installedApps = {};

permissionsViewed = {};

categories = ["Crypto","Money","Flashlight","Weather"];

categoryApps = 
{
	"Crypto" : ["Bytecoin Wallet", "Bitcoin Wallet - Coinbase", "Buy Bitcoin Instantly", "Bitcoin Source", "Bitcoin Wallet - Neutron Star", "Xapo - Bitcoin Wallet & Vault", "Bitcoin Wallet", "Bitcoin Wallet - Bitcoin Wallet Developers"],
	"Money" : ["Venmo", "Splitwise", "Square Cash", "Cash App", "Ebates: Coupons & Cash Back", "ShopAtHome Cash Back & Coupons", "paysafecard – pay cash online", "GCash"],
	"Flashlight" : ["Color Flashlight", "Super-Bright LED Flashlight","FlashLight","Flashlight","Tiny Flashlight + LED","High-Powered Flashlight","Flashlight Widget", "Flashlight Galaxy"],
	"Weather" : ["Weather & Clock Widget Android", "Weather - The Weather Channel", "Transparent clock & weather", "AccuWeather", "GO Weather Forecast & Widgets", "Weathershot by Instaweather", "3D Weather Live Wallpaper",  "Solo Weather(Beta)"] 
}

apps = 
{
	"Color Flashlight" : 
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures"],
		"AppRating" : 4,
		"Downloads" : 50000000
	},
	"Super-Bright LED Flashlight" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures"],
		"AppRating" : 4.5,
		"Downloads" : 500000000
	},
	"FlashLight" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures"],
		"AppRating" : 4,
		"Downloads" : 10000000
	},
	"Flashlight" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures", "ScreenLock"],
		"AppRating" : 4.5,
		"Downloads" : 10000000

	},
	"Tiny Flashlight + LED" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures"],
		"AppRating" : 4.5,
		"Downloads" : 100000000

	},
	"High-Powered Flashlight" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures", "DrawOver"],
		"AppRating" : 4.5,
		"Downloads" : 10000000

	},
	"Flashlight Widget" :
	{
		"SecRating" : 5,
		"Permissions" : ["Pictures"],
		"AppRating" : 4.5,
		"Downloads" : 1000000
	
	},
	"Flashlight Galaxy" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures"],
		"AppRating" : 4.5,
		"Downloads" : 1000000

	},
	"Weather & Clock Widget Android" :
	{
		"SecRating" : 4,
		"Permissions" : ["PreciseLocation", "Network", "ApproximateLocation", "Calendar", "Storage"],
		"AppRating" : 4.5,
		"Downloads" : 50000000
	},
	"Weather - The Weather Channel" :
	{
		"SecRating" : 5,
		"Permissions" : ["PreciseLocation", "Network", "ApproximateLocation", "FindAccounts", "UseAccounts"],
		"AppRating" : 4.5,
		"Downloads" : 100000000

	},
	"Transparent clock & weather" :
	{
		"SecRating" : 4,
		"Permissions" : ["PreciseLocation", "Network", "ApproximateLocation", "Calendar", "Storage"],
		"AppRating" : 4.5,
		"Downloads" : 50000000

	},
	"AccuWeather" : 
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "PreciseLocation", "ApproximateLocation", "DrawOver", "ScreenLock", "WifiMulticast", "AccessBluetooth", "PairBluetooth", "Storage"],
		"AppRating" : 4,
		"Downloads" : 100000000

	},
	"GO Weather Forecast & Widgets" : 
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "RunningApps", "PreciseLocation", "PhoneStatus", "MockLocation", "Storage", "ApproximateLocation", "DrawOver", "FindAccounts", "ScreenLock", "ConnectWifi"],
		"AppRating" : 4.5,
		"Downloads" : 50000000

	},
	"Weathershot by Instaweather" :
	{
		"SecRating" : 3,
		"Permissions" : ["Network", "ApproximateLocation", "PhoneStatus", "Pictures", "PreciseLocation", "Storage", "FindAccounts", "ChangeNetwork"],
		"AppRating" : 4,
		"Downloads" : 50000000

	},
	"3D Weather Live Wallpaper" :
	{
		"SecRating" : 2,
		"Permissions" : ["PhoneStatus", "PreciseLocation", "Network", "ApproximateLocation", "Storage"],
		"AppRating" : 4,
		"Downloads" : 1000000

	},
	"Solo Weather(Beta)" :
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "PreciseLocation", "ApproximateLocation", "CreateAccounts"],
		"AppRating" : 4,
		"Downloads" : 1000000

	},
	"Venmo" :
	{
		"SecRating" : 5,
		"Permissions" : ["PreciseLocation", "ReadContacts", "Network", "Storage", "FindAccounts", "SendMessage", "DrawOver"],
		"AppRating" : 4.5,
		"Downloads" : 10000000

	},
	"Splitwise" : 
	{
		"SecRating" : 3,
		"Permissions" : ["UseAccounts", "ReadContacts", "Network", "FindAccounts", "CreateAccounts", "PhoneStatus"],
		"AppRating" : 4.5,
		"Downloads" : 10000000

	},
	"Square Cash" : 
	{
		"SecRating" : 4,
		"Permissions" : ["ApproximateLocation", "PhoneStatus", "ReadContacts", "Network", "FindAccounts", "PreciseLocation", "OwnContact", "Pictures", "AccessBluetooth", "PairBluetooth"],
		"AppRating" : 4,
		"Downloads" : 10000000

	},
	"Cash App" : 
	{
		"SecRating" : 5,
		"Permissions" : ["FindAccounts", "Network"],
		"AppRating" : 4.5,
		"Downloads" : 1000000

	},
	"Ebates: Coupons & Cash Back" : 
	{
		"SecRating" : 4, 
		"Permissions" : ["Network", "PreciseLocation", "PhoneStatus", "FindAccounts", "ApproximateLocation", "Pictures", "UseAccounts"],
		"AppRating" : 4,
		"Downloads" : 5000000

	},
	"ShopAtHome Cash Back & Coupons" : 
	{
		"SecRating" : 3,
		"Permissions" : ["UseAccounts", "PhoneStatus", "Network", "PreciseLocation", "ApproximateLocation", "Pictures", "Wifi", "Storage"],
		"AppRating" : 4,
		"Downloads" : 100000

	},
	"paysafecard – pay cash online" : 
	{
		"SecRating" : 5,
		"Permissions" : ["PreciseLocation", "Pictures", "Network", "Storage", "ApproximateLocation"],
		"AppRating" : 4.5,
		"Downloads" : 1000000

	},
	"GCash" : 
	{
		"SecRating" : 5,
		"Permissions" : ["PreciseLocation", "PhoneStatus", "Network", "ReadContacts", "SendMessage", "MakeCalls", "RecieveMessage", "ReadMessage"],
		"AppRating" : 4.5,
		"Downloads" : 10000000

	},
	"Bytecoin Wallet" : 
	{
		"SecRating" : 3,
		"Permissions" : ["Network", "NearField", "PhoneStatus", "PairBluetooth", "Pictures", "Storage", "Connectivity"],
		"AppRating" : 3.5,
		"Downloads" : 500
	},
	"Bitcoin Wallet - Coinbase" :
	{
		"SecRating" : 5,
		"Permissions" : ["ReadContacts", "Pictures", "Network", "NearField", "RecieveMessage", "PhoneStatus", "FindAccounts", "ReadMessage"],
		"AppRating" : 4.5,
		"Downloads" : 10000000
	},
	"Buy Bitcoin Instantly" : 
	{
		"SecRating" : 4,
		"Permissions" : ["PhoneStatus", "PreciseLocation", "Network", "Pictures", "Storage"],
		"AppRating" : 4,
		"Downloads" : 50000
	},
	"Bitcoin Source" :
	{
		"SecRating" : 4,
		"Permissions" : ["PreciseLocation", "Network", "PhoneStatus", "Calendar", "MakeCalls", "Storage", "ModifyCalendar", "MockLocation"],
		"AppRating" : 5,
		"Downloads" : 500
	},
	"Bitcoin Wallet - Neutron Star" : 
	{
		"SecRating" : 3,
		"Permissions" : ["Network", "FindAccounts", "PreciseLocation", "ApproximateLocation" ,"PhoneStatus"],
		"AppRating" : 4,
		"Downloads" : 1000
	},
	"Xapo - Bitcoin Wallet & Vault" :
	{
		"SecRating" : 5,
		"Permissions" : ["RetrieveApps", "FindAccounts", "Pictures", "PreciseLocation", "PhoneStatus", "ReadContacts", "Network", "ApproximateLocation", "RecieveMessage", "ReadMessage", "OwnContact", "Storage"],
		"AppRating" : 3.5,
		"Downloads" : 1000000,
	},
	"Bitcoin Wallet" : 
	{
		"SecRating" : 5,
		"Permissions" : ["Network", "Pictures", "PreciseLocation", "ApproximateLocation", "Storage"],
		"AppRating" : 3,
		"Downloads" : 10000000
	},
	"Bitcoin Wallet - Bitcoin Wallet Developers" :
	{
		"SecRating" : 5,
		"Permissions" : ["NearField", "Network", "Pictures", "PairBluetooth", "Storage"],
		"AppRating" : 4,
		"Downloads" : 5000000
	}
};

permissions = 
{
	"Network" : "Can access the internet",
	"Pictures" : "Can use camera or flashlight on the phone",
	"ScreenLock" : "Allows applications to disable the keyguard if it is not secure",
	"PhoneStatus" : "Can read phone's current state information like in-phone call, phone signal, carrier, device ID, and phone number",
	"ApproximateLocation" : "Can use user's approximate location",
	"Storage" : "Can write to your phone's USB storage",
	"Wifi" : "Can connect to and disconnect from Wi-Fi access points",
	"Connectivity" : "Allows applications to change network connectivity state" ,
	"PreciseLocation" : "Can use user's precise location",
	"Calendar" : "Allows an application to read the user's calendar data",
	"FindAccounts" : "Can use user's account information stored on the phone",
	"UseAccounts" : "Allows the app to request authentication tokens",
	"DrawOver" : "Draw over other apps",
	"WifiMulticast" : "Allows applications to enter Wi-Fi Multicast mode",
	"AccessBluetooth" : "Allows applications to discover and pair bluetooth devices",
	"PairBluetooth" : "Can connect to user's Bluetooth devices",
	"RunningApps" : "Can retrieve information on currently and recently running apps on the device",
	"MockLocation" : "Create mock location sources for testing or install a new location provider. This allows the app to override the location and/or status returned by other location sources such as GPS or location providers",
	"ConnectWifi" : "Can connect to and disconnect from Wi-Fi access points", 
	"ChangeNetwork" : "Allows applications to change network connectivity state",
	"RetrieveApps" : "Can see what other apps are installed on the device",
	"CreateAccounts": "Can use user's account authentication information (like password) or create new accounts",
	"ReadContacts" : "Can read user's contact list (phone book) and phone call history",
	"SendMessage" : "Can send SMS messages",
	"CreateAccounts" : "Can use user's account authentication information (like password) or create new accounts",
	"OwnContact" : "Allows the app to read personal profile information stored on your device, such as your name and contact information. This means the app can identify you and may send your profile information to others",
	"MakeCalls" : "Can call phone numbers",
	"RecieveMessage" : "Can receive SMS messages",
	"ReadMessage" : "Can read SMS messages",
	"NearField" : "Allows applications to perform I/O operations over NFC",
	"ModifyCalendar" : "Allows an application to write the user's calendar data",
};

categoryNum = 0;
category_order = "0123".shuffle();
each_category_order = ["01234567".shuffle(),"01234567".shuffle(), "01234567".shuffle(), "01234567".shuffle()];


function appDetails(appName)
{
	document.getElementById("applist").style.display = "None";
	document.getElementById("appdesc").style.display = "Block";
	document.getElementById("BackToAppSet").style.display = "Block";	
	eraseChildren("accordion");
	if ( appName in installedApps )
	{
		document.getElementById("installarea").textContent = "UNINSTALL";
		document.getElementById("installarea").setAttribute( "onclick","uninstallApp('"+appName+"');" );
	}
	else 
	{
		document.getElementById("installarea").textContent = "INSTALL";
		document.getElementById("installarea").setAttribute( "onclick", "installApp('"+appName+"');" );
	}
	document.getElementById("appdescimage").setAttribute("src", "../../images/"+appName+".png");	
	document.getElementById("downloadtitle").innerHTML = appName;
	if (!isControl)
		document.getElementById("PrivacyImage").setAttribute("src", "../../images/privacy"+apps[appName]["SecRating"]+".png");
	document.getElementById("RatingImage").setAttribute("src", "../../images/rating"+apps[appName]["AppRating"]+".png");
	document.getElementById("DownloadImage").setAttribute("src", "../../images/"+apps[appName]["Downloads"]+".png");
	document.getElementById("downloaddescription").setAttribute("onclick", "togglePermissions('" + appName + "');") ;
}

function submitApps(el)
{
	url = el.parentElement.action;
	chosenApps = {'Flashlight' : {}, 'Crypto' : {}, 'Money' : {}, 'Weather' : {} };
	for ( key in installedApps ) 
	{
		chosenApps[ installedApps[key] ][ key ] = {};
		chosenApps[ installedApps[key] ][ key ]['SecRating'] = apps[key]['SecRating'];
		chosenApps[ installedApps[key] ][ key ]['AppRating'] = apps[key]['AppRating'];
		chosenApps[ installedApps[key] ][ key ]['Downloads'] = apps[key]['Downloads'];
	}

	data = {};
	data['chosenApps'] = JSON.stringify(chosenApps);
	data['ViewedPermissions'] = JSON.stringify(permissionsViewed);
	$.ajax({
	  type: "POST",
	  url: url,
	  data: JSON.stringify(data),
	  contentType: "application/x-www-form-urlencoded",
	  success: function (data) { 
	  	console.log(data);
		document.getElementById("readyToSubmit").style.display = "None";
		document.getElementById("redirectDiv").style.display = "Block";
		setTimeout(function() { window.location.href = "PostSurvey" }, 2000);
	  },
	});
	return false;
}

function showApps()
{
	document.getElementById("applist").style.display = "Block";
	document.getElementById("appdesc").style.display = "None";	
	document.getElementById("BackToAppSet").style.display = "None";	
}

function eraseChildren(elementId)
{
	while(document.getElementById(elementId).firstChild)
		document.getElementById(elementId).removeChild( document.getElementById(elementId).firstChild );
}

function togglePermissions(appName)
{
	if (document.getElementById("accordion").firstChild)
	{
		eraseChildren('accordion');
		return;
	}
	permissionsViewed[appName] = true;
	div = document.createElement("div");
	ul = document.createElement("ul");
	ul.style.listStyleType = "circle";
	ul.style.padding = "2px";
	ul.style.fontSize = "10px";
	for ( i = 0 ; i < apps[appName]["Permissions"].length; i++) 
	{
		li = document.createElement("li");
		li.innerHTML = "&#8226; " + permissions[ apps[appName]["Permissions"][i] ];
		ul.appendChild(li)
	}
	div.appendChild(ul);
	document.getElementById("accordion").appendChild(div);
}

function installApp(appName)
{
	if (categoryInstalls == 4 )
	{
		alert("Can't install more than 4 apps from a single category!");
		return;
	}
	installedApps[appName] =  categories[ parseInt(category_order[categoryNum]) ];
	document.getElementById("installarea").textContent = "UNINSTALL";
	document.getElementById("installarea").setAttribute( "onclick","uninstallApp('"+appName+"');" );
	categoryInstalls++;
	document.getElementById("installNum").textContent = categoryInstalls;
	if ( categoryInstalls == 4 ) 
		document.getElementById("nextButtonDiv").style.display = "Block";
}

function uninstallApp(appName)
{
	document.getElementById("nextButtonDiv").style.display = "None";
	delete installedApps[appName];
	document.getElementById("installarea").textContent = "INSTALL";
	document.getElementById("installarea").setAttribute( "onclick", "installApp('"+appName+"');" );
	categoryInstalls--;
	document.getElementById("installNum").textContent = categoryInstalls;
}

function appendApp(appName, num)
{
	appsElement = document.getElementById("apps");
	img1 = document.createElement("img");
	img1.setAttribute("class", "listedApp");
	img1.setAttribute("src", "../../images/"+appName+".png");
	img1.setAttribute("id", "img_"+appName);
	img1.style.top = num * 62;
	img1.setAttribute("onclick","appDetails('"+appName+"',"+isControl+");");
	appsElement.appendChild(img1);
	label = document.createElement("label");
	label.setAttribute("class", "appName");
	label.setAttribute("onclick","appDetails('"+appName+"',"+isControl+");");
	appsElement.appendChild(img1);
	label.textContent = appName;
	label.style.top = num * 62;
	appsElement.appendChild(label);
	if (!isControl)
	{
		img2 = document.createElement("img");
		img2.setAttribute("id", "securityRating"+num.toString() );
		img2.style.top = num * 62 + 23;
		img2.setAttribute("src", "../../images/" + "lock"+apps[appName]["SecRating"].toString()+".png" );
		img2.setAttribute("onclick","appDetails('"+appName+"',"+isControl+");");
		appsElement.appendChild(img2);
	}
	img3 = document.createElement("img");
	img3.setAttribute("id", "appRating"+num.toString() );
	img3.style.top = num * 62 + 23;
	img3.setAttribute("src", "../../images/" + "star"+apps[appName]["AppRating"].toString()+".png" );
	img3.setAttribute("onclick","appDetails('"+appName+"',"+isControl+");");
	appsElement.appendChild(img3);
	label2 = document.createElement("label");
	label2.setAttribute("class", "freeOrInstalled");
	label2.style.top = num * 62 + 25;
	label2.setAttribute("id", "label"+appName);
	label2.textContent = "Free";
	label2.setAttribute("onclick","appDetails('"+appName+"',"+isControl+");");
	appsElement.appendChild(label2);
}

function showSubmit()
{
	document.getElementById("simulator").style.display = "None";
	document.getElementById("appInstalledNum").style.display = "None";
	document.getElementById("readyToSubmit").style.display = "Block";
}

function loadLastCategory()
{
	categoryNum--;
	loadCategory();
}

function loadNextCategory()
{
	categoryNum++;
	loadCategory();
}

function setControl(control)
{
	isControl = control;
}

function loadCategory()
{
	if ( categoryNum == 4 )
	{
		showSubmit();
		return;
	}
	document.getElementById("applist").style.display = "Block";
	document.getElementById("appdesc").style.display = "None";	
	document.getElementById("BackToAppSet").style.display = "None";	
	eraseChildren('apps');
	document.getElementById('nextButton').display = 'None';
	category = categories[ parseInt(category_order[categoryNum]) ];
	numInstalled = 0;
	document.getElementById("catNum").textContent = categoryNum+1;
	document.getElementById("catName").textContent = category;
	for ( i = 0; i < 8; i++ )
	{
		appName = categoryApps[category][ each_category_order[ parseInt(category_order[categoryNum]) ][i] ];
		if (! (appName in permissionsViewed) )
			permissionsViewed[appName] = false;
		if (appName in installedApps) numInstalled++;
		appendApp( appName , i);
	}
	categoryInstalls = numInstalled;
	if ( numInstalled == 4 )
		document.getElementById('nextButtonDiv').style.display = 'Block';
	else
		document.getElementById('nextButtonDiv').style.display = 'None';
	if ( categoryNum > 0 )
		document.getElementById('lastButtonDiv').style.display = 'Block';
	else 
		document.getElementById('lastButtonDiv').style.display = 'None';
	document.getElementById("installNum").textContent = categoryInstalls;
	if ( categoryNum < 3 ) 
		document.getElementById("nextButton").textContent = "Continue to Next App Set";
	else 
		document.getElementById("nextButton").textContent = "Continue";
}
