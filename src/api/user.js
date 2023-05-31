const axios = require("axios").default;


const getProduct = async () => {
    const resp = await axios.get(
        `http://localhost:3001/products`
    );
    return resp.status === 200 ? resp : false;
}

module.exports = {
    getProduct
}
