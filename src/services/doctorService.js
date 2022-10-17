import db from '../models/index';
import _ from 'lodash';

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            })
            if (users && users.length > 0)
                users = users.map(user => {
                    return {
                        ...user,
                        image: user.image ? Buffer.from(user.image, 'base64').toString('binary') : null
                    }
                })
            resolve({
                errCode: 0,
                topDoctors: users
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                allDoctors: users,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createMarkDown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.MarkDown.create({
                contentHTML: data.contentHTML,
                contentMarkDown: data.contentMarkDown,
                description: data.description,
                doctorId: data.doctorId,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let updateMarkDown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let markdown = await db.MarkDown.findOne({
                where: { doctorId: data.doctorId },
                raw: false,
            })
            markdown.contentHTML = data.contentHTML;
            markdown.contentMarkDown = data.contentMarkDown;
            markdown.description = data.description;

            markdown.save();
            resolve({
                errCode: 0,
                errMessage: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorInfo = await db.User.findOne({
                where: {
                    id: doctorId
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.MarkDown,
                        attributes: ['description', 'contentHTML', 'contentMarkDown']
                    },
                    {
                        model: db.Allcode, as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                ],

                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                doctorInfo: {
                    ...doctorInfo,
                    image: doctorInfo.image ? Buffer.from(doctorInfo.image, 'base64').toString('binary') : null
                }
            })

        } catch (e) {
            reject(e);
        }
    })
}

let createBulkSchedules = (schedules) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('schedules: ', schedules);
            let existing = await db.Schedule.findAll({
                where: {
                    doctorId: schedules[0].doctorId,
                    date: schedules[0].date
                },
                raw: true
            })
            console.log('--- schedules: ', schedules);
            if (existing && existing.length > 0) {
                existing = existing.map(element => {
                    return {
                        ...element,
                        date: new Date(element.date).getTime()
                    }
                })
                console.log('----after existing: ', existing);

                schedules = _.differenceWith(schedules, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                })
                console.log('----after schedules: ', schedules);
            }
            console.log('----outer schedules: ', schedules);

            await db.Schedule.bulkCreate(schedules);
            resolve({
                errCode: 0,
                errMessage: 'OK',
            })
        } catch (e) {
            reject({
                errCode: 1,
                errMessage: 'error from server'
            });
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctors, createMarkDown, updateMarkDown, getDetailDoctorById, createBulkSchedules
}