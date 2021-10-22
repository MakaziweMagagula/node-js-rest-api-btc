const express = require('express');
const dependentsController = require('../controllers/dependant.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get('/get-dependents/:id',checkAuthMiddleware.checkAuth,dependentsController.showDependents);
router.post('/add-dependents',checkAuthMiddleware.checkAuth,dependentsController.addDependents);
router.patch('/update-dependents/:id',checkAuthMiddleware.checkAuth,dependentsController.updateDependents);
router.delete('/delete-dependents/:id',checkAuthMiddleware.checkAuth,dependentsController.deleteDependents);

module.exports = router;
