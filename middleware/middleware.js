const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).json({ error:'No token given, authorization denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        res.status(401).json({error: 'Token not valid'})
    }
};
