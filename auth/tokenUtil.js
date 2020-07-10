const jwt = require('jsonwebtoken');

async function validateToken(token){
    // Right here we verify the token with the secretkey key
    return jwt.verify(token, 'something else', async function(err, authData) {
        if(err) {
            return null;
        } else {
            return authData;
        }
    });
}

async function generateToken(userDataPacket){
    /* this returns a new token encrypted with 'secretkey' with the information of userDataPacketJSON and expires in 3 hours*/
    return jwt.sign({userDataPacket}, 'secretkey', {expiresIn:'3hr'});
}

module.exports = {
    validateToken,
    generateToken
};

router.post('/authenticateUser', async function (req,res) {
    //check our own database
    const userInfo = await userModel.findUsersByEmail(req.body.email);

    if(userInfo.length === 0||req.body.password!==userInfo[0].password){
        res.end("User info incorrect");
    }
    else{
        const userDataPacket = {
            id:userInfo[0].id,
            email: userInfo[0].email,
            password: userInfo[0].password
        };
        const token = await tokenUtil.generateToken(userDataPacket);
        if(!token){
            res.clearCookie('userToken');
            res.redirect('/signin');
        }else {
            res.clearCookie('userToken');
            res.cookie("userToken", token, {expire: new Date() + 1});
            console.log(token);
            res.end("User Authenticated");
        }
    }
});