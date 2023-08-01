import React, { useState } from "react";
import { checkUserExists, SaveUser } from "./signupValidation";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
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
    width: "500px", // Updated width value
    margin: "0 auto", // Added margin to center the form horizontally
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
  }
}));


function SignupForm() {
  const today = new Date().toISOString().split("T")[0];

  const classes = useStyles();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setZipCode] = useState("");
  const [contact_num, setContactNum] = useState("");

  const [validationResult, setValidationResult] = useState("");

  const handleInputChangeMobile = (event) => {
    const maxLength = 10;
    const value = event.target.value.slice(0, maxLength);
    setContactNum(value);
  };

  const handleInputChangeZip = (event) => {
    const maxLength = 6;
    const value = event.target.value.slice(0, maxLength);
    setZipCode(value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const handleValidation = (event) => {
    event.preventDefault();
    setValidationResult("");
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === "" ||
      confirm_password === "" ||
      dob === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      postal_code === ""
    ) {
      setValidationResult("Enter required data");
    } else if (password !== confirm_password) {
      setValidationResult("Passwords don't match");
    } else {
      let emailValid = emailRegex.test(email);
      let passwordValid = passwordRegex.test(password);
      if (!emailValid) {
        setValidationResult("Email address is not valid");
        return;
      }
      if (contact_num.length !== 10) {
        setValidationResult("Phone number is not valid");
        return;
      }
      if (postal_code.length !== 6) {
        setValidationResult("Phone number is not valid");
        return;
      }
      if (!passwordValid) {
        setValidationResult(
          "Password must contain at least 8 characters, contains at least one lowercase letter, one uppercase letter, one digit, and one special character"
        );
        return;
      }
      checkUserExists(email)
        .then((result) => {
          if (result === 1) {
            setValidationResult("Email already exists");
          } else if (result === 2) {
            setValidationResult("Error occurred, please retry");
          } else {
            const age = calculateAge(dob);
            const data = {
              email: email,
              password: password,
              first_name: first_name,
              last_name: last_name,
              dob: dob,
              address: address,
              city: city,
              state: state,
              country: country,
              postal_code: postal_code,
              age: age,
              contact_num: contact_num,
              is_active: true,
            };
            SaveUser(data).then((resp) => {
              if (resp === 1) {
                setValidationResult("User saved, please login to continue");
              } else {
                setValidationResult("Error occurred, please retry");
              }
            });
          }
        })
        .catch((error) => {
          console.error("Validation error:", error);
        });
    }
  };

  let calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      method="get"
    >
      <div className={classes.formContainer}>
        <h2>Signup</h2>
        <Box
          component="form"
          noValidate
          onSubmit={handleValidation}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="First Name"
                variant="outlined"
                className={classes.textField}
                value={first_name}
                id="first_name"
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                value={last_name}
                id="last_name"
                onChange={(e) => setlast_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                className={classes.textField}
                value={email}
                id="email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="DOB"
                variant="outlined"
                className={classes.textField}
                value={dob}
                id="dob"
                required
                type="date"
                inputProps={{
                  max: today,
                }}
                onChange={(e) => setDOB(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                variant="outlined"
                className={classes.textField}
                value={password}
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                className={classes.textField}
                value={confirm_password}
                id="confirm_password"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                className={classes.textField}
                value={address}
                id="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                className={classes.textField}
                value={city}
                id="city"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="outlined"
                className={classes.textField}
                value={state}
                id="state"
                required
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                variant="outlined"
                className={classes.textField}
                value={country}
                id="country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                variant="outlined"
                className={classes.textField}
                value={postal_code}
                id="postal_code"
                required
                type="number"
                onChange={handleInputChangeZip}
                inputMode="numeric"
                style={{ appearance: "textfield" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                variant="outlined"
                className={classes.textField}
                value={contact_num}
                id="contact_num"
                required
                type="number"
                onChange={handleInputChangeMobile}
                inputMode="numeric"
                style={{ appearance: "textfield" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleValidation}
        >
          Sign Up
        </Button>
        <p>
          Have an account? <a href="login">Login</a>
        </p>
        {validationResult && (
          <p className={classes.errorText}>{validationResult}</p>
        )}
      </div>
    </form>
  );
}

export default SignupForm;
