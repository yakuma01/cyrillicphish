<html lang="en">

<head>
    <title> Android Play Store </title>
    <link rel="icon" href="https://assets.iu.edu/favicon.ico">
    
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>

<body>
    <div class="col-12 container-fluid border-bottom pb-3 border-primary bg-dark pt-3 fixed-top">
        <h4 class="text-center" style="color:white">Survey Questions</h4>
    </div>

    <div class="col-12 container-fluid mt-5 pt-5">
	<form name="ParticipantResponse" method="post" action="<?=base_url('index.php/Home/Survey')?>">
            <hr class="mt-3 mb-3">
            <div class="mt-3">
                <label><strong>1. How familiar are you with Android devices?</strong></label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="AndroidFamiliarity" value="1" required>
                    <label class="form-check-label" >No familiarity</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="AndroidFamiliarity" value="2">
                    <label class="form-check-label" >My close friends use Android devices</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="AndroidFamiliarity" value="3">
                    <label class="form-check-label" >I have used Android devices in the past</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="AndroidFamiliarity" value="4">
                    <label class="form-check-label" >I currently use an Android device</label>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="mt-3">
		<label><strong>2. How familiar are you with cryptocurrencies?</strong></label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="1" required>
                    <label class="form-check-label" >No familiarity</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="2">
                    <label class="form-check-label" >I have heard about them in news/social media</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="3">
                    <label class="form-check-label" >My friends own cryptocurrencies</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="4">
                    <label class="form-check-label" >I understand how cryptocurrencies work but I don't own cryptocurrencies</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="5">
                    <label class="form-check-label" >I don't understand how cryptocurrencies work but I own cryptocurrencies</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="CryptocurrencyFamiliarity" value="6">
                    <label class="form-check-label" >I understand how cryptocurrencies work and I own cryptocurrencies</label>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="mt-3">
                <label><strong>3. How old are you?</strong></label>
                <div class="form-check">
                    <input class="form-control col-1" type="text" maxlength="3" name="age" id="age" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="mt-3">
                <label><strong>4. What is your gender?</strong></label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender1" value="Female" required>
                    <label class="form-check-label " for="gender1">Female</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender2" value="Male">
                    <label class="form-check-label" for="gender2">Male</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender3" value="NonBinary">
                    <label class="form-check-label " for="gender3">Non-Binary</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender4" value="Other">
                    <label class="form-check-label" for="gender4">Other</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender5" value="NotDisclose">
                    <label class="form-check-label" for="gender5">I prefer not to disclose</label>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="mt-3">
                <label><strong>5. What is the highest degree you have earned?</strong></label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree1" value="NoHighSchool" required >
                    <label class="form-check-label " for="degree1">No high school degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree2" value="HighSchool">
                    <label class="form-check-label" for="degree2">High school degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree3" value="Bachelor">
                    <label class="form-check-label" for="degree3">Bachelor's degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree4" value="Master">
                    <label class="form-check-label" for="degree4">Master's degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree5" value="Doctorate">
                    <label class="form-check-label" for="degree5">Doctorate</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree6" value="Professional">
                    <label class="form-check-label " for="degree6">Professional degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree7" value="Associates">
                    <label class="form-check-label" for="degree7">Associates Degree</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="degree" id="degree8" value="Medical">
                    <label class="form-check-label" for="degree8">Doctor of Medicine</label>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="mt-3">
                <label><strong>6. What is your income range?</strong></label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income1" value="LessThan15" required>
                    <label class="form-check-label " for="income1">Less than $15,000/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income2" value="15-24">
                    <label class="form-check-label" for="income2">15,000/year-24,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income3" value="25-34">
                    <label class="form-check-label" for="income3">25,000/year-34,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income4" value="35-49">
                    <label class="form-check-label " for="income4">35,000/year-49,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income5" value="50-74">
                    <label class="form-check-label" for="income5">50,000/year-74,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income6" value="75-99">
                    <label class="form-check-label" for="income6">75,000/year-99,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income7" value="100-149">
                    <label class="form-check-label" for="income7">100,000/year-149,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income8" value="150-200">
                    <label class="form-check-label" for="income8">150,000/year-199,999/year</label>
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="income" id="income9" value="200AndAbove">
                    <label class="form-check-label" for="income9">200,000/year and above</label>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="row ml-1 mr-1 row mt-3 mb-3">
		<input id="submit" class="col btn btn-primary" type="submit" value="Submit">
            </div>
        </form>
    </div>


    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>

</html>
