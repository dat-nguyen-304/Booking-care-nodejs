import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
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

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctors);
    router.post('/api/create-markdown', doctorController.createMarkDown);
    router.post('/api/create-doctor-info', doctorController.createDoctorInfo);
    router.put('/api/update-markdown', doctorController.updateMarkDown);
    router.put('/api/update-doctor-info', doctorController.updateDoctorInfo);
    router.get('/api/get-doctor-info', doctorController.getDoctorInfo);

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/create-bulk-schedules', doctorController.createBulkSchedules);
    router.get('/api/get-schedules', doctorController.getSchedules);

    router.post('/api/create-booking', patientController.createBooking);
    router.post('/api/verify-booking', patientController.verifyBooking);
    return app.use("/", router);
}

module.exports = initWebRoutes;