const {
    ServerError
} = require('../errors');

const {
    sendRequest
} = require('../http-request');

const authorize = () => {

    return async (req, res, next) => {
        if (!req.headers.authorization) {
            throw new ServerError("Authorization Header missing!", 403);
        }

        const options = {
            url: `http://${process.env.AUTH_SERVICE}/api/token/authorize`,
            headers: {
                'Authorization': req.headers.authorization
            }
        }
    
        const {
            userId,
            serialNumber
        } = await sendRequest(options);

        if (userId === -1) {
            throw new ServerError(`User does not have rights on sensor.`, 403);
        }

        req.state = {
            userId,
            serialNumber
        }
    
        next();
    }
}


module.exports = {
    authorize
};
