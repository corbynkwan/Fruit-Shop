import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://market-project-da10f.firebaseio.com/'
});

export default instance;