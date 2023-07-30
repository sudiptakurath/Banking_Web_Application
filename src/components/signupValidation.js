import axios from "axios";

export function checkUserExists(email) {
  return axios
    .get(`http://localhost:8080/bank/checkEmail/${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return 2;
    });
}

export function SaveUser(User){
    return axios
    .post(`http://localhost:8080/bank/addUser`, User)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return 2;
    });
}