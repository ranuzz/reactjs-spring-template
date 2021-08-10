import axios from 'axios';

export function createItem(item) {
    return axios.post('/api/item/create/'+ item);
}
