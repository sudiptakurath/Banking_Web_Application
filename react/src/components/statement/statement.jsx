import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Statement() {
  const [user, setUser] = useState([]);
  const [statements, setStatements] = useState([]);

  const currentUserID = sessionStorage.getItem("userId");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/getAccountDetailsByUserId/${currentUserID}`);
      setUser(response.data[0]);
      console.log(response.data[0]);
      fetchData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchData = async (user) => {
    try {
      console.log(user);
      const response = await axios.get(`http://localhost:8080/bank-api/statements/getStatement/${user.accountId}`);
      setStatements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Outlet />

      <div className="header1">
        <h2>Statement</h2>
      </div>
      <div className="table-container" style={{marginTop: "50px"}}>
        <table className="table-data">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Transaction Amount</th>
              <th>To Account Number</th>
              <th>To Account Name</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement, index) => (
              <tr key={index}>
                <td>{statement.transactionDate}</td>
                <td>{statement.amount}</td>
                <td>{statement.toAccountNumber}</td>
                <td>{statement.toAccountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Statement;