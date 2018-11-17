var questions = [
    {question:"What's your first name?"},
    {question:"What's your last name?"},
    {question:"Class preference?"},
    {question:"Subject preference?"},
    {question:"Preferred days?"},
    {question:"What's your email?", type: "text", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Create your username", type: "text"},
    {question:"Create your password", type: "password"},
    {question:"Re-enter password", type: "password"}
    ]
    
    var onComplete = function() {
    
        fetch('/volunteer_registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: questions[0].answer+' '+questions[1].answer,
                class: questions[2].answer,
                subject: questions[3].answer,
                days: questions[4].answer,
                email: questions[5].answer,
                username: questions[6].answer,
                password: questions[8].answer
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if(!res.success){
                swal('Registration failed!', res.errorMsg, 'error');
                setTimeout(() => {
                    window.location.href = '/volunteer_registration';
                }, 4000);
            } else {
                var h1 = document.createElement('h1')
                h1.style.fontSize = "4em";
                h1.appendChild(document.createTextNode('Thank you ' + questions[0].answer + ' for joining us!'))
            
                setTimeout(function() {
                register.parentElement.appendChild(h1)
                setTimeout(function() { h1.style.opacity = 1 }, 50)
                }, 1000)
                setTimeout(() => window.location.href = '/volunteer', 4000);
            }
        })
        .catch((err) => console.log(err));
    }
    
    ;(function(questions, onComplete) {
    
        var tTime = 100
        var wTime = 200
        var eTime = 1000 
    
        if (questions.length == 0) return
    
        var position = 0
    
        putQuestion()
    
        first_password = "hi"
        first_password_position = 7
        second_password_position = 8
    
        forwardButton.addEventListener('click', validate)
        inputField.addEventListener('keyup', function(e) {
            transform(0, 0)
            if (e.keyCode == 13) validate()
        })
    
        previousButton.addEventListener('click', function(e) {
            if (position === 0) return
            position -= 1
            hideCurrent(putQuestion)
        })
    
        function putQuestion() {
            prompt_div = document.getElementById("prompt");
            prompt_div.style.display = "none";
    
            inputField.removeAttribute("list");
    
            inputLabel.innerHTML = questions[position].question
            inputField.type = questions[position].type || 'text'
            
            if(position==2) {
                inputField.setAttribute("list", "grades");
                
                prompt_div.style.display = "flex";
                prompt_div.innerHTML = "Please select the grades you would like to teach from the dropdown list. The management will allot you an appropriate slot."
    
            }
            else if(position==3) {
                inputField.setAttribute("list", "subjects");
    
                prompt_div.style.display = "flex";
                prompt_div.innerHTML = "Please select your preference for the subject you would like to teach from the dropdown list.";
            }
            else if(position==4) {
                inputField.setAttribute("list", "slots");
    
                prompt_div.style.display = "flex";
                prompt_div.innerHTML = "Please select your preferred days to teach."
            }
            inputField.value = questions[position].answer || ''
            inputField.focus()
    
            progress.style.width = position * 100 / questions.length + '%'
    
            previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'
    
            showCurrent()
    
        }
        
        function validate() {
    
            var validateCore = function() {
            //console.log("1");      
            if(position == first_password_position) {
                console.log("3 entered");
                first_password = inputField.value
            }
            if(position == second_password_position) {
                        console.log("4 entered");
                        console.log(inputField.value,first_password, first_password.length);
                        if(!(inputField.value == first_password)) {
                            console.log("2 check: ", inputField.value, first_password)
                            console.log("Checking");
                            //confirm("Passwords don't match!");
                            return null;
                        }
                    }
            return inputField.value.match(questions[position].pattern || /.+/)
            }
    
            if (!questions[position].validate) questions[position].validate = validateCore
    
            // check if the pattern matches
            if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
            else ok(function() {
    
                // execute the custom end function or the default value set
                if (questions[position].done) 
                    questions[position].done()
                else {
                    //console.log("Position:",position);
                    questions[position].answer = inputField.value
                    // if(position == 3) {
                    //     console.log("3 entered");
                    //     first_password = questions[position].answer
                    // }
                    // if(position == 4) {
                    //     console.log("4 entered");
                    //     console.log(questions[position].answer," ",first_password);
                    //     if(!(questions[position].answer == first_password)) {
                    //         console.log("Checking");
                    //         alert("Passwords don't match! Database Entry not created!");
                    //     }
                    // }
                }
                ++position
    
                // if there is a new question, hide current and load next
                if (questions[position]) hideCurrent(putQuestion)
                else hideCurrent(function() {
                    // remove the box if there is no next question
                    register.className = 'close'
                    progress.style.width = '100%'
    
                    onComplete()
                
                })
    
            })
    
        }
        
        function hideCurrent(callback) {
            inputContainer.style.opacity = 0
            inputLabel.style.marginLeft = 0
            inputProgress.style.width = 0
            inputProgress.style.transition = 'none'
            inputContainer.style.border = null
            setTimeout(callback, wTime)
        }
    
        function showCurrent(callback) {
            inputContainer.style.opacity = 1
            inputProgress.style.transition = ''
            inputProgress.style.width = '100%'
            setTimeout(callback, wTime)
        }
    
        function transform(x, y) {
            register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
        }
    
        function ok(callback) {
            register.className = ''
            setTimeout(transform, tTime * 0, 0, 10)
            setTimeout(transform, tTime * 1, 0, 0)
            setTimeout(callback, tTime * 2)
        }
    
        /* WRONG SHAKE */
        function wrong(callback) {
            if(position==second_password_position) {
                var warn = document.createElement('div')
                warn.innerHTML= "Passwords don't match!";
                var warn = document.createElement('div')
            warn.innerHTML= "Passwords don't match!";
            warn.style.height = "20vh";
            warn.style.width = "40vw";
            warn.style.backgroundColor= "black";
            warn.style.opacity= "1";
            warn.style.position= "absolute";
            warn.style.top= "70vh";
            warn.style.borderRadius= "13px";
            warn.style.textAlign= "center";
            warn.style.color= "red";   
            warn.style.display= "none";
            warn.style.justifyContent = "center";
            warn.style.alignContent="center";
            warn.style.flexDirection="column";
            warn.style.fontSize= "1.2em";

            center_div = document.getElementsByClassName('center')[0];
            center_div.appendChild(warn);
                setTimeout(function() { warn.style.opacity = 0 }, 2500);
            }
            register.className = 'wrong'
            for (var i = 0; i < 6; i++)
                setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
            setTimeout(transform, tTime * 6, 0, 0)
            setTimeout(callback, tTime * 7)
    
        }
    
    }(questions, onComplete))







