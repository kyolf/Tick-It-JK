// require('dotenv').config();
// console.log(process.env.DATABASE_URL);
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL;