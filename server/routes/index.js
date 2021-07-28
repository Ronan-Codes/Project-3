const connection = require('../config/connection')
const router = require('express').Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')
Grid.mongo = connection.db;

let gfs
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('photo')
})
router.get('/photo/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        console.log(file)
        if(!file){
            console.log(err);
            return res.status(404).json({message: 'No file with this name found'})
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    })
} )

module.exports = router;