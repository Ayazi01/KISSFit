const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = function () {

    let dbCon = null;

    async function connect() {
        try {
            //create new connection when needed
            const con = new MongoClient(MONGO_URI, options);
            let _dbCon = await con.connect();
            return _dbCon;
        } catch (e) {
            return e;
        }
    }

   async function client() {
        try {
            if (dbCon != null) {
                //return already existed db connection
                return dbCon;
            } else {
                //return new db connection
                dbCon = await connect();
                return dbCon; 
            }
        } catch (e) {
            return e;
        }
    }

    return { client }

}

module.exports = connection();