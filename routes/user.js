const {Router} = require('express');

const userController = require('../controllers/userController');
// const { authenticated } = require('../middlewares/auth')
const router = new Router()

//*  @desc   Register User 
//*  @route  POST /users/register
router.post("/register" , userController.createUser)


//*  @desc   Get Users List 
//*  @route  GET /users/list
router.get("/list" , userController.getUsersList)


//*  @desc   Delete User
//*  @route  Delete /users/:id
router.delete("/:id"  , userController.deleteUser)

//*  @desc   Update User
//*  @route  Put /users/:id
router.put("/:id"  , userController.updateUser)


module.exports = router