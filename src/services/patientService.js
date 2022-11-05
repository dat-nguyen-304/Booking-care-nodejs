import bodyParser from 'body-parser';
import db from '../models/index';
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

let createConfirmLink = (token, doctorId) => {
    let link = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return link;
}

let createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            const [user, created] = await db.Booking.findOrCreate({
                where: {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    date: data.date
                },
                defaults: {
                    statusId: 'S1',
                    patientFullName: data.patientFullName,
                    phone: data.phone,
                    reason: data.reason,
                    timeType: data.timeType,
                    token
                }
            })
            if (created) {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.patientEmail,
                    patientName: data.patientFullName,
                    time: data.dateAndTime,
                    doctorName: data.doctorFullName,
                    redirectLink: createConfirmLink(token, data.doctorId),
                    language: data.language
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
            else resolve({
                errCode: 1,
                errMessage: 'Sorry, today, you booked!'
            })

        } catch (e) {
            reject(e);
        }
    })
}

let verifyBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Input valid parameter'
                })
            }
            let booking = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token
                },
                raw: false
            })
            if (!booking) {
                resolve({
                    errCode: 1,
                    errMessage: 'Input valid parameter'
                })
            } else {
                if (booking.statusId === 'S1') {
                    booking.statusId = 'S2';
                    booking.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Successfully confirmed'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'This link is expired'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createBooking,
    verifyBooking
}