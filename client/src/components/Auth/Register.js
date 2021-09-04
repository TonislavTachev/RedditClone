import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  makeStyles,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

const Login = ({ registerUser, error }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    if (
      values.username !== "" &&
      values.password !== "" &&
      values.password === values.confirmPassword
    ) {
      registerUser(values);
    }
  };

  return (
    <div className={classes.wrapper}>
      {error && (
        <Alert severity="error" className={classes.error}>
          {error}
        </Alert>
      )}
      <Paper elevation={2} className={classes.loginWrapper}>
        <div className={classes.userName}>
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              value={values.username}
              id="username"
              onChange={handleChange("username")}
              className={classes.input}
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div className={classes.password}>
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              className={classes.input}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div className={classes.password}>
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={values.confirmPassword}
              className={classes.input}
              type="password"
              onChange={handleChange("confirmPassword")}
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div className={classes.loginButton}>
          <Button className={classes.submit} onClick={login}>
            Login
          </Button>
        </div>
        <div className={classes.routeToRegister}>
          <Typography>Already have an account?</Typography>
          <Typography className={classes.route}>
            <Link
              to="/login"
              style={{ textDecoration: "none", fontWeight: 700 }}
            >
              Login
            </Link>
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  loginWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "400px",
    height: "400px",
  },
  userName: {
    width: "100%",
    marginBottom: "30px",
  },
  password: {
    width: "100%",
    marginBottom: "30px",
  },
  loginButton: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  submit: {
    width: "100%",
    background: "red",
    color: "#FFF",
  },
  error: {
    width: "55%",
    marginBottom: "20px",
  },
  routeToRegister: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "15px",
  },
  route: {
    marginLeft: "10px",
  },
}));

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.user.error,
});

export default connect(mapStateToProps, { registerUser })(Login);
