import db from "../models/index";
import patientService from "../services/patientService";

let createBooking = async (req, res) => {
    try {
        let message = await patientService.createBooking(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let verifyBooking = async (req, res) => {
    try {
        let message = await patientService.verifyBooking(req.query);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    createBooking,
    verifyBooking
}   