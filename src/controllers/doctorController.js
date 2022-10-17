import db from "../models/index";
import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query && req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctors();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let createMarkDown = async (req, res) => {
    try {
        let message = await doctorService.createMarkDown(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let updateMarkDown = async (req, res) => {
    try {
        let response = await doctorService.updateMarkDown(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let doctorInfo = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(doctorInfo);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createBulkSchedules = async (req, res) => {
    try {
        let response = await doctorService.createBulkSchedules(req.body.schedules);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    createMarkDown,
    updateMarkDown,
    getDetailDoctorById,
    createBulkSchedules
}   