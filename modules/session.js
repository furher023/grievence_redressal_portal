function setSession(req,name,email){
    req.session.user = {
        name: name,
        email: email
    };
}

module.exports = {
    setSession: setSession
};