const { passwordStrength } = require('check-password-strength')
/**
 * this does the form validation, in case something is wrong 
 * (email exists, username exists, or passwords are not matching or weak) this returns it so the form can notify user
 */
 module.exports.validateRegistration = async (req, res, next) => {
     //passwords match
     console.log(req.body)
    const result = passwordMatch(req.body)
    if(result != true){
        res.send(result)
    }
    //strengt of password
    const passStrenght = passwordStrength(req.body.password)
    if(passStrenght.id > 1 ){
        next()
    }else{
        res.send(passStrenght)
    }  
    
   
    
   
}


const passwordMatch = (body) => {
    console.log(body)
    const pass1 = body.password
    const pass2 = body.password2

    if(pass1 == pass2 && pass1 != 1){
        return true
    }else{
        return 'hesla musí být stejná'
    }
}

