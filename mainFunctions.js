var isLoggedIn = false;
var gameStarted = false;

//Users- Passwords dictionary 
var users = {};

users["a"] = "a";
users["test2017"] = "test2017";

function ConnectUser() {
    var user = $("#loginUserName")[0].value;
    var password = $("#loginPassword")[0].value;
    
    if (users[user] == undefined)
        {
            alert ("User does not exist");
        }
    else if (users[user] != password)
        {
            alert("Wrong Password");
        }
    else        // user connected succesfully
    {
        alert("User " + user + " Connected!");
        $("#login_page").hide();
        isLoggedIn = true;
        userName = user;
        $("#menuLogout").show();
        $("#settings_page").show();

    }
}

$(document).ready(function () {
    $("#welcome_page").show();

    $( "#menuWelcome" ).click(ShowWelcome);
    $( "#menuLogin" ).click(ShowLogin);
    $( "#menuSignup" ).click(ShowSignUp);
    $( "#menuAbout" ).click(ShowAbout);
    $( "#about" ).click(CloseAbout);
    $( "#signupButton" ).click(ShowSignUp);
    $( "#loginButton" ).click(ShowLogin);
    $("#menuLogout").click(Logout);
    $( ".cancelbtn" ).click(ShowWelcome);
    $("#settingForNewGameForm").submit(StartFromSettings);

    // --------------------------- Show functions ---------------------------
    function ShowWelcome() {
        if(!gameStarted)
        {
            $(".content_component").hide();
            $("#welcome_page").show();      
        }
         else if(gameStarted == true)
        {
            alert("Please Logout"); 
        }
    }

    function ShowSignUp() {
        $(".content_component").hide();
            if (!gameStarted)
            {
                $("#signUp_page").show();
                document.getElementById("firstNameSignUp").focus();
            }
            else if(gameStarted == true)
            {
                alert("Please Logout for Sign up"); 
            }
    }

    function ShowLogin() {
         if (!gameStarted && !isLoggedIn) 
         {
            $(".content_component").hide();
            $("#login_page").show();
            document.getElementById("loginUserName").focus();

             
         }
         else if(gameStarted && isLoggedIn)
         {
            alert("You are allready connected. if you wish to login with another user, please log out and press Login again");    
         }    
        else // logged in but game didnt start yet
        {
            $(".content_component").hide();
            $("#settings_page").show();
        }
    }
    function ShowAbout() {
        document.getElementById("about").showModal();
    }

    function CloseAbout() {
        document.getElementById("about").close();
    }


    // ********************************* general functions *****************************
    function Logout() {
        music.currentTime=0;
        music.pause();
        $("#game_page").hide();
        $(".content_component").hide();
        isLoggedIn= false;
        gameStarted= false;
        RestartGame();
        $("#settings_page").hide();
        $("#welcome_page").show(); 
        $("#menuLogout").hide();
        userName = undefined; 
    }

    function StartFromSettings(){
            $("#game_page").show();
            $("#settings_page").hide();
            gameStarted= true;
            StartGame();
    }
    
});