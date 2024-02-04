import axios from 'axios';

// const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://productsquare.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});
