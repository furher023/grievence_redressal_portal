function setSession(req,name,email,rollNo,hostel,role){
    req.session.user = {
        name: name,
        email: email,
        rollNo: rollNo,
        hostel: hostel,
        role: role
    };
}

module.exports = {
    setSession: setSession
};