export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("user: ",user)
    if (user && user.accessToken) {
      return { token: user.accessToken };
    } else {
      return {};
    }
  }
  