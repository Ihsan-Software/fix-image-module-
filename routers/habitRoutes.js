const express = require('express');
const habitController = require('../controllers/habitController')
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protect_)

router.route('').post(habitController.createHabit);
// router.route('/getMyHabits/:specialTime').get(habitController.getTodayHabits);
router.route("/checkHabit/:checkHabitID").patch(habitController.setSpecialDayAndTime, habitController.check, habitController.getTodayHabits);
router.route('/unCheckHabit/:uncheckHabitID').patch(habitController.setSpecialDayAndTime, habitController.unCheck, habitController.getTodayHabits);
router.route('/getTodayHabits').get(habitController.setSpecialDayAndTime, habitController.getTodayHabits);
router.route("/getDetail").get(habitController.getDetail);
router.route('/:id').delete(habitController.deleteHabit);

router.use(authController.restrictTo('admin'))

router.route('').get(habitController.getHabits);
router.route('/:id').get(habitController.getHabit)
router.route('/:id').patch(habitController.updateHabit);
router.route('/:id').delete(habitController.deleteHabit);



module.exports = router;