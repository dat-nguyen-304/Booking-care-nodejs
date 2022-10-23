import bodyParser from 'body-parser';
import db from '../models/index';

let createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

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
                }
            })
            if (created)
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            else resolve({
                errCode: 1,
                errMessage: 'Sorry, today, you booked!'
            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createBooking
}