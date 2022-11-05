import db from "../models/index";
import doctorService from "../services/doctorService";
import emailService from "../services/emailService";

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

let createDoctorInfo = async (req, res) => {
    try {
        let message = await doctorService.createDoctorInfo(req.body);
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

let updateDoctorInfo = async (req, res) => {
    try {
        let response = await doctorService.updateDoctorInfo(req.body);
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
        let response = await doctorService.getDoctorInfo(req.query.doctorId);
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
        let doctorInfo = await doctorService.getDetailDoctorById(req.query.id);
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
        let response = await doctorService.createBulkSchedules(req.body.schedules);
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
        let response = await doctorService.updateBulkSchedules(req.body.schedules);
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
        let response = await doctorService.getSchedules(req.query.id, req.query.date);
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
        let response = await doctorService.createSpecialty(req.body);
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
        let response = await doctorService.updateSpecialty(req.body);
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
        let response = await doctorService.getAllSpecialty();
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
        let response = await doctorService.getSpecialtyById(req.query.id);
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
        let response = await doctorService.getAllDoctorsOfSpecialty(req.query.id);
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
        let response = await doctorService.getBooking(req.query);
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
        let response = await doctorService.changeBookingStatus(req.body);
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