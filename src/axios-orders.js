import axios from 'axios';
// Class to access the firebase database
const instance = axios.create({
    baseURL: 'https://market-project-da10f.firebaseio.com/'
});

export default instance;