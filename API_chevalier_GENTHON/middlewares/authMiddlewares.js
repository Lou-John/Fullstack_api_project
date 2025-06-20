const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const jwtHeader = req.header(process.env.JWT_HEADER);
    if (!jwtHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    const [prefix, token] = jwtHeader.split(' ');
    if (!prefix || !token || !prefix.includes(process.env.JWT_TOKEN_PREFIX)) {
        return res.status(401).json({ error: 'Access denied, invalid token format' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid token ' + e });
    }
}

module.exports = verifyToken;