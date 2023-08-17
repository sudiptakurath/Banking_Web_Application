import React, { useState } from "react";
import { validateUser } from "./loginValidation";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(2),
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
    width: "350px",
  },
  textField: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
  },
  button: {
    width: "100%",
    backgroundColor: "#4568dc",
    color: "#ffffff",
    borderRadius: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#3454b4",
    },
  },
  errorText: {
    color: "#ff0000",
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "auto",
    borderRadius: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [validationResult, setValidationResult] = useState("");

  const handleValidation = (event) => {
    event.preventDefault();
    if (!emailId || !password) {
      setValidationResult("Please enter both email ID and password");
    } else {
      setValidationResult("");
      validateUser(emailId, password)
        .then((result) => {
          if (result.status === "AUTHENTICATION_SUCCESS") {
            if (result.userType === 1) {
              navigate("/admin-home");
            } else if (result.userType === 2) {
              navigate("/accounts");
            }
          } else {
            setValidationResult("Credentials do not match");
          }
        })
        .catch((error) => {
          console.error("Validation error:", error);
        });
    }
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      method="get"
    >
      <div className={classes.formContainer}>
        <h2>Login</h2>
        <TextField
          label="Username"
          variant="outlined"
          className={classes.textField}
          value={emailId}
          onChange={(e) => setemailId(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleValidation}
        >
          Sign In
        </Button>
        <p>
          Don't have an account? <a href="signup">Create Account</a>
        </p>
        {validationResult && (
          <p className={classes.errorText}>{validationResult}</p>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
