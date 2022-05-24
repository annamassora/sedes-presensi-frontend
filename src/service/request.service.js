import axios from 'axios';
const API_URL = 'http://localhost:5000/api/';
class RequestService {
  attendance(temperature, qrString) {
    const reqData = { temperature: temperature, qrString:qrString };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'checkin', reqData, {headers: {
        "Content-Type": "multipart/form-data",
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

  last_checkin() {
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'last_checkin', {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
          console.log("last_checkin",response.data)
        if (response.data.access) {
          return response.data
        }
        return response.data.attendance;
      });
  }

  check_out(id) {
    const reqData = { id: id };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'check_out', reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
          console.log("check_out",response.data.attendance)
        if (response.data.access) {
          return response.data
        }
        return response.data.attendance;
      });
  }

  report(year, month) {
    console.log(year,month);
    // const params = {
    //   year: year,
    //   month: month
    // };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'report?year='+year+"&month="+month, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
          console.log(response.data.attendance)
        if (response.data.access) {
          return response.data
        }
        return response.data.attendance;
      });
  }

}
export default new RequestService();