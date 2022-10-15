import db from '../models/index';

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

module.exports = {
    getTopDoctorHome, getAllDoctors, createMarkDown, getDetailDoctorById
}