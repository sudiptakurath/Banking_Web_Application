import axios from "axios";

export function checkUserExists(email) {
  return axios
    .get(`http://localhost:8080/bank-api/checkEmail/${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return 2;
    });
}

export function SaveUser(User){
    return axios
    .post(`http://localhost:8080/bank-api/addUser`, User)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return 2;
    });
}