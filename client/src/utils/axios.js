import axios from 'axios';

 export default axios.create({
    baseURL: 'https://bug-tracker-api-qlpm.onrender.com/api'
 })