import axios from "axios";

export function saveProfile(profile) {
  return axios
    .post(`http://localhost:8080/bank-api/addUser`, profile)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return 2;
    });
}