// var questions = [
// {question:"What's your first name?"},
// {question:"What's your last name?"},
// {question:"Class preference?"},
// {question:"Subject preference?"},
// {question:"Preferred days?"},
// {question:"What's your email?", type: "text", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
// {question:"Create your username", type: "text"},
// {question:"Create your password", type: "password"},
// {question:"Re-enter password", type: "password"}
// ]

// var onComplete = function() {

//     fetch('/volunteer_registration', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//             name: questions[0].answer+' '+questions[1].answer,
//             class: questions[2].answer,
//             subject: questions[3].answer,
//             days: questions[4].answer,
//             email: questions[5].answer,
//             username: questions[6].answer,
//             password: questions[8].answer
//         })
//     })
//     .then((response) => response.json())
//     .then((res) => {
//         if(!res.success){
//             swal('Registration failed!', res.errorMsg, 'error');
//             setTimeout(() => {
//                 window.location.href = '/volunteer_registration';
//             }, 4000);
//         } else {
//             var h1 = document.createElement('h1')
//             h1.style.fontSize = "4em";
//             h1.appendChild(document.createTextNode('Thank you ' + questions[0].answer + ' for joining us!'))
        
//             setTimeout(function() {
//             register.parentElement.appendChild(h1)
//             setTimeout(function() { h1.style.opacity = 1 }, 50)
//             }, 1000)
//             setTimeout(() => window.location.href = '/volunteer', 4000);
//         }
//     })
//     .catch((err) => console.log(err));
// }

// ;(function(questions, onComplete) {

//     var tTime = 100
//     var wTime = 200
//     var eTime = 1000 

//     if (questions.length == 0) return

//     var position = 0

//     putQuestion()

//     first_password = "hi"
//     first_password_position = 7
//     second_password_position = 8

//     forwardButton.addEventListener('click', validate)
//     inputField.addEventListener('keyup', function(e) {
//         transform(0, 0)
//         if (e.keyCode == 13) validate()
//     })

//     previousButton.addEventListener('click', function(e) {
//         if (position === 0) return
//         position -= 1
//         hideCurrent(putQuestion)
//     })

//     function putQuestion() {
//         prompt_div = document.getElementById("prompt");
//         prompt_div.style.display = "none";

//         inputField.removeAttribute("list");

//         inputLabel.innerHTML = questions[position].question
//         inputField.type = questions[position].type || 'text'
        
