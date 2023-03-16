const auth = {};

auth.pass = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.status(404).send('not authorized')
    }
};

export default auth;