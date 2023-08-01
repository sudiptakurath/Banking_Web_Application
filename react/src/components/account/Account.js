import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const savingAccounts = accounts.filter((account) => {
    return account.account_type === "savings";
  });
  console.log(savingAccounts);
  const currentAccounts = accounts.filter((account) => {
    return account.account_type === "current";
  });
  console.log(currentAccounts);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/bank/accounts/101"
      );
      console.log("response", response);

      setAccounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchBeneficiaries = async (user_id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/beneficiaries/${user_id}`
  //     );
  //     console.log("ben response", response);
  //     setBeneficiaries(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchData();
    // fetchBeneficiaries(user_id);
  }, []);

  return (
    <React.Fragment>
      <Outlet />

      <div className="saving">
        <h1>Saving Account</h1>
      </div>
      <div className="table-container">
        <table className="table-data">
          <tr>
            <th>Account Number</th>
            <th>Branch Name</th>
            <th>Current Balance</th>
            <th>Last Transactions</th>
          </tr>
          {savingAccounts.map((account) => (
            <tr>
              <td>{account.account_number}</td>
              <td>{account.branch_name}</td>
              <td>{account.balance}</td>
              <td>
                <a href="">Last 5 transaction</a>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="current">
        <h1>Current Account</h1>
      </div>
      <div className="table-container">
        <table className="table-data">
          <tr>
            <th>Account Number</th>
            <th>Branch Name</th>
            <th>Current Balance</th>
            <th>Last Transactions</th>
          </tr>
          {currentAccounts.map((account) => (
            <tr>
              <td>{account.account_number}</td>
              <td>{account.branch_name}</td>
              <td>{account.balance}</td>
              <td>
                <a href="">Last 5 transaction</a>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {/* <div className="beneficiaries">
        <h1>Beneficiaries</h1>
      </div>
      <div className="table-container">
        <table className="table-data">
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Branch Name</th>
          </tr>
          {beneficiaries.map((beneficiary) => (
            <tr>
              <td>{beneficiary.first_name + beneficiary.last_name}</td>
              <td>{beneficiary.account_number}</td>
              <td>{beneficiary.bank_name}</td>
            </tr>
          ))}
        </table>
      </div> */}
    </React.Fragment>
  );
}

export default Account;
