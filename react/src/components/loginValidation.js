import axios from "axios";

export function validateUser(emailId, password) {
  return axios
    .get(`http://localhost:8080/bank/getUser/${emailId}`)
    .then((response) => {
      const fetchedUser = response.data;
      const bcrypt = require('bcryptjs');
      const doesPasswordMatch = bcrypt.compareSync(password, fetchedUser.password)
      if (doesPasswordMatch) {
        // return "Credentials match";
        return {
          status: "AUTHENTICATION_SUCCESS",
          userType: fetchedUser.userType,
        };
      } else {
        // return "Credentials do not match";
        return { status: "AUTHENTICATION_FAILURE", userType: null };
      }
    })
    .catch((error) => {
      return "User not found";
    });
}
