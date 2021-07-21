const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    }
});


module.exports.forgotmail = async (user) => {

    // create reusable transporter object using the default SMTP transport


    const htmlMessage = `<div>Dobrý den,<br>
    Z vašeho účtu <b>${user.username}</b> přišla žádost pro resetování hesla <br><br>
    
    Pro změnu hesla prosím klikněte na odkaz: <br><br>

    <a href="${process.env.BASE_URL}/users/forgot/${user.verifyCode}">${process.env.BASE_URL}/users/forgot/${user.verifyCode}</a> <br><br>
    Pokud o této akci nic nevíte, nechtě tento email být.
    
    Pěkný den
    
    Team No Stress Office
    </div>`


    let info = await transporter.sendMail({
        from: `"No Stress Office 🙊" <${process.env.SMTP_USER}>`, // sender address
        to: user.email, // list of receivers
        subject: "Reset hesla pro No stress Office ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}







