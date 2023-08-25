import axios from "axios";

export function SaveKYC(reqBody){
    return axios
    .post(`http://localhost:8080/bank-api/account/kyc/createKYC`, reqBody)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return "Error";
    });
}