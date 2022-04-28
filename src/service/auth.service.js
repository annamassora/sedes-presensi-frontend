import axios from 'axios';
const API_URL = 'http://localhost:5000/api/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {},{headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${user.username}:${user.password}`)}`
      }})
      .then(response => {
          console.log(response.data)
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();
