import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import adminController from "../controllers/adminController";
import patientController from "../controllers/patientController";

let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/display-all-user', homeController.displayGetCrud);
    router.get('/edit-crud', homeController.getEditCrud);
    router.post('/put-crud', homeController.putCrud);
    router.get('/delete-crud', homeController.deleteCrud);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.get('/api/all-code', userController.getAllCode);

    router.get('/api/top-doctor-home', adminController.getTopDoctorHome);
    router.get('/api/get-all-doctor', adminController.getAllDoctors);
    router.post('/api/create-markdown', adminController.createMarkDown);
    router.post('/api/create-doctor-info', adminController.createDoctorInfo);
    router.put('/api/update-markdown', adminController.updateMarkDown);
    router.put('/api/update-doctor-info', adminController.updateDoctorInfo);
    router.get('/api/get-doctor-info', adminController.getDoctorInfo);

    router.get('/api/get-detail-doctor-by-id', adminController.getDetailDoctorById);
    router.post('/api/create-bulk-schedules', adminController.createBulkSchedules);
    router.put('/api/update-bulk-schedules', adminController.updateBulkSchedules);
    router.get('/api/get-schedules', adminController.getSchedules);

    router.post('/api/create-booking', patientController.createBooking);
    router.post('/api/verify-booking', patientController.verifyBooking);

    router.post('/api/create-specialty', adminController.createSpecialty);
    router.put('/api/update-specialty', adminController.updateSpecialty);
    router.get('/api/get-all-specialty', adminController.getAllSpecialty);
    router.get('/api/get-specialty', adminController.getSpecialtyById);
    router.get('/api/get-all-doctors-of-specialty', adminController.getAllDoctorsOfSpecialty);
    router.get('/api/get-booking', adminController.getBooking);
    router.put('/api/update-booking-status', adminController.changeBookingStatus);
    router.post('/api/send-invoice-via-email', adminController.sendInvoiceViaEmail);
    return app.use("/", router);
}

module.exports = initWebRoutes;