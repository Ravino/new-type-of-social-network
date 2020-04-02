import axios from 'axios';

export const HTTPer = axios.create({
    baseURL : window.apiURL,
    headers : {
        'X-Requested-With': 'XMLHttpRequest'
        // Authorization : 'Bearer {token}'
    }
});
