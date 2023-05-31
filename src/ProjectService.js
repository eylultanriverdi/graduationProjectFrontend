import axios from 'axios';

const PROJECT_API_BASE_URL = "http://localhost:3001";

class ProjectService {

    createMovie(user){
        return axios.post(PROJECT_API_BASE_URL, user);
    }

}

export default new ProjectService()