<!DOCTYPE html>
<html>
<head>
  <title>Android Play Store Experiment</title>
</head>
<body>
  <h2 id="q_batch_title">Expertise Questions</h2>
  <form method="post" action="<?=base_url('index.php/Home/Finish');?>">
  <div id="sis" style="display: none;"></div><!-- <DIV id="question" class="ease">&nbsp;</DIV> -->
  <div id="allquestions" class="ease">
    <div id="question0" class="ease" style="">
      <h3>[1 of 13] What is phishing?</h3>
      <input type="checkbox" name="phishing[]" value="0">Pretending to be someone or a company to steal users’ information<br/>
      <input type="checkbox" name="phishing[]" value="1">Making a fake website that looks legitimate to steal user information<br/>
      <input type="checkbox" name="phishing[]" value="2">Sending spam emails, Defrauding someone online<br/>
      <input type="checkbox" name="phishing[]" value="3">Other methods for stealing information<br/>
      <input type="checkbox" name="phishing[]" value="4">Hacking someone’s computer<br/>
      <input type="checkbox" name="phishing[]" value="5">Tracking your internet habits to send advertisements<br/>
      <input type="checkbox" name="phishing[]" value="6">I Do not Know<br/>
    </div>
    <div id="question1" class="ease" style="">
      <h3>[2 of 13] What is the purpose of an X.509 certificate for websites?</h3>
      <input type="checkbox" name="certificate" value="0">The certificate provides encryption<br/>
      <input type="checkbox" name="certificate" value="1">The certificate protects information<br/>
      <input type="checkbox" name="certificate" value="2">The certificate shows the website is registered and valid<br/>
      <input type="checkbox" name="certificate" value="3">The certificate actively is secure and safe against malicious stuff, including hackers<br/>
      <input type="checkbox" name="certificate" value="4">The website is trustworthy and has proper privacy protection and is accountable for information use<br/>
      <input type="checkbox" name="certificate" value="5">I Do not Know<br/>
    </div>
    <div id="question2" class="ease" style="">
      <h3>[3 of 13] SQL injection is a technique to:</h3>
      <input type="radio" name="SQLi" value="0" required> Inject a malicious virus to the database SQL engine<br/>
      <input type="radio" name="SQLi" value="1"> Inject a security patch to the database SQL engine in response to the discovery of new threats<br/>
      <input type="radio" name="SQLi" value="2"> Inject a statement that checks the database integrity through a website<br/>
      <input type="radio" name="SQLi" value="3"> Inject root user privileges to a regular user without using the graphical user interface (GUI) of the database<br/>
      <input type="radio" name="SQLi" value="4"> Inject a malicious statement to the database through a website<br/>
      <input type="radio" name="SQLi" value="5"> I Do not Know<br/>
    </div>
    <div id="question3" class="ease" style="">
      <h3>[4 of 13] The difference between a passive and reactive Intrusion Detection System is?</h3>
      <input type="radio" name="IDS" value="0" required> Passive IDS is software based and reactive is hardware based<br/>
      <input type="radio" name="IDS" value="1"> Passive IDS provides only alerts and reactive IDS can retaliate by sending malicious code to the attacker<br/>
      <input type="radio" name="IDS" value="2"> There are no real differences, they are just brand names<br/>
      <input type="radio" name="IDS" value="3"> Passive IDS is included in a Firewall while reactive IDS is a standalone network component<br/>
      <input type="radio" name="IDS" value="4"> Reactive IDS can reprogram the Firewall and passive IDS does not<br/>
      <input type="radio" name="IDS" value="5"> I Do not Know<br/>
    </div>
    <div id="question4" class="ease" style="">
      <h3>[5 of 13] Without any other changes in the default settings of a web server, what can be the motivation to close port 80?</h3>
      <input type="radio" name="port80" value="0" required> Block incoming XMLhttp Request<br/>
      <input type="radio" name="port80" value="1"> Block File Transfer Protocol daemon<br/>
      <input type="radio" name="port80" value="2"> Block Hypertext Transfer Protocol daemon<br/>
      <input type="radio" name="port80" value="3"> Block incoming and outgoing requests from SMB/CIFS clients<br/>
      <input type="radio" name="port80" value="4"> Block Hypertext Transfer Protocol Secure daemon<br/>
      <input type="radio" name="port80" value="5"> I Do not Know<br/>
    </div>
    <div id="question5" class="ease" style="">
      <h3>[6 of 13] How many computer programming languages do you know (Not including HTML)?</h3>
      <input type="radio" name="PL" value="0" required> 10+<br/>
      <input type="radio" name="PL" value="1"> 5-10<br/>
      <input type="radio" name="PL" value="2"> 1-5<br/>
      <input type="radio" name="PL" value="3"> 1<br/>
      <input type="radio" name="PL" value="4"> None<br/>
    </div>
    <div id="question6" class="ease" style="">
      <h3>[7 of 13] How many years of working experience do you have in network operation and security area?</h3>
      <input type="radio" name="security" value="0" required> 10+ years<br/>
      <input type="radio" name="security" value="1"> 5-10 years<br/>
      <input type="radio" name="security" value="2"> 1-5 years<br/>
      <input type="radio" name="security" value="3"> A few months (less than a year)<br/>
      <input type="radio" name="security" value="4"> None<br/>
    </div>
    <div id="question7" class="ease" style="">
      <h3>[8 of 13] On average, how many times do you have to deal with computer security related problems?</h3>
      <input type="radio" name="problems" value="0" required> Many times every day<br/>
      <input type="radio" name="problems" value="1"> Once every day<br/>
      <input type="radio" name="problems" value="2"> Once every week<br/>
      <input type="radio" name="problems" value="3"> Once every month<br/>
      <input type="radio" name="problems" value="4"> Once every year or less<br/>
    </div>
    <div id="question8" class="ease" style="">
      <h3>[9 of 13] What information and network security tools do you use regularly? (Please mark all those that apply)</h3>
      <input type="checkbox" name="SecurityTools[]" value="0">Firewall<br/>
      <input type="checkbox" name="SecurityTools[]" value="1">Anti-virus<br/>
      <input type="checkbox" name="SecurityTools[]" value="2">Intrusion Detection System (IDS)<br/>
      <input type="checkbox" name="SecurityTools[]" value="3">Secure Shell (SSH)<br/>
      <input type="checkbox" name="SecurityTools[]" value="4">Pretty Good Privacy (PGP)<br/>
      <input type="checkbox" name="SecurityTools[]" value="5">Access control (AC)<br/>
    </div>
    <div id="question9" class="ease" style="">
      <h3>[10 of 13] Have you ever ... (select all that apply, you can select none of the answers)</h3>
      <input type="checkbox" name="Tech[]" value="0">Designed a website<br/>
      <input type="checkbox" name="Tech[]" value="1">Registered a domain name<br/>
      <input type="checkbox" name="Tech[]" value="2">Used SSH<br/>
      <input type="checkbox" name="Tech[]" value="3">Configured a firewall<br/>
      <input type="checkbox" name="Tech[]" value="4">Created a database<br/>
      <input type="checkbox" name="Tech[]" value="5">Installed a computer program<br/>
      <input type="checkbox" name="Tech[]" value="6">Written a computer program<br/>
    </div>
    <div id="question10" class="ease" style="">
      <h3>[11 of 13] Which of the following indicators do you use to decide if it is safe to enter your username and password on a particular website? (Please mark all those that apply)</h3>
      <input type="checkbox" name="safe[]" value="0">https<br/>
      <input type="checkbox" name="safe[]" value="1">lock icon on the page<br/>
      <input type="checkbox" name="safe[]" value="2">certificate<br/>
      <input type="checkbox" name="safe[]" value="3">website privacy statements<br/>
      <input type="checkbox" name="safe[]" value="4">type of website<br/>
      <input type="checkbox" name="safe[]" value="5">professional-looking website<br/>
      <input type="checkbox" name="safe[]" value="6">Other<br/>
    </div>
    <div id="question11" class="ease" style="">
      <h3>[12 of 13] What is the main definition of IoT?</h3>
       <input type="radio" name="IoT" value="0" required> The Internet of Things (IoT) describes the network of objects that are connected and exchange data with other devices and systems over the internet<br/>
      <input type="radio" name="IoT" value="1"> In Order Traversal (IoT) is a method of traversing network topology<br/>
      <input type="radio" name="IoT" value="2"> Index Organized Table (IoT) is a type of table in database<br/>
      <input type="radio" name="IoT" value="3"> Internet of Threats (IoT) is a peer to peer network that includes state-of-the-art malware and zero-day vulnerabilities<br/>
      <input type="radio" name="IoT" value="4"> I don't know<br/>
    </div>
    <div id="question12" class="ease" style="">
      <h3>[13 of 13] What is Access Control List?</h3>
      <input type="radio" name="ACL" value="0" required> list of permissions associated with an object<br/>
      <input type="radio" name="ACL" value="1"> list of binary switches that are used for accessing objects<br/>
      <input type="radio" name="ACL" value="2"> list of processes spawned by kernel for controlling user access<br/>
      <input type="radio" name="ACL" value="3"> I don't know<br/>
    </div>
  </div>
  <div id="navigation" class="ease">
    <hr>
    <input id="nextbutton" type="submit" value="Submit">
  </div>
  </form>
</body>
</html>
