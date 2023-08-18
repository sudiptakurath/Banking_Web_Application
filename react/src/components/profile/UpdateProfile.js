import React, { useState } from "react";
import { saveProfile } from "./ProfileValidation";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
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
    margin: "0 auto",
  },
  textField: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
  },
  button: {
    width: "200px",
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
  btnContainer: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-around",
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

const UpdateProfile = (props) => {
  const goBacktoShowProfile = () => {
    props.setProfileVisibility(false);
  };
  const classes = useStyles();

  const [firstName, setFirstName] = useState(props.profile.firstName);
  const [lastName, setLastName] = useState(props.profile.lastName);
  const [address, setAddress] = useState(props.profile.address);
  const [city, setCity] = useState(props.profile.city);
  const [mobile, setMobile] = useState(props.profile.mobile);
  const [email, setEmail] = useState(props.profile.email);

  const [validationResult, setValidationResult] = useState("");

  const handleValidation = (event) => {
    event.preventDefault();
    setValidationResult("");
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      mobile === "" ||
      email === ""
    ) {
      setValidationResult("Enter required data");
    } else {
      const data = {
        userId: 1,
        firstName,
        lastName: lastName,
        address: address,
        city: city,
        contactNum: mobile,
        email: email,
      };
      saveProfile(data).then((resp) => {
        if (resp === 1) {
          setValidationResult("Profile Details saved successfully");
        } else {
          setValidationResult("Error!! Please try one more time");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        method="get"
      >
        <div className={classes.formContainer}>
          <h2>Update Customer Profile</h2>
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
                  required
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
                  label="Address"
                  variant="outlined"
                  className={classes.textField}
                  value={address}
                  id="Address"
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
                  id="City"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  className={classes.textField}
                  value={mobile}
                  id="Mobile"
                  required
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  className={classes.textField}
                  value={email}
                  id="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.btnContainer}>
              <Button
                onClick={handleValidation}
                variant="contained"
                size="large"
                color="info"
              >
                Save Profile
              </Button>

              <Button
                onClick={goBacktoShowProfile}
                variant="contained"
                size="large"
                color="info"
              >
                Back
              </Button>
            </Grid>
          </Box>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdateProfile;
