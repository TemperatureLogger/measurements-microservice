// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

const axios = require('axios').default;

const {
    ServerError
} = require('../errors');

const sendRequest = async (options) => {
    try {
        const { data } = await axios(options);
        return data;
    } catch (e) {
        if (e.isAxiosError) {

            console.error(e);
            throw new ServerError(e.response.data.message, e.response.status);
        }
        throw e;
    }
}

module.exports = {
    sendRequest
}
