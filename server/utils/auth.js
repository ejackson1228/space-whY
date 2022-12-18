const jwt = require('jsonwebtoken');

// const secret = process.env.SECRET;
const secret = 'topsecretshhhhh';
const expiration = 7 * 24 * 60 * 60; // user token will expire @ 1 week, requiring them to log in again 

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid Token');
        }

        return req;
    }
};