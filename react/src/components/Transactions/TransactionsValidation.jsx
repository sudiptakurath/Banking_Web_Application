import axios from "axios";

export function SaveTransaction(account_id, reqBody){
    return axios
    .post(`http://localhost:8080/bank-api/account/transactions/${account_id}`, reqBody)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return 2;
    });
}