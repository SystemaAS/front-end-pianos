import axios from 'axios'

const PIANOS_API_URL = 'http://localhost:7777'
const LIST_API_URL = `${PIANOS_API_URL}/pianos`

//const LIST_API_URL = '/pianos' --> with proxy (package.json)
//get the jwt token and wrapp it in order to pass it on in every call (to Spring REST services ) 
let JWT_TOKEN = sessionStorage.getItem('token');
let JWT_CONFIG = { headers: { 'Authorization': 'Bearer ' + JWT_TOKEN } }



class PianoService {
    
    retrieveAll() {
        //console.log('JWT_TOKEN in PianoService:' + JWT_TOKEN);
        if(!JWT_TOKEN){ 
            //this will trigger in the very first retrieve since the component is created before the login has gott the token from the backend
            console.log('JWT_TOKEN_2:' + JWT_TOKEN);
            JWT_TOKEN = sessionStorage.getItem('token');
            JWT_CONFIG = { headers: { 'Authorization': 'Bearer ' + JWT_TOKEN } }
            
         }
        //ORIGINAL --> return axios.get(`${LIST_API_URL}`);
        return axios.get(`${LIST_API_URL}`, JWT_CONFIG )
                
    }

    deleteItem(id) {
        //console.log('executed service')
        return axios.delete(`${LIST_API_URL}/delete?id=${id}`, JWT_CONFIG);
    }

    getItem(id) {
        //console.log('executed service')
        return axios.get(`${LIST_API_URL}?id=${id}` , JWT_CONFIG);
    }

    updateItem(id, text, model, name) {
        console.log('ID:' + id + ' TEXT:' + text + ' MODEL:' + model + ' NAME:' + name)
        //return axios.get(`${LIST_API_URL}/update?id=${id}&text=${text}&model=${model}&name=${name}`, JWT_CONFIG); 
        
        let url = `${LIST_API_URL}/update?id=${id}&text=${text}&model=${model}&name=${name}`  
        return axios({
            method: 'post',
            url: url,
            headers: { 'Authorization': 'Bearer ' + JWT_TOKEN } 
          });
                     
    }

    addItem(text, model, name) {
        console.log(' TEXT:' + text + ' MODEL:' + model + ' NAME:' + name)
        //return axios.get(`${LIST_API_URL}/add?text=${text}&model=${model}&name=${name}`, JWT_CONFIG);
        
        let url = `${LIST_API_URL}/add?text=${text}&model=${model}&name=${name}`;
        return axios({
            method: 'post',
            url: url,
            headers: { 'Authorization': 'Bearer ' + JWT_TOKEN }, 
          });
    }

    login(_user, _pass){
        const url = `${PIANOS_API_URL}/signin`
        
        return axios({
            method: 'post',
            url: url,
            //headers: {}, 
            data: {  
              username: _user, 
              password: _pass // This is the body part for first attempt in order to get JWT_Token and OK Authentication/Authorization
            }
          })    
                      
    }

}

export default new PianoService()