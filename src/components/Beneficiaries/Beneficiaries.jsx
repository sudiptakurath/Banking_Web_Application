import React, { useState } from "react";
import { checkBeneficiaryExists, SaveBeneficiary } from "./BeneficiariesValidation";
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
    minHeight: "80vh",
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
    width: "500px",
    margin: "0 auto"
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


export default function Beneficiaries() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [maxLimit, setmaxLimit] = useState("");

  const [validationResult, setValidationResult] = useState("");

  const handleValidation = (event) => {
    event.preventDefault();
    setValidationResult("");
    if (
      firstName === "" ||
      lastName === "" ||
      accNo === "" ||
      bankName === "" ||
      maxLimit === ""
      
    ) {
      setValidationResult("Enter required data");
    } else {
      // checkBeneficiaryExists(accNo)
      //   .then((result) => {
      //     if (result === 1) {
      //       setValidationResult("Beneficiary already exists");
      //     } else if (result === 2) {
      //       setValidationResult("Error, Please try again.");
      //     } else {
            const data = {
              first_name: firstName,
              last_name: lastName,
              accNumber: accNo,
              bank_name: bankName,
              max_limit: maxLimit
            };
            SaveBeneficiary(data).then((resp) => {
              if (resp === 1) {
                setValidationResult("Beneficiary has been saved successfuly.");
              } else {
                setValidationResult("Error, Please try again.");
              }
            });
          }
    //     })
    //     .catch((error) => {
    //       console.error("Validation error:", error);
    //     });
    // }
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      method="get"
    >
      <div className={classes.formContainer}>
        <h2>Add Beneficiary</h2>
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
                value={firstName}
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                value={lastName}
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                variant="outlined"
                className={classes.textField}
                value={accNo}
                id="accNo"
                required
                onChange={(e) => setAccNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bank Name"
                variant="outlined"
                className={classes.textField}
                value={bankName}
                id="bankName"
                required
                onChange={(e) => setBankName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Max Limit"
                variant="outlined"
                className={classes.textField}
                value={maxLimit}
                id="maxLimit"
                required
                inputMode="numeric"
                type="number"
                onChange={(e) => setmaxLimit(e.target.value)}
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
          Save Beneficiary
        </Button>
        <p>
        </p>
        {validationResult && (
          <p className={classes.errorText}>{validationResult}</p>
        )}
      </div>
    </form>
  );
}
