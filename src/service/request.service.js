import axios from 'axios';
const API_URL = 'http://localhost:5000/api/';
class RequestService {
  attendance(data) {
    const reqData = { data: data };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'attendance', reqData, {headers: {
        "token": token,
      }})
      .then(response => {
          console.log(response.data)
        if (response.data.access) {
          return response.data
        }
        return response.data;
      });
  }
}
export default new RequestService();