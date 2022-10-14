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
                allDoctors: users
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

module.exports = {
    getTopDoctorHome, getAllDoctors, createMarkDown
}