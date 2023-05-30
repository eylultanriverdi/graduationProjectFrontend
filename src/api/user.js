const axios = require("axios").default;

const apiBaseUrl = "http://localhost:3000";

const getProduct = async () => {
    const resp = await axios.get(
        `${apiBaseUrl}/products`
    );
    return resp.status === 200 ? resp : false;
}

module.exports = {
    getProduct
}
