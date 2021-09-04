import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Chip } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../actions/user";
import { useHistory } from "react-router";
import { Avatar } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  chip: {
    background: "transparent",
    border: "2px solid #FFF",
    color: "#FFF",
  },
}));

const ButtonAppBar = ({ isAuthenticated, logout, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const login = () => {
    history.push("/login");
  };

  const logOut = () => {
    logout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "red" }}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            Reddi
          </Typography>
          {isAuthenticated && user ? (
            <div>
              <Chip
                label={user.username}
                icon={<FaceIcon style={{ color: "#FFF" }} />}
                className={classes.chip}
              />
              <Button color="inherit" onClick={logOut}>
                Logout
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { logout })(ButtonAppBar);
