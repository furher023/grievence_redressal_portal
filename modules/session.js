function setSession(req,name,email,rollNo,hostel){
    req.session.user = {
        name: name,
        email: email,
        rollNo: rollNo,
        hostel: hostel
    };
}

module.exports = {
    setSession: setSession
};