//const { default: axios } = require("axios")

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.validated-form')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log('not ok')

          }else{
              //event.preventDefault()
              console.log('this was validated, sending')
              //sendForm()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


const sendForm = () => {
    const sendObj = {
         'username' : document.getElementById('username').value,
         'email' : document.getElementById('email').value,
         'password' : document.getElementById('password').value,
         'password2' : document.getElementById('password2').value,
         'firstname' : document.getElementById('firstname').value,
         'lastname' : document.getElementById('lastname').value,
    }
    console.log(sendObj)


}

