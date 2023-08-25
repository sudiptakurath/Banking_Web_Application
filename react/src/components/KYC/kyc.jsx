import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SaveKYC } from "./kycValidation";
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


export default function Transactions() {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [panName, setpanName] = useState("");
  const [panNum, setpanNum] = useState("");

  const [validationResult, setValidationResult] = useState("");
  
  const currentUserID = sessionStorage.getItem("userId");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/getAccountDetailsByUserId/${currentUserID}`);
      setUser(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleValidation = (event) => {
    event.preventDefault();
    setValidationResult("");
    if (
      panName === "" ||
      panNum === ""
      
    ) {
      setValidationResult("Enter required data");
    } else {
            const data = {
              accountId: user.accountId,
              nameOnDocument: panName,
              panNumber: panNum
            };
            SaveKYC(data).then((resp) => {
                setValidationResult(resp);
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
        <h2>Perform KYC</h2>
        <Box
          component="form"
          noValidate
          onSubmit={handleValidation}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name as on PAN"
                variant="outlined"
                className={classes.textField}
                value={panName}
                id="panName"
                required
                onChange={(e) => setpanName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PAN Number"
                variant="outlined"
                className={classes.textField}
                value={panNum}
                id="panNum"
                required
                onChange={(e) => setpanNum(e.target.value)}
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
          Submit
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
