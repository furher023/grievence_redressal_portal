var db = require('./dbconnect');

function login(doc){

    

    return new Promise((resolve,reject)=>{

        db.model('user').findOne(doc,(err,result)=>{
            if(err) reject(err);
            else{
                resolve(result);
            }
        });
    });

};

module.exports = {
    login: login
}; 