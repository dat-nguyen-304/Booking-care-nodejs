import db from "../models/index";
import adminService from "../services/adminService";
import emailService from "../services/emailService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query && req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await adminService.getTopDoctorHome(+limit);
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
        let response = await adminService.getAllDoctors();
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
        let message = await adminService.createMarkDown(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let createDoctorInfo = async (req, res) => {
    try {
        let message = await adminService.createDoctorInfo(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let updateMarkDown = async (req, res) => {
    try {
        let response = await adminService.updateMarkDown(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let updateDoctorInfo = async (req, res) => {
    try {
        let response = await adminService.updateDoctorInfo(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDoctorInfo = async (req, res) => {
    try {
        let response = await adminService.getDoctorInfo(req.query.doctorId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let doctorInfo = await adminService.getDetailDoctorById(req.query.id);
        return res.status(200).json(doctorInfo);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createBulkSchedules = async (req, res) => {
    try {
        let response = await adminService.createBulkSchedules(req.body.schedules);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateBulkSchedules = async (req, res) => {
    try {
        let response = await adminService.updateBulkSchedules(req.body.schedules);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getSchedules = async (req, res) => {
    try {
        let response = await adminService.getSchedules(req.query.id, req.query.date);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createSpecialty = async (req, res) => {
    try {
        let response = await adminService.createSpecialty(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateSpecialty = async (req, res) => {
    try {
        let response = await adminService.updateSpecialty(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let response = await adminService.getAllSpecialty();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getSpecialtyById = async (req, res) => {
    try {
        let response = await adminService.getSpecialtyById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllDoctorsOfSpecialty = async (req, res) => {
    try {
        let response = await adminService.getAllDoctorsOfSpecialty(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getBooking = async (req, res) => {
    try {
        let response = await adminService.getBooking(req.query);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let changeBookingStatus = async (req, res) => {
    try {
        let response = await adminService.changeBookingStatus(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let sendInvoiceViaEmail = async (req, res) => {
    try {
        let response = await emailService.sendInvoice(req.body);
        return res.status(200).json(response);
    } catch (e) {
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
    createDoctorInfo,
    updateMarkDown,
    updateDoctorInfo,
    getDetailDoctorById,
    createBulkSchedules,
    updateBulkSchedules,
    getSchedules,
    getDoctorInfo,
    createSpecialty,
    updateSpecialty,
    getAllSpecialty,
    getSpecialtyById,
    getAllDoctorsOfSpecialty,
    getBooking,
    changeBookingStatus,
    sendInvoiceViaEmail
}   