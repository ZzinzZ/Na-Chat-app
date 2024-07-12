const express = require('express');
const upload = require('../middlewares/cloudinaryMiddleware');

const router = express.Router();

router.post('/upload',upload.fields([{name: "image", maxCount: 1}]),(req, res) => {
    try{
        console.log(req.files);
        if(!req.file) return res.status(400).json({message: "No file selected"});
        const link = req.files['image'][0];
        res.status(200).json({message: "Image uploaded successfully", data: link});
    } catch(err){
        console.log(err);
        res.status(500).json({message: 'Error uploading image'});
    }
})

module.exports = router;