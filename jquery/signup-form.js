    document.getElementById('datePicker').valueAsDate = new Date();

        $("#signUpForm").validate({
            
            rules: {
                fName: {
                    required: true,
                    nowhitespace: true,
                    lettersonly: true
                },
                lName: {
                    required: true,
                    nowhitespace: true,
                    lettersonly: true
                },
                uName: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                psw: {
                    required: true,
                    strongPassword : true

                }
            },
            messages: {
                email: {
                    required : 'Please enter an email adress. <br>',
                    email: 'Please enter a <em> valid </em> email adress. <br>'
                },
                fName: {
                    required: 'Please enter a first name. <br>',
                    nowhitespace: 'No white spaces please. <br>',
                    lettersonly: 'Use letters only. <br>'
                },
                lName: {
                    required: 'Please enter a last name. <br>',
                    nowhitespace: 'No white spaces please. <br>',
                    lettersonly: 'Use letters only. <br>'
                },
               uName: {
                    required: 'Please enter a user name. <br>'
                },
               psw: {
                    required: 'please enter a password. <br>',
                }
            }
            
        });

    $.validator.addMethod("strongPassword", function (value, element) {
    return this.optional(element) || value.length >= 8 && /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
    }, 'Your password must be at least 8 characters long and contain at least one number and one char\. <br>');

    /* $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element) 
          || value.length >= 8
          && /\d/.test(value)
          && /[a-z]/i.test(value);
      }, 'Your password must be at least 8 characters long and contain at least one number and one char\. <br>')*/

     $("#signUpForm").submit(function (event) {
        if ($("#signUpForm").valid())
        {
            var newUser = $("#uName")[0].value;
            var newPassword = $("#password")[0].value;
            users[newUser] = newPassword;
            alert("User: "+ newUser + " Signed up");
            $("#signUp_page").hide();
            $("#welcome_page").show();
        }
    });

