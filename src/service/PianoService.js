import axios from 'axios'

const PIANOS_API_URL = 'http://localhost:7777'
const LIST_API_URL = `${PIANOS_API_URL}/pianos`

class PianoService {

    retrieveAll() {
        return axios.get(`${LIST_API_URL}`);
    }

    deleteItem(id) {
        //console.log('executed service')
        return axios.delete(`${LIST_API_URL}/delete?id=${id}`);
    }

    getItem(id) {
        //console.log('executed service')
        return axios.get(`${LIST_API_URL}?id=${id}`);
    }

    updateItem(id,text,model,name) {
        console.log('ID:' + id + ' TEXT:' + text + ' MODEL:' + model + ' NAME:' + name)
        return axios.post(`${LIST_API_URL}/update?id=${id}&text=${text}&model=${model}&name=${name}`);
    }

    addItem(text,model,name) {
        console.log(' TEXT:' + text + ' MODEL:' + model + ' NAME:' + name)
        return axios.post(`${LIST_API_URL}/add?text=${text}&model=${model}&name=${name}`);
    }

}

export default new PianoService()