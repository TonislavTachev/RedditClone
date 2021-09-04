import React, { useState, useEffect } from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getThreads } from "../actions/threads";
import { getUser } from "../actions/user";
import Loader from "./Loader";
import List from "./ListComponents/List";
import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const Dashboard = ({ threads: { threads }, getThreads, user, getUser }) => {
  const classes = useStyles();

  useEffect(() => {
    getThreads();
    getUser(localStorage.getItem("token"));
  }, []);

  if (threads.length === 0 && user) {
    return <Loader />;
  }

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.leftArea}>
        <List threadsToDisplay={threads} />
      </div>
      {user && (
        <div className={classes.rightArea}>
          <Paper evelation={2} className={classes.userProfile}>
            <div className={classes.Avatar}>
              <Avatar className={classes.purple}>
                {user.username.slice(0, 1).toUpperCase()}
              </Avatar>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Typography>{user.username}</Typography>
            </div>
            <Divider
              style={{ width: "80%", marginTop: 10, marginBottom: 10 }}
            />
            <div className={classes.threads}>
              <Typography>Threads started</Typography>
              <Typography>{user.threads.length}</Typography>
            </div>
            <div className={classes.threads}>
              <Typography>Threads commented</Typography>
              <Typography>{user.comments.length}</Typography>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    padding: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "0px",
    },
  },
  leftArea: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "40px",
  },
  rightArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "40px",
  },
  userProfile: {
    height: "450px",
    padding: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    height: "100px",
    width: "100px",
  },
  threads: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: "5px",
  },
  Avatar: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
}));

const mapStateToProps = (state) => ({
  threads: state.threads,
  user: state.user.user,
});

export default connect(mapStateToProps, { getThreads, getUser })(Dashboard);
