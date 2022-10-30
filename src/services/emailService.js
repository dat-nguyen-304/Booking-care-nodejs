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
        from: '"Booking care 👻" <khongmottacdung@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Booking care ✔", // Subject line
        html: getHtml(dataSend.language)
    });

    function getHtml (language) {
        if (language === 'en')
            return (
                `
                <h3>Hello ${dataSend.patientName}!</h3>
                <p>You received this email because you booked an online medical appointment on bookingcare.vn</p>
                <p>Hospital booking information: </p>
                <div><b>${dataSend.time}</b></div>
                <div><b>Doctor: ${dataSend.doctorName}</b></div>
                <p>If the above information is correct, please click the link below to confirm and complete the procedure to book an appointment</p>
                <div><a href="${dataSend.redirectLink}" target"_blank">Click here</a></div >
                <div>Best regards.</div>
                `
            )
        else
            return (
                `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare.vn</p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng, vui lòng click đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div><a href="${dataSend.redirectLink}" target"_blank">Click here</a></div >
            <div>Xin chân thành cảm ơn.</div>
            `
            )
    }
}

let sendInvoice = async ({ userEmail, patientFullName, invoiceImg }) => {
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
        to: userEmail, // list of receivers
        subject: "You pass Google interview ✔", // Subject line
        attachments: [
            {   // encoded string as an attachment
                filename: 'invoice.png',
                content: invoiceImg.split("base64,")[1],
                encoding: 'base64'
            }
        ],
        html: `
            <h3>Xin chào ${patientFullName}!</h3>
            <p>Booking care gửi bạn thông tin hóa đơn khám bệnh.</p>
            <div>Xin chân thành cảm ơn.</div>
        `, // html body
    });

    let getHtml = (language) => {

    }
}

module.exports = {
    sendSimpleEmail,
    sendInvoice
}