//         if(position==2) {
//             inputField.setAttribute("list", "grades");
            
//             prompt_div.style.display = "flex";
//             prompt_div.innerHTML = "Please select the grades you would like to teach from the dropdown list."

//         }
//         else if(position==3) {
//             inputField.setAttribute("list", "subjects");

//             prompt_div.style.display = "flex";
//             prompt_div.innerHTML = "Please select your preference for the subject you would like to teach from the dropdown list.";
//         }
//         else if(position==4) {
//             inputField.setAttribute("list", "slots");

//             prompt_div.style.display = "flex";
//             prompt_div.innerHTML = "Please select your preferred days to teach."
//         }
//         inputField.value = questions[position].answer || ''
//         inputField.focus()

//         progress.style.width = position * 100 / questions.length + '%'

//         previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'

//         showCurrent()

//     }
    
//     function validate() {

//         var validateCore = function() {
//         //console.log("1");      
//         if(position == first_password_position) {
//             console.log("3 entered");
//             first_password = inputField.value
//         }
//         if(position == second_password_position) {
//                     console.log("4 entered");
//                     console.log(inputField.value,first_password, first_password.length);
//                     if(!(inputField.value == first_password)) {
//                         console.log("2 check: ", inputField.value, first_password)
//                         console.log("Checking");
//                         //confirm("Passwords don't match!");
//                         return null;
//                     }
//                 }
//         return inputField.value.match(questions[position].pattern || /.+/)
//         }

//         if (!questions[position].validate) questions[position].validate = validateCore

//         // check if the pattern matches
//         if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
//         else ok(function() {

//             // execute the custom end function or the default value set
//             if (questions[position].done) 
//                 questions[position].done()
//             else {
//                 //console.log("Position:",position);
//                 questions[position].answer = inputField.value
//                 // if(position == 3) {
//                 //     console.log("3 entered");
//                 //     first_password = questions[position].answer
//                 // }
//                 // if(position == 4) {
//                 //     console.log("4 entered");
//                 //     console.log(questions[position].answer," ",first_password);
//                 //     if(!(questions[position].answer == first_password)) {
//                 //         console.log("Checking");
//                 //         alert("Passwords don't match! Database Entry not created!");
//                 //     }
//                 // }
//             }
//             ++position

//             // if there is a new question, hide current and load next
//             if (questions[position]) hideCurrent(putQuestion)
//             else hideCurrent(function() {
//                 // remove the box if there is no next question
//                     .className = 'close'
//                 progress.style.width = '100%'

//                 onComplete()
            
//             })

//         })

//     }
    
//     function hideCurrent(callback) {
//         inputContainer.style.opacity = 0
//         inputLabel.style.marginLeft = 0
//         inputProgress.style.width = 0
//         inputProgress.style.transition = 'none'
//         inputContainer.style.border = null
//         setTimeout(callback, wTime)
//     }

//     function showCurrent(callback) {
//         inputContainer.style.opacity = 1
//         inputProgress.style.transition = ''
//         inputProgress.style.width = '100%'
//         setTimeout(callback, wTime)
//     }

//     function transform(x, y) {
//         register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
//     }

//     function ok(callback) {
//         register.className = ''
//         setTimeout(transform, tTime * 0, 0, 10)
//         setTimeout(transform, tTime * 1, 0, 0)
//         setTimeout(callback, tTime * 2)
//     }

//     /* WRONG SHAKE */
//     function wrong(callback) {
//         if(position==second_password_position) {
//             var warn = document.createElement('div')
//             warn.innerHTML= "Passwords don't match!";
//             warn.style.height = "20vh";
//             warn.style.width = "40vw";
//             warn.style.backgroundColor= "black";
//             warn.style.opacity= "0.7";
//             warn.style.position= "absolute";
//             warn.style.top= "70vh";
//             warn.style.borderRadius= "13px";
//             warn.style.textAlign= "center";
//             warn.style.color= "red";   
//             warn.style.display= "none";
//             warn.style.justifyContent = "center";
//             warn.style.alignContent="center";
//             warn.style.flexDirection="column";
//             warn.style.fontSize= "1.2em";

//             center_div = document.getElementsByClassName('center')[0];
//             center_div.appendChild(warn);
//             setTimeout(function() { warn.style.opacity = 0 }, 2500);
//         }
//         register.className = 'wrong'
//         for (var i = 0; i < 6; i++)
//             setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
//         setTimeout(transform, tTime * 6, 0, 0)
//         setTimeout(callback, tTime * 7)

//     }

// }(questions, onComplete))