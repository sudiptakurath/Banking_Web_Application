import axios from "axios";

export function checkBeneficiaryExists(accNo) {
  return axios
    .get(`http://localhost:8080/bank/checkBeneficiary/${accNo}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return 2;
    });
}

export function SaveBeneficiary(beneficiary){
    return axios
    .post(`http://localhost:8080/bank/addBeneficiary`, beneficiary)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return 2;
    });
}