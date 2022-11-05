import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                        userData.user = {}
                    }
                    resolve(userData);

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found!`;
                    resolve(userData);
                }
                resolve();
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system!`;
                userData.user = {};
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attribute: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attribute: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is already in used!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false
            })
            if (user) {
                user.destroy();
                resolve({
                    errCode: 0,
                    errMessage: 'Delete Successfully'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Can not find user'
                });
            }
        } catch (e) {
            reject(e);
            console.log(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameter'
                })
            }
            let user = await db.User.findOne({
                where: { email: data.email },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.gender = data.gender;
                user.positionId = data.positionId;
                user.roleId = data.roleId;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Can not find user'
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allCode = await db.Allcode.findAll({
                where: { type: type },
                raw: true
            });
            res.errCode = 0;
            res.allCode = allCode;
            resolve(res);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCode: getAllCode

}