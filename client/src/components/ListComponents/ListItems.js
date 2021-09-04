import React, { useState, useEffect } from "react";
import { Paper, Typography, Chip, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MessageIcon from "@material-ui/icons/Message";
import { connect } from "react-redux";
import { getThreadOwner, updateThreadList } from "../../actions/threads";
import { useHistory } from "react-router-dom";

const ListItems = ({
  item,
  onMouseEnter,
  activeClass,
  getThreadOwner,
  updateThreadList,
}) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getThreadOwner(item.thread_id);
  }, []);

  const routeToSingleThread = (threadId) => {
    history.push(`/${threadId}`);
  };

  const upvoteThread = () => {
    updateThreadList(item.thread_id, item.upvotes + 1);
  };

  const downvoteThread = (threadId) => {
    updateThreadList(item.thread_id, item.upvotes - 1);
  };

  const renderNumbersBasedOnCommentLength = (commentLength, threadId) => {
    if (commentLength <= 98) {
      return (
        <div
          className={classes.commentSectionForMoreComments}
          onClick={() => routeToSingleThread(threadId)}
        >
          <MessageIcon style={{ marginLeft: 8 }} />
          <Typography className={classes.commentText}>
            {commentLength} comments
          </Typography>
        </div>
      );
    } else if (commentLength >= 99) {
      return (
        <div
          className={classes.commentSectionForMoreComments}
          onClick={() => routeToSingleThread(threadId)}
        >
          <MessageIcon />
          <Typography className={classes.commentText}>99+ comments</Typography>
        </div>
      );
    }
  };

  return (
    <Paper
      elevation={activeClass === item.thread_id ? 4 : 2}
      className={classes.thread}
      onMouseEnter={() => onMouseEnter(item.thread_id)}
    >
      <div className={classes.iconContainer}>
        <div className={classes.upperArrow}>
          <ArrowUpwardIcon onClick={upvoteThread} />
        </div>
        <div
          className={item.upvotes === 0 ? classes.noUpvotes : classes.upvotes}
        >
          {item.upvotes}
        </div>
        <div className={classes.downArrow}>
          <ArrowDownwardIcon onClick={downvoteThread} />
        </div>
      </div>
      <div className={classes.contentArea}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>{item.title}</Typography>
          <Chip
            variant="outlined"
            size="small"
            label={item.owner.username}
            avatar={<Avatar>{item.owner.username.slice(0, 1)}</Avatar>}
          />
        </div>
        <div className={classes.textContainer}>{item.text}</div>
        {renderNumbersBasedOnCommentLength(
          item.comments.length,
          item.thread_id
        )}
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  thread: {
    marginBottom: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    maxWidth: "550px",
  },
  upvotes: {
    marginLeft: "3px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  noUpvotes: {
    marginLeft: "7px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  titleContainer: {
    marginLeft: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "20px",
  },
  textContainer: {
    marginLeft: "20px",
    marginTop: "5px",
    opacity: 0.7,
  },
  commentSection: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px",
    marginLeft: "18px",
    padding: "3px",
    width: "111px",
    border: "1px solid #d5d5d5",
  },
  commentSectionForMoreComments: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px",
    marginLeft: "18px",
    padding: "5px",
    width: "125px",
    border: "1px solid #d5d5d5",
    "&:hover": {
      backgroundColor: "#CECECE",
      cursor: "pointer",
    },
  },
  commentText: {
    marginLeft: "5px",
    fontSize: "14px",
  },
}));

const mapStateToProps = (state) => ({
  threads: state.threads,
});

export default connect(mapStateToProps, { getThreadOwner, updateThreadList })(
  ListItems
);
