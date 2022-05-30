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
        console.log("check_out",response.data)
        return response.data;
      });
  }

  report(year, month) {
    console.log(year,month)
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

  teacherlist() {
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'teacher', {headers: {
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
  studentlist() {
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'student', {headers: {
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
  teacherdetail(nign, year, month) {
    console.log(year,month)
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'teacherDetail?nign='+nign+"&year="+year+"&month="+month, {headers: {
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
  studentdetail(nisn, year, month) {
    console.log(year,month)
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'studentDetail?nisn='+nisn+"&year="+year+"&month="+month, {headers: {
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
  getQrCode() {
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .get(API_URL + 'getQrCode', {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data.qrList;
      });
  }
  createQrcode(location) {
    const reqData = { location: location };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'qrcode',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data.qrString)
        return response.data.qrString;
      });
  }
  deleteQrCode(id) {
    const reqData = { id: id };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'deleteQrCode',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }
  addTeacher(username, datebirth, identifier) {
    const reqData = { username:username, datebirth:datebirth, identifier:identifier };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'addTeacher',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }
  addStudent(username, datebirth, identifier) {
    const reqData = { username:username, datebirth:datebirth, identifier:identifier };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'addStudent',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }
  deleteTeacher(id) {
    const reqData = { id: id };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'deleteTeacher',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }
  deleteStudent(id) {
    const reqData = { id: id };
    const token=JSON.parse(localStorage.getItem('user')).token
    return axios
      .post(API_URL + 'deleteStudent',reqData, {headers: {
        "Content-Type": "multipart/form-data",
        "token": token,
      }})
      .then(response => {
        console.log(response.data)
        return response.data;
      });
    }
  // qrCode() {
  //   const token=JSON.parse(localStorage.getItem('user')).token
  //   return axios
  //     .get(API_URL + 'student', {headers: {
  //       "Content-Type": "multipart/form-data",
  //       "token": token,
  //     }})
  //     .then(response => {
  //         console.log(response.data)
  //       if (response.data.access) {
  //         return response.data
  //       }
  //       return response.data;
  //     });
  // }


}
export default new RequestService();