require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Google 👻" <khongmottacdung@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "You pass Google interview ✔", // Subject line
        html: `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare.vn</p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng, vui lòng click đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div><a href="${dataSend.redirectLink}" target"_blank">Click here</a></div> 
            <div>Xin chân thành cảm ơn.</div>
        `, // html body
    });

    let getHtml = (language) => {

    }

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}