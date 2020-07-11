const db = require('../database/dbConfig');

/*
 * This function should look inside the users table and look for the rows
 * that has the parameter id. return the result row with this function.
 */
async function findUsersByEmail(email) {
    //TODO start your code right here
    return db('users')
        .where({email})
        .select('*');
}

async function insertUser(userJSON){
    try {
        console.log("Inserting users into table");
        await db('users')
            .insert(userJSON);
        console.log("User inserted");
    }catch(err){
        console.error("Insert failed", err);
    }

}


module.exports = {  insertUser, findUsersByEmail};
