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
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_Info,
                        attributes: [],
                        include: [
                            { model: db.Specialty, as: 'specialtyData', attributes: ['name'] }
                        ]
                    }
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
            await db.Markdowns.create({
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

let createDoctorInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Doctor_Info.create({
                doctorId: data.doctorId,
                priceId: data.priceId,
                provinceId: data.provinceId,
                paymentId: data.paymentId,
                nameClinic: data.nameClinic,
                addressClinic: data.addressClinic,
                note: data.note,
                specialtyId: data.specialtyId
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
            let markdown = await db.Markdowns.findOne({
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

let updateDoctorInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorInfo = await db.Doctor_Info.findOne({
                where: { doctorId: data.doctorId },
                raw: false,
            })

            doctorInfo.priceId = data.priceId;
            doctorInfo.provinceId = data.provinceId;
            doctorInfo.paymentId = data.paymentId;
            doctorInfo.nameClinic = data.nameClinic;
            doctorInfo.addressClinic = data.addressClinic;
            doctorInfo.note = data.note;
            doctorInfo.specialtyId = data.specialtyId;
            doctorInfo.save();
            resolve({
                errCode: 0,
                errMessage: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorInfo = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorInfo = await db.Doctor_Info.findOne({
                where: { doctorId: doctorId },
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                doctorInfo: doctorInfo
            })
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
                        model: db.Markdowns,
                        attributes: ['description', 'contentHTML', 'contentMarkDown']
                    },
                    {
                        model: db.Allcode, as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Doctor_Info,
                        attributes: {
                            exclude: ['id', 'doctorId']
                        },
                        include: [
                            { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.Specialty, as: 'specialtyData', attributes: ['name'] }
                        ]
                    }
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

let updateBulkSchedules = (schedules) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Schedule.destroy({
                where: {
                    doctorId: schedules[0].doctorId,
                    date: schedules[0].date
                },
                raw: true
            })

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


let getSchedules = async (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            date = new Date(date * 1);
            let allSchedules = await db.Schedule.findAll({
                where: { doctorId, date },
                attributes: ['timeType'],
                include: [
                    { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi'] },
                ],
            })
            resolve({
                errCode: 0,
                allSchedules
            })
        } catch (e) {
            reject({
                errCode: 1,
                errMessage: 'error from server'
            });
        }
    })
}

let createSpecialty = async (specialty) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialty.create({
                name: specialty.name,
                image: specialty.avatar,
                contentHTML: specialty.contentHTML,
                contentMarkDown: specialty.contentMarkDown,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            });

        } catch (e) {
            console.log('catch e: ', e);
            reject(e);
        }
    })
}

let updateSpecialty = async (specialty) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updateSpecialty = await db.Specialty.findOne({
                where: { id: specialty.id },
                raw: false
            })
            updateSpecialty.name = specialty.name;
            updateSpecialty.image = specialty.image;
            updateSpecialty.contentHTML = specialty.contentHTML;
            updateSpecialty.contentMarkDown = specialty.contentMarkDown;
            updateSpecialty.save();
            resolve({
                errCode: 0,
                errMessage: 'OK'
            });

        } catch (e) {
            console.log('catch e: ', e);
            reject(e);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allSpecialty = await db.Specialty.findAll({
                raw: true,
            });
            if (allSpecialty && allSpecialty.length > 0)
                allSpecialty = allSpecialty.map(specialty => {
                    return {
                        ...specialty,
                        image: specialty.image ? Buffer.from(specialty.image, 'base64').toString('binary') : null
                    }
                })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                allSpecialty,
            });

        } catch (e) {
            console.log('catch e: ', e);
            reject(e);
        }
    })
}

let getSpecialtyById = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = {};
            specialty = await db.Specialty.findOne({
                where: { id: specialtyId },
                attributes: ['contentHTML', 'image'],
                raw: true,
            })
            if (!_.isEmpty(specialty)) {
                specialty = {
                    ...specialty,
                    image: specialty.image ? Buffer.from(specialty.image, 'base64').toString('binary') : null,
                }
                resolve({
                    errCode: 0,
                    errMessage: "Get specialty success",
                    specialty
                });
            }
            else reject({
                errCode: 1,
                errMessage: "Not found specialty"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorsOfSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorIds = [];
            doctorIds = await db.Doctor_Info.findAll({
                where: { specialtyId },
                attributes: ['doctorId'],
                raw: true,
            })
            if (doctorIds && doctorIds.length > 0) {
                doctorIds = doctorIds.map((doctorId) => doctorId.doctorId);
                resolve({
                    errCode: 0,
                    errMessage: "Get all doctor Ids success",
                    doctorIds
                });
            }
            else reject({
                errCode: 1,
                errMessage: "Not found any doctor"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getBooking = ({ doctorId, date }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookings = [];
            bookings = await db.Booking.findAll({
                where: { doctorId: doctorId, date: +date },
                include: [
                    { model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                errMessage: 'ok',
                bookings
            })
        } catch (e) {
            reject(e);
        }
    })
}

let changeBookingStatus = ({ doctorId, date, statusId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: { doctorId: doctorId, date: +date },
                raw: false,
            })
            if (booking) {
                booking.statusId = statusId;
                await booking.save();
            }
            booking = await db.Booking.findOne({
                where: { doctorId: doctorId, date: +date },
                include: [
                    { model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                errMessage: 'ok',
                booking
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    createMarkDown,
    updateMarkDown,
    getDetailDoctorById,
    createBulkSchedules,
    updateBulkSchedules,
    getSchedules,
    createDoctorInfo,
    updateDoctorInfo,
    getDoctorInfo,
    createSpecialty,
    updateSpecialty,
    getAllSpecialty,
    getSpecialtyById,
    getAllDoctorsOfSpecialty,
    getBooking,
    changeBookingStatus
}