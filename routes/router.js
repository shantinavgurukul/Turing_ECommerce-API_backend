const express = require('express');
const router = express.Router();

const knex = require('../controler/connection')


require('../model/department')(knex,router)
require('../model/categories')(knex,router)
require('../model/attributes')(knex,router)
require('../model/product')(knex,router)
require('../model/customer')(knex,router)

module.exports = router;



