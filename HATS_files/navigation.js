/*
Responsive navigation written by Martin Blackburn.
www.martinblackburn.co.uk

Feel free to use this for your own projects, just be nice and link back here, or my site :)
*/
var DEBUG = false;
var gval = true;
ResponsiveNav = function(nav, breakPoint) 
{   
    //if no nav container, output an error
    if(typeof nav === "undefined")
    {  
        DEBUG && console.log("The nav container needs setting.");
        return false;
    }else{
        DEBUG && console.log("OK");
    }
    
    //elements
    var navControl = nav.find(".navControl").first();
    //var mainUL = nav.find("ul")[1];
    var mainUL = $('.sub1');
    var parentUL = $('.menu_active');
    var mainLIs = mainUL.children();
    DEBUG && console.log("mainUL list items: " + mainLIs.find("a").text());
    var extraLI = $("<li class='extraDropdown'><a href='"+ topvar +"/projects/index.php' class='more'>More <span>&#9662;</span></a>");
    var extraDropdown = $("<ul class='dropdown' style='z-index:999;'></ul>");    
    extraLI.append(extraDropdown);
    
    //variables
    breakPoint = (typeof breakPoint != "number") ? 500 : breakPoint;
    DEBUG && console.log("breakPoint: " + breakPoint);
    var siteWidth = $(document).width();
    DEBUG && console.log("siteWidth: " + siteWidth);
    var lastSiteWidth = null;
    var navWidth = mainUL.width();
    DEBUG && console.log("NavWidth: " + navWidth);
    var usingExtraDropdown = false;
	
    //listener for screen width
    $(window).resize(function() {
      siteWidth = $(document).width();
      navWidth = mainUL.width();
      if(gval){
        checkNavType();
      }
      lastSiteWidth = siteWidth;
    });
	
	  //toggle nav when nav control is clicked
	  navControl.on('click', function(event) {
	    event.preventDefault();
        toggleNav();
    });
	
	  //check if to use mobile nav or not
    if(gval){
      checkNavType();
    }
    if($("li").hasClass("menu_active")){
      if(!$("li").hasClass("p2")){
        $(".sub1").hide();
      }
    }else{
      $(".p1").mouseleave(function (e) {
          resetExtraDropdown();
      });
    }
    //added a extra dropdown if not already there
    function addExtraDropdown()
    {
        DEBUG && console.log("addExtraDropdown");
        if (!usingExtraDropdown) {
            usingExtraDropdown = true;
            mainUL.append(extraLI);
        }
        if (!$("li").hasClass("extraDropdown")) {
            mainUL.append(extraLI);
        }
    }
    
    //make sure the LIs fit into the nav
    function checkLIsFit()
    {
        var widthLIs = 0;
        
        mainLIs = mainUL.children().find("a");
        DEBUG && console.log("checkLIsFit: " + mainLIs.text());
        
        mainLIs.each(function() {
            widthLIs += $(this).outerWidth(true);
            DEBUG && console.log("(widthLIs, navWidth): " + widthLIs + ", " + navWidth);
        });
        
        //need a dropdown
        if(widthLIs > navWidth) {
            addExtraDropdown();
            moveLI();
        }
    }
    
    //move LIs to the extra dropdown from main nav
    function moveLI()
    {
        mainLIs = mainUL.children().not(".extraDropdown");
        
        extraDropdown.prepend(mainLIs.last());
        
        checkLIsFit();
    }
    
    //move all LIs from extra dropdown back to the nav
    function resetExtraDropdown()
    {
        usingExtraDropdown = false;
        
        var LIsToMove = extraDropdown.children();
        
        mainUL.find(".extraDropdown").remove();
        
        mainUL.append(LIsToMove);
    }
	
    //check if to use mobile nav or not
    function checkNavType()
    {
        if(siteWidth != lastSiteWidth)
        {
        	if(siteWidth >= breakPoint)
        	{
        	    navControl.hide();
        	    mainUL.show();
              DEBUG && console.log(mainUL);
              DEBUG && console.log("SHOW");
        	}
        	else {
        	    navControl.show();
        	    mainUL.hide();
              DEBUG && console.log("HIDE");
        	}
        	DEBUG && console.log("Different");
        	resetExtraDropdown();
        	checkLIsFit();
        }
    }
	
	  //open or close nav
    function toggleNav()
    {   
        mainUL.slideToggle();
    }
};

swapMenu = function(){
    var mainUL = $(".sub1");
    var dropdownUL = $(".dropdown");
    var a = mainUL.find("li")[6];
    var a1 = mainUL.find("li")[6];
    var b = dropdownUL.find("li.selected")[0]; 
    DEBUG && console.log(a);
    if(b){
      DEBUG && console.log(b);
      var index = dropdownUL.find("li").index(b);
      var size  = dropdownUL.find("li").length;
      DEBUG && console.log(dropdownUL.find("li.selected").find("a").text());
      var str = (b.innerText || b.textContent);
      if(str.length > 10){
          dropdownUL.find("li.selected").find("a").text(str.substring(0,10) + "...");
      }
      var p = a.parentNode;
      a.replaceWith(b);
      var c = dropdownUL.find("li")[index];
      DEBUG && console.log("Index: " + index + ", c: " + c + ", size: " + size);
      DEBUG && console.log(a1);
      if(size == (index + 1)){
          c = dropdownUL.find("li")[index - 1];
          c.after(a1);
      }else{
          c.before(a1);
      }
    }

};

addDropdown = function(){
    $(".secret").css("z-index", "999");
    if($("li").hasClass("menu_active")){
        if($("li").hasClass("p1")){
            $(".p1").hover(function(){
                $(".sub2").hide();
                $(".sub1").show();
                DEBUG && console.log("p2 menu_active and p1 hoverd");
            });
            $(".p1").mouseleave(function (e) {
                DEBUG && console.log(e.target);
                DEBUG && console.log("Dropdown?");
                $(".sub1").hide();
                $(".sub2").show();
            });
            DEBUG && console.log("True");
        }
        $(".sub1").each(function()
        {
            new ResponsiveNav($(this), 600);
        });

    }else{
        var extraDropdown;
        $(".p1").hover(function(){
            $(".sub2").hide();
            $(".sub1").show();
            DEBUG && console.log("Top is not selected and p1 hoverd");
            $(".sub1").each(function()
            {
                new ResponsiveNav($(this), 600);
            });
            //extraDropdown = $('.extraDropdown');
            //$(".extraDropdown").show();
            //var LIsToMove = extraDropdown.children();
            //DEBUG && console.log("LIsToMove: " + LIsToMove.find("a").text());
        });
        $(".p1").mouseleave(function (e) {
            DEBUG && console.log(e.target);
            $(".sub1").hide();
            $(".sub2").hide();
        });
        $(".p2").hover(function(){
            $(".sub1").hide();
            $(".sub2").show();
            DEBUG && console.log("p2 hoverd");
        });
        $(".p2").mouseleave(function (e) {
            DEBUG && console.log(e.target);
            $(".sub1").hide();
            $(".sub2").hide();
        });
        //$(".dropdown").hover(function(){
            //$(".dropdown").show();
        //    DEBUG && console.log("extraDropdown hoverd");
        //    alert("extraDropdown");
        //});
    }
    $(".secret").css("z-index", "-999");
};

selectTab = function(categ){
window.location.href = "?category=" + categ;
};
