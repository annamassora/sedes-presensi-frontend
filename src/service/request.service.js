import axios from 'axios';
const API_URL = 'http://localhost:5000/api/';
import router from "../router.js";
class RequestService {
    attendance(qrString) {
        const reqData = { qrString: qrString };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'checkin', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data.access) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    last_checkin() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'last_checkin', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log("last_checkin", response.data)
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    check_out(id) {
        const reqData = { id: id };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'check_out', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log("check_out", response.data)
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    report(year, month) {
        console.log(year, month)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'report?year=' + year + "&month=" + month, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    getQrCode() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'getQrCode', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    console.log(response.data)
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }
    createQrcode(location) {
        const reqData = { location: location };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'qrcode', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }
    deleteQrCode(id) {
        const reqData = { id: id };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'deleteQrCode', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }


    getTime() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'getTime', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    console.log(response.data)
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }


    updateTime(id, tipe_jam, timeData) {
            const reqData = { id: id, tipe_jam: tipe_jam, timeData: timeData };
            const token = JSON.parse(localStorage.getItem('user')).token
            return axios
                .post(API_URL + 'updateTime', reqData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "token": token,
                    }
                })
                .then(response => {
                    if (response.data.status == 200) {
                        return response.data
                    } else if (response.data.status == 401) {
                        localStorage.removeItem('user');
                        router.push(`/login`);
                        return response.data;
                    } else {
                        return response.data;
                    }
                });
        }
        ///////////////////////////////////////////////////////
        ///////                 Guru                    ///////
        ///////////////////////////////////////////////////////

    teacherlist() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'teacher', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data.access) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    teacherdetail(nourut, year, month) {
        console.log(year, month)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'teacherDetail?nourut=' + nourut + "&year=" + year + "&month=" + month, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addTeacher(username, datebirth, title) {
        const reqData = { username: username, datebirth: datebirth, "title": title };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'addTeacher', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addTeacherCsv(file) {
        const reqData = { daftar_guru: file, };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'importTeacher', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    updateTeacher(id, title) {
        const reqData = JSON.stringify({ id: id, title: title });
        console.log(reqData)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'updateTeacher', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    deleteTeacher(id) {
        const reqData = JSON.stringify({ id: id });
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'deleteTeacher', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    downloadTeacherReport() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'downloadTeacherReport', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log(response.status)
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    ///////////////////////////////////////////////////////
    ///////                Siswa                    ///////
    ///////////////////////////////////////////////////////

    studentlist() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'student', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    studentdetail(nisn, year, month) {
        console.log(year, month)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'studentDetail?nisn=' + nisn + "&year=" + year + "&month=" + month, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addStudent(username, datebirth, identifier, id_class) {
        const reqData = { username: username, datebirth: datebirth, identifier: identifier, id_class: id_class };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'addStudent', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addStudentCsv(file) {
        const reqData = { daftar_siswa: file, };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'importStudent', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    deleteStudent(id) {
        const reqData = JSON.stringify({ id: id });
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'deleteStudent', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    updateStudent(id, kelas) {
        const reqData = JSON.stringify({ id: id, kelas: kelas });
        console.log(reqData)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'updateStudent', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    downloadStudentReport() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'downloadStudentReport', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }


    ///////////////////////////////////////////////////////
    ///////               Karyawan                  ///////
    ///////////////////////////////////////////////////////

    employeelist() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'employee', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data.access) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    employeedetail(nourut, year, month) {
        console.log(year, month)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'employeeDetail?nourut=' + nourut + "&year=" + year + "&month=" + month, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addEmployee(username, datebirth, title) {
        const reqData = { username: username, datebirth: datebirth, "title": title };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'addEmployee', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    addEmployeeCsv(file) {
        const reqData = { daftar_karyawan: file, };
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'importEmployee', reqData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    deleteEmployee(id) {
        const reqData = JSON.stringify({ id: id });
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'deleteEmployee', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    updateEmployee(id, title) {
        const reqData = JSON.stringify({ id: id, title: title });
        console.log(reqData)
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .post(API_URL + 'updateEmployee', reqData, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            })
            .then(response => {
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
            });
    }

    downloadEmployeeReport() {
        const token = JSON.parse(localStorage.getItem('user')).token
        return axios
            .get(API_URL + 'downloadEmployeeReport', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,
                }
            })
            .then(response => {
                console.log(response.status)
                if (response.data.status == 200) {
                    return response.data
                } else if (response.data.status == 401) {
                    localStorage.removeItem('user');
                    router.push(`/login`);
                    return response.data;
                } else {
                    return response.data;
                }
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