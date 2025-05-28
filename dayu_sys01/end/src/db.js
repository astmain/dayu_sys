// const db = require("../db.js");
import {PrismaClient} from '@prisma/client';
// const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()

module.exports = db


// const {PrismaClient} = require('@prisma/client');
// // import PrismaClient from "@prisma/client"
// const db = new PrismaClient()
// db.$connect().catch(error => {
//     console.log('数据库异常>222:', error)
//     console.log(`数据库异常---db---prisma---error:`, error)
// })
//
//
// export default db
