import db from "../models/index";
import CRUDService from "../services/CRUDService"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
    }

}

let getCrud = async (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.send('post crud from server');
}

let displayGetCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('usertable.ejs', {
        data: data,
    });
}

let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCrud.ejs', {
            data: userData
        });
    } else {
        return res.send('user not found');
    }
}

let putCrud = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('usertable.ejs', {
        data: allUsers
    });
}

let deleteCrud = async (req, res) => {
    let userId = req.query.id;
    let allUsers = await CRUDService.deleteUserById(userId);
    return res.render('usertable.ejs', {
        data: allUsers
    });
}

module.exports = {
    getHomePage,
    getCrud,
    postCrud,
    displayGetCrud,
    getEditCrud,
    putCrud,
    deleteCrud
}