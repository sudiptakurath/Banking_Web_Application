import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Statement() {
  const [statements, setStatements] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/bank-api/statements/getStatement/101"
      );

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
      <div className="table-container">
        <table className="table-data">
          <tr>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
            <th>To Account Number</th>
            <th>To Account Name</th>
          </tr>
          {statements.map((statement, index) => (
             <tr key={index}>
              <td>{statement.transaction_date}</td>
              <td>{statement.amount}</td>
              <td>{statement.to_acct_number}</td>
              <td>{statement.to_acct_name}</td>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
}

export default Statement;
