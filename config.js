// require('dotenv').config();
// console.log(process.env.DATABASE_URL);
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL;

// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL||
//                             global.env.TEST_DATABASE_URL;