require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || 'mongodb://localhost/tick-it';

// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL||
//                             global.env.TEST_DATABASE_URL;
exports.TA_CODE = process.env.TA_CODE ||
                  global.TA_CODE;