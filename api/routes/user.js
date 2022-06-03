const express = require("express");
const router = express.Router();
const multer = require("multer");

const {findAllUsers, findAUser, createUser, logIn} = require("../controllers/user");
const { adminAuth, userAuth } = require("../middleware_auth/checkAuth");

// FILE HANDLING USING MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = function(req, file, cb){

    // cb(null, false); //to not store file
    // cb(null, true); //to store file
    // cb(false); //to not store and throw error

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(false);
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024*1024*100//100MB
    },
    fileFilter: fileFilter
});
// FILE HANDLING USING MULTER

//get all users
router.get("/", adminAuth, findAllUsers);

//get a particular user
router.get("/:id", userAuth, findAUser);

//create user using sign up
router.post("/signup", upload.single('userImage'), createUser);

router.post("/login", logIn);

module.exports = router;