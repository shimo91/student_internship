const express = require('express');
const getMarks  = require('../controllers/MarksControler');
const cors = require('cors')

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());



router.get('/:id', getMarks)

module.exports = router;
