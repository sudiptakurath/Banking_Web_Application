import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Account from "./components/account/Account";
import Transfer from "./components/transfer/Transfer";
import Profile from "./components/profile/Profile";
import Contactus from "./components/contactus/Contactus";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import "./components/dashboard/Dashboard.css";
import Footer from "./components/footer/Footer";
import Beneficiaries from "./components/Beneficiaries/Beneficiaries";
import Transactions from "./components/Transactions/Transactions";
import Home from "./components/admin/home";
import UserList from "./components/admin/userDetails";
import UserRequests from "./components/admin/userRequests";
import AccountDetails from "./components/admin/accountDetails";
import TransactionDetails from "./components/admin/transactionsDetails";
import OpenAccount from "./components/admin/openAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<Dashboard />}>
          <Route path="/accounts" element={<Account />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/add-beneficiaries" element={<Beneficiaries />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Contactus />} />
        </Route>
        <Route path="/admin-home" exact element={<Home />}></Route>
        <Route path="/users-list" exact element={<UserList />}></Route>
        <Route path="/users-requests" exact element={<UserRequests />}></Route>
        <Route path="/open-account" exact element={<OpenAccount />}></Route>
        <Route path="/account-details/:userId/:email" exact element={<AccountDetails />}></Route>
        <Route path="/transaction-details/:accountId/:email" exact element={<TransactionDetails />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
