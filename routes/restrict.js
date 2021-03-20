const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pass = await verify(req.headers.token, process.env.SECRET, { algorithms: 'HS384' });
            resolve(pass);
            next();
        } catch (error) {
            reject(error);
            res.status(401).json({
                message: "Access Denied"
            });
        }
    });
